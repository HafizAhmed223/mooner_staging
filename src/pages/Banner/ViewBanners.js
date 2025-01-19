import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  makeStyles,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { connect } from "react-redux";
import { getfaqByIdAction } from "../../redux/actions/faq/faq.actions";
import Topbar from "../topbar";
import { useHistory } from "react-router-dom";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import CommonCard from "../../common/CommonCard";
import Permissions from "../subAdmin/Permissions";
import { base_url_auto } from "../../utils/global";
import ImageModal from "../../common/imageModal/ImageModal";
import ReactLinkify from "react-linkify";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { baseURL } from "../../api";

const ViewFAQs = () => {
  const classes = MyCustomStyle();
  const history = useHistory();
  //("history", history);

  const params = useParams();
  const { id } = params;
  //("params", id);
  const [banners, setBanners] = useState("");

  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(async () => {
    const res = await axios.get(`${baseURL}privacy/banners/${id}`, config);
    //("resp", res);
    setBanners(res?.data?.data);
  }, []);
  const handleBack = () => {
    history.push({
      pathname: "/mooner/details/banner",
    });
  };
  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="view_banners" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Banners"
              item="View"
              bckLink="/mooner/details/banner"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            View Banner
          </Typography>
          <Grid container spacing={2} className={classes.mainContainer}>
            <Grid xs={12} sm={10}>
              {/* test */}
              <Grid container spacing={2} className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={10}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    <br />
                    Banner for
                  </Typography>
                  <div
                    style={{
                      backgroundColor: "#FCFDFE",
                      padding: "20px 10px",
                      borderRadius: "10px",
                      display: "flex",
                      flexWrap: "wrap",

                      overflow: "auto",
                    }}
                  >
                    <ReactLinkify>
                      {banners && banners.banners_for}
                    </ReactLinkify>
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={2} className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={10}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    <br />
                    Promos url
                  </Typography>
                  <div
                    style={{
                      backgroundColor: "#FCFDFE",
                      padding: "20px 10px",
                      borderRadius: "10px",
                      display: "flex",
                      flexWrap: "wrap",

                      overflow: "auto",
                    }}
                  >
                    <a href={banners?.promos_url} target="blank">
                      {banners && banners.promos_url}
                    </a>
                  </div>
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                className={classes.mainContainer}
                style={{ marginBottom: "20px" }}
              >
                <Grid
                  items
                  xs={4}
                  sm={4}
                  md={2}
                  lg={2}
                  xl={2}
                  style={{
                    marginRight: "33px",
                    maxWidth: "100px",
                    maxHeight: "100px",
                    marginBottom: "20px",
                  }}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    <br />
                    Image
                  </Typography>
                  <ImageModal
                    styleJx={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                    path={banners && banners?.banners_image}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                onClick={handleBack}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default ViewFAQs;
