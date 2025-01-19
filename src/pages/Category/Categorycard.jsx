import React from "react";
import { makeStyles, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router";
const useStyles = makeStyles((mainTheme) => ({
  awardContainer: {
    // marginTop: mainTheme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  awardContent: {
    // paddingTop: "35px",
    // marginTop: mainTheme.spacing(4),
    borderRadius: "24px",
    width: "90%",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#FCA19E",
    boxShadow: " 0px 10px 10px rgba(32, 37, 59, 0.15)",
  },
  awardDiscription: {
    marginTop: mainTheme.spacing(5),
    marginBottom: mainTheme.spacing(10),
    fontSize: "24px",
    lineHeight: "28px",
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
    textAlign: "center",
    // padding: mainTheme.spacing(1),
  },
  createBtn: {
    width: "60%",
    height: "50px",
    borderRadius: "20px",
    fontSize: "15px",
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(0),
    marginBottom: mainTheme.spacing(4),
  },
}));

const Categorycard = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleClick = () => {
    history.push({
      pathname: "/mooner/details/create_category",
    });
  };
  return (
    <>
      <div className={classes.awardContainer}>
        <div className={classes.awardContent}>
          <Typography className={classes.awardDiscription}>
            Add Category <br /> or Sub Category
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.createBtn}
            onClick={handleClick}
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
};
export default Categorycard;
