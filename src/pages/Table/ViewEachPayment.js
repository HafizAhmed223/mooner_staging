import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Container,
  makeStyles,
  TextareaAutosize,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Box,
} from "@material-ui/core";

import Topbar from "../topbar";
import CommonCard from "../../common/CommonCard";
import { useHistory } from "react-router";
import queryString from "query-string";
import { connect } from "react-redux";
import { getQuestionAireByIdAction } from "../../redux/actions/questionaire/questionaire.actions";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import { baseURL } from "../../api";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";

// import Logo from "../../assets/svg/logo.svg"

const ViewEachPayment = () => {
  const classes = MyCustomStyle();
  const history = useHistory();
  const paymentId = history?.location?.state?.usrId;
  //("history", paymentId);
  const handleBack = () => {
    history.push({
      pathname: `/mooner/payment_history`,
      state: { id: paymentId },
    });
  };

  const [userPayments, setUserPayments] = useState([]);
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  const { id } = useParams();
  //("EachPaymentId", id);
  const location = useLocation();
  //("PaymentRowId", location?.state?.id);
  const getPayments = async () => {
    try {
      const res = await axios.get(
        `${baseURL}booking/retrive_payment/${location?.state?.id}/?user_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      //("UserPaymentById", res?.data?.data);
      setUserPayments(res?.data?.data);
    } catch (err) {
      //("error", err);
    }
  };
  // const convertToTextField = (item) => {
  //   //("itemmm", item);
  //   const keyval = Object.keys(item).map((key) => {
  //     // var value = item[key];
  //     // //("value", item[key]);
  //     return { key: key, value: item[key] };
  //   });
  //   //("keyval", keyval);
  //   return keyval?.map((item, index) => {
  //     return (
  //       <Grid
  //         item
  //         xs={12}
  //         sm={4}
  //         md={4}
  //         lg={4}
  //         xl={4}
  //         className={classes.mainRow}
  //       >
  //         <Typography className={classes.label} gutterBottom>
  //           {item?.key}
  //         </Typography>
  //         <FormControl
  //           variant="outlined"
  //           className={[classes.field, classes.removeOutline]}
  //         >
  //           <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
  //           <TextField variant="outlined" value={item?.value} />
  //         </FormControl>
  //       </Grid>
  //     );
  //   });
  // };

  useEffect(() => {
    getPayments();
  }, []);
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Payments"
              item="View"
              bckLink={`/mooner/details/user_management`}
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Grid container className={classes.mainContainer}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={10}>
              <Grid container className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Category Name
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={userPayments?.category}
                    />
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Job Description
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={userPayments?.job_description}
                    />
                  </FormControl>
                </Grid>

                {userPayments?.booking && (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4}
                    className={classes.mainRow}
                  >
                    <Typography className={classes.label} gutterBottom>
                      Booking ID
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <TextField
                        variant="outlined"
                        value={userPayments?.booking}
                      />
                    </FormControl>
                  </Grid>
                )}

                {userPayments?.job_id && (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4}
                    className={classes.mainRow}
                  >
                    <Typography className={classes.label} gutterBottom>
                      Job ID
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <TextField
                        variant="outlined"
                        value={userPayments?.job_id}
                      />
                    </FormControl>
                  </Grid>
                )}

                {userPayments?.ss_id && (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4}
                    className={classes.mainRow}
                  >
                    <Typography className={classes.label} gutterBottom>
                      SS Name
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <TextField
                        variant="outlined"
                        value={userPayments?.ss_id}
                      />
                    </FormControl>
                  </Grid>
                )}

                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    SP Amount
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={userPayments?.sp_amount}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Date
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={moment(userPayments?.created_at).format(
                        "MMMM Do YYYY"
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Time
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={moment(userPayments?.created_at).format(
                        "h:mm:ss a"
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    SP Name
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={userPayments?.sp_name}
                    />
                  </FormControl>
                </Grid>

                {userPayments?.sp_tokens && (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4}
                    className={classes.mainRow}
                  >
                    <Typography className={classes.label} gutterBottom>
                      SP Tokens
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <TextField
                        variant="outlined"
                        value={userPayments?.sp_tokens}
                      />
                    </FormControl>
                  </Grid>
                )}

                {userPayments?.sp && (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4}
                    className={classes.mainRow}
                  >
                    <Typography className={classes.label} gutterBottom>
                      SP
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <TextField variant="outlined" value={userPayments?.sp} />
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12} sm={4} className={classes.mainRow}>
                  <Typography className={classes.label} gutterBottom>
                    Token Price
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={userPayments?.token_price}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.mainRow}>
                  <Typography className={classes.label} gutterBottom>
                    Stripe Fee
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={userPayments?.stripe_fee}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4} className={classes.mainRow}>
                  <Typography className={classes.label} gutterBottom>
                    Stripe Remaining Amount
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={userPayments?.stripe_remaining_amount}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.mainRow}>
                  <Typography className={classes.label} gutterBottom>
                    Booking Budget
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={(+userPayments?.total_budget).toFixed(2)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4} className={classes.mainRow}>
                  <Typography className={classes.label} gutterBottom>
                    Extra Budget
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={userPayments?.extra_budget}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.mainRow}>
                  <Typography className={classes.label} gutterBottom>
                    Remaining Amount of Extra Budget
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={userPayments?.remaining_amount_extra_budget}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.mainRow}>
                  <Typography className={classes.label} gutterBottom>
                    Stripe Fee Extra Budget
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={userPayments?.strip_fee_extra_budget}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4} className={classes.mainRow}>
                  <Typography className={classes.label} gutterBottom>
                    Total Budget
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={(
                        +userPayments?.total_budget +
                        +userPayments?.extra_budget
                      ).toFixed(2)}
                    />
                  </FormControl>
                </Grid>

                {/* Map the Sp levels here */}

                <Box width={"100%"} border="1px solid #727478" padding={4}>
                  <Typography>SP Referrals</Typography>
                  <Grid container>
                    {userPayments?.referrals?.map((item, index) =>
                      Object.entries(item).map((item, index) =>
                        item[0].includes("sp") ? (
                          <Grid
                            key={index}
                            item
                            xs={12}
                            sm={4}
                            className={classes.mainRow}
                          >
                            <Typography className={classes.label} gutterBottom>
                              {item[0].replaceAll("_", " ")}
                            </Typography>
                            <FormControl
                              variant="outlined"
                              className={[classes.field, classes.removeOutline]}
                            >
                              <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                              <TextField variant="outlined" value={item[1]} />
                            </FormControl>
                          </Grid>
                        ) : (
                          ""
                        )
                      )
                    )}
                  </Grid>
                </Box>
                <br />
                <Box width={"100%"} border="1px solid #727478" padding={4}>
                  <Typography>SS Referrals</Typography>
                  <Grid container>
                    {userPayments?.referrals?.map((item, index) =>
                      Object.entries(item).map((item, index) =>
                        item[0].includes("ss") ? (
                          <Grid
                            key={index}
                            item
                            xs={12}
                            sm={4}
                            className={classes.mainRow}
                          >
                            <Typography className={classes.label} gutterBottom>
                              {item[0].replaceAll("_", " ")}
                            </Typography>
                            <FormControl
                              variant="outlined"
                              className={[classes.field, classes.removeOutline]}
                            >
                              <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                              <TextField variant="outlined" value={item[1]} />
                            </FormControl>
                          </Grid>
                        ) : (
                          ""
                        )
                      )
                    )}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                onClick={handleBack}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default ViewEachPayment;
