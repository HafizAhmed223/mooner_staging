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

// import Logo from "../../assets/svg/logo.svg"

const ViewEachEarning = () => {
  const [booking, setBooking] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getBooking();
  }, []);
  const listId = localStorage.getItem("listingId");
  const classes = MyCustomStyle();
  const handleBack = () => {
    history.push(`/mooner/all_bookings/${listId}`);
  };
  const token = localStorage.getItem("authToken");
  const id = localStorage.getItem("eachRecordId");

  const getBooking = async () => {
    try {
      const dataArr = await axios.get(
        `${baseURL}booking/booking_detail/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      //("data", dataArr.data.bookings);
      setBooking(dataArr.data.bookings);
    } catch (err) {
      //("err", err);
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Earnings"
              item="View"
              bckLink={`/mooner/all_bookings/${listId}`}
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
                    Category Name
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking.category_name}
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
                      value={booking.jobs_description}
                    />
                  </FormControl>
                </Grid>
                {
                  <Grid
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4}
                    className={classes.mainRow}
                  >
                    <Typography className={classes.label} gutterBottom>
                      Provider
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <TextField variant="outlined" value={booking.provider} />
                    </FormControl>
                  </Grid>
                }
              </Grid>
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
                    Order Status
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking.order_status}
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
                    Jobs Id
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField variant="outlined" value={booking.jobs_id} />
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
                    Provider Rating
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking.provider_rating}
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
                    Seeker
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField variant="outlined" value={booking.seeker} />
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
                    Bid Price
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField variant="outlined" value={booking.bid_price} />
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
                    Additional Price
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking.additional_price}
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
                    Seeker Rating
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking.seeker_rating}
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
                    Budget
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField variant="outlined" value={booking?.budget} />
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
                    <TextField variant="outlined" value={booking?.Tip} />
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
                    <TextField variant="outlined" value={booking.disputes_id} />
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
                      value={booking?.start_date?.slice(0, 10)}
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
                    SP Earnings
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={booking?.SP_earnings}
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
                </Grid>

                {booking?.transaction &&
                  booking?.transaction[0]?.level1_sp_name && (
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
                        Level 1 SP
                      </Typography>
                      <FormControl
                        variant="outlined"
                        className={[classes.field, classes.removeOutline]}
                      >
                        <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                        <TextField
                          variant="outlined"
                          value={booking?.transaction[0]?.level1_sp_name}
                        />
                      </FormControl>
                    </Grid>
                  )}

                {booking?.transaction?.[0]?.level1_ss_name && (
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
                      Level 1 SS
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <TextField
                        variant="outlined"
                        value={booking?.transaction[0]?.level1_ss_name}
                      />
                    </FormControl>
                  </Grid>
                )}

                {booking?.transaction &&
                  booking?.transaction[0]?.level2_sp_name && (
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
                        Level 2 SP
                      </Typography>
                      <FormControl
                        variant="outlined"
                        className={[classes.field, classes.removeOutline]}
                      >
                        <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                        <TextField
                          variant="outlined"
                          value={booking?.transaction[0]?.level2_sp_name}
                        />
                      </FormControl>
                    </Grid>
                  )}

                {booking?.transaction &&
                  booking?.transaction[0]?.level2_ss_name && (
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
                        Level 2 SS
                      </Typography>
                      <FormControl
                        variant="outlined"
                        className={[classes.field, classes.removeOutline]}
                      >
                        <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                        <TextField
                          variant="outlined"
                          value={booking?.transaction[0]?.level2_ss_name}
                        />
                      </FormControl>
                    </Grid>
                  )}
                {booking?.transaction &&
                  booking?.transaction[0]?.level3_sp_name && (
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
                        Level 3 SP
                      </Typography>
                      <FormControl
                        variant="outlined"
                        className={[classes.field, classes.removeOutline]}
                      >
                        <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                        <TextField
                          variant="outlined"
                          value={booking?.transaction[0]?.level3_sp_name}
                        />
                      </FormControl>
                    </Grid>
                  )}
                {booking?.transaction &&
                  booking?.transaction[0]?.level3_ss_name && (
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
                        Level 3 SS
                      </Typography>
                      <FormControl
                        variant="outlined"
                        className={[classes.field, classes.removeOutline]}
                      >
                        <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                        <TextField
                          variant="outlined"
                          value={booking?.transaction[0]?.level3_ss_name}
                        />
                      </FormControl>
                    </Grid>
                  )}
                {booking?.transaction &&
                  booking?.transaction[0]?.level4_sp_name && (
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
                        Level 4 SP
                      </Typography>
                      <FormControl
                        variant="outlined"
                        className={[classes.field, classes.removeOutline]}
                      >
                        <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                        <TextField
                          variant="outlined"
                          value={booking?.transaction[0]?.level4_sp_name}
                        />
                      </FormControl>
                    </Grid>
                  )}
                {booking?.transaction &&
                  booking?.transaction[0]?.level4_ss_name && (
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
                        Level 4 SS
                      </Typography>
                      <FormControl
                        variant="outlined"
                        className={[classes.field, classes.removeOutline]}
                      >
                        <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                        <TextField
                          variant="outlined"
                          value={booking?.transaction[0]?.level4_ss_name}
                        />
                      </FormControl>
                    </Grid>
                  )}
                {booking?.transaction && booking?.transaction[0]?.sp_level_1 && (
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
                      SP Level 1 MNR
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <TextField
                        variant="outlined"
                        value={booking?.transaction[0]?.sp_level_1}
                      />
                    </FormControl>
                  </Grid>
                )}

                {booking?.transaction && booking?.transaction[0]?.sp_level_2 && (
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
                      SP Level 2 MNR
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <TextField
                        variant="outlined"
                        value={booking?.transaction[0]?.sp_level_2}
                      />
                    </FormControl>
                  </Grid>
                )}
                {booking?.transaction && booking?.transaction[0]?.sp_level_3 && (
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
                      SP Level 3 MNR
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <TextField
                        variant="outlined"
                        value={booking?.transaction[0]?.sp_level_3}
                      />
                    </FormControl>
                  </Grid>
                )}
                {booking?.transaction && booking?.transaction[0]?.sp_level_4 && (
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
                      SP Level 4 MNR
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <TextField
                        variant="outlined"
                        value={booking?.transaction[0]?.sp_level_4}
                      />
                    </FormControl>
                  </Grid>
                )}
                {booking?.transaction && booking?.transaction[0]?.ss_level_1 && (
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
                      SS Level 1 MNR
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <TextField
                        variant="outlined"
                        value={booking?.transaction[0]?.ss_level_1}
                      />
                    </FormControl>
                  </Grid>
                )}
                {booking?.transaction && booking?.transaction[0]?.ss_level_2 && (
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
                      SS Level 2 MNR
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <TextField
                        variant="outlined"
                        value={booking?.transaction[0]?.ss_level_2}
                      />
                    </FormControl>
                  </Grid>
                )}

                {booking?.transaction && booking?.transaction[0]?.ss_level_3 && (
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
                      SS Level 3 MNR
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <TextField
                        variant="outlined"
                        value={booking?.transaction[0]?.ss_level_3}
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
                    Token Price
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={
                        booking?.transaction &&
                        booking?.transaction[0]?.token_price
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
                    Total MNRs
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={
                        booking?.transaction &&
                        booking?.transaction[0]?.total_tokens
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
                    Admin MNRs
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <TextField
                      variant="outlined"
                      value={
                        booking?.transaction &&
                        booking?.transaction[0]?.earn_tokens
                      }
                    />
                  </FormControl>
                </Grid>
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

export default ViewEachEarning;
