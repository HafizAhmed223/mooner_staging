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
import { useParams } from "react-router-dom";
import { MyCustomStyle } from "../../assets/styles/MyStyles";

import { updateUserStatusAction } from "../../redux/actions/users/users.actions";
import { getUserDetail } from "../../redux/actions/booking/booking.action";
import Permissions from "../subAdmin/Permissions";

const SpValidationschema = Yup.object().shape({
  username: Yup.string().required("* Field is required"),
});

const statusOptions = {
  true: "Active",
  false: "Inactive",
};

const ChangeUserStatus = ({
  updateUserStatusAction,
  getUserDetail,
  userData,
}) => {
  const { id } = useParams();
  useEffect(() => {
    getUserDetail(id);
  }, []);
  const classes = MyCustomStyle();

  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append("status", values.status);
    updateUserStatusAction(formData, id);
  };
  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="change_user" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" Edit "
              item=" User Details"
              bckLink="/mooner/details/user_management"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            User Status
          </Typography>
          <Formik
            enableReinitialize={true}
            initialValues={{
              username:
                userData && userData.user_details && userData.user_details[0]
                  ? userData.user_details[0].first_name
                  : "",
              status:
                userData && userData.user_details && userData.user_details[0]
                  ? statusOptions[userData.user_details[0].status]
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

const mapStateToProps = ({ booking }) => {
  return {
    userData: booking.userData,
  };
};
export default connect(mapStateToProps, {
  getUserDetail,
  updateUserStatusAction,
})(ChangeUserStatus);
