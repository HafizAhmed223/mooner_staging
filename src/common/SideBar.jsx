import React from "react";
import { Grid, makeStyles, Typography, Container } from "@material-ui/core";

import { NavLink, useLocation } from "react-router-dom";

// Left Sidebar SVG Icons //
import UserManagement from "../assets/svg/userManagement.svg";
import ServiceProvider from "../assets/svg/serviceProvider.svg";
import Documents from "../assets/svg/document.svg";
import Currency from "../assets/svg/currency.svg";
import Wallet from "../assets/svg/wallet.svg";
import FAQs from "../assets/svg/Group.svg";
import Password from "../assets/svg/password.svg";
import Catagory from "../assets/svg/category.svg";
import SignOut from "../assets/svg/signout.svg";
import Ticket from "../assets/svg/notes.svg";
import Questionaire from "../assets/svg/questionaire.svg";
import Announcement from "../assets/svg/announcement.svg";
import Banner from "../assets/svg/banner.svg";
import SP from "../assets/svg/sp.svg";
import MarchanddistStore from "../assets/svg/marchantdiseStore.svg";
import CollectionManagement from "../assets/svg/collectionManagement.svg";
import Subscribtion from "../assets/svg/subscribtion.svg";
import Radius from "../assets/svg/radius.svg";
import Country from "../assets/svg/country.svg";
import SubAdmins from "../assets/svg/subAdmins.svg";
import Reports from "../assets/svg/report.svg";
import Info from "../assets/svg/info.svg";
import CategoryKyc from "../assets/svg/categoryKyc.svg";
import DisputeIcon from "../assets/svg/dispute.svg";
import Earning from "../assets/svg/earning.svg";
import CustomAnalysis from "../assets/svg/ticket.svg";

import { connect } from "react-redux";
import { logoutUserAction } from "../redux/actions/auth/auth.action";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
    padding: mainTheme.spacing(0),
    margin: mainTheme.spacing(0),
    maxWidth: "100%",
  },
  sidebarContainer: {
    overflow: "hidden",
    maxWidth: "100%",
  },
  mainGridContainer: {
    maxWidth: "100%",
  },
  navHeading: {
    color: "white",
    marginBottom: mainTheme.spacing(4),

    fontWeight: "bold",
    fontSize: "18.2857px",
    lineHeight: "24px",
    letterSpacing: "0.2em",
    position: "sticky",
    top: 0,
    [mainTheme.breakpoints.only("xl")]: {
      // marginLeft: mainTheme.spacing(2),
      paddingTop: mainTheme.spacing(5),
      paddingLeft: mainTheme.spacing(2),
      paddingBottom: mainTheme.spacing(4),
      marginTop: mainTheme.spacing(0),
      backgroundColor: "#20253B",
      width: "100px",
    },
    [mainTheme.breakpoints.only("lg")]: {
      // marginLeft: mainTheme.spacing(2),
      marginTop: mainTheme.spacing(0),
      paddingTop: mainTheme.spacing(4),
      paddingLeft: mainTheme.spacing(2),
      paddingRight: mainTheme.spacing(3),
      paddingBottom: mainTheme.spacing(3),
      backgroundColor: "#20253B",
    },
  },
  linkNames: {
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
    fontSize: "12px",
    letterSpacing: "0.2em",
    textAlign: "center",
    top: 0,
    // borderBottom: "1px solid lightgrey",
    [mainTheme.breakpoints.only("xl")]: {
      // marginLeft: mainTheme.spacing(2),
      paddingTop: mainTheme.spacing(0),
      paddingBottom: mainTheme.spacing(3),
      marginTop: mainTheme.spacing(0),
      backgroundColor: "#20253B",
      width: "100px",
    },
    [mainTheme.breakpoints.only("lg")]: {
      marginLeft: mainTheme.spacing(1),
      marginTop: mainTheme.spacing(0),
      // paddingTop: mainTheme.spacing(4),
      paddingBottom: mainTheme.spacing(3),
      backgroundColor: "#20253B",
    },
  },
  navWrapper: {
    display: "flex",
    marginTop: mainTheme.spacing(2),
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "auto",
    [mainTheme.breakpoints.up("xl")]: {
      marginRight: mainTheme.spacing(5),
    },
  },
  links: {
    cursor: "pointer",
    height: "22px",
    width: "25px",
    margin: "15px 0px 5px 0px",
    [mainTheme.breakpoints.up("xl")]: {
      height: "22px",
      width: "25px",
    },
    [mainTheme.breakpoints.down("lg")]: {
      height: "17px",
      width: "17px",
    },
  },
  logOut: {
    marginTop: mainTheme.spacing(2),
    [mainTheme.breakpoints.up("xl")]: {
      marginTop: mainTheme.spacing(2),
      marginBottom: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.only("lg")]: {
      marginTop: mainTheme.spacing(2),
      marginBottom: mainTheme.spacing(0),
    },
  },
  myDiv: {
    color: "#20253B",
  },
  scrollbar: {
    position: "fixed",
    width: "10.16%",
    paddingLeft: "20px",
    overflowX: "hidden",
    overflowY: "scroll",
    minHeight: "100%",
    [mainTheme.breakpoints.up("xl")]: {
      height: "100%",
    },
    [mainTheme.breakpoints.down("lg")]: {
      height: "100%",
    },
  },
}));

const SideBar = ({ logoutUser }) => {
  const location = useLocation();
  // console.log(location,"left location")
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.mainGridContainer}>
        <Grid item xs={12} lg={12} xl={12} className={classes.sidebarContainer}>
          <Container className={classes.scrollbar}>
            <Typography className={classes.navHeading}>mooner</Typography>
            <div className={classes.navWrapper}>
              <NavLink
                to="/mooner/details/user_management"
                className={
                  location.pathname === "/mooner/details/user_management"
                    ? "active-sidebar navlink"
                    : ""
                }
              >
                <img
                  src={UserManagement}
                  className={classes.links}
                  alt="UserManagement"
                  title="User Management"
                />
              </NavLink>
              <NavLink
                to="/mooner/details/user_management"
                className={"navlink"}
              >
                <Typography className={classes.linkNames}>
                  User Management
                </Typography>
              </NavLink>
              <NavLink
                to="/mooner/details/sp_management"
                className={
                  location.pathname === "/mooner/details/sp_management"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={SP}
                  className={classes.links}
                  alt="ServiceProvider"
                  title="Service Provider"
                />
              </NavLink>
              <NavLink to="/mooner/details/sp_management" className={"navlink"}>
                <Typography className={classes.linkNames}>
                  Service Provider
                </Typography>
              </NavLink>
              <NavLink
                to="/mooner/details/active_jobs"
                className={
                  location.pathname === "/mooner/details/active_jobs"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={SP}
                  className={classes.links}
                  alt="ActiveUser"
                  title="Active Jobs List"
                />
              </NavLink>
              <NavLink to="/mooner/details/active_jobs" className={"navlink"}>
                <Typography className={classes.linkNames}>
                  Active Jobs
                </Typography>
              </NavLink>
              <NavLink
                to="/mooner/details/questionaire"
                className={
                  location.pathname === "/mooner/details/questionaire"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Questionaire}
                  className={classes.links}
                  alt="questionaire"
                  title="Questionaire"
                />
              </NavLink>
              <NavLink to="/mooner/details/questionaire" className={"navlink"}>
                <Typography className={classes.linkNames}>
                  Questionnaire
                </Typography>
              </NavLink>
              <NavLink
                to="/mooner/details/document_management"
                className={
                  location.pathname === "/mooner/details/document_management"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Documents}
                  className={classes.links}
                  alt="Documents"
                  title="Document Management"
                />
              </NavLink>
              <NavLink
                to="/mooner/details/document_management"
                className={"navlink"}
              >
                <Typography className={classes.linkNames}>
                  Document Management
                </Typography>
              </NavLink>
              <NavLink
                to="/mooner/details/mln"
                className={
                  location.pathname === "/mooner/details/mln"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Currency}
                  className={classes.links}
                  alt="MLN Payouts"
                  title="MLN Payouts"
                />
              </NavLink>
              <NavLink to="/mooner/details/mln" className={"navlink"}>
                <Typography className={classes.linkNames}>MLN</Typography>
              </NavLink>
              {/* <NavLink
                to="/mooner/details/banners"
                className={
                  location.pathname === "/mooner/details/mln"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Banner}
                  className={classes.links}
                  alt="banner"
                  title="Banner Management"
                />
              </NavLink>
              <NavLink to="/mooner/details/banners" className={"navlink"}>
                <Typography className={classes.linkNames}>
                  Banner Management
                </Typography>
              </NavLink> */}
              {/* <NavLink
                to="/mooner/details/earning"
                className={
                  location.pathname === "/mooner/details/earning"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                {console.log(location.pathname==="/mooner/details/earning")}
                <img
                  src={Earning}
                  className={classes.links}
                  alt="Earning Payouts"
                  title="Earning Payouts"
                />
              </NavLink>
              <NavLink to="/mooner/details/earning" className={"navlink"}>
                <Typography className={classes.linkNames}>Earning</Typography>
              </NavLink> */}
              <NavLink
                to="/mooner/details/mnr"
                className={
                  location.pathname === "/mooner/details/mnr"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Wallet}
                  className={classes.links}
                  alt="Wallet"
                  title="wallet"
                />
              </NavLink>
              <NavLink to="/mooner/details/mnr" className={"navlink"}>
                <Typography className={classes.linkNames}>MNR</Typography>
              </NavLink>
              <NavLink
                to="/mooner/details/fqa"
                className={
                  location.pathname === "/mooner/details/fqa"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={FAQs}
                  className={classes.links}
                  alt="FAQs"
                  title="FAQs"
                />
              </NavLink>
              <NavLink to="/mooner/details/fqa" className={"navlink"}>
                <Typography className={classes.linkNames}>FAQs</Typography>
              </NavLink>
              <NavLink
                to="/mooner/details/change_password"
                className={
                  location.pathname === "/mooner/details/change_password"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Password}
                  className={classes.links}
                  alt="Password"
                  title="Change Password"
                />
              </NavLink>
              <NavLink
                to="/mooner/details/change_password"
                className={"navlink"}
              >
                <Typography className={classes.linkNames}>
                  Change Password
                </Typography>
              </NavLink>
              <NavLink
                to="/mooner/details/ticket_management"
                className={
                  location.pathname === "/mooner/details/ticket_management"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Ticket}
                  className={classes.links}
                  alt="Ticket Management"
                  title="Ticket Management"
                />
              </NavLink>
              <NavLink
                to="/mooner/details/ticket_management"
                className={"navlink"}
              >
                <Typography className={classes.linkNames}>
                  Ticket Management
                </Typography>
              </NavLink>
              {/* Drivers */}
              <NavLink
                to="/mooner/details/drivers"
                className={
                  location.pathname === "/mooner/details/drivers"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Ticket}
                  className={classes.links}
                  alt="Drivers"
                  title="Drivers"
                />
              </NavLink>
              <NavLink to="/mooner/details/drivers" className={"navlink"}>
                <Typography className={classes.linkNames}>Drivers</Typography>
              </NavLink>
              <NavLink
                to="/mooner/details/hitches"
                className={
                  location.pathname === "/mooner/details/hitches"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Ticket}
                  className={classes.links}
                  alt="Hitches"
                  title="Hitches"
                />
              </NavLink>
              <NavLink to="/mooner/details/hitches" className={"navlink"}>
                <Typography className={classes.linkNames}>Hitches</Typography>
              </NavLink>

              {/*  */}
              <NavLink
                to="/mooner/details/categories"
                className={
                  location.pathname === "/mooner/details/categories"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Catagory}
                  className={classes.links}
                  alt="Category"
                  title="Category Management"
                />
              </NavLink>
              <NavLink to="/mooner/details/categories" className={"navlink"}>
                <Typography className={classes.linkNames}>
                  Categories
                </Typography>
              </NavLink>

              <NavLink
                to="/mooner/details/category_kyc"
                className={
                  location.pathname === "/mooner/details/category_kyc"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={CategoryKyc}
                  className={classes.links}
                  alt="Category"
                  title="Category Kyc"
                />
              </NavLink>
              <NavLink to="/mooner/details/category_kyc" className={"navlink"}>
                <Typography className={classes.linkNames}>
                  Category KYC
                </Typography>
              </NavLink>
              <NavLink
                to="/mooner/details/announcemet"
                className={
                  location.pathname === "/mooner/details/announcemet"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Announcement}
                  className={classes.links}
                  alt="announcement"
                  title="Announcement Management"
                />
              </NavLink>
              <NavLink to="/mooner/details/announcemet" className={"navlink"}>
                <Typography className={classes.linkNames}>
                  Announcement
                </Typography>
              </NavLink>
              {/* <NavLink
                to="/mooner/details/aproved_banner"
                className={
                  location.pathname === "/mooner/details/aproved_banner"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Banner}
                  className={classes.links}
                  alt="banner"
                  title="Banner Management"
                />
              </NavLink>
              <NavLink
                to="/mooner/details/aproved_banner"
                className={"navlink"}
              >
                <Typography className={classes.linkNames}>
                  Approved Banner
                </Typography>
              </NavLink> */}
              {/* <NavLink
                to="/mooner/details/merchandise_store_management"
                className={
                  location.pathname ===
                    "/mooner/details/merchandise_store_management"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={MarchanddistStore}
                  className={classes.links}
                  alt="Merchandise Store"
                  title="Merchandise Store"
                />
              </NavLink>
              <NavLink
                to="/mooner/details/merchandise_store_management"
                className={"navlink"}
              >
                <Typography className={classes.linkNames}>
                  Merchandise Store Management
                </Typography>
              </NavLink> */}
              <NavLink
                to="/mooner/details/cancellation_management"
                className={
                  location.pathname ===
                  "/mooner/details/cancellation_management"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={CollectionManagement}
                  className={classes.links}
                  alt="Cancellation Management"
                  title="Cancellation Management"
                />
              </NavLink>
              <NavLink
                to="/mooner/details/cancellation_management"
                className={"navlink"}
              >
                <Typography className={classes.linkNames}>
                  Cancellation Management
                </Typography>
              </NavLink>
              {/* <NavLink
                to="/mooner/details/subscription_management"
                className={
                  location.pathname ===
                    "/mooner/details/subscription_management"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Subscribtion}
                  className={classes.links}
                  alt="Subscription Management"
                  title="Subscription Management"
                />
              </NavLink>
              <NavLink
                to="/mooner/details/subscription_management"
                className={"navlink"}
              >
                <Typography className={classes.linkNames}>
                  Subscription Managment
                </Typography>
              </NavLink> */}
              {/* <NavLink
                to="/mooner/details/radius_management"
                className={
                  location.pathname === "/mooner/details/radius_management"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Radius}
                  className={classes.links}
                  alt="Radius Management"
                  title="Radius Management"
                />
              </NavLink>
              <NavLink
                to="/mooner/details/radius_management"
                className={"navlink"}
              >
                <Typography className={classes.linkNames}>
                  Radius Management
                </Typography>
              </NavLink> */}
              <NavLink
                to="/mooner/details/country_management_list"
                className={
                  location.pathname ===
                  "/mooner/details/country_management_list"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Country}
                  className={classes.links}
                  alt="Country Management"
                  title="Country Management"
                />
              </NavLink>
              <NavLink
                to="/mooner/details/country_management_list"
                className={"navlink"}
              >
                <Typography className={classes.linkNames}>
                  Country Management List
                </Typography>
              </NavLink>
              <NavLink
                to="/mooner/details/sub_admins"
                className={
                  location.pathname === "/mooner/details/sub_admins"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={SubAdmins}
                  className={classes.links}
                  alt="Sub Admins"
                  title="Sub Admins"
                />
              </NavLink>
              <NavLink to="/mooner/details/sub_admins" className={"navlink"}>
                <Typography className={classes.linkNames}>
                  Sub Admins
                </Typography>
              </NavLink>

              {/* <NavLink
                to="/mooner/details/report_management"
                className={
                  location.pathname === "/mooner/details/report_management"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Reports}
                  className={classes.links}
                  alt="Report Management"
                  title="Report Management"
                />
              </NavLink>
              <NavLink
                to="/mooner/details/report_management"
                className={"navlink"}
              >
                <Typography className={classes.linkNames}>
                  Report Management
                </Typography>
              </NavLink> */}
              <NavLink
                to="/mooner/details/custom_analytics"
                className={
                  location.pathname === "/mooner/details/custom_analytics"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={CustomAnalysis}
                  className={classes.links}
                  alt=" Custome Analytics"
                  title=" Custome Analytics"
                />
              </NavLink>
              <NavLink
                to="/mooner/details/custom_analytics"
                className={"navlink"}
              >
                <Typography className={classes.linkNames}>
                  Custom Analytics
                </Typography>
              </NavLink>

              <NavLink
                to="/mooner/details/mooner_management"
                className={
                  location.pathname === "/mooner/details/mooner_management"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={Info}
                  className={classes.links}
                  alt="Mooner Management"
                  title="Mooner Management"
                />
              </NavLink>
              <NavLink
                to="/mooner/details/mooner_management"
                className={"navlink"}
              >
                <Typography className={classes.linkNames}>
                  Mooner Management
                </Typography>
              </NavLink>
              <NavLink
                to="/mooner/details/dispute_management"
                className={
                  location.pathname === "/mooner/details/dispute_management"
                    ? "active-sidebar navlink"
                    : "navlink"
                }
              >
                <img
                  src={DisputeIcon}
                  className={classes.links}
                  alt="Dispute Management"
                  title="Dispute Management"
                />
              </NavLink>
              <NavLink
                to="/mooner/details/dispute_management"
                className={"navlink"}
              >
                <Typography className={classes.linkNames}>
                  Dispute Management
                </Typography>
              </NavLink>
              <img
                src={SignOut}
                className={`${classes.links} ${classes.logOut}`}
                alt="SignOut"
                onClick={() => {
                  logoutUser();
                }}
              />
              <Typography
                onClick={() => {
                  logoutUser();
                }}
                className={classes.linkNames}
              >
                Logout
              </Typography>
              <h4 className={classes.myDiv}>none</h4>
            </div>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default connect(null, { logoutUser: logoutUserAction })(SideBar);
