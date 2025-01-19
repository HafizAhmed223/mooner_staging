import React from "react";
import { Grid, Typography, makeStyles, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((mainTheme) => ({
    root: {
      flexGrow: 1,
      marginTop: mainTheme.spacing(6),
      marginBottom: mainTheme.spacing(5),
    },
    addNewBtn: {
        marginLeft: mainTheme.spacing(2),
        width: "100px",
        height: "95px",
        backgroundColor:
        mainTheme &&
        mainTheme.palette &&
        mainTheme.palette.secondary &&
        mainTheme.palette.secondary.main,
        borderRadius: "30px",
        boxShadow: " 0px 10px 10px rgba(32, 37, 59, 0.15)",
        cursor: 'pointer'
    },
    iconWrapper: {
      textAlign: "center",
    },
    typogrid: {
      textAlign: "center",
      marginLeft: "15px",
      marginTop: "3px",
      color: "#000000",
      fontSize: "14px",
      fontWeight: '300',
      lineHeight: "22px",
      fontWeight: '600'
    },
    title: {
      fontSize: "24px",
      lineHeight: "28px",
      letterSpacing: "0.2em",
      color: "#000000",
      opacity: '0.5',
      marginLeft: mainTheme.spacing(2),
      marginRight: "7px",
      fontWeight: '700',
      cursor: 'pointer',
      [mainTheme.breakpoints.only("xs")]:{
        fontSize: "18px",
        lineHeight: "28px",
        letterSpacing: "0.1em",
      },
    },
    title2: {
      fontSize: "24px",
      lineHeight: "28px",
      letterSpacing: "0.2em",
      color: "#000000",
      marginLeft: "7px",
      fontWeight: '700',
      [mainTheme.breakpoints.only("xs")]:{
        fontSize: "18px",
        lineHeight: "28px",
        letterSpacing: "0.1em",
      },
    },
    categoryHeading: {
      marginBottom: mainTheme.spacing(5),
      display: "flex",
      [mainTheme.breakpoints.only("xs")]:{
        alignItems: 'center',
        flexDirection: 'column',
      },
    },
    typodiv: {
      marginTop: "15px",
    },
    typography:{
      fontSize: "20px",
      fontWeight: 'bold',
      position: 'relative',
      top: '33px',
    }
}));

const Marchantdise = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleAddItems = () => {
    history.push({
      pathname: "/mooner/add_items",
    });
  };
  const handleOrders = () => {
    history.push({
    //   pathname: "/mooner/details/popup",
    });
  };
   const handlePrevious = () => {
    history.push({
          pathname: "/mooner/details/merchandise_store_management",
        });
    }

  return (
    <>
      <div className={classes.root}>
        <Grid item className={classes.categoryHeading}>
          <Typography className={classes.title} onClick={handlePrevious}> Merchandise Store Management </Typography>
          <ArrowRightIcon />
          <Typography className={classes.title2}> Types </Typography>
        </Grid>

        <Grid container spacing={3}>
          <Grid item onClick={handleAddItems}>
            <div className={classes.addNewBtn}>
              <Box className={classes.iconWrapper}>
                <Typography className={classes.typography}>
                    Al
                </Typography>
              </Box>
            </div>
            <div className={classes.typodiv}>
              <Typography className={classes.typogrid}>Add Items</Typography>
            </div>
          </Grid>
          <Grid item onClick={handleOrders}>
            <div className={classes.addNewBtn}>
              <Box className={classes.iconWrapper}>
                <Typography className={classes.typography}>
                  P
                </Typography>
              </Box>
            </div>
            <div className={classes.typodiv}>
              <Typography className={classes.typogrid}> Order History </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default Marchantdise;
