import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Brightness from "../assets/svg/topbarBrightness.svg";
import Notifications from "../assets/svg/topbarNotifications.svg";
import Profile from "../assets/svg/profile.svg";
import Slash from "../assets/svg/slash.svg";
import { useHistory } from "react-router";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F0F3F8",
    marginLeft: mainTheme.spacing(0),
    [mainTheme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  topbarContainer: {
    display: "flex",
  },
  novigatorContent: {
    display: "flex",
  },
  previous: {
    marginTop: mainTheme.spacing(5),
    marginLeft: mainTheme.spacing(2),
    cursor: "pointer",
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color:
      mainTheme && mainTheme.palette && mainTheme.palette.primary && mainTheme.palette.primary.main,
    opacity: 0.5,
    fontWeight: "700",
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "18px",
      marginLeft: mainTheme.spacing(3),
    },
    [mainTheme.breakpoints.only("md")]: {
      fontSize: "18px",
      marginLeft: mainTheme.spacing(3),
    },
    [mainTheme.breakpoints.only("sm")]: {
      fontSize: "18px",
      marginLeft: mainTheme.spacing(1.5),
    },
    [mainTheme.breakpoints.only("xs")]: {
      fontSize: "15px",
    },
  },
  slash: {
    marginLeft: mainTheme.spacing(1.5),
    marginRight: mainTheme.spacing(1.5),
    marginTop: mainTheme.spacing(5),
  },
  crrent: {
    marginTop: mainTheme.spacing(5),
    marginLeft: mainTheme.spacing(1),
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    fontWeight: "700",
    color:
      mainTheme && mainTheme.palette && mainTheme.palette.primary && mainTheme.palette.primary.main,
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "18px",
    },
    [mainTheme.breakpoints.only("md")]: {
      fontSize: "18px",
      marginLeft: mainTheme.spacing(3),
    },
    [mainTheme.breakpoints.only("sm")]: {
      fontSize: "18px",
      marginLeft: mainTheme.spacing(1.5),
    },
    [mainTheme.breakpoints.only("xs")]: {
      fontSize: "15px",
    },
  },
  headerIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: mainTheme.spacing(6),
    paddingLeft: mainTheme.spacing(2),
  },
  rightBarIcon: {
    height: "25px",
    width: "25px",
    cursor: "pointer",
  },
  profile: {},
  profileContainer: {
    [mainTheme.breakpoints.only("lg")]: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
  },
  ProfileWrapper: {
    marginTop: mainTheme.spacing(4),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
  },
  userName: {
    fontSize: "18px",
  },
  userRole: {
    fontSize: "10px",
    marginLeft: mainTheme.spacing(5),
  },
  ProfileImage: {
    height: "80px",
    width: "80px",
    marginLeft: mainTheme.spacing(2),
  },
  removeSpace: {
    [mainTheme.breakpoints.only("sm")]: {
      display: "none",
    },
    [mainTheme.breakpoints.only("lg")]: {
      display: "none",
    },
  },
  novigatorContentResponsive: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [mainTheme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Topbar = ({ module, item, bckLink }) => {
  const history = useHistory();
  const classes = useStyles();
  const handleClick = () => {
    history.push({
      pathname: bckLink,
    });
  };
  return (
    // <Container maxWidth="xl">
    <>
      <div className={classes.novigatorContentResponsive}>
        <Typography className={classes.previous} onClick={handleClick}>
          {module}
        </Typography>
        <img src={Slash} className={classes.slash} />
        <Typography className={classes.crrent}>{item}</Typography>
      </div>
      <div className={classes.root}>
        <Grid Container spacing={2} className={classes.topbarContainer}>
          <Grid item xs={12} sm={12} md={12} lg={7} xl={8} className={classes.naigators}>
            <div className={classes.novigatorContent}>
              <Typography className={classes.previous} onClick={handleClick}>
                {module}
              </Typography>
              <img src={Slash} className={classes.slash} />
              <Typography className={classes.crrent}>{item}</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={10} lg={5} xl={4} className={classes.profile}>
            <Grid item container spacing={2} className={classes.mainContent}>
              <Grid item xs={4} sm={4} md={4} lg={2} xl={2}>
                <div className={classes.headerIcon}>
                  <img src={Brightness} className={classes.rightBarIcon} alt="Brightness" />
                  <img src={Notifications} className={classes.rightBarIcon} alt="Notifications" />
                </div>
              </Grid>
              <Grid item xs={1} className={classes.removeSpace}></Grid>
              <Grid item xs={7} sm={8} md={7} lg={9} xl={9} className={classes.profileContainer}>
                <div className={classes.ProfileWrapper}>
                  <div className={classes.userInfo}>
                    <Typography className={classes.userName}>Anna Gilbert</Typography>
                    <Typography className={classes.userRole}>Master Admin</Typography>
                  </div>
                  <div className={classes.ProfileImageWrapper}>
                    <img src={Profile} className={classes.ProfileImage} />
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
    // </Container>
  );
};

export default Topbar;
