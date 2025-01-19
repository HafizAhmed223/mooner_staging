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
import PaymentHostoryCard from '../../common/MNRCared/PaymentHistoryCard';
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

export default function MNRModule() {
  const classes = useStyles();
  const history = useHistory();
  const handleTips = () => {
    history.push({
      pathname: "/mooner/details/tips_management",
    });
  }
  const handleSendToken = () => {
    history.push({
      pathname: "/mooner/details/send_token_list"
    })
  }
  const handleRecievedUSD = () => {
    history.push("/mooner/details/earned_token_list")
  }

  const handleKycRequest = () => {
    history.push("/mooner/details/kyc_management")
  }
  return (
    <>
      <Container maxWidth="xl">
        <Typography className={classes.title}> Wallet </Typography>
          <div className={classes.CardWrapper}>
            <GraphCard />
            <BudgetCard  
              title="215"
              subtitle="Token Earned" 
              btnText="View"
              handleFunction={handleRecievedUSD}
            />
            <BudgetCard
              title="25 New"
              subtitle="KYC Request"
              btnText="View"
              handleFunction={handleKycRequest}
            />
            <CurrencyCard
              title=" Currency Convert"
              title2="MNR BEP20"
              title3="FLAT Currency"
              activeIcon={Active}
              exchangeIcon={Exchange}
              btnText="Change"
            />
            <BudgetCard
              title="1.25%"
              subtitle="Commissions"
              btnText="Edit"
            />
            <BudgetCard
              title="Tips"
              subtitle="Management"
              btnText="View"
              handleFunction={handleTips}
            />
            <PaymentHostoryCard
              title="Send Token"
              btnText="Send"
              handleFunction={handleSendToken}
            />
            <PaymentHostoryCard
              title="Received USD"
              btnText="View"
            />
          </div>
          <Grid container className={classes.earningContainer}>
            <Grid items xs={12} sm={6} md={7} lg={7} xl={8}>
              <Typography className={classes.totalEaining}> Total Earnings </Typography>
            </Grid>
            <Grid items xs={12} sm={6} md={5} lg={5} xl={4}>
              <TextField
                type="date"
                id="outlined-basic"
                variant="outlined"
                placeholder="DD/MM/YYYY"
                className={[classes.field, classes.removeOutline]}
              />
            </Grid>
          </Grid>
      </Container>
    </>
  );
}
