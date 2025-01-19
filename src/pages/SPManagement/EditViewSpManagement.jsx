import React, { useState, useEffect } from "react";

import {
  Grid,
  Container,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import TopBar from "../topbar";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import StatusCard from "../../common/StatusCard";
import UserBooking from "../Table/UserDetailTables/UserBooking";
import UserBankWallet from "../Table/UserDetailTables/UserBank";
import TokenAndFait from "../Table/UserDetailTables/TokenAndFiat";
import UserEarning from "../Table/UserDetailTables/SingleEarning";
import SingleRating from "../Table/RatingAndReviews/SingleRating";
import SingleSPAllDetails from "../Table/SpManagement/SingleSpManagement";
import UserPaymentHistory from "../Table/UserDetailTables/UserPaymentHistory";
import { getSpeByIdAction } from "../../redux/actions/spManagement/spmanagement.actions";
import SpBookings from "../Table/SpManagement/SpBookings";
import SpDocument from "../Table/SpManagement/SpDocument";
import Permissions from "../subAdmin/Permissions";
import SPServiceView from "../Table/spServices/SPServiceView";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    display: "flex",
    paddingRight: mainTheme.spacing(0),
    marginRight: mainTheme.spacing(0),
  },
  tablesContent: {
    display: "flex",
  },
  cardContainer: {
    [mainTheme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

const EditViewSpManagement = ({
  getSpeByIdAction,
  spByidData,
  spDocument,
  loading,
  sp_active_bookings,
  sp_complete_bookings,
  sp_ratings,
  sp_service,
}) => {
  const { id } = useParams();
  //("id", id);
  localStorage.setItem("userId", id);
  //(" ", spByidData);
  useEffect(() => {
    getSpeByIdAction(id);
  }, []);
  const history = useHistory();
  //("sp_service", sp_service);
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      {/* <h1>hhhhhh</h1> */}
      <Permissions page="view_spservices" />
      <Grid Container spacing={0} className={classes.root}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TopBar
            module="SP Management"
            item="View"
            bckLink="/mooner/details/sp_management"
          />
          <Grid Container spacing={2} className={classes.tablesContent}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={10}>
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress />
                </div>
              ) : (
                spByidData && <SingleSPAllDetails DATA={spByidData} />
              )}

              <SpBookings
                DATA={sp_active_bookings && sp_active_bookings}
                status="Active"
              />
              <SpBookings
                DATA={sp_complete_bookings && sp_complete_bookings}
                status="Completed"
              />
              {/* begin */}
              <UserEarning />
              <UserPaymentHistory modulename="SP Management" />
              <UserBankWallet modulename="SP Management" />
              {/* <TokenAndFait modulename="SP Management" /> */}
              <SPServiceView DATA={sp_service && sp_service} id={id} />
              <SingleRating DATA={sp_ratings && sp_ratings} id={id} />
              <SpDocument DATA={spDocument ? spDocument : []} />
              {/* end */}
            </Grid>
            <Grid
              item
              sm={12}
              md={4}
              lg={3}
              xl={2}
              className={classes.cardContainer}
            >
              <StatusCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({ spManagement }) => {
  //("spManagement", spManagement?.sp_service);
  return {
    spByidData: spManagement.spById,
    sp_active_bookings: spManagement.sp_active_bookings,
    sp_complete_bookings: spManagement.sp_complete_bookings,
    sp_ratings: spManagement.sp_ratings,
    sp_service: spManagement?.sp_service,
    spDocument:
      spManagement && spManagement.spDocument && spManagement.spDocument.sp_kyc,
    loading: spManagement.loading,
  };
};
export default connect(mapStateToProps, {
  getSpeByIdAction,
})(EditViewSpManagement);
