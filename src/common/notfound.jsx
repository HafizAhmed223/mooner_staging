import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import NotFoundSVG from "../assets/svg/notFound.svg";
import { connect } from "react-redux";
// import { themeOptions } from '../utils/theme'

const useStyles = makeStyles((mainTheme) => ({
  rootContainer: {
    flexGrow: 1,
    padding: mainTheme.spacing(0),
    backgroundColor:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.secondary &&
      mainTheme.palette.secondary.main,
    borderRadius: "30px",
    marginLeft: mainTheme.spacing(0),
    marginTop: mainTheme.spacing(1),
    width: "100%",
    [mainTheme.breakpoints.only("lg")]: {
      borderRadius: "15px",
      marginLeft: mainTheme.spacing(-1),
    },
    [mainTheme.breakpoints.only("md")]: {
      borderRadius: "20px 20px 20px 20px",
      width: "98%",
      marginLeft: mainTheme.spacing(0),
      marginTop: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.only("sm")]: {
      borderRadius: "20px 20px 20px 20px",
      width: "97%",
      marginLeft: mainTheme.spacing(0.5),
      marginTop: mainTheme.spacing(1.5),
    },
    [mainTheme.breakpoints.only("xs")]: {
      display: "none",
    },
  },

  NoticeWrapper: {
    // marginTop: mainTheme.spacing(9),
    width: "90%",
    margin: "0 auto",
    display: "flex",
    [mainTheme.breakpoints.only("lg")]: {
      height: "200px",
    },
  },

  noticeContent: {
    display: "flex",
    flexDirection: "row",
  },
  NoticeContainerTitle: {
    animation: "lightSpeedInRight",
    animationDuration: "2s",
    [mainTheme.breakpoints.only("lg")]: {
      marginTop: "0px",
    },
  },
  image: {
    maxWidth: "126%",
    paddingTop: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
      paddingTop: mainTheme.spacing(12.9),
    },
  },
  discription: {
    fontSize: mainTheme.spacing(2),
    marginTop: mainTheme.spacing(2),
  },
}));

const GreatingCard = ({ name }) => {
  const classes = useStyles();
  //("name", name);
  return (
    <div>
      <Grid Container className={classes.rootContainer}>
        <div className={classes.NoticeWrapper}>
          <Grid
            item
            xs={8}
            lg={9}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Typography className={classes.NoticeContainerTitle}>
              Hey {name}!
            </Typography>
          </Grid>
          <Grid item xs={4} lg={3}>
            <div style={{ maxWidth: "100%", height: "100%" }}>
              <img src={NotFoundSVG} className={classes.image} />
            </div>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    name: auth.user.username,
  };
};
export default connect(mapStateToProps)(GreatingCard);
