import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Container,
  Grid,
  TextField
}
 from '@material-ui/core';
import GraphCard from '../../common/MNRCared/GraphCard';
import BudgetCard from '../../common/MNRCared/BudgetCard';
import CurrencyCard from '../../common/MNRCared/CurrencyConvertCard';
import Active from "../../assets/svg/green.svg";
import Exchange from "../../assets/svg/exchange.svg";

const useStyles = makeStyles ((mainTheme) => ({
  title: {
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
    marginTop: mainTheme.spacing(4),
    fontWeight: "600",
    [mainTheme.breakpoints.down("xs")]:{
      textAlign: 'center',
      marginBottom: mainTheme.spacing(2),
    }
  },
  CardWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  field: {
    width: "85%",
    borderRadius: "24px",
    height: "55px",
    backgroundColor: "#fff",
    marginTop: mainTheme.spacing(3),
    fontSize: "14px",
    "& .MuiOutlinedInput-input":{
      [mainTheme.breakpoints.down("lg")]:{
        padding: "15.5px 15px",
      }
    },
    [mainTheme.breakpoints.down("lg")]:{
      width: "90%",
      height: "54px",
    }
  },
  removeOutline: {
    "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
        border: 0,
    },
    "&:hover fieldset": {
        border: 0,
    },
    "& fieldset": {
        border: 0,
    },
    },
  },
  earningContainer:{
    display: 'flex',
    marginTop: mainTheme.spacing(4),

  },
  totalEaining:{
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
    lineHeight: "28px",
    letterSpacing: "0.2em",
    fontWeight: "600",
    marginTop: mainTheme.spacing(4),
    fontSize: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("sm")]:{
      fontSize: mainTheme.spacing(4),
    },
    [mainTheme.breakpoints.only("xs")]:{
      fontSize: mainTheme.spacing(2),
    }
  }
}));

export default function SubcriptionManagement() {
  const classes = useStyles();
  const history = useHistory();

  const handlePrimiumPlan = () => {
    history.push({
      pathname: "/mooner/details/subscription_plan/Premium",
    });
  }
  const handleGold = () => {
    history.push({
      pathname: "/mooner/details/subscription_plan/Gold",
    });
  }
  const handleSilver = () => {
    history.push({
      pathname: "/mooner/details/subscription_plan/Silver",
    });
  }
  return (
    <>
      <Container maxWidth="xl">
        <Typography className={classes.title}> Subscription Management </Typography>
          <div className={classes.CardWrapper}>
            <BudgetCard
              title="Premium"
              subtitle="Add upto 3 Categories"
              btnText="View"
              handleTips={handlePrimiumPlan}
            />
            <BudgetCard
              title="Gold"
              subtitle="Add upto 3 Categories"
              btnText="View"
              handleTips={handleGold}
            />
            <BudgetCard
              title="Silver"
              subtitle="Add upto 3 Categories"
              btnText="View"
              handleTips={handleSilver}
            />
          </div>
      </Container>
    </>
  );
}
