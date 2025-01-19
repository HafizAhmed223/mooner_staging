import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { connect } from "react-redux";

import { useHistory } from "react-router-dom";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import Topbar from "../topbar";

import { getSpeByIdAction } from "../../redux/actions/spManagement/spmanagement.actions";
import { UpdatePassword } from "../../redux/actions/changePassword/ChangePassword.action";
import { setErrors } from "../../utils/global.actions";
import Permissions from "../subAdmin/Permissions";

const ValidationSchema = Yup.object().shape({
  new_password: Yup.string()
    .min(8, "length should be at least 8 character")
    .required("*Field is required"),
  conform_password: Yup.string()
    .min(8, "length should be at least 8 character")
    .required("* Field is required"),
});

const ChangePassword = ({
  getSpeByIdAction,
  spByidData,
  UpdatePassword,
  setErrors,
}) => {
  useEffect(() => {
    getIdFromParams();
  }, []);

  const history = useHistory();
  const [spId, setSpid] = useState();

  const getIdFromParams = () => {
    const { location } = history;
    const { pathname, search } = location;
    const id = pathname.substring(pathname.lastIndexOf("/") + 1);
    getSpeByIdAction(id);
    setSpid(id);
    const from = search.substring(search.indexOf("=") + 1);
    setPathfrom(from);
  };

  const classes = MyCustomStyle();
  const [pathFrom, setPathfrom] = useState("");

  const handleSubmit = (values) => {
    if (values.new_password === values.conform_password) {
      let formData = new FormData();
      formData.append("password", values.new_password);
      formData.append("confirm_password", values.conform_password);
      UpdatePassword(formData, spId);
    }
    if (values.new_password != values.conform_password) {
      return setErrors("Passwords do not match");
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="change_userprofile" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" Change Password "
              item={pathFrom}
              bckLink="/mooner/details/change_password"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Change Password
          </Typography>
          <Formik
            enableReinitialize={true}
            initialValues={{
              user_name:
                spByidData && spByidData[0] ? spByidData[0].username : "",
              user_email:
                spByidData && spByidData[0] ? spByidData[0].email : "",
              new_password: "",
              conform_password: "",
            }}
            validationSchema={ValidationSchema}
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
                <Grid container spacing={2} className={classes.mainContainer}>
                  <Grid xs={12}>
                    <Grid container className={classes.mainContainer}>
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
                          User Name
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.user_name}
                          name="new_password"
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="user Name"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
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
                          Email
                        </Typography>
                        <TextField
                          type="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.user_email}
                          name="new_password"
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="email"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      className={classes.mainContainer}
                    >
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
                          New Password
                        </Typography>
                        <TextField
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.new_password}
                          name="new_password"
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="password"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.new_password && touched.new_password ? (
                          <div className="error-text">
                            {errors.new_password}
                          </div>
                        ) : null}
                      </Grid>
                      <Grid
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Confirm Password
                        </Typography>
                        <TextField
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.conform_password}
                          name="conform_password"
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="password"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.conform_password && touched.conform_password ? (
                          <div className="error-text">
                            {errors.conform_password}
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      Update Password
                    </Button>
                  </Grid>
                  <Grid xs={2}></Grid>
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
  UpdatePassword,
  setErrors,
})(ChangePassword);
