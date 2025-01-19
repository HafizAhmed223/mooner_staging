import React from "react";
import { NavLink } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Typography,
  makeStyles,
  Grid,
  Container,
  Card,
  CardContent,
  Button,
  Avatar,
  ButtonGroup,
} from "@material-ui/core";
import { connect } from "react-redux";
// import { loginUserAction } from "../../redux/actions/auth/auth.action";
import Logo from "../../assets/images/moonerNewLogo.png";
import Characters from "../../assets/svg/characters.svg";
import UserImage from "../../assets/svg/UserImage.svg";
import CardbackgroundImage from "../../assets/svg/cardbackgroundImage.svg";
import MailIcon from "../../assets/svg/mailicon.svg";
import Whatsapp from "../../assets/svg/whatsapp.svg";
import Twitter from "../../assets/svg/twitter.svg";
import Facebook from "../../assets/svg/facebook.svg";
import More from "../../assets/svg/more.svg";

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
  userImage: {
    borderRadius: "50%",
    boxShadow: " 0 3px 6px 6px rgba(0,0,0,0.10)",
    [mainTheme.breakpoints.only("lg")]: {},
    [mainTheme.breakpoints.only("md")]: {},
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
    backgroundImage: `url(${CardbackgroundImage})`,
    backgroundRepeat: "no-repeat",
    position: "relative",
    left: "10%",
    [mainTheme.breakpoints.only("lg")]: {
      left: "2%",
    },
    [mainTheme.breakpoints.only("md")]: {
      left: "0%",
      backgroundImage: "none",
    },
    [mainTheme.breakpoints.only("sm")]: {
      backgroundImage: "none",
      left: "25%",
    },
    [mainTheme.breakpoints.down("xs")]: {
      backgroundImage: "none",
      left: "0%",
    },
  },
  cardcontent: {
    display: "flex",
    paddingTop: "30px",
    justifyContent: "center",
  },
  socialLinks: {
    marginTop: mainTheme.spacing(2),
    display: "flex",
    justifyContent: "center",
    "& img": {
      marginLeft: "17px",
    },
    "& img:first-child": {
      marginLeft: "0",
    },
  },
  buttonGroupShare: {
    marginTop: mainTheme.spacing(2),
    backgroundColor: "#F9F9FF",
    height: "62px",
    "& .linkShareButton": {
      borderRadiusTopRight: "8px",
      border: "none",
      backgroundColor: "#F9F9FF",

      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
      color: "#9E6DC9",
    },
    "& .copyLinkButton": {
      boxSizing: "border-box",
      backgroundColor: "#F9F9FF",
      border: "1px solid rgba(0, 0, 0, 0.2)",
      borderRadius: "8px",

      fontSize: "16px",
      lineHeight: "19px",
      color: "#20253B",
    },
  },
}));

const ShareJobFromSender = () => {
  const classes = useStyles();
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
                    <img src={UserImage} className={classes.userImage} />
                    <Typography className={classes.jobDes}>
                      Just completed a job: {""}
                      <span className={classes.amount}>$450</span>
                    </Typography>
                    <Typography className={classes.downloadinfo}>
                      Share your achievement with <br />
                      your friends
                    </Typography>

                    <div className={classes.socialLinks}>
                      <img src={Facebook} />

                      <img src={MailIcon} />

                      <img src={Twitter} />

                      <img src={Whatsapp} />

                      <img src={More} />
                    </div>
                    <Typography className={classes.jobDes}>or</Typography>
                    <ButtonGroup className={classes.buttonGroupShare}>
                      <Button className="linkShareButton">
                        Sre123456gfsw2e
                      </Button>
                      <Button className="copyLinkButton">Copy link</Button>
                    </ButtonGroup>
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

export default ShareJobFromSender;
