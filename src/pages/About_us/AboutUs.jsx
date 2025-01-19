import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core";

import * as Yup from "yup";
import { connect } from "react-redux";

import Topbar from "../topbar";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import Editor from "./Editor";
import {
  UpdateAboutUsAction,
  getAboutUsAction,
} from "../../redux/actions/PrivicyPolicy/privicyPolicy.actions";
import Permissions from "../subAdmin/Permissions";

const AboutUs = ({
  UpdateAboutUsAction,
  getAboutUsAction,
  aboutusData,
  loading,
}) => {
  const classes = MyCustomStyle();

  useEffect(() => {
    getAboutUsAction(1);
  }, []);

  return (
    <>
      <Permissions page="change_privacypolicy" />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" About Us "
              item=" Edit "
              bckLink="/mooner/details/mooner_management"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            About Us
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
                    aboutusData && (
                      <Editor
                        actionName={UpdateAboutUsAction}
                        from="about us"
                        id={1}
                        value={aboutusData && aboutusData.about_content}
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
    aboutusData: privacy.aboutusData,
    loading: privacy.loading,
  };
};
export default connect(mapStateToProps, {
  UpdateAboutUsAction,
  getAboutUsAction,
})(AboutUs);
