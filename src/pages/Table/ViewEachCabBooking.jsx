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
import { getUserBookingList } from "../../redux/actions/booking/booking.action";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import { baseURL } from "../../api";
import { openBscPage } from "../../common/bscScan/BscScan";

// import Logo from "../../assets/svg/logo.svg"

const ViewEachCabBooking = () => {
  const [booking, setBooking] = useState([]);
  const history = useHistory();
console.log(booking,"api crash")
  useEffect(() => {
    getBooking();
  }, []);
  const listId = localStorage.getItem("listingId");
  const classes = MyCustomStyle();
  const handleBack = () => {
    history.push(`/mooner/cab_booking/${listId}`);
  };
  const token = localStorage.getItem("authToken");
  const id = localStorage.getItem("eachRecordId");

  const getBooking = async () => {
    try {
      const dataArr = await axios.get(
        `${baseURL}mooner_cab/admin_detail/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      //("data", dataArr.data.bookings);

      // console.log(dataArr.data.bookings)
      console.log("All xb bookinng",dataArr?.data?.bookings)
      setBooking(dataArr.data.bookings);

    } catch (err) {
      //("err", err);
      console.log(err,"eror from api")
    }
  };

  // const openNewPage=()=>{
  //   console.log("clicked")
  // }
  // const openNewPage = () => {
  //   const baseUrl = 'https://testnet.bscscan.com/';
  //   const transactionHash = '0x71673d39d714d71c4fc6fb8698793bcda62d4512bd6138cfc4ac1b0bcd33e6f0';
  //   const url = `${baseUrl}tx/${transactionHash}`;
  //   window.open(url, '_blank');
  // };

  const openNewPage=(item)=>{
    if(item[0].endsWith("hash")){
      window.open("https://testnet.bscscan.com/tx/"+item[1])
    }
  }
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Cab Bookings"
              item="View Cab"
              bckLink={`/mooner/cab_booking/${listId}`}
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          {/* <Typography className={classes.Title} gutterBottom>
            Questionnaire
          </Typography> */}
          <Grid container className={classes.mainContainer}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={10}>
              {/* <form className={classes.form} noValidate autoComplete="off"> */}
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
                    Jobs Id
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField variant="outlined" value={booking?.id} />
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
                    Category Name
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.category_name? category_name:"Cab"}
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
                    Destination 1
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.destination1?.address?booking?.destination1?.address:"N/A"}
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
                    Destination 2
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.destination2?.address?booking?.destination2?.address:"N/A"}
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
                    Destination 3
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.destination3?.address?booking?.destination3?.address:"N/A"}
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
                    Pick up Location
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.pickup?.address?booking?.pickup?.address:"N/A"}
                    />
                  </FormControl>
                </Grid>

              </Grid>
              <Grid container className={classes.mainContainer}>
                {/* <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Bid Price
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField variant="outlined" value={booking?.bid_price} />
                  </FormControl>
                </Grid> */}
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
                    Budget
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField variant="outlined" value={booking?.budget?booking?.budget:"N/A"} />
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
                     Status
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.status?booking?.status:"N/A"}
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
                    Passenger
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField variant="outlined" value={booking?.passenger_username} />
                  </FormControl>
                </Grid>
                {/* <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Seeker Rating
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.seeker_rating?seeker_rating:"N/A"}
                    />
                  </FormControl>
                </Grid> */}
                <Grid
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Driver
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField variant="outlined" value={booking?.driver_username?booking?.driver_username:"N/A"} />
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
                    Driver Rating
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.driver_rating}
                      // value={booking?.driver_rating?booking?.driver_rating:"N/A"}
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
                    Start Date
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.created_at?.slice(0, 10)}
                    />
                  </FormControl>
                </Grid>
                {/* <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    End Date
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.end_date?.slice(0, 10)}
                    />
                  </FormControl>
                </Grid> */}


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
                    Additional Price
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.additional_price?booking.additional_price:"N/A"}
                    />
                  </FormControl>
                </Grid>
                {/* <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Stripe Fee for Additional Price
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.stripe_fee_additional_price?stripe_fee_additional_price:"N/A"}
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
                    Remaining Additional Price
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.stripe_net_amount_additional_price?stripe_net_amount_additional_price:"N/A"}
                    />
                  </FormControl>
                </Grid> */}



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
                    Token Price
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      // value={
                      //   booking?.token_price?token_price:"N/A"
                      // }
                      value={booking?.token_price}
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
                    Total Token MNR / SGD
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField variant="outlined" value={
                      booking?.total_tokens + ' / ' + booking?.total_tokens * booking?.token_price} />
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
                    Stripe Fee for Booking
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField variant="outlined" value={booking?.stripe_fee} />
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
                    Remaining Amount of Budget
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      // value={booking?.stripe_net_amount?stripe_net_amount:"N/A"}
                      value={booking?.stripe_net_amount}
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
                    Tip
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField variant="outlined" value={booking?.tip?booking?.tip:"N/A"} />
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
                    Disputes Id
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.is_disputed}
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
                    Level 0 Percentage
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.level_0_percentage}
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
                    Level 1 Percentage
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.level_1_percentage}
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
                    Level 2 Percentage
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.level_2_percentage}
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
                    Level 3 Percentage
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.level_3_percentage}
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
                    Level 4 Percentage
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.level_4_percentage}
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
                    Total Token for MLN(MNR / SGD)
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={
                        booking?.total_tokens_mln + ' / ' + booking?.total_tokens_mln * booking?.token_price
                      }
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
                    Total Tokens MLN Percentage
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField variant="outlined" value={booking?.total_tokens_mln_percentage} />
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
                    Platform Incentive MNR / SGD
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      // value={booking?.budget_incentive + ' / ' + booking?.budget_incentive * booking?.token_price}
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
                    Budget Incentive Percentage
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={
                        booking?.budget_incentive_percentage
                      }
                    />
                  </FormControl>
                </Grid>
                {/* <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Total Value in SGD
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.Total_value}
                    />
                  </FormControl>
                </Grid> */}


                <Box width={"100%"} border="1px solid #727478" padding={4}>
                  <Typography>SP Referrals</Typography>
                  <Grid container>
                    {booking?.sp_referrals &&
                      booking?.sp_referrals?.map((item, ind) =>
                       <>
                       {console.log(booking.sp_referrals,"sp referals")}
                        <Grid
                          key={ind}
                          item
                          xs={12}
                          className={classes.mainRow}
                        >
                          <Typography sx={{ paddingBottom: "20px !important" }}>
                            Level {ind}
                          </Typography>
                        </Grid>
                        {Object.entries(item).map((item, index) => (
                          <Grid
                            item
                            key={index}
                            xs={12}
                            sm={6}
                            className={classes.mainRow}
                          >
                            <Typography className={classes.label} gutterBottom   >
                              {item[0]?.replaceAll("level" + ind + "_sp", "").replaceAll("_", "").toLocaleLowerCase() == 'mnr' ? item[0].replaceAll("level" + ind + "_sp", "").replaceAll("mnr", "Token MNR ").replaceAll("_", "") + '/SGD' : (item[0].replaceAll("level" + ind + "_sp", "") == "" && ind==0) ? 'Wallet Address': item[0].replaceAll("level" + ind + "_sp", "") == ""? 'Name'  : item[0].replaceAll("level" + ind + "_sp", "").replaceAll("_", " ").replaceAll("mnr", "MNR ")}
                              {/* {item[0]?.toLocaleLowerCase()?.includes('mnr') ? item[0].replaceAll("_", " ").replaceAll("mnr", "MNR ") + '/SGD' : item[0].replaceAll("_", " ")} */}
                            </Typography>
                            <FormControl
                              variant="outlined"
                              className={[classes.field, classes.removeOutline]}
                            >
                              <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                              <TextField variant="outlined" value={item[0]?.replaceAll("level" + ind + "_sp", "").replaceAll("_", "").toLocaleLowerCase() == 'mnr' ? item[1] + ' / ' + item[1] * booking?.token_price : item[1]}  onClick={()=>openNewPage(item)}  />
                              {/* <TextField variant="outlined" value={item[0]?.toLocaleLowerCase()} /> */}
                            </FormControl>
                          </Grid>
                        )
                        )
                        }</>
                      )}
                  </Grid>
                </Box>
                <br />
                <Box
                  sx={{ marginTop: "20px !important" }}
                  width={"100%"}
                  border="1px solid #727478"
                  padding={4}
                >
                  <Typography sx={{ paddingBottom: "20px !important" }}>
                    SS Referrals
                  </Typography>
                  <Grid container>
                    {booking?.ss_referrals &&
                      booking?.ss_referrals?.map((item, ind) =>
                       <>
                       {console.log(booking.ss_referrals,"ss referals")}

                        <Grid
                          key={ind}
                          item
                          xs={12}
                          className={classes.mainRow}
                        >
                          <Typography sx={{ paddingBottom: "20px !important" }}>
                            Level {ind}
                          </Typography>
                        </Grid>
                        {Object.entries(item).map((item, index) => (
                          <Grid
                            key={index}
                            item
                            xs={12}
                            sm={6}
                            className={classes.mainRow}
                          >
                            <Typography className={classes.label} gutterBottom   >
                              {/* {item[0]?.replaceAll("level" + ind + "_ss", "").replaceAll("_", "").toLocaleLowerCase() == 'mnr' ? item[0].replaceAll("level" + ind + "_ss", "").replaceAll("mnr", "Token MNR ").replaceAll("_", "") + '/SGD' : item[0].replaceAll("level" + ind + "_ss", "") == "" ? 'Name' : item[0].replaceAll("level" + ind + "_ss", "").replaceAll("_", " ").replaceAll("mnr", "MNR ")} */}
                              {item[0]?.replaceAll("level" + ind + "_ss", "").replaceAll("_", "").toLocaleLowerCase() == 'mnr' ? item[0].replaceAll("level" + ind + "_ss", "").replaceAll("mnr", "Token MNR ").replaceAll("_", "") + '/SGD' : (item[0].replaceAll("level" + ind + "_ss", "") == "" && ind==0) ? 'Wallet Address': item[0].replaceAll("level" + ind + "_ss", "") == ""? 'Name'  : item[0].replaceAll("level" + ind + "_ss", "").replaceAll("_", " ").replaceAll("mnr", "MNR ")}

                            </Typography>
                            <FormControl
                              variant="outlined"
                              className={[classes.field, classes.removeOutline]}
                            >
                              <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                              <TextField variant="outlined" 
                              value={item[0]?.replaceAll("level" + ind + "_ss", "").replaceAll("_", "").toLocaleLowerCase() == 'mnr' ? item[1] + ' / ' + item[1] * booking?.token_price : item[1]} onClick={()=>openNewPage(item)} 
                                />
                              {/* <TextField variant="outlined" value={item[0]?.toLocaleLowerCase()?.includes('mnr')} /> */}
                            </FormControl>
                          </Grid>
                        ))
                        } </>
                      )
                    }
                  </Grid>
                </Box>

                <br />
                <Box
                  sx={{ marginTop: "20px !important" }}
                  width={"100%"}
                  border="1px solid #727478"
                  padding={4}
                >
                  <Typography sx={{ paddingBottom: "20px !important" }}>
                    Admin Earning
                  </Typography>
                  <Grid container>
                    {booking?.admin_earning && <>
                      <Grid
                        item
                        xs={12}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Remaining MLN Admin Address
                        </Typography>
                        <FormControl
                        variant="outlined"
                        className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <TextField variant="outlined" value={booking?.admin_earning?.remaining_mln_admin_address} />
                        </FormControl>
                      </Grid>
                      <Grid
                        key={booking?.admin_earning?.remaining_mln_admin}
                        item
                        xs={12}
                        sm={6}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Remaining MLN Admin (MNR / SGD)
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <TextField variant="outlined" value={booking?.admin_earning?.remaining_mln_admin + ' / ' + booking?.admin_earning?.remaining_mln_admin * booking?.token_price} />
                        </FormControl>
                      </Grid>
                      <Grid
                        key={booking?.admin_earning?.remaining_mln_admin_transfer

                        }
                        item
                        xs={12}
                        sm={6}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Remaining MLN Admin Trafer

                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <TextField variant="outlined" value={booking?.admin_earning?.remaining_mln_admin_transfer} />
                        </FormControl>
                      </Grid>
                      <Grid
                        key={booking?.admin_earning?.remaining_mln_admin_transaction_hash

                        }
                        item
                        xs={12}
                        sm={6}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Transaction Hash

                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <TextField variant="outlined" value={booking?.admin_earning?.remaining_mln_admin_transaction_hash} onClick={openBscPage} />
                        </FormControl>
                      </Grid>

                      <Grid
                        key={booking?.admin_earning?.company_earning}
                        item
                        xs={12}
                        sm={6}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Company Earning MNR / SGD
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <TextField variant="outlined" value={booking?.admin_earning?.company_earning + ' / ' + booking?.admin_earning?.company_earning * booking?.token_price} />
                        </FormControl>
                      </Grid>
                    </>
   
                    }
                 
                  </Grid>
                </Box>


                <br />
                <Box
                  sx={{ marginTop: "20px !important" }}
                  width={"100%"}
                  border="1px solid #727478"
                  padding={4}
                >
                  <Typography sx={{ paddingBottom: "20px !important" }}>
                    SP Earning
                  </Typography>
                  <Grid container>
                    {booking?.sp_earning && <>
                      <Grid
                        key={booking?.sp_earning?.remaining_mln_admin}
                        item
                        xs={12}
                        sm={6}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Name
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <TextField variant="outlined" value={booking?.sp_earning?.sp_name} />
                        </FormControl>
                      </Grid>
                      <Grid
                        key={booking?.sp_earning?.sp_tokens
                        }
                        item
                        xs={12}
                        sm={6}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Token MNR / SGD

                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <TextField variant="outlined" value={booking?.sp_earning?.sp_tokens + ' / ' + booking?.sp_earning?.sp_tokens * booking?.token_price} />
                        </FormControl>
                      </Grid>
                      <Grid
                        key={booking?.sp_earning?.sp_mnr_transfer}
                        item
                        xs={12}
                        sm={6}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          MNR Transfer
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <TextField variant="outlined" value={booking?.sp_earning?.sp_mnr_transfer} />
                        </FormControl>
                      </Grid>


                      <Grid
                        key={booking?.sp_earning?.sp_transaction_hash

                        }
                        item
                        xs={12}
                        sm={6}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Transaction Hash

                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <TextField variant="outlined" value={booking?.sp_earning?.sp_transaction_hash} onClick={openBscPage} />
                        </FormControl>
                      </Grid>
                    </>
                    }
                  </Grid>
                </Box>

                {/* Below is container grid closing tag */}
              </Grid>

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
            {/* <Grid
              item
              xs={12}
              sm={12}
              md={3}
              lg={3}
              xl={2}>
              <CommonCard
                message="Create Question"
                btnText="Add"
                link="/mooner/add_questionaire"
              />
            </Grid> */}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default ViewEachCabBooking;
