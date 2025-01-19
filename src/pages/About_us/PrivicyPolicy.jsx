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
import Editor from "./Editor";

import {
  UpdatePrivicyPolicyAction,
  GetPrivicyPolicyContentAction,
} from "../../redux/actions/PrivicyPolicy/privicyPolicy.actions";
import Permissions from "../subAdmin/Permissions";

const PrivicyPolicy = ({
  UpdatePrivicyPolicyAction,
  GetPrivicyPolicyContentAction,
  PrivicyData,
  loading,
}) => {
  const classes = MyCustomStyle();
  useEffect(() => {
    GetPrivicyPolicyContentAction(1);
  }, []);
  return (
    <>
      <Permissions page="change_privacypolicy" />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" Privicy Policy "
              item=" Edit "
              bckLink="/mooner/details/mooner_management"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Privicy Policy
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
                    PrivicyData && (
                      <Editor
                        actionName={UpdatePrivicyPolicyAction}
                        from="privicyPolicy"
                        id={1}
                        value={PrivicyData && PrivicyData.policy_content}
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
    PrivicyData: privacy.privicyData,
    loading: privacy.loading,
  };
};
export default connect(mapStateToProps, {
  UpdatePrivicyPolicyAction,
  GetPrivicyPolicyContentAction,
})(PrivicyPolicy);
