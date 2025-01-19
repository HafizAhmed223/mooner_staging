import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Grid, Button } from "@material-ui/core";
import FreeCancellationCard from "../../common/cancellationManagementCards/FreeCancellationCard";
import ValueDistributionCard from "../../common/cancellationManagementCards/ValueDistributionCard";

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

const CancellationManagement = () => {
  const classes = useStyles();

  const history = useHistory();
  const handleCancellationList = () => {
    history.push({
      pathname: "/mooner/details/cancellation_management_list",
    });
  };
  return (
    <Container maxWidth="xl">
      <Grid container className={classes.headerWrapper}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Typography className={classes.title}>
            Cancellation Management
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{marginTop: "inherit"}}>
          <Button
          className=""
            variant="contained"
            color="secondary"
            size="large"
            className={classes.btn}
            onClick={handleCancellationList}
          >
            View Cancellation Records
          </Button>
        </Grid>
      </Grid>
      <div className={classes.CardWrapper}>
        <FreeCancellationCard
          title=" Free Cancellation Card"
          time="00 : 30 : 00"
          details="Hr  Mins  Sec"
          btnText="Edit"
        />
        <ValueDistributionCard
          title=" Value Distribution"
          title2="Service Provider Get"
          spAmount="5%"
          title3="Service Seeker Get"
          ssAmount="5%"
          cancellationFee="Collected Cancellation Fee"
          btnText="Edit"
        />
      </div>
    </Container>
  );
};

export default CancellationManagement;
