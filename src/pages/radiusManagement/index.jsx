import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Grid, Button } from "@material-ui/core";
import ShortDistanceCard from "../../common/radiusManagementCards/ShortDistanceCard";
import LongDistanceCard from "../../common/radiusManagementCards/LongDistanceCard";
import ArrowDown from '../../assets/svg/arrowDown.svg'

const useStyles = makeStyles((mainTheme) => ({
  headerWrapper: {
    marginTop: mainTheme.spacing(4),
    marginBottom: mainTheme.spacing(4),
  },
  title: {
    fontSize: "22px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#000000",
    marginLeft: "7px",
    fontWeight: "600",
    [mainTheme.breakpoints.down("lg")]: {
      fontSize: "18px",
    },
    [mainTheme.breakpoints.down("xs")]: {
      marginBottom: mainTheme.spacing(4),
      textAlign: "center",
      fontSize: "18px",
    },
  },
  btn: {
    width: "auto",
    height: "60px",
    borderRadius: "24px",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "Capitalize",
    float: "right",
    [mainTheme.breakpoints.down("lg")]: {
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.down("xs")]: {
      marginRight: mainTheme.spacing(6),
      marginBottom: mainTheme.spacing(4),
    },
  },
  CardWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const RadiusManagement = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleRadiusManagement = () => {
    history.push({
      pathname: "/mooner/details/radius_management_list",
    });
  }
  return (
    <Container maxWidth="xl">
      <Grid container className={classes.headerWrapper}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Typography className={classes.title}>
            Radius Management
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.btn}
            onClick={handleRadiusManagement}
          >
            View Radius
          </Button>
        </Grid>
      </Grid>
      <div className={classes.CardWrapper}>
        <ShortDistanceCard
            title="SP to SS"
            subtitle="Radius Defined"
            distance="5km"
            btnText="Edit"
        />
        <LongDistanceCard 
            title="SP to SS"
            subtitle="Radius Defined"
            distance="Whole Country"
            icon={ArrowDown}
            btnText="Edit"
        />
      </div>
    </Container>
  );
};

export default RadiusManagement;
