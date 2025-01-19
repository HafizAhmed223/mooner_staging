import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { connect } from "react-redux";

import Topbar from "../topbar";
import { useParams, useHistory } from "react-router-dom";
import { MyCustomStyle } from "../../assets/styles/MyStyles";

const SpValidationschema = Yup.object().shape({
  name: Yup.string().required("* Field is required"),
  amount: Yup.number().required("* Field is required"),
});

const RefundAndAllocate = () => {
  const classes = MyCustomStyle();
  const { From } = useParams();
  const history = useHistory();

  const handleBackLink = () => {
    history.push({
      pathname: "/mooner/details/cancellation_management_list",
    });
  };

  const handleSubmit = (values) => {
    //("value", values);
  };
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" Cancellation Management "
              item={From}
              bckLink="/mooner/details/cancellation_management_list"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            {From} Details
          </Typography>
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: "",
              amount: "",
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
                          Name
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          name="name"
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="name"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.name && touched.name ? (
                          <div
                            className="error-text"
                            style={{ marginTop: "10px" }}
                          >
                            {errors.name}
                          </div>
                        ) : null}
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
                          Amount
                        </Typography>
                        <TextField
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.amount}
                          name="amount"
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="$123"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.amount && touched.amount ? (
                          <div
                            className="error-text"
                            style={{ marginTop: "10px" }}
                          >
                            {errors.amount}
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleBackLink}
                      className={classes.blueBtn}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      Allocate
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

const mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps, {})(RefundAndAllocate);
