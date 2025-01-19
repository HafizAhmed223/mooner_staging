import { Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ActiveService from "./ActiveService";
import ActiveCab from "./ActiveCab";
import ActiveHitch from "./ActiveHitch";

const useStyles = makeStyles((mainTheme) => ({
  container: {
    position: "absolute",
    backgroundColor: "#fff",
  },
  collapse: {},
  paper: {
    margin: mainTheme.spacing(0),
  },
  actionContent: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  FlexWrapper: {
    display: "flex",
    padding: mainTheme.spacing(0.5),
  },
  actionImage: {
    cursor: "pointer",
  },
  links: {
    textDecoration: "none",
  },
  actionsLabel: {
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    color: "#20253B",
    marginLeft: mainTheme.spacing(2),
    cursor: "pointer",
  },
  header: {
    display: "flex",
  },
  title: {
    marginTop: mainTheme.spacing(7),
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#20253B",
    fontWeight: "600",
    [mainTheme.breakpoints.only("xl")]: {
      marginLeft: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.down("lg")]: {
      fontSize: "18px",
      lineHeight: "28px",
      letterSpacing: "0.2em",
      color: "#20253B",
      fontWeight: "600",
      marginTop: mainTheme.spacing(7.6),
      marginLeft: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  managecategory: {
    float: "right",
    width: "36%",
    height: "60px",
    borderRadius: "24px",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(4),
    marginBottom: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
      width: "60%",
      height: "50px",
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.down("md")]: {
      width: "60%",
      height: "50px",
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.down("xs")]: {
      marginRight: mainTheme.spacing(4),
      width: "80%",
      height: "50px",
      borderRadius: "10px",
    },
  },
  button: {
    float: "right",
    width: "20%",
    height: "55px",
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    [mainTheme.breakpoints.only("lg")]: {
      width: "30%",
      height: "50px",
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.down("md")]: {
      width: "22%",
      height: "50px",
      borderRadius: "10px",
      marginTop: mainTheme.spacing(2),
      marginBottom: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.only("sm")]: {
      width: "32%",
      height: "50px",
      borderRadius: "10px",
      marginTop: mainTheme.spacing(2),
      marginBottom: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.down("xs")]: {
      marginRight: mainTheme.spacing(4),
      width: "80%",
      height: "50px",
      borderRadius: "10px",
    },
  },
  viewkyc: {
    [mainTheme.breakpoints.down("xl")]: {
      marginRight: "10px",
    },
    [mainTheme.breakpoints.down("sm")]: {
      marginRight: "30px",
    },
  },
}));

const ActiveUser = () => {
  const classes = useStyles();
  const [activeButton, setActiveButton] = useState(null);

  
    const openActiveCabBookings = () => {
    setActiveButton("Cab");
    // console.log("cab clicked")
  };
  const openActiveHitchBookings = () => {
    setActiveButton("Hitch");
    // console.log("hitch clicked")
  };

  const activeServiceBooking = () => {
    setActiveButton("Services");
  };

  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={5}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.managecategory}
            onClick={openActiveCabBookings}
          >
            Cab
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={5}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.managecategory}
            onClick={openActiveHitchBookings}
          >
            Hitch
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={5}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.managecategory}
            onClick={activeServiceBooking}
          >
            Services
          </Button>
        </Grid>
      </Grid>

      {activeButton === "Cab" && <ActiveCab />}
      {activeButton === "Hitch" && <ActiveHitch />}
      {activeButton === "Services" && <ActiveService />}
    </Container>
  );
};
export default ActiveUser;