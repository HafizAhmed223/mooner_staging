import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";

import * as Yup from "yup";
import Topbar from "../topbar";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { MyCustomStyle } from "../../assets/styles/MyStyles";

import {
  getFeeMarginAction,
  setFeeMarginAction,
} from "../../redux/actions/mln/mln.actions";
import { useParams, useHistory } from "react-router-dom";
import Permissions from "../subAdmin/Permissions";

const SpValidationschema = Yup.object().shape({
  adminFee: Yup.number()
    .required("* Admin Fee is required")
    .min(0, "Admin Fee must be greater than or equal to 0")
    .max(100, "Admin Fee must be less than or equal to 100"),
  convenienceFee: Yup.number()
    .required("* Convenience Fee is required")
    .min(0, "Convenience Fee must be greater than or equal to 0")
    .max(100, "Convenience Fee must be less than or equal to 100"),
});

const FeeMargin = ({ getFeeMarginAction, feeMargin, setFeeMarginAction }) => {
  const { id } = useParams();
  const history = useHistory();
  const classes = MyCustomStyle();
  useEffect(() => {
    getFeeMarginAction(id);
  }, []);

  const handleSubmit = (values) => {
    let payload = {
      id: 1,
      admin_fees: values.adminFee,
      convenience_fees: values.convenienceFee,
    };
    setFeeMarginAction(payload);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="change_referral" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="MLN Payouts"
              item="Set Fee Margin"
              bckLink="/mooner/details/mln"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              adminFee:
                feeMargin && feeMargin.admin_fees ? feeMargin.admin_fees : "",
              convenienceFee:
                feeMargin && feeMargin.convenience_fees
                  ? feeMargin.convenience_fees
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
                <Typography className={classes.Title} gutterBottom>
                  Set Fee Margin
                </Typography>
                <Grid container className={classes.mainContainer}>
                  <Grid item xs={12} sm={12} md={8} lg={9} xl={12}>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={5}
                        md={5}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Set % Admin Fee
                        </Typography>
                        <TextField
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.adminFee}
                          name="adminFee"
                          id="outlined-basic"
                          placeholder="Admin Fee"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.adminFee && touched.adminFee ? (
                          <div className="error-text">{errors.adminFee}</div>
                        ) : null}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={5}
                        md={5}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Set % Convenience Fee
                        </Typography>
                        <TextField
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.convenienceFee}
                          name="convenienceFee"
                          id="outlined-basic"
                          placeholder="Convenience Fee"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.convenienceFee && touched.convenienceFee ? (
                          <div className="error-text">
                            {errors.convenienceFee}
                          </div>
                        ) : null}
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

const mapStateToProps = ({ mln }) => {
  return {
    feeMargin: mln.feeMargin,
  };
};
export default connect(mapStateToProps, {
  getFeeMarginAction,
  setFeeMarginAction,
})(FeeMargin);
