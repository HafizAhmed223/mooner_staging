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
  getProfitMarginAction,
  setProfitMarginAction,
} from "../../redux/actions/mln/mln.actions";
import { useParams, useHistory } from "react-router-dom";
import Permissions from "../subAdmin/Permissions";

const SpValidationschema = Yup.object().shape({
  level0: Yup.number().required("* level 0 is required"),
  level1: Yup.number().required("* level 1 is required"),
  level2: Yup.number().required("* level 2 is required"),
  level3: Yup.number().required("* level 3 is required"),
  level4: Yup.number().required("* level 4 is required"),
});

const MarginProit = ({
  getProfitMarginAction,
  setProfitMarginAction,
  profitMargin,
}) => {
  const { id } = useParams();
  const history = useHistory();
  const classes = MyCustomStyle();
  useEffect(() => {
    getProfitMarginAction(id);
  }, []);

  const handleSubmit = (values) => {
    let payload = {
      id: 1,
      level_0: values.level0,
      level_1: values.level1,
      level_2: values.level2,
      level_3: values.level3,
      level_4: values.level4,
    };
    setProfitMarginAction(payload);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="change_referral" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="MLN Payouts"
              item="MLN Profit Margin"
              bckLink="/mooner/details/mln"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              level0:
                profitMargin && profitMargin.level_0
                  ? profitMargin.level_0
                  : "",
              level1:
                profitMargin && profitMargin.level_1
                  ? profitMargin.level_1
                  : "",
              level2:
                profitMargin && profitMargin.level_2
                  ? profitMargin.level_2
                  : "",
              level3:
                profitMargin && profitMargin.level_3
                  ? profitMargin.level_3
                  : "",
              level4:
                profitMargin && profitMargin.level_4
                  ? profitMargin.level_4
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
                  Profit Margin
                </Typography>
                <Grid container className={classes.mainContainer}>
                  <Grid item xs={12} sm={12} md={8} lg={9} xl={12}>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Set % for Level 0
                        </Typography>
                        <TextField
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.level0}
                          name="level0"
                          id="outlined-basic"
                          placeholder="level0"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.level0 && touched.level0 ? (
                          <div className="error-text">{errors.level0}</div>
                        ) : null}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Set % for Level 1
                        </Typography>
                        <TextField
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.level1}
                          name="level1"
                          id="outlined-basic"
                          placeholder="level1"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.level1 && touched.level1 ? (
                          <div className="error-text">{errors.level1}</div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Set % for Level 2
                        </Typography>
                        <TextField
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.level2}
                          name="level2"
                          id="outlined-basic"
                          placeholder="level2"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.level2 && touched.level2 ? (
                          <div className="error-text">{errors.level2}</div>
                        ) : null}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Set % for Level 3
                        </Typography>
                        <TextField
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.level3}
                          name="level3"
                          id="outlined-basic"
                          placeholder="level3"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.level3 && touched.level3 ? (
                          <div className="error-text">{errors.level3}</div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Set % for Level 4
                        </Typography>
                        <TextField
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.level4}
                          name="level4"
                          id="outlined-basic"
                          placeholder="level4"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.level4 && touched.level4 ? (
                          <div className="error-text">{errors.level4}</div>
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
    profitMargin: mln.profitMargin,
  };
};
export default connect(mapStateToProps, {
  getProfitMarginAction,
  setProfitMarginAction,
})(MarginProit);
