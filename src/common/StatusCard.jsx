import React from "react";
import {
  makeStyles,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core";

import Active from "../assets/svg/active.svg";
import InActive from "../assets/svg/inactive.svg";
import Pending from "../assets/svg/panding.svg";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    maxWidth: "98%",
    zIndex: "-1",
    borderRadius: mainTheme.spacing(3),
    marginTop: mainTheme.spacing(12),
    marginBottom: mainTheme.spacing(3),
    marginLeft: mainTheme.spacing(2),
    boxShadow: "0px 10px 10px rgba(32, 37, 59, 0.1)",
    [mainTheme.breakpoints.only("lg")]:{
      borderRadius: mainTheme.spacing(1.6),
    },
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginTop: mainTheme.spacing(1),
    marginBottom: mainTheme.spacing(1),
    [mainTheme.breakpoints.only("lg")]:{
      height: '12px',
      width: '12px',
    }
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: "13px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#000000",
  },
}));

const StatusCard = () => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Grid Container spacing={2} className={classes.cardContainer}>
            <Grid item xs={2}>
              <div className={classes.iconContainer}>
                <img src={Active} className={classes.icon} />
                <img src={Pending} className={classes.icon} />
                <br />
                <img src={InActive} className={classes.icon} />
              </div>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={9}>
              <div className={classes.textContainer}>
                <Typography className={classes.text}>
                  Completed
                </Typography>
                <Typography className={classes.text}>
                  Underprocess/ On Going
                </Typography>
                <Typography className={classes.text}>
                  Cancelled
                </Typography>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
export default StatusCard;
