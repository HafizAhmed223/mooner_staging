import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  TextField,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { connect } from "react-redux";

import Topbar from "../topbar";
import { useHistory } from "react-router-dom";
import { MyCustomStyle } from "../../assets/styles/MyStyles";

import {
  getSpeByIdAction,
  updateSPAction,
} from "../../redux/actions/spManagement/spmanagement.actions";
import Permissions from "../subAdmin/Permissions";

const SpValidationschema = Yup.object().shape({
  username: Yup.string().required("* Field is required"),
});

const statusOptions = {
  true: "Active",
  false: "Inactive",
};

const ChangeSeviceSeekerStatus = ({
  getSpeByIdAction,
  updateSPAction,
  spByidData,
}) => {
  useEffect(() => {
    getIdFromParams();
  }, []);
  const [spId, setSpid] = useState();
  const classes = MyCustomStyle();
  const history = useHistory();
  const getIdFromParams = () => {
    const { location } = history;
    const { pathname } = location;
    let name = pathname;
    let nameArr = name.split("/");
    let id = nameArr[nameArr.length - 1];
    setSpid(id);
    getSpeByIdAction(id);
  };

  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append("status", values.status);
    updateSPAction(formData, spId);
  };
  return (
    <>
      <Container maxWidth="xl">
        <Permissions page={"change_user"} />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" Sp Management "
              item=" SP Proile "
              bckLink="/mooner/details/sp_management"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            SP Status
          </Typography>
          <Formik
            enableReinitialize={true}
            initialValues={{
              username:
                spByidData && spByidData[0] ? spByidData[0].username : "",
              status:
                spByidData && spByidData[0]
                  ? statusOptions[spByidData[0].status]
                  : "",
            }}
            validationSchema={SpValidationschema}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <Form onSubmit={handleSubmit} autoComplete="off">
                <Grid Container spacing={2} className={classes.mainContainer}>
                  <Grid xs={12}>
                    <Grid container className={classes.mainContainer}>
                      {/* <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Username
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          name="username"
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="username"
                          className={[classes.disableField, classes.disableRemoveOutline]}
                          disabled={true}
                        />
                      </Grid>
                       */}
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Status
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.status}
                            name="status"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="status"
                            displayEmpty
                            className={
                              values.status === "Active"
                                ? classes.changeColor
                                : classes.changeColorRed
                            }
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
                              style={{ color: "green" }}
                              value={"Active"}
                            >
                              Active
                            </MenuItem>
                            <MenuItem
                              style={{ color: "red" }}
                              value={"Inactive"}
                            >
                              Inactive
                            </MenuItem>
                          </Select>
                          {errors.status && touched.status ? (
                            <div
                              className="error-text"
                              style={{ marginTop: "10px" }}
                            >
                              {errors.status}
                            </div>
                          ) : null}
                        </FormControl>
                      </Grid>
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
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = ({ spManagement }) => {
  return {
    spByidData: spManagement.spById,
  };
};
export default connect(mapStateToProps, {
  getSpeByIdAction,
  updateSPAction,
})(ChangeSeviceSeekerStatus);
