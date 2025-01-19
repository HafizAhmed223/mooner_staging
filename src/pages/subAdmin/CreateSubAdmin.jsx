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

// const phoneRegExp = /^\+?\d*$/;

const SpValidationschema = Yup.object().shape({
  username: Yup.string().required("* Field is required"),
  email: Yup.string().email().required("* Field is required"),
  // cell_phone: Yup.string()
  //   .matches(
  //     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  //     "Phone must start with +"
  //   )
  //   .required("* Fielld is required"),
  password: Yup.string()
    .required("* Field is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
    ),
  user_type: Yup.string(),
  group_ids: Yup.string().when("user_type", {
    is: (user_type) => user_type === "Sub_Admin",
    then: Yup.string().required("* Field is required"),
  }),
});

const CreateSubAdmin = ({ getAllPermissions, permissions }) => {
  const { Category_kyc } = permissions && permissions;
  const permissionsArray = Object.entries(permissions);
  permissionsArray?.splice(0, 1);
  //("permissionsArray", permissionsArray);

  const classes = MyCustomStyle();

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

  const history = useHistory();
  const [groups, setGroups] = useState([]);
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const getGroups = async () => {
    try {
      const res = await axios.get(
        `${baseURL}user_management/dropdown_groups/`,
        config
      );
      //("res", res?.data);
      setGroups(res?.data?.data);
    } catch (error) {
      //("error", error);
    }
  };
  useEffect(() => {
    getGroups();
  }, []);
  //("formik.values", Formik);
  const handleSubmit = async (values) => {
    let pl = { ...values };
    //("first", pl);
    delete pl.group_ids;
    //("first", pl, values);
    const payload = {
      ...pl,
      // roles: "Sub_Admin",
      ...(values?.user_type == "Sub_Admin" && {
        group_ids: [values?.group_ids],
      }),
    };
    //("payload", payload);
    try {
      const res = await axios.post(
        `${baseURL}user_management/admin_register_user/`,
        payload,
        config
      );
      //("res", res?.data?.Response);
      if (!res?.data?.status) {
        dispatch(setSnackbar(res?.data?.Response, "error"));
      } else {
        dispatch(setSnackbar(res?.data?.Response, "success"));
        history.push({
          pathname: "/mooner/details/sub_admins",
        });
      }
    } catch (error) {
      //("error", error);
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
          <Typography className={classes.Title} gutterBottom>
            Sub Admin
          </Typography>
          <Grid container spacing={2} className={classes.mainContainer}>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  username: "",
                  // permissions: [],
                  email: "",
                  password: "",
                  // roles: "",
                  group_ids: "",
                  user_type: "",
                  // avatarUpload: null,
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
                        lg={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Name
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          name="username"
                          id="outlined-basic"
                          placeholder="name"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.username && touched.username ? (
                          <div className="error-text">{errors.username}</div>
                        ) : null}
                      </Grid>
                      {/* <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Phone
                        </Typography>
                        <TextField
                          type="tel"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.cell_phone}
                          name="cell_phone"
                          id="outlined-basic"
                          placeholder="phone"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.cell_phone && touched.cell_phone ? (
                          <div className="error-text">{errors.cell_phone}</div>
                        ) : null}
                      </Grid> */}
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Email
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          name="email"
                          id="outlined-basic"
                          placeholder="email"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.email && touched.email ? (
                          <div className="error-text">{errors.email}</div>
                        ) : null}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Password
                        </Typography>
                        <TextField
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          name="password"
                          id="outlined-basic"
                          placeholder="password"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.password && touched.password ? (
                          <div className="error-text">{errors.password}</div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          User Type
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.user_type}
                            name={`user_type`}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="group"
                            className={classes.textStyle}
                            MenuProps={{
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              transformOrigin: {
                                vertical: "top",
                                horizontal: "left",
                              },
                              getContentAnchorEl: null,
                            }}
                          >
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"Super_Admin"}
                            >
                              {"Super Admin"}
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"Sub_Admin"}
                            >
                              {"Sub Admin"}
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {errors.user_type && touched.user_type ? (
                          <div className="error-text">{errors.user_type}</div>
                        ) : null}
                      </Grid>

                      {values?.user_type == "Sub_Admin" && (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          lg={3}
                          className={classes.mainRow}
                        >
                          <Typography className={classes.label} gutterBottom>
                            Role
                          </Typography>
                          <FormControl
                            variant="outlined"
                            className={[classes.field, classes.removeOutline]}
                          >
                            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                            <Select
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.group_ids}
                              name={`group_ids`}
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              label="group"
                              className={classes.textStyle}
                              MenuProps={{
                                anchorOrigin: {
                                  vertical: "bottom",
                                  horizontal: "left",
                                },
                                transformOrigin: {
                                  vertical: "top",
                                  horizontal: "left",
                                },
                                getContentAnchorEl: null,
                              }}
                            >
                              {groups?.length > 0 &&
                                groups?.map((group) => (
                                  // //("group", group)
                                  <MenuItem
                                    className={classes.dropdownMenuStyle}
                                    value={group?.id}
                                  >
                                    {group?.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                          {errors.group_ids && touched.group_ids ? (
                            <div className="error-text">{errors.group_ids}</div>
                          ) : null}
                        </Grid>
                      )}
                    </Grid>

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
export default connect(mapStateToProps, { getAllPermissions })(CreateSubAdmin);
