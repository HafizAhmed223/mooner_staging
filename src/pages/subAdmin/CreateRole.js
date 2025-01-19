import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  makeStyles,
  TextField,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from "@material-ui/core";

import * as Yup from "yup";
import Topbar from "../topbar";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { MyCustomStyle } from "../../assets/styles/MyStyles";
import PlusIcon from "../../assets/svg/close.svg";
import PermissionProvider from "./PermissionProvider";
import { getAllPermissions } from "../../redux/actions/auth/auth.action";
import axios from "axios";
import { baseURL } from "../../api";
import { setSnackbar } from "../../utils/global.actions";
import { useDispatch } from "react-redux";
import Permissions from "./Permissions";
import GroupsForPermissions from "../Table/subAdmin/GroupsForPermissions";

// const phoneRegExp = /^\+?\d*$/;
const useStyles = makeStyles((mainTheme) => ({
  container: {
    position: "absolute",
    backgroundColor: "#fff",
  },
  collapse: {},
  paper: {
    margin: mainTheme.spacing(0),
  },
  actionContent: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  FlexWrapper: {
    display: "flex",
    padding: mainTheme.spacing(2),
  },
  actionImage: {
    cursor: "pointer",
  },
  links: {
    textDecoration: "none",
  },
  actionsLabel: {
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    color: "#20253B",
    marginLeft: mainTheme.spacing(2),
    cursor: "pointer",
  },
  header: {
    display: "flex",
    [mainTheme.breakpoints.only("xs")]: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
  },
  //   title: {
  //     marginTop: mainTheme.spacing(7),
  //     fontSize: "24px",
  //     lineHeight: "28px",
  //     letterSpacing: "0.2em",
  //     color: "#20253B",
  //     animation: "slideInRight",
  //   },
  categoryHeading: {
    marginTop: mainTheme.spacing(8),
    display: "flex",
    //   direction: "row",
  },
  title: {
    fontSize: "27px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "##000000",
    opacity: "0.5",
    marginRight: "7px",
    cursor: "pointer",
    fontWeight: "700",
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "15px",
    },
  },
  title2: {
    fontSize: "22px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#000000",
    marginLeft: "7px",
    fontWeight: "600",
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "12px",
      marginLeft: "2px",
    },
  },
  registertypo: {
    color: "#20253B",
    fontWeight: "600",
    fontSize: "20px",
    letterSpacing: "0.2em",
    marginTop: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "14px",
    },
  },
  middleGridwrapper: {
    display: "flex",
    flexDirection: "row",
  },
  middleUpperdiv: {
    position: "relative",
  },
  Eggplateimg: {
    width: "150px",
    height: "140px",
  },
  cameraIcondiv: {
    width: "50px",
    height: "45px",
    backgroundColor: "#FEDB29",
    position: "absolute",
    top: "54%",
    left: "111px",
    borderRadius: "35%",
    justifyContent: "center",
  },
  Cameraicon: {
    marginTop: "10px",
    marginLeft: "11px",
  },
  middleRightdiv: {
    marginTop: "9%",
    marginLeft: "20px",
  },
  rightUpperdiv: {
    display: "flex",
    flexDirection: "row",
  },
  categoryname: {
    fontFamily: "Gilroy-Bold",
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#000000",
    fontWeight: "50px",
  },
  editimg: {
    width: "20px",
    height: "20px",
    marginLeft: "20px",
    cursor: "pointer",
  },
  distributors: {
    marginTop: "10px",
    fontFamily: "Gilroy-Medium",
    fontSize: "14px",
    lineHeight: "16px",
    /* identical to box height */
    letterSpacing: "0.2em",
    color: "#000000",
    opacity: "0.7",
  },
  rightGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  managecategory: {
    width: "42%",
    height: "60px",
    borderRadius: "24px",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(3),
    marginBottom: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
      width: "55%",
    },
    [mainTheme.breakpoints.only("sm")]: {
      width: "auto",
    },
    [mainTheme.breakpoints.down("xs")]: {
      width: "auto",
    },
  },
  link: {
    textDecoration: "none",
  },
}));
const SpValidationschema = Yup.object().shape({
  username: Yup.string().required("* Field is required"),
});

const CreateRole = ({ getAllPermissions, permissions }) => {
  const [showPermissions, setShowPermissions] = useState(false);
  const [reRender, setReRender] = useState(false);

  const { Category_kyc } = permissions && permissions;
  const permissionsArray = Object.entries(permissions);
  permissionsArray?.splice(0, 1);
  //("permissionsArray", permissionsArray);

  const classes = MyCustomStyle();
  const clases = useStyles();

  const handleNumberFields = (e) => {
    if (
      (e.keyCode < 48 || e.keyCode > 57) &&
      e.keyCode != 8 &&
      e.keyCode != 38 &&
      e.keyCode != 40
    ) {
      return e.preventDefault();
    }
  };
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const history = useHistory();
  const handleSubmit = async (values) => {
    //("values", values);
    //("unique", permission);
    if (permission?.length > 0) {
      try {
        const res = await axios.post(
          `${baseURL}user_management/create_role/`,
          { name: values?.username, permissions: permission },
          config
        );
        //("res", res);
        if (!res?.data?.status) {
          dispatch(setSnackbar(res?.data?.Response, "error"));
        } else {
          dispatch(setSnackbar(res?.data?.Response, "success"));
          setShowPermissions(false);
        }
      } catch (error) {
        //("error", error);
      }
    } else {
      dispatch(setSnackbar("Please grant permissions first!", "error"));
    }
  };
  useEffect(() => {
    getAllPermissions();
  }, []);
  const [permission, setPermission] = useState([]);

  return (
    <>
      <Container maxWidth="xl">
        <Permissions page={"add_role"} />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Sub Admin"
              item="Create"
              bckLink="/mooner/details/sub_admins"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Grid container spacing={5} className={clases.header}>
            {!showPermissions && (
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Typography className={clases.registertypo}>Roles</Typography>
              </Grid>
            )}
            {!showPermissions && (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                className={clases.rightGrid}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className={clases.managecategory}
                  onClick={() => setShowPermissions(true)}
                >
                  Create Role
                </Button>
              </Grid>
            )}
          </Grid>

          {showPermissions ? (
            <Grid container spacing={2} className={classes.mainContainer}>
              <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    username: "",
                  }}
                  validationSchema={SpValidationschema}
                  onSubmit={handleSubmit}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    values,
                    errors,
                    touched,
                  }) => (
                    <Form onSubmit={handleSubmit} autoComplete="off">
                      <Grid container className={classes.mainContainer}>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          lg={4}
                          className={classes.mainRow}
                        >
                          <Typography className={classes.label} gutterBottom>
                            Role Title
                          </Typography>
                          <TextField
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            name="username"
                            id="outlined-basic"
                            placeholder="Title"
                            variant="outlined"
                            className={[classes.field, classes.removeOutline]}
                          />
                          {errors.username && touched.username ? (
                            <div className="error-text">{errors.username}</div>
                          ) : null}
                        </Grid>
                      </Grid>
                      {/* <Grid container alignItems="center" justifyContent="center"> */}
                      {permissionsArray &&
                        permissionsArray?.map((item) => (
                          // //("item", item)
                          <Box className={classes.mainContainer}>
                            <PermissionProvider
                              page={item[0]}
                              options={item[1]}
                              changeHandler={handleChange}
                              setFieldValue={setFieldValue}
                              permission={permission}
                              setPermission={setPermission}
                            />
                          </Box>
                        ))}
                      {/* </Grid> */}

                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.button}
                      >
                        Save
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          ) : (
            <>
              <GroupsForPermissions />
            </>
          )}
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  // //("auth", auth);
  return {
    permissions: auth?.permissions,
  };
};
export default connect(mapStateToProps, { getAllPermissions })(CreateRole);
