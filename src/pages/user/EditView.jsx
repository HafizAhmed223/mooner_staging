import React, { useEffect } from "react";
import {
  Grid,
  Container,
  makeStyles,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import UserDetail from "../Table/UserDetailTables/userDetailTable";
import UserCountCard from "../../common/usersCuntcard";
import TopBar from "../topbar";
import UserBooking from "../Table/UserDetailTables/UserBooking";
// import UserAppointment from "../Table/UserDetailTables/UserAppointment";
import UserPaymentHistory from "../Table/UserDetailTables/UserPaymentHistory";
import UserBankWallet from "../Table/UserDetailTables/UserBank";
import TokenAndFait from "../Table/UserDetailTables/TokenAndFiat";
import StatusCard from "../../common/StatusCard";
import { connect } from "react-redux";
import { getUserDetail } from "../../redux/actions/booking/booking.action";
import Permissions from "../subAdmin/Permissions";
import CabBooking from "../Table/UserDetailTables/CapBooking";
const useStyles = makeStyles((mainTheme) => ({
  root: {
    display: "flex",
    paddingRight: mainTheme.spacing(0),
    marginRight: mainTheme.spacing(0),
  },
  tablesContent: {
    // display: "flex",
    // flexDirection: 'row'
  },
  cardContainer: {
    [mainTheme.breakpoints.only("sm")]: {
      display: "none",
    },
  },
}));

const EditView = ({ getUserDetail, loading, userData, match }) => {
  const { id } = match.params;
  useEffect(() => {
    getUserDetail(id);
  }, []);
  const classes = useStyles();
  const { user_details, user_bookings,user_car_bookings } = userData;
  // console.log(user_details,"api user detail response")
  // console.log(user_bookings,"user booking record")
  return (
    <Container maxWidth="xl">
      <Permissions page="view_user" />
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TopBar
            module="User Management"
            item="Details"
            bckLink="/mooner/details/user_management"
          />
          <Grid container spacing={2} className={classes.tablesContent}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={10}>
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress />
                </div>
              ) : (
                user_details && <UserDetail DATA={user_details} />
              )}

              {user_bookings && <UserBooking DATA={user_bookings} id={id} />}
              {user_car_bookings && <CabBooking DATA={user_car_bookings} id={id} />}
              

              <UserPaymentHistory />
              <UserBankWallet />
              <TokenAndFait />
            </Grid>
            <Grid
              item
              sm={4}
              md={4}
              lg={3}
              xl={2}
              className={classes.cardContainer}
            >
              <StatusCard />
              <UserCountCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
const mapStateToProps = ({ booking, loader }) => {
  return {
    userData: booking.userData,
    loading: loader.loading,
  };
};
export default connect(mapStateToProps, { getUserDetail })(EditView);
