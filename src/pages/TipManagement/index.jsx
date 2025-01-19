import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
    Grid,
    makeStyles,
    Typography,
    Container,
    Button,
} from "@material-ui/core";
import BudgetCard from "../../common/MNRCared/BudgetCard";
import CurrencyCard from "../../common/MNRCared/CurrencyConvertCard";
import Active from "../../assets/svg/green.svg";
import Exchange from "../../assets/svg/exchange.svg";

const useStyles = makeStyles((mainTheme) => ({
  header: {
    display: "flex",
  },
  categoryHeading: {
    marginTop: mainTheme.spacing(6),
    display: "flex",
  },
  title2: {
    fontSize: "22px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#000000",
    marginLeft: "7px",
    fontWeight: '600',
    [mainTheme.breakpoints.only("lg")]:{
      fontSize: "18px",
      marginLeft: "2px",
    },
  },
  registertypo: {
    color: "#20253B",
    fontWeight: "600",
    fontSize: "20px",
    letterSpacing: "0.2em",
    marginTop: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
        fontSize: '14px',
    }
  },
  rightGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  [mainTheme.breakpoints.only("xs")]: {
    justifyContent: "center",
  }
  },
  managecategory: {
    width: "40%",
    height: "55px",
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    marginLeft: mainTheme.spacing(6),
    marginTop: mainTheme.spacing(5),
    marginBottom: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]:{
      width: "60%",
      height: "50px",
      marginLeft: mainTheme.spacing(3),
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.only("md")]:{
      width: "32%",
      height: "50px",
      marginLeft: mainTheme.spacing(3),
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.only("sm")]:{
      width: "52%",
      height: "50px",
      marginLeft: mainTheme.spacing(3),
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.down("xs")]:{
      width: "60%",
      height: "50px",
      marginLeft: mainTheme.spacing(0),
      borderRadius: "10px",
    },
  },
  CardWrapper: {
    display: "flex",
    flexWrap: "wrap",
    [mainTheme.breakpoints.only("xs")]:{
      justifyContent: 'center',
    }
  },
}));

const TipsManagement = (props) => {
    const classes = useStyles();
    const history = useHistory();
  
  const handleClick = () => {
    history.push({
      pathname: "/mooner/tips_management_records",
    });
  }

  return (
    <Container maxWidth="xl">
        <Grid container className={classes.header}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.categoryHeading}>
            <Typography className={classes.title2}>
              Tips Management
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            className={classes.rightGrid}
          >
            <Button 
                variant="contained"
                color="secondary"
                size="large"
                className={classes.managecategory}
                onClick={handleClick}
            >
                View Tips Records
            </Button>
          </Grid>
        </Grid>
        <div className={classes.CardWrapper}>
            <BudgetCard
                title="1%"
                subtitle="Tip Preset Value"
                btnText="Edit"
            />
            <CurrencyCard
              title="Tip Conversion"
              title2="1% of the trip value"
              title3="$ 0.50 Earned"
              activeIcon={Active}
              exchangeIcon={Exchange}
              btnText="View"
            />
        </div>
    </Container>
  );
};
const mapStateToProps = () => {
  return {

  };
};
export default connect(mapStateToProps, )(
  TipsManagement
);
