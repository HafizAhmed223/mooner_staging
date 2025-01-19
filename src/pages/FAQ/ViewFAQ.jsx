import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  makeStyles,
  TextareaAutosize,
  TextField,
  Box,
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

const ViewFAQs = ({ faqByIdData, getfaqByIdAction }) => {
  const classes = MyCustomStyle();
  const history = useHistory();

  useEffect(() => {
    getIdFromParams();
  }, []);
  const getIdFromParams = () => {
    const { location } = history;
    const { pathname } = location;
    let name = pathname;
    let nameArr = name.split("/");
    let id = nameArr[nameArr.length - 1];
    getfaqByIdAction(id);
  };

  const handleBack = () => {
    history.push({
      pathname: "/mooner/details/fqa",
    });
  };
  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="view_faqs" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar module="FAQs" item="View" bckLink="/mooner/details/fqa" />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            View FAQs
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
                    Question
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
                      {faqByIdData && faqByIdData.question}
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
                    Answer
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
                      {faqByIdData && faqByIdData.answer}
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
                  lg={6}
                  xl={6}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    <br />
                    Position
                  </Typography>

                  <TextField
                    value={faqByIdData && faqByIdData.sorting_key}
                    id="outlined-basic"
                    placeholder="Position"
                    variant="outlined"
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
                    Images
                  </Typography>
                  <Box
                    sx={{
                      display: "-webkit-inline-box",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    {faqByIdData &&
                      faqByIdData?.faqs_image?.map((img) => {
                        return (
                          <Box sx={{ marginRight: "10px" }}>
                            <ImageModal
                              styleJx={{
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                              }}
                              path={`${base_url_auto}${img?.faqs_image}`}
                            />
                          </Box>
                        );
                      })}
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ marginTop: "50px" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className={classes.button}
                  onClick={handleBack}
                  sx={{ paddingTop: { lg: "100px" } }}
                >
                  Back
                </Button>
              </Box>
            </Grid>
            <Grid xs={12} sm={2}>
              <CommonCard
                message="Create FAQs"
                btnText="Add"
                link="/mooner/create_fqa"
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = ({ faq }) => {
  return {
    faqByIdData: faq.FAQById,
  };
};
export default connect(mapStateToProps, { getfaqByIdAction })(ViewFAQs);
