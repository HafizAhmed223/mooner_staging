import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import { AmpStoriesOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import mnr from "../../assets/images/mnr.png";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    width: "45%",
    height: "auto",
    borderRadius: mainTheme.spacing(4),
    marginTop: mainTheme.spacing(3),
    marginBottom: mainTheme.spacing(3),
    marginLeft: mainTheme.spacing(2),
    paddingRight: mainTheme.spacing(4),
    boxShadow: "0px 16px 32px 0px #20253B1A, 0px 4px 4px 0px #20253B14",

    [mainTheme.breakpoints.only("lg")]: {
      width: "70%",
      height: "auto",
      marginLeft: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.only("md")]: {
      width: "50%",
      height: "auto",
      marginLeft: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.only("sm")]: {
      width: "57%",
      height: "auto",
      marginLeft: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.down("xs")]: {
      width: "100%",
      height: "auto",
      marginLeft: mainTheme.spacing(0),
    },
  },

  title: {
    color: "#20253B",
    fontWeight: 600,
    fontSize: mainTheme.spacing(2.7),
    marginTop: mainTheme.spacing(1),
    marginBottom: mainTheme.spacing(2),
    marginLeft: mainTheme.spacing(3),
    marginRight: mainTheme.spacing(3),
    [mainTheme.breakpoints.down("lg")]: {
      marginLeft: mainTheme.spacing(1),
      fontSize: mainTheme.spacing(3),
    },
  },

  btn: {
    color: "#9E6DC9",
    marginLeft: mainTheme.spacing(3),
    textTransform: "capitalize",
    marginTop: mainTheme.spacing(0),
    [mainTheme.breakpoints.down("lg")]: {
      marginLeft: mainTheme.spacing(1),
      marginBottom: mainTheme.spacing(1),
    },
  },

  cardclr: {
    marginLeft: mainTheme.spacing(2),
    width: "72px",
    height: "72px",
    backgroundColor: "#FE7C7C",
    borderRadius: "24px",
    // cursor: "pointer",
    [mainTheme.breakpoints.only("xs")]: {
      marginLeft: mainTheme.spacing(4),
    },
  },
  cardclrBlue: {
    marginLeft: mainTheme.spacing(2),
    width: "72px",
    height: "72px",
    backgroundColor: "#6C8CFC",
    borderRadius: "24px",
    // cursor: "pointer",
    [mainTheme.breakpoints.only("xs")]: {
      marginLeft: mainTheme.spacing(4),
    },
  },
  cardclrpurple: {
    marginLeft: mainTheme.spacing(2),
    width: "72px",
    height: "72px",
    backgroundColor: "#C57DFE",
    borderRadius: "24px",
    // cursor: "pointer",
    [mainTheme.breakpoints.only("xs")]: {
      marginLeft: mainTheme.spacing(4),
    },
  },
  cardclryellow: {
    marginLeft: mainTheme.spacing(2),
    width: "72px",
    height: "72px",
    backgroundColor: "#FCA92C",
    borderRadius: "24px",
    // cursor: "pointer",
    [mainTheme.breakpoints.only("xs")]: {
      marginLeft: mainTheme.spacing(4),
    },
  },
  icons: {
    height: "35px",
    width: "35px",
    position: "relative",
    top: "23px",
    left: "17px",
  },
  numberValue: {
    fontSize: mainTheme.spacing(3),
    lineHeight: "28px",
    marginTop: mainTheme.spacing(2.5),
    fontWeight: "600",
    [mainTheme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },
  text: {
    fontSize: "14px",
    opacity: 0.7,
    lineHeight: "19px",
    [mainTheme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },
  cardWrapper: {
    display: "flex",
    marginTop: mainTheme.spacing(3),
    marginBottom: mainTheme.spacing(3),
  },
}));
export default function StatusCard(props) {
  const {
    title,
    Images,
    amount,
    tagline,
    generatePDF,
    handleDownloadExcel,
    date = "",
    endDate = "",
  } = props;
  const {
    amount1,
    amount2,
    amount3,
    amount4,
    amount5 = "",
    amount6 = "",
    amount7,
    amount8,
  } = amount;
  const { tagline1, tagline2, tagline3, tagline4 } = tagline;
  const {
    box1: { cursor1 = "auto" } = {},
    box2: { cursor2 = "auto" } = {},
    box3: { cursor3 = "auto" } = {},
    box4: { cursor4 = "auto" } = {},
  } = Images;
  const classes = useStyles();
  //("cursorrrrr", cursor1, cursor2, cursor3, cursor4);
  //("Images", Images);
  const history = useHistory();
  const navigate = () => {
    switch (title) {
      case "Complaints":
        history.push({
          pathname: "/mooner/details/ticket_management",
          state: { date: date, endDate: endDate },
        });
        break;

      default:
        break;
    }
  };
  const navigation = (page, apiKey, title) => {
    console.log(apiKey);
    history.push({
      pathname: `/mooner/${page}`,
      state: { apiKey: apiKey, title: title, date: date, endDate: endDate },
    });
  };
  return (
    <Card
      className={classes.root}
      variant="outlined"
      // onClick={() => (title == "Complaints" ?  : null)}
    >
      <CardContent>
        <Typography className={classes.title}>{title}</Typography>

        <div className={classes.cardWrapper}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid container style={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <div
                    onClick={() =>
                      title == "Generate Report"
                        ? generatePDF()
                        : title == "Stats"
                        ? navigation("paidout_listing")
                        : navigate()
                    }
                    className={classes.cardclr}
                    style={{ cursor: cursor1 }}
                  >
                    <Box>
                      <img
                        src={
                          Images &&
                          Images.box1 &&
                          Images.box1.image1 &&
                          Images.box1.image1
                        }
                        className={classes.icons}
                      />
                    </Box>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gridColumnGap: "5px",
                      }}
                    >
                      {title == "Stats" && <img src={mnr} height="20px" />}
                      <Typography sx={{ paddingLeft: "10px" }}>
                        {amount1}
                      </Typography>
                    </Box>
                    {title == "Stats" && <Typography>$ {amount5}</Typography>}
                    <Typography className={classes.text}>
                      {" "}
                      {tagline1}{" "}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid container style={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  {Images &&
                    Images.box2 &&
                    Images.box2.image2 &&
                    Images.box2.image2 && (
                      <div
                        className={classes.cardclrBlue}
                        style={{ cursor: cursor2 }}
                        onClick={() =>
                          title == "Generate Report"
                            ? generatePDF
                            : title == "Stats"
                            ? navigation(
                                "mln_listing",
                                "referral_mln_listing",
                                "MLN Listing"
                              )
                            : navigate()
                        }
                      >
                        <Box>
                          <img
                            src={
                              Images &&
                              Images.box2 &&
                              Images.box2.image2 &&
                              Images.box2.image2
                            }
                            className={classes.icons}
                          />
                        </Box>
                      </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Box>
                    <Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gridColumnGap: "5px",
                        }}
                      >
                        {title == "Stats" && <img src={mnr} height="20px" />}
                        <Typography sx={{ paddingLeft: "10px" }}>
                          {amount2}
                        </Typography>
                      </Box>
                      {title == "Stats" && <Typography>$ {amount6}</Typography>}
                    </Typography>
                    <Typography className={classes.text}>
                      {" "}
                      {tagline && tagline.tagline2}{" "}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.cardWrapper}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid container style={{ display: "flex", alignItems: "center" }}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  // onClick={
                  //   title == "Generate Report"
                  //     ? handleDownloadExcel
                  //     : () => {
                  //         //("false");
                  //       }
                  // }
                >
                  {Images &&
                    Images.box3 &&
                    Images.box3.image3 &&
                    Images.box3.image3 && (
                      <div
                        className={classes.cardclrpurple}
                        style={{ cursor: cursor3 }}
                        onClick={() =>
                          title == "Generate Report"
                            ? handleDownloadExcel()
                            : title == "Stats"
                            ? navigation(
                                "mln_listing",
                                "spearning_listing",
                                "App Revenue"
                              )
                            : navigate()
                        }
                      >
                        <Box>
                          <img
                            src={
                              Images &&
                              Images.box3 &&
                              Images.box3.image3 &&
                              Images.box3.image3
                            }
                            className={classes.icons}
                          />
                        </Box>
                      </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Box>
                    <Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gridColumnGap: "5px",
                        }}
                      >
                        {title == "Stats" && <img src={mnr} height="20px" />}
                        <Typography sx={{ paddingLeft: "10px" }}>
                          {amount3}
                        </Typography>
                      </Box>
                      {title == "Stats" && <Typography>$ {amount7}</Typography>}
                    </Typography>
                    <Typography className={classes.text}>{tagline3}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid container style={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  {Images &&
                    Images.box4 &&
                    Images.box4.image4 &&
                    Images.box4.image4 && (
                      <div
                        className={classes.cardclryellow}
                        style={{ cursor: cursor4 }}
                        onClick={() =>
                          navigation(
                            "mln_listing",
                            "appearning_listing",
                            "App Earning"
                          )
                        }
                      >
                        <Box>
                          <img
                            src={
                              Images &&
                              Images.box4 &&
                              Images.box4.image4 &&
                              Images.box4.image4
                            }
                            className={classes.icons}
                          />
                        </Box>
                      </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Box>
                    <Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gridColumnGap: "5px",
                        }}
                      >
                        {title == "Stats" && <img src={mnr} height="20px" />}
                        <Typography sx={{ paddingLeft: "10px" }}>
                          {amount4}
                        </Typography>
                      </Box>
                      {title == "Stats" && <Typography>$ {amount8}</Typography>}
                    </Typography>
                    <Typography className={classes.text}>
                      {" "}
                      {tagline4}{" "}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
