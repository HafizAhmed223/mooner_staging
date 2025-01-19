import React, { useEffect } from "react";
import { useParams } from "react-router";

import {
  Grid,
  Container,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import UserDetail from "../Table/UserDetailTables/userDetailTable";
import TopBar from "../topbar";

import { connect } from "react-redux";
import ReferrlsUsers from "../Table/ReferralsUsers";
import CommonCard from "../../common/CommonCard";
import SingleMlnUser from "../Table/UserDetailTables/MlnUser";
import { getSingleMlnUserAction } from "../../redux/actions/mln/mln.actions";
import MlnReferalsUser from "../Table/UserDetailTables/MlnReferalsUser";
import MlnReferalsUserParent from "../Table/UserDetailTables/MlnReferalsUserParent";
import Permissions from "../subAdmin/Permissions";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    display: "flex",
    paddingRight: mainTheme.spacing(0),
    marginRight: mainTheme.spacing(0),
    height: "auto",
    [mainTheme.breakpoints.only("xl")]: {
      height: "100vh",
    },
  },
  tablesContent: {
    display: "flex",
  },
  cardStyle: {
    [mainTheme.breakpoints.only("xl")]: {
      display: "none",
    },
    [mainTheme.breakpoints.only("lg")]: {
      display: "none",
    },
    [mainTheme.breakpoints.only("md")]: {
      display: "none",
    },
    [mainTheme.breakpoints.only("sm")]: {
      display: "none",
    },
  },
  card1Style: {
    [mainTheme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
}));

const ViewReferral = ({
  getSingleMlnUserAction,
  mlnUserData,
  referalsData,
  loading,
  referral_users_parent,
}) => {
  const { id } = useParams();
  useEffect(() => {
    getSingleMlnUserAction(id);
  }, []);

  const classes = useStyles();
  //("referral_users_parent", referral_users_parent);

  return (
    <Container maxWidth="xl">
      <Permissions page="view_referral" />
      <Grid Container spacing={0} className={classes.root}>
        <Grid item xs={12}>
          <TopBar
            module="MLN Payouts"
            item="User Detaills"
            bckLink="/mooner/details/mln"
          />

          <Grid
            item
            xl={2}
            lg={2}
            md={3}
            sm={3}
            xs={12}
            className={classes.cardStyle}
          >
            <Grid item xl={12}>
              <br />
              <CommonCard
                message="Set Profit Margin"
                btnText="Edit"
                link="/mooner/mln_profit/1"
              />
            </Grid>
            <Grid item xl={12}>
              <br />
              <CommonCard
                message="Set Fee Margin"
                btnText="Edit"
                link="/mooner/fee_margin/1"
              />
            </Grid>
          </Grid>
          <Grid Container spacing={2} className={classes.tablesContent}>
            <Grid item xl={10} lg={10} md={9} sm={9} xs={12}>
              {
                // loading ?
                // <div style={{ textAlign: "center" }}>
                //   <CircularProgress />
                // </div>

                // :
                mlnUserData ? (
                  <SingleMlnUser DATA={mlnUserData} />
                ) : (
                  <div
                    style={{
                      margin: "30px 0px",
                      textAlign: "center",
                      opacity: 0.3,
                    }}
                  >
                    {" "}
                    No user exist{" "}
                  </div>
                )
              }
              {referalsData === "No referrals available" ? (
                <MlnReferalsUser DATA={[]} />
              ) : (
                <MlnReferalsUser DATA={referalsData} />
              )}
              <MlnReferalsUserParent DATA={referral_users_parent} />
            </Grid>

            <Grid
              item
              xl={2}
              lg={2}
              md={3}
              sm={3}
              className={classes.card1Style}
            >
              <Grid item xl={12}>
                <br />
                <CommonCard
                  message="Set Profit Margin"
                  btnText="Edit"
                  link="/mooner/mln_profit/1"
                />
              </Grid>
              <Grid item xl={12}>
                <br />
                <CommonCard
                  message="Set Fee Margin"
                  btnText="Edit"
                  link="/mooner/fee_margin/1"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({ mln }) => {
  //("testinmln", mln?.referral_users_parent);
  return {
    mlnUserData: mln.singleUserMln,
    referalsData: mln.referals,
    loading: mln.loading,
    referral_users_parent: mln?.referral_users_parent,
  };
};
export default connect(mapStateToProps, {
  getSingleMlnUserAction,
})(ViewReferral);
