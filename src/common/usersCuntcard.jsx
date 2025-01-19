import React, { useEffect } from "react";
import {
  makeStyles,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router";

import Ellipse1 from "../assets/svg/Ellipse1.svg";
import Ellipse2 from "../assets/svg/Ellipse2.svg";
import Ellipse3 from "../assets/svg/Ellipse3.svg";
import axios from "axios";
import { baseURL } from "../api";
import { useState } from "react";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    maxWidth: "100%",
    borderRadius: mainTheme.spacing(5),
    boxShadow: "0px 10px 10px rgba(32, 37, 59, 0.1)",
  },
  count: {
    fontSize: "64px",
    lineHeight: "75px",
    fontWeight: "600",
    textAlign: "center",
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
    marginTop: mainTheme.spacing(1),
    marginBottom: mainTheme.spacing(2),
  },
  user: {
    fontSize: "16px",
    lineHeight: "19px",
    textAlign: "center",
    letterSpacing: "0.2em",
    fontWeight: 700,
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
    opacity: 0.7,
  },
  Createnotification: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationContent: {
    marginTop: mainTheme.spacing(2),
    borderRadius: "24px",
    width: "90%",
    Height: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EE786C",
  },
  discription: {
    marginTop: mainTheme.spacing(3),
    marginBottom: mainTheme.spacing(3),
    fontSize: "16px",
    lineHeight: "19px",
    textAlign: "center",
    letterSpacing: "0.2em",
    color: "#FFFFFF",
    padding: mainTheme.spacing(1),
  },
  button: {
    width: "70%",
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(0),
    marginBottom: mainTheme.spacing(4),
  },
  actionWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  teamMemberContainer: {
    marginLeft: mainTheme.spacing(9),
    marginBottom: mainTheme.spacing(3),
  },
  teamMedia: {
    width: "90%",
    borderRadius: "24px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mediaO: {
    height: "50px",
    width: "50px",
    borderRadius: "50px",
  },
  mediaT: {
    height: "50px",
    width: "50px",
    borderRadius: "50px",
    position: "relative",
    right: "15px",
  },
  mediaF: {
    right: "30px",
  },
  mediaS: {
    right: "45px",
  },

  mediaMT: {
    height: "50px",
    width: "50px",
    borderRadius: "50px",
    position: "relative",
    right: "45px",
    backgroundColor:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.secondary &&
      mainTheme.palette.secondary.main,
  },
  addMember: {
    color: "#fff",
    marginLeft: mainTheme.spacing(3),
    paddingRight: mainTheme.spacing(4),
    marginTop: mainTheme.spacing(2),
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  number: {
    marginLeft: mainTheme.spacing(0.5),
  },
  adminImage: {
    height: "50px",
    width: "50px",
  },
  awardContainer: {
    // marginTop: mainTheme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  awardContent: {
    marginTop: mainTheme.spacing(4),
    borderRadius: "24px",
    width: "90%",
    Height: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCA19E",
    boxShadow: " 0px 10px 10px rgba(32, 37, 59, 0.15)",
    marginBottom: mainTheme.spacing(3),
  },
  awardDiscription: {
    marginTop: mainTheme.spacing(3),
    marginBottom: mainTheme.spacing(3),
    fontSize: "24px",
    lineHeight: "28px",
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
    textAlign: "center",
    padding: mainTheme.spacing(1),
  },
  editBtn: {
    width: "60%",
    // height: '50px',
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(0),
    marginBottom: mainTheme.spacing(4),
  },
}));

const UserCountCard = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleClick = () => {
    history.push({
      pathname: "/mooner/create_notification",
    });
  };

  const [count, setCount] = useState(0);
  const token = localStorage.getItem("authToken");

  const getCount = async () => {
    try {
      const res = await axios.get(`${baseURL}account/total_users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      //("Count", res?.data?.data);
      setCount(res?.data?.data);
    } catch (err) {
      //("err", err);
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.count}
            color="textSecondary"
            gutterBottom
          >
            {count}
          </Typography>
          <Typography className={classes.user}>Users</Typography>
          <div className={classes.Createnotification}>
            <div className={classes.notificationContent}>
              <Typography className={classes.discription}>
                Create noticication for users to keep them updated!
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                onClick={handleClick}
              >
                Create
              </Button>
            </div>
          </div>
        </CardContent>
        <CardActions className={classes.actionWrapper}>
          <div className={classes.teamMemberContainer}>
            <div className={classes.teamMedia}>
              <div className={classes.mediaO}>
                <img src={Ellipse1} className={classes.adminImage} />
              </div>
              <div className={classes.mediaT}>
                <img src={Ellipse3} className={classes.adminImage} />
              </div>
              <div className={`${classes.mediaT} ${classes.mediaF}`}>
                <img src={Ellipse2} className={classes.adminImage} />
              </div>

              <div className={classes.mediaMT}>
                <Typography className={classes.addMember}>
                  4.2k <span className={classes.number}> + </span>
                </Typography>
              </div>
            </div>
          </div>
        </CardActions>
      </Card>
      <div className={classes.awardContainer}>
        <div className={classes.awardContent}>
          <Typography className={classes.awardDiscription}>
            Awards Incentives <br /> & Awards Fiat
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.editBtn}
          >
            Edit
          </Button>
        </div>
      </div>
    </>
  );
};
export default UserCountCard;
