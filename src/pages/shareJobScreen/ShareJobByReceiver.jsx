import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import useFetch from "react-fetch-hook";
import {
  Typography,
  makeStyles,
  Grid,
  Container,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import Logo from "../../assets/images/moonerNewLogo.png";
import Characters from "../../assets/svg/characters.svg";
import UserImage from "../../assets/images/profileTemp.jpg";
import CardbackgroundImage from "../../assets/svg/cardbackgroundImage.svg";
import GooglePlay from "../../assets/images/googleplay.png";
import AppleStore from "../../assets/images/applestore.png";
import { clearSnackbar, setSnackbar } from "../../utils/global.actions";
import BaseUrl, { baseURL } from "../../api/index";
import { useDispatch } from "react-redux";
// const mainTheme = createMuiTheme(themeOptions);
const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    marginTop: mainTheme.spacing(5),
    marginLeft: mainTheme.spacing(5),
    width: "70px",
    marginBottom: mainTheme.spacing(2.5),
  },
  left: {
    textAlign: "center",
    [mainTheme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  characters: {
    Height: "90%",
    width: "90%",
    [mainTheme.breakpoints.only("lg")]: {
      height: "80%",
      width: "80%",
    },
    [mainTheme.breakpoints.only("md")]: {
      height: "80%",
      width: "80%",
    },
  },
  Userimage: {
    display: "flex",
    justifyContent: "center",
    "& .UserimageWrapper": {
      borderRadius: "50%",
      width: "200px",
      height: "200px",
      backgroundSize: "cover",
      boxShadow: " 0 3px 6px 6px rgba(0,0,0,0.10)",
      backgroundRepeat: "no-repeat",
      [mainTheme.breakpoints.only("md")]: {
        width: "180px",
        height: "180px",
      },
      [mainTheme.breakpoints.down("xs")]: {
        width: "150px",
        height: "150px",
      },
    },
  },
  card: {
    // backgroundColor: "lightyellow",
    // backgroundImage: `url(${CardbackgroundImage})`,
    // backgroundRepeat: "no-repeat",
    width: "662px",
    height: "80%",
    marginTop: mainTheme.spacing(2),
    textAlign: "center",
    boxShadow: "1px 11px 55px rgba(0, 0, 0, 0.15)",
    [mainTheme.breakpoints.only("lg")]: {
      width: "662px",
      height: "100%",
    },
    [mainTheme.breakpoints.only("md")]: {
      width: "100%",
      height: "100%",
    },
    [mainTheme.breakpoints.only("sm")]: {
      width: "100%",
      height: "100%",
    },
    [mainTheme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100%",
    },
  },
  cardHeading: {
    fontSize: "40px",
    marginTop: mainTheme.spacing(5),
    [mainTheme.breakpoints.down("xs")]: {
      fontSize: "27px",
    },
  },
  cardwrapper: {
    [mainTheme.breakpoints.only("lg")]: {
      marginBottom: "5%",
    },
    [mainTheme.breakpoints.only("md")]: {
      marginBottom: "5%",
    },
    [mainTheme.breakpoints.only("sm")]: {
      marginBottom: "5%",
    },
    [mainTheme.breakpoints.down("xs")]: {
      marginBottom: "5%",
    },
  },
  form: {
    "& > *": {
      marginTop: mainTheme.spacing(2),
    },
  },
  singinConatiner: {
    marginTop: mainTheme.spacing(2),
  },
  field: {
    width: "80%",
    borderRadius: "24px",
    backgroundColor: "#EDEDED",
    marginBottom: mainTheme.spacing(1),
    fontSize: "14px",
    [mainTheme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  removeOutline: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        border: 0,
      },
      "&:hover fieldset": {
        border: 0,
      },
      "& fieldset": {
        border: 0,
      },
    },
  },
  rememberMe: {
    fontSize: "12px",
    lineHeight: "19px",
    [mainTheme.breakpoints.down("xs")]: {
      marginLeft: mainTheme.spacing(2),
    },
  },
  forgetPass: {
    fontSize: "12px",
    lineHeight: "19px",
    color: "red",
  },
  checkbox: {
    marginTop: mainTheme.spacing(-1.3),
  },
  button: {
    width: "80%",
    height: "60px",
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(5),
    // marginBottom: mainTheme.spacing(5),
  },
  links: {
    textDecoration: "none",
  },
  hideOnXs: {
    [mainTheme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  userName: {
    fontSize: "26px",
    lineHeight: "30px",
    letterSpacing: "0.1em",
    color: "#20253B",
    marginTop: mainTheme.spacing(2),
  },
  jobDes: {
    fontSize: "16px",
    lineHeight: "19px",
    textAlign: "center",
    letterSpacing: "0.2em",
    color: "#20253B",
    marginTop: mainTheme.spacing(2),
  },
  amount: {
    color: "#F3A198",
  },
  downloadinfo: {
    marginTop: mainTheme.spacing(8),
    fontSize: "16px",
    lineHeight: "19px",
    textAlign: "center",
    letterSpacing: "0.2em",
    color: "#20253B",
  },
  refCode: {
    marginTop: mainTheme.spacing(2),
    fontSize: "16px",
    lineHeight: "19px",
    textAlign: "center",
    letterSpacing: "0.2em",
    color: "#20253B",
  },
  moonerspan: {
    marginTop: mainTheme.spacing(8),
    color: "#FEE044",
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
  },
  linkbutton: { marginTop: mainTheme.spacing(4) },
  googleplayimg: {
    paddingLeft: mainTheme.spacing(18),
    [mainTheme.breakpoints.only("lg")]: {
      paddingLeft: mainTheme.spacing(15),
    },
    [mainTheme.breakpoints.only("md")]: {
      paddingLeft: mainTheme.spacing(6),
    },
    [mainTheme.breakpoints.only("sm")]: {
      paddingLeft: mainTheme.spacing(0),
    },
    [mainTheme.breakpoints.down("xs")]: {
      paddingLeft: mainTheme.spacing(0),
    },
  },
  applestoreimg: {
    paddingRight: mainTheme.spacing(18),
    [mainTheme.breakpoints.only("sm")]: {
      paddingRight: mainTheme.spacing(0),
    },
    // [mainTheme.breakpoints.only("lg")]: {
    //   paddingLeft: mainTheme.spacing(18),
    // },
    // [mainTheme.breakpoints.only("md")]: {
    //   paddingRight: mainTheme.spacing(10),
    // },
    [mainTheme.breakpoints.down("xs")]: {
      paddingRight: mainTheme.spacing(0),
    },
  },
  innercard: {
    backgroundSize: "contain",
    backgroundImage: `url(${CardbackgroundImage})`,
    backgroundRepeat: "no-repeat",
    // position: "relative",
    // left: "10%",
    // [mainTheme.breakpoints.only("lg")]: {
    //   left: "2%",
    // },
    // [mainTheme.breakpoints.only("md")]: {
    //   left: "0%",
    //   backgroundImage: "none",
    // },
    // [mainTheme.breakpoints.only("sm")]: {
    //   backgroundImage: "none",
    //   left: "25%",
    // },
    // [mainTheme.breakpoints.down("xs")]: {
    //   backgroundImage: "none",
    //   left: "0%",
    // },
  },
  cardcontent: {
    display: "flex",
    paddingTop: "30px",
    justifyContent: "center",

    // [mainTheme.breakpoints.down("xs")]: {
    //   display: "flex-root",
    // },
  },
}));

const ShareJobByReceiver = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  //("id", id);
  const { isLoading, data, error } = useFetch(
    `${baseURL}booking/job_booking_detail/${id}`
  );
  //("datadata", data && data.data);

  useEffect(() => {
    dispatch(clearSnackbar());
    if (error !== undefined) {
      dispatch(setSnackbar(error.message, "error"));
      //("datadata", data);
    }
  }, []);
  if (data === undefined || data.data === undefined) {
    return 0;
  }
  const dataJob = data.data[0];
  //("dataJob", dataJob);
  var images = dataJob && dataJob.sp_image ? dataJob.sp_image : UserImage;
  return (
    <Container maxWidth="xl">
      <div className={classes.root}>
        <Grid item xs={12}>
          <img src={Logo} className={classes.logo} />
        </Grid>
        <Grid container spacing={3} className={classes.singinConatiner}>
          <Grid item xs={6} className={classes.left}>
            <img src={Characters} className={classes.characters} />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            className={classes.cardwrapper}
          >
            <Card className={classes.card}>
              <div className={classes.innercard}>
                <div className={classes.cardcontent}>
                  <CardContent>
                    <div className={classes.Userimage}>
                      <div
                        className="UserimageWrapper"
                        style={{ backgroundImage: `url(${images})` }}
                      ></div>
                    </div>
                    <Typography className={classes.userName}>
                      {dataJob && dataJob.sp_name}
                    </Typography>
                    <Typography className={classes.jobDes}>
                      Just completed a job as <br />
                      {dataJob && dataJob.category_name}:{" "}
                      <span className={classes.amount}>
                        ${dataJob && dataJob.budget}
                      </span>
                    </Typography>

                    <Typography className={classes.refCode}>
                      Use My Referral Code To Join:
                    </Typography>

                    <Typography className={classes.amount}>
                      {dataJob && dataJob?.referral_code}
                    </Typography>

                    <Typography className={classes.downloadinfo}>
                      Download{" "}
                      <span className={classes.moonerspan}>Mooner</span> app
                      here :
                    </Typography>
                    <Grid
                      container
                      className={classes.linkbutton}
                      // style={{ backgroundColor: "lightgrey" }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        className={classes.googleplayimg}
                      >
                        <a
                          href="https://play.google.com/store/apps/details?id=com.app.mooner"
                          target="blank"
                        >
                          {" "}
                          <img
                            src={GooglePlay}
                            alt="No Link"
                            width="155px"
                            height="60px"
                          />
                        </a>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        className={classes.applestoreimg}
                      >
                        <a
                          href="https://apps.apple.com/pk/app/mooner/id1554244768"
                          target="blank"
                        >
                          <img
                            src={AppleStore}
                            alt="No Link"
                            width="155px"
                            height="60px"
                          />
                        </a>
                      </Grid>
                    </Grid>
                  </CardContent>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
export default ShareJobByReceiver;
