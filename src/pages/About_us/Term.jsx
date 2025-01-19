import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { connect } from "react-redux";

import Topbar from "../topbar";
import { useParams } from "react-router-dom";
import { MyCustomStyle } from "../../assets/styles/MyStyles";

import {
  getTermsConditionAction,
  UpdateTermsConditionsAction,
} from "../../redux/actions/PrivicyPolicy/privicyPolicy.actions";

import Editor from "./Editor";
import Permissions from "../subAdmin/Permissions";

const TermsAndConditions = ({
  getTermsConditionAction,
  UpdateTermsConditionsAction,
  termsData,
  loading,
}) => {
  const classes = MyCustomStyle();

  useEffect(() => {
    getTermsConditionAction(1);
  }, []);

  return (
    <>
      <Permissions page="change_privacypolicy" />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" Terms & Conditions "
              item=" Edit "
              bckLink="/mooner/details/mooner_management"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Terms & Condition
          </Typography>

          <Grid Container spacing={2} className={classes.mainContainer}>
            <Grid xs={12}>
              <Grid container className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={8}
                  className={classes.mainRow}
                >
                  {loading ? (
                    <div style={{ textAlign: "center" }}>
                      <CircularProgress />
                    </div>
                  ) : (
                    termsData && (
                      <Editor
                        actionName={UpdateTermsConditionsAction}
                        from="terms & Conditions"
                        id={1}
                        value={termsData && termsData.terms_and_condition}
                      />
                    )
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = ({ privacy }) => {
  return {
    termsData: privacy.termsData,
    loading: privacy.loading,
  };
};
export default connect(mapStateToProps, {
  getTermsConditionAction,
  UpdateTermsConditionsAction,
})(TermsAndConditions);
