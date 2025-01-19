import React from "react";
import { Grid, Typography, makeStyles, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useHistory } from "react-router-dom";
const Createcategory = () => {
  const useStyles = makeStyles((mainTheme) => ({
    root: {
      flexGrow: 1,
      marginTop: mainTheme.spacing(6),
      marginBottom: mainTheme.spacing(5),
    },
    addNewBtn: {
      width: "109px",
      height: "107px",
      backgroundColor:
        mainTheme &&
        mainTheme.palette &&
        mainTheme.palette.secondary &&
        mainTheme.palette.secondary.main,
      borderRadius: "35%",
      boxShadow: " 0px 10px 10px rgba(32, 37, 59, 0.15)",
    },
    iconWrapper: {
      textAlign: "center",
    },
    typogrid: {
      textAlign: "center",
      marginLeft: "5px",
      marginTop: "3px",
      color: "#000000",
      fontSize: "14px",
      fontWeight: "300",
      lineHeight: "22px",
    },
    title: {
      fontSize: "24px",
      lineHeight: "28px",
      letterSpacing: "0.2em",
      color: "#696969",
      marginRight: "7px",
      cursor: "pointer",
    },
    title2: {
      fontSize: "24px",
      lineHeight: "28px",
      letterSpacing: "0.2em",
      color: "#000000",
      marginLeft: "7px",
    },
    categoryHeading: {
      marginBottom: mainTheme.spacing(5),
      display: "flex",
      //   direction: "row",
    },
    typodiv: {
      marginTop: "15px",
    },
  }));
  const classes = useStyles();
  const history = useHistory();
  const addnewcatHandle = () => {
    history.push({
      pathname: "/mooner/addnew_category",
    });
  };
  const categoryHandle = () => {
    history.push({
      pathname: "/mooner/details/categories",
    });
  };

  return (
    <>
      <div className={classes.root}>
        <Grid item className={classes.categoryHeading}>
          <Typography className={classes.title} onClick={categoryHandle}>
            {" "}
            Category{" "}
          </Typography>
          <ArrowRightIcon />
          <Typography className={classes.title2}>Create Category </Typography>
        </Grid>

        <Grid container spacing={3}>
          <Grid item onClick={addnewcatHandle}>
            <div className={classes.addNewBtn}>
              <Box className={classes.iconWrapper}>
                <AddIcon
                  style={{
                    fontSize: "35px",
                    fontWeight: "bold",
                    marginTop: "40px",
                  }}
                />
              </Box>
            </div>
            <div className={classes.typodiv}>
              <Typography className={classes.typogrid}>Add new</Typography>
              <Typography className={classes.typogrid}>Category</Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default Createcategory;
