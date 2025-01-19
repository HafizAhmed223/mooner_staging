import React from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Input,
  FormControl,
  Select,
  InputLabel,
  GridList,
  GridListTile,
  Container,
  Drawer,
  List,
  Divider,
} from "@material-ui/core";
import Allocate from "../../assets/svg/allocate.svg";
import Menu from "../../assets/svg/menu.svg";

import {
  DAYS,
  MONTHS,
  getWeekDate,
  getTotalDaysOfMonth,
  getMonthDate,
  getPreviousWeekDate,
} from "../../utils";
import { BASE_URL } from "../../utils/";
import { NavLink, useLocation } from "react-router-dom";

import Brightness from "../../assets/svg/brightness.svg";
import Notifications from "../../assets/svg/notifications.svg";

import leftArrow from "../../assets/svg/leftArrow.svg";
import rightArrow from "../../assets/svg/rightArrow.svg";
import Notes from "../../assets/svg/notes.svg";
import Flag from "../../assets/svg/flag.svg";
import Bars from "../../assets/svg/bars.svg";
import Ellipse1 from "../../assets/svg/Ellipse1.svg";
import Ellipse2 from "../../assets/svg/Ellipse2.svg";
import Ellipse3 from "../../assets/svg/Ellipse3.svg";
import Ellipse4 from "../../assets/svg/Ellipse4.svg";
import Ellipse5 from "../../assets/svg/Ellipse5.svg";
import Ellipse6 from "../../assets/svg/Ellipse6.svg";
import Ellipse7 from "../../assets/svg/Ellipse7.svg";
import Profile from "../../assets/svg/profile.svg";

import UserManagement from "../../assets/svg/userManagement.svg";
import ServiceProvider from "../../assets/svg/serviceProvider.svg";
import Documents from "../../assets/svg/document.svg";
import Currency from "../../assets/svg/currency.svg";
import Wallet from "../../assets/svg/wallet.svg";
import FAQs from "../../assets/svg/Group.svg";
import Password from "../../assets/svg/password.svg";
import Catagory from "../../assets/svg/category.svg";
import SignOut from "../../assets/svg/signout.svg";
import Ticket from "../../assets/svg/notes.svg";
import Questionaire from "../../assets/svg/questionaire.svg";
import Announcement from "../../assets/svg/announcement.svg";
import Banner from "../../assets/svg/banner.svg";
import SP from "../../assets/svg/sp.svg";
import MarchanddistStore from "../../assets/svg/marchantdiseStore.svg";
import CollectionManagement from "../../assets/svg/collectionManagement.svg";
import Subscribtion from "../../assets/svg/subscribtion.svg";
import Radius from "../../assets/svg/radius.svg";
import Country from "../../assets/svg/country.svg";
import SubAdmins from "../../assets/svg/subAdmins.svg";
import Reports from "../../assets/svg/report.svg";
import DisputeIcon from "../../assets/svg/dispute.svg";
import Info from "../../assets/svg/info.svg";
import CategoryKyc from "../../assets/svg/categoryKyc.svg";

import { connect } from "react-redux";
import { logoutUserAction } from "../../redux/actions/auth/auth.action";
const ResponsiveTopbar = ({ logoutUser }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [drawerState, setDrawerState] = React.useState({
    right: false,
  });
  const [notifDrawerState, setNotifDrawerState] = React.useState({
    right: false,
  });
  const [menuDrawerState, setMenuDrawerState] = React.useState({
    left: false,
  });
  const [dumynotif, setDummyNotif] = React.useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
  const [month, setMonth] = React.useState(MONTHS[new Date().getMonth()]);
  const [activeDate, setActiveDate] = React.useState({
    month: new Date().getMonth(),
    day: new Date().getDate(),

    year: new Date().getFullYear(),
    shouldChangeTheMonth:
      new Date().getDate() + 7 >
      getTotalDaysOfMonth({
        month: new Date().getMonth(),
        day: new Date().getDate(),
        year: new Date().getFullYear(),
      }),
  });
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().getDate() + month
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setMonth(event.target.value);

    const index = MONTHS.indexOf(event.target.value);

    setActiveDate({ ...activeDate, month: index });
  };
  const onDateSelect = (index) => {
    setSelectedDate(activeDate.day + index + month);
  };
  const onNextClick = () => {
    let nextDate;
    if (activeDate.shouldChangeTheMonth) {
      nextDate = getMonthDate(activeDate);
    } else {
      nextDate = getWeekDate(activeDate);
    }

    setActiveDate({
      ...activeDate,
      day: nextDate.getDate(),
      month: nextDate.getMonth(),

      year: nextDate.getFullYear(),
      shouldChangeTheMonth:
        nextDate.getDate() + 7 > getTotalDaysOfMonth(activeDate),
    });

    if (MONTHS[nextDate.getMonth()] !== month)
      setMonth(MONTHS[nextDate.getMonth()]);
  };
  const onPrevClick = () => {
    const nextDate = getPreviousWeekDate(activeDate);
    setActiveDate({
      ...activeDate,
      day: nextDate.getDate(),
      month: nextDate.getMonth(),

      year: nextDate.getFullYear(),
    });
    if (MONTHS[nextDate.getMonth()] !== month)
      setMonth(MONTHS[nextDate.getMonth()]);
  };

  const renderDay = (index) =>
    new Date(
      activeDate.year,
      activeDate.month,
      activeDate.day + index
    ).getDay();

  const shouldRender = (index) =>
    activeDate.day + index <= getTotalDaysOfMonth(activeDate);

  //Drawer Component

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const toggleNotifDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setNotifDrawerState({ ...notifDrawerState, [anchor]: open });
  };

  const toggleMenuDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setMenuDrawerState({ ...menuDrawerState, [anchor]: open });
  };

  const NotificationsList = (anchor) => (
    <div
      className={classes.drawarContainer}
      role="presentation"
      onClick={toggleNotifDrawer(anchor, false)}
      onKeyDown={toggleNotifDrawer(anchor, false)}
    >
      <Grid container>
        <Grid item lg={1}></Grid>
        <Grid item lg={3}>
          <br />
          <Typography variant="h1" style={{ cursor: "pointer" }}>
            {" "}
            x{" "}
          </Typography>
        </Grid>
        <Grid item lg={7}>
          <br />
          <Typography variant="h6"> Notifications </Typography>
        </Grid>
      </Grid>
      <br />
      <Divider />
      {dumynotif.map((data, index) => (
        <React.Fragment key={index}>
          <Container>
            <Grid container>
              <Grid item lg={3} xl={2}>
                <img src={Profile} className={classes.userImg} />
              </Grid>
              <Grid item lg={9} xl={10}>
                <div className={classes.notificationContainer}>
                  <Typography variant="subtitle2" className={classes.name}>
                    {" "}
                    Jhon David{" "}
                  </Typography>
                  <Typography className={classes.time}> 2 min ago </Typography>
                </div>
                <Typography className={classes.disp}>
                  {" "}
                  Here are many variations of passages of Lorem Ipsum available,{" "}
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <Divider />
        </React.Fragment>
      ))}
    </div>
  );

  //================================//
  //      Right Penal Drawer        //
  //================================//

  ////////////////////////////////////////////////////////////////////////////////

  const RightPenal = (anchor) => (
    <>
      <div
        className={classes.drawarContainer}
        role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
      >
        <Grid container>
          <Grid item xs={12} className={classes.rightPenal}>
            <h4
              className={classes.closeIconRightPenal}
              onClick={toggleDrawer(anchor, false)}
            >
              {" "}
              X{" "}
            </h4>
            <Grid
              item
              container
              // spacing={2}
            >
              <Grid item xs={5}>
                <div className={classes.headerIcon}>
                  <img
                    src={Brightness}
                    className={classes.rightBarIcon}
                    alt="Brightness"
                  />
                  <img
                    src={Notifications}
                    className={classes.rightBarIcon}
                    alt="Notifications"
                    onClick={toggleNotifDrawer("right", true)}
                  />
                  <Drawer
                    className={classes.notifdrawerstyle}
                    anchor={"right"}
                    open={notifDrawerState["right"]}
                    onClose={toggleNotifDrawer("right", false)}
                  >
                    {NotificationsList("right")}
                  </Drawer>
                </div>
              </Grid>

              <Grid item xs={7}>
                <div className={classes.ProfileWrapper}>
                  <div className={classes.userInfo}>
                    <Typography className={classes.userName}>
                      Master Admin
                    </Typography>
                    <Typography className={classes.userRole}>
                      Master Admin
                    </Typography>
                  </div>
                  <div className={classes.ProfileImageWrapper}>
                    <img
                      src={`${BASE_URL}/media/user_images/585e4bf3cb11b227491c339a.png`}
                      className={classes.ProfileImage}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
            <Container>
              <Grid item container>
                <Grid item xs={8} lg={8}>
                  <div className={classes.calanderHeader}>
                    <Typography className={classes.calanderHeading}>
                      Mooner Calendar
                    </Typography>
                    <img
                      src={leftArrow}
                      className={classes.leftIcon}
                      onClick={onPrevClick}
                    />
                    <img
                      src={rightArrow}
                      className={classes.leftIcon}
                      onClick={onNextClick}
                    />
                  </div>
                </Grid>
                <Grid item xs={4} lg={4}>
                  <Button
                    variant="contained"
                    color="#fff"
                    className={classes.joinBtn}
                    onClick={handleClickOpen}
                  >
                    {month}
                  </Button>
                </Grid>
              </Grid>
            </Container>
            {/* Admin Calender */}
            <Container className={classes.gridListContainer}>
              <GridList className={classes.gridList} cols={7}>
                {DAYS.map((day, index) => (
                  <GridListTile
                    style={{
                      padding: 0,
                      width: shouldRender(index) ? "auto" : "14.2857%",
                    }}
                    key={day}
                    onClick={() => {
                      onDateSelect(index);
                    }}
                  >
                    {shouldRender(index) && (
                      <div
                        style={
                          activeDate.day + index + month === selectedDate
                            ? {
                                backgroundColor: "#FEDB29",
                                color: "#20253B",
                                borderRadius: "10px",
                              }
                            : {}
                        }
                        className={classes.gridListTileItem}
                      >
                        <Typography className={classes.typeStyle}>
                          {DAYS[renderDay(index)]}
                        </Typography>
                        <Typography className={classes.typeStyle}>
                          {activeDate.day + index}
                        </Typography>
                      </div>
                    )}
                  </GridListTile>
                ))}
              </GridList>
            </Container>
            {/* </div> */}
            <Typography gutterBottom={true} className={classes.orderStat}>
              Order Stats
            </Typography>
            {/* Panding order stats Design */}
            <div className={classes.statsMainWrapper}>
              <div className={classes.statsContentWrapper}>
                <div className={classes.statsContent}>
                  <img src={Notes} className={classes.notesImage} />
                  <Typography className={classes.orderamount}>
                    {Math.floor(Math.random() * 100)}
                  </Typography>
                  <Typography className={classes.pandingOrder}>
                    Active Orders
                  </Typography>
                </div>
              </div>
            </div>
            {/* Completed order stats Design */}
            <div className={classes.statsMainWrapper}>
              <div className={classes.statsContentWrapper}>
                <div className={classes.statsContent}>
                  <img src={Flag} className={classes.notesImage} />
                  <Typography className={classes.completedOderAmount}>
                    {" "}
                    {Math.floor(Math.random() * 100)}
                  </Typography>
                  <Typography className={classes.orderCompleted}>
                    Completed Orders
                  </Typography>
                </div>
              </div>
            </div>
            <Typography
              gutterBottom={true}
              className={classes.teamContainerTitle}
            >
              Admin Team
            </Typography>
            <div className={classes.teamMemberContainer}>
              <div className={classes.teamMedia}>
                <div className={classes.mediaO}>
                  <img src={Ellipse1} className={classes.adminImage} />
                </div>
                <div className={classes.mediaT}>
                  <img src={Ellipse3} className={classes.adminImage} />
                </div>
                <div className={`${classes.mediaT} ${classes.mediaF}`}>
                  <img src={Ellipse2} className={classes.adminImage} />
                </div>
                <div className={`${classes.mediaT} ${classes.mediaS}`}>
                  <img src={Ellipse4} className={classes.adminImage} />
                </div>
                <div className={`${classes.mediaT} ${classes.mediaSM}`}>
                  <img src={Ellipse5} className={classes.adminImage} />
                </div>
                <div className={`${classes.mediaT} ${classes.mediaMO}`}>
                  <img src={Ellipse6} className={classes.adminImage} />
                </div>
                <div className={`${classes.mediaT} ${classes.mediaMS}`}>
                  <img src={Ellipse7} className={classes.adminImage} />
                </div>
                <div className={classes.mediaMT}>
                  <Typography className={classes.addMember}>
                    + <span className={classes.number}> 15 </span>
                  </Typography>
                </div>
              </div>
            </div>
            {/* Analysis Container Design */}
            <div className={classes.analysisMainWrapper}>
              <div className={classes.analysisContent}>
                <Typography className={classes.analysisTitle}>
                  Weekly Signups
                </Typography>
                <div className={classes.analysisFooter}>
                  <Typography className={classes.signUpsCounter}>
                    {Math.floor(Math.random() * 300)}
                  </Typography>
                  <img src={Bars} className={classes.graph} />
                </div>
              </div>
            </div>
          </Grid>
          <DateDialog
            open={open}
            handleClose={handleClose}
            handleChange={handleChange}
            month={month}
          />
        </Grid>
      </div>
    </>
  );

  ///////////////////////////////////////////////////////////////////////////////

  //================================//
  //      Menu Drawer               //
  //================================//

  ///////////////////////////////////////////////////////////////////

  const MenuDrawer = (anchor) => (
    <>
      <div
        className={classes.menudrawarContainer}
        role="presentation"
        // onClick={toggleMenuDrawer(anchor, false)}
        // onKeyDown={toggleMenuDrawer(anchor, false)}
      ></div>
      <div className={classes.root}>
        <Grid container className={classes.mainGridContainer}>
          <Grid
            item
            xs={12}
            lg={12}
            xl={12}
            className={classes.sidebarContainer}
          >
            <Container className={classes.scrollbar}>
              <Typography className={classes.navHeading}>mooner</Typography>
              <div
                className={classes.navWrapper}
                onClick={toggleMenuDrawer(anchor, false)}
                onKeyDown={toggleMenuDrawer(anchor, false)}
              >
                <NavLink
                  to="/mooner/details/user_management"
                  className={
                    location.pathname === "/mooner/details/user_management"
                      ? "active-sidebar"
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
                      ? "active-sidebar"
                      : ""
                  }
                >
                  <img
                    src={SP}
                    className={classes.links}
                    alt="ServiceProvider"
                    title="Service Provider"
                  />
                </NavLink>
                <NavLink
                  to="/mooner/details/sp_management"
                  className={"navlink"}
                >
                  <Typography className={classes.linkNames}>
                    Service Provider
                  </Typography>
                </NavLink>
                <NavLink
                  to="/mooner/details/questionaire"
                  className={
                    location.pathname === "/mooner/details/questionaire"
                      ? "active-sidebar"
                      : ""
                  }
                >
                  <img
                    src={Questionaire}
                    className={classes.links}
                    alt="questionaire"
                    title="Questionaire"
                  />
                </NavLink>
                <NavLink
                  to="/mooner/details/questionaire"
                  className={"navlink"}
                >
                  <Typography className={classes.linkNames}>
                    Questionnaire
                  </Typography>
                </NavLink>
                <NavLink
                  to="/mooner/details/document_management"
                  className={
                    location.pathname === "/mooner/details/document_management"
                      ? "active-sidebar"
                      : ""
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
                      ? "active-sidebar"
                      : ""
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
                <NavLink
                  to="/mooner/details/mnr"
                  className={
                    location.pathname === "/mooner/details/mnr"
                      ? "active-sidebar"
                      : ""
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
                      ? "active-sidebar"
                      : ""
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
                      ? "active-sidebar"
                      : ""
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
                      ? "active-sidebar"
                      : ""
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
                <NavLink
                  to="/mooner/details/categories"
                  className={
                    location.pathname === "/mooner/details/categories"
                      ? "active-sidebar"
                      : ""
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
                <NavLink
                  to="/mooner/details/category_kyc"
                  className={"navlink"}
                >
                  <Typography className={classes.linkNames}>
                    Category KYC
                  </Typography>
                </NavLink>

                <NavLink
                  to="/mooner/details/announcemet"
                  className={
                    location.pathname === "/mooner/details/announcemet"
                      ? "active-sidebar"
                      : ""
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
                <NavLink
                  to="/mooner/details/aproved_banner"
                  className={
                    location.pathname === "/mooner/details/aproved_banner"
                      ? "active-sidebar"
                      : ""
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
                </NavLink>
                <NavLink
                  to="/mooner/details/merchandise_store_management"
                  className={
                    location.pathname ===
                    "/mooner/details/merchandise_store_management"
                      ? "active-sidebar"
                      : ""
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
                </NavLink>
                <NavLink
                  to="/mooner/details/cancellation_management"
                  className={
                    location.pathname ===
                    "/mooner/details/cancellation_management"
                      ? "active-sidebar"
                      : ""
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
                <NavLink
                  to="/mooner/details/subscription_management"
                  className={
                    location.pathname ===
                    "/mooner/details/subscription_management"
                      ? "active-sidebar"
                      : ""
                  }
                >
                  <img
                    src={Subscribtion}
                    className={classes.links}
                    alt="Subscribtion Management"
                    title="Subscribtion Management"
                  />
                </NavLink>
                <NavLink
                  to="/mooner/details/subscription_management"
                  className={"navlink"}
                >
                  <Typography className={classes.linkNames}>
                    Subscription Managment
                  </Typography>
                </NavLink>
                <NavLink
                  to="/mooner/details/radius_management"
                  className={
                    location.pathname === "/mooner/details/radius_management"
                      ? "active-sidebar"
                      : ""
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
                </NavLink>
                <NavLink
                  to="/mooner/details/country_management_list"
                  className={
                    location.pathname ===
                    "/mooner/details/country_management_list"
                      ? "active-sidebar"
                      : ""
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
                      ? "active-sidebar"
                      : ""
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

                <NavLink
                  to="/mooner/details/mooner_management"
                  className={
                    location.pathname === "/mooner/details/mooner_management"
                      ? "active-sidebar"
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
                      ? "active-sidebar "
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

                <NavLink
                  to="/mooner/details/report_management"
                  className={
                    location.pathname === "/mooner/details/report_management"
                      ? "active-sidebar"
                      : ""
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
    </>
  );

  ///////////////////////////////////////////////////////////////////

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.headerContainer}>
          <img
            src={Menu}
            className={classes.menuIcon}
            onClick={toggleMenuDrawer("left", true)}
          />
          <Drawer
            className={classes.menudrawerstyle}
            anchor={"left"}
            open={menuDrawerState["left"]}
            onClose={toggleMenuDrawer("left", false)}
          >
            {MenuDrawer("left")}
          </Drawer>
          <Typography className={classes.brand}> mooner </Typography>
          <img
            src={Allocate}
            className={classes.profileIcon}
            onClick={toggleDrawer("right", true)}
          />
          <Drawer
            className={classes.drawerstyle}
            anchor={"right"}
            open={drawerState["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {RightPenal("right")}
          </Drawer>
        </div>
      </Grid>
    </Grid>
  );
};

const DateDialog = ({ open, handleClose, handleChange, month }) => {
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Select Month</DialogTitle>
      <DialogContent>
        <form style={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl style={{ margin: 8, minWidth: 120 }}>
            <InputLabel id="demo-dialog-select-label">Month</InputLabel>
            <Select
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={month}
              onChange={handleChange}
              input={<Input />}
            >
              {MONTHS.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((mainTheme) => ({
  headerContainer: {
    display: "none",
    [mainTheme.breakpoints.down("md")]: {
      display: "flex",
      backgroundColor: "#20253B",
      alignItems: "center",
      justifyContent: "space-between",
      height: "70px",
      borderRadius: "20px 20px 0px 0px",
    },
  },
  brand: {
    color: "white",
    fontFamily: "Kodchasan",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14.2803px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    cursor: "pointer",
    [mainTheme.breakpoints.only("xs")]: {
      marginRight: mainTheme.spacing(4),
    },
  },
  menuIcon: {
    height: "40px",
    width: "50px",
    marginLeft: mainTheme.spacing(3),
    cursor: "pointer",
  },
  profileIcon: {
    height: "40px",
    width: "40px",
    cursor: "pointer",
    marginRight: mainTheme.spacing(4),
    [mainTheme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  drawarContainer: {},
  menudrawarContainer: {
    width: "150px",
  },
  rightPenal: {
    backgroundColor:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
    borderRadius: "40px 40px 40px 40px",
    paddingLeft: mainTheme.spacing(0),
    marginLeft: mainTheme.spacing(0),
    height: "100%",
    maxWidth: "100%",
    overflowX: "hidden",
    [mainTheme.breakpoints.up("xl")]: {
      marginBottom: mainTheme.spacing(3),
    },
    [mainTheme.breakpoints.only("lg")]: {
      borderRadius: "20px 20px 20px 20px",
      marginBottom: mainTheme.spacing(3),
    },
  },
  headerIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: mainTheme.spacing(8),
    paddingLeft: mainTheme.spacing(2),
    [mainTheme.breakpoints.up("xl")]: {
      paddingLeft: mainTheme.spacing(4),
    },
  },
  rightBarIcon: {
    height: "25px",
    width: "25px",
    cursor: "pointer",
    [mainTheme.breakpoints.up("xl")]: {
      animation: "fadeInDownBig",
      animationDuration: "1s",
    },
    [mainTheme.breakpoints.only("lg")]: {
      marginTop: "6px",
      animation: "fadeInDownBig",
      animationDuration: "1s",
    },
  },
  ProfileWrapper: {
    marginTop: mainTheme.spacing(5),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    [mainTheme.breakpoints.up("xl")]: {
      justifyContent: "flex-start",
      marginLeft: mainTheme.spacing(5),
      animation: "fadeInDownBig",
      animationDuration: "1s",
    },
    [mainTheme.breakpoints.only("lg")]: {
      justifyContent: "flex-start",
      animation: "fadeInDownBig",
      animationDuration: "1s",
    },
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
  },
  userName: {
    color: "white",
    fontSize: "18px",
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "15px",
      marginTop: mainTheme.spacing(2),
    },
  },
  userRole: {
    color: "white",
    fontSize: "10px",
    marginLeft: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
      marginLeft: mainTheme.spacing(0),
    },
  },
  ProfileImage: {
    height: "50px",
    width: "50px",
    marginLeft: mainTheme.spacing(2),
    [mainTheme.breakpoints.up("xl")]: {
      height: "70px",
      width: "70px",
    },
    [mainTheme.breakpoints.only("lg")]: {
      marginTop: mainTheme.spacing(1),
    },
  },
  calanderHeader: {
    marginTop: mainTheme.spacing(6),
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: mainTheme.spacing(2),
    [mainTheme.breakpoints.only("lg")]: {
      marginBottom: mainTheme.spacing(3),
      marginTop: mainTheme.spacing(8),
      marginLeft: mainTheme.spacing(0),
    },
  },
  calanderHeading: {
    color: "white",
    [mainTheme.breakpoints.up("xl")]: {
      marginLeft: mainTheme.spacing(4),
      fontSize: "22px",
      animation: "fadeInLeft",
      animationDuration: "2s",
    },
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "15px",
      marginLeft: mainTheme.spacing(2),
      animation: "fadeInLeft",
      animationDuration: "2s",
    },
  },
  leftIcon: {
    marginLeft: mainTheme.spacing(2),
    [mainTheme.breakpoints.up("xl")]: {
      animation: "fadeInLeft",
      animationDuration: "2s",
    },
    [mainTheme.breakpoints.only("lg")]: {
      animation: "fadeInLeft",
      animationDuration: "2s",
    },
  },
  joinBtn: {
    height: "35px",
    width: "75px",
    fontSize: "16px",
    marginTop: mainTheme.spacing(5.1),
    marginLeft: mainTheme.spacing(5),
    [mainTheme.breakpoints.up("xl")]: {
      marginLeft: mainTheme.spacing(5),
      animation: "fadeInRight",
      animationDuration: "2s",
    },
    [mainTheme.breakpoints.only("lg")]: {
      marginTop: mainTheme.spacing(7),
      marginLeft: mainTheme.spacing(1.5),
      animation: "fadeInRight",
      animationDuration: "2s",
    },
  },
  orderStat: {
    color: "white",
    marginTop: mainTheme.spacing(5),
    marginBottom: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("md")]: {
      marginLeft: mainTheme.spacing(8),
      fontSize: "22px",
      animation: "fadeIn",
      animationDuration: "1s",
    },
    [mainTheme.breakpoints.only("sm")]: {
      marginLeft: mainTheme.spacing(5),
      fontSize: "15px",
      animation: "fadeIn",
      animationDuration: "1s",
    },
  },
  statsMainWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: mainTheme.spacing(3),
    [mainTheme.breakpoints.only("lg")]: {
      marginLeft: mainTheme.spacing(1),
    },
  },
  statsContentWrapper: {
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
    [mainTheme.breakpoints.down("md")]: {
      width: "72%",
      borderRadius: "10px",
      height: "70px",
      animation: "fadeInRight",
      animationDuration: "2s",
    },
  },
  statsContent: {
    width: "60%",
    height: "80px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    [mainTheme.breakpoints.only("lg")]: {
      width: "70%",
    },
  },
  orderamount: {
    fontSize: "24px",
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.text &&
      mainTheme.palette.text.primary,
    fontWeight: "bold",
  },
  completedOderAmount: {
    fontSize: "24px",
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.text &&
      mainTheme.palette.text.primary,
    fontWeight: "bold",
    marginRight: "-15px",
  },
  pandingOrder: {
    fontSize: "16px",
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.text &&
      mainTheme.palette.text.primary,
  },
  orderCompleted: {
    fontSize: "16px",
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.text &&
      mainTheme.palette.text.primary,
    marginRight: "-35px",
    [mainTheme.breakpoints.only("lg")]: {
      marginRight: "-30px",
      width: "130px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  teamContainerTitle: {
    color: "white",
    marginTop: mainTheme.spacing(5),
    marginBottom: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("md")]: {
      marginLeft: mainTheme.spacing(8),
      fontSize: "22px",
      animation: "fadeIn",
      animationDuration: "1s",
    },
    [mainTheme.breakpoints.only("sm")]: {
      marginLeft: mainTheme.spacing(5),
      fontSize: "15px",
      animation: "fadeIn",
      animationDuration: "1s",
    },
  },
  teamMemberContainer: {
    marginTop: mainTheme.spacing(4),
    marginLeft: mainTheme.spacing(6),
    [mainTheme.breakpoints.only("lg")]: {
      marginLeft: mainTheme.spacing(3),
    },
  },
  teamMedia: {
    width: "90%",
    borderRadius: "24px",
    boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [mainTheme.breakpoints.up("xl")]: {
      marginLeft: mainTheme.spacing(5),
    },
    [mainTheme.breakpoints.only("lg")]: {
      marginLeft: mainTheme.spacing(1),
    },
  },
  mediaO: {
    height: "50px",
    width: "50px",
    borderRadius: "50px",
    border: "4px solid #20253B",
    [mainTheme.breakpoints.only("lg")]: {
      border: "1px solid #20253B",
    },
  },
  mediaT: {
    height: "50px",
    width: "50px",
    borderRadius: "50px",
    position: "relative",
    right: "15px",
    border: "4px solid #20253B",
    [mainTheme.breakpoints.only("lg")]: {
      border: "1px solid #20253B",
    },
  },
  mediaF: {
    right: "30px",
  },
  mediaS: {
    right: "45px",
    zIndex: "1",
  },
  mediaSM: {
    right: "60px",
  },
  mediaMO: {
    right: "75px",
  },
  mediaMS: {
    right: "90px",
  },
  mediaMT: {
    height: "50px",
    width: "50px",
    borderRadius: "50px",
    position: "relative",
    right: "105px",
    backgroundColor:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.secondary &&
      mainTheme.palette.secondary.main,
  },
  addMember: {
    color: "#fff",
    marginLeft: mainTheme.spacing(3),
    paddingRight: mainTheme.spacing(4),
    marginTop: mainTheme.spacing(2),
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  number: {
    marginLeft: mainTheme.spacing(0.5),
  },
  adminImage: {
    height: "50px",
    width: "50px",
  },
  analysisMainWrapper: {
    color: "#fff",
    marginTop: mainTheme.spacing(7),
    marginLeft: mainTheme.spacing(6),
    marginBottom: "316px",
    [mainTheme.breakpoints.only("lg")]: {
      marginLeft: mainTheme.spacing(2),
      marginTop: mainTheme.spacing(7),
    },
  },
  analysisContent: {
    backgroundColor: "#fff",
    height: "auto",
    borderRadius: "24px",
    boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
    [mainTheme.breakpoints.down("md")]: {
      width: "80%",
      borderRadius: "10px",
      marginLeft: mainTheme.spacing(3.5),
      animation: "fadeInUp",
      animationDuration: "1s",
    },
  },
  analysisTitle: {
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.text &&
      mainTheme.palette.text.primary,
    paddingTop: mainTheme.spacing(2),
    marginLeft: mainTheme.spacing(3),
    fontSize: "20px",
  },
  analysisFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  signUpsCounter: {
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.text &&
      mainTheme.palette.text.primary,
    paddingTop: mainTheme.spacing(2),
    marginLeft: mainTheme.spacing(3),
    fontSize: "56px",
    fontWeight: "bold",
  },
  graph: {
    marginTop: mainTheme.spacing(6),
    marginRight: mainTheme.spacing(2),
    width: "13%",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    overflow: "hidden",
  },
  gridListContainer: {
    display: "flex",
    marginTop: mainTheme.spacing(3),
    height: mainTheme.spacing(10),
    [mainTheme.breakpoints.only("md")]: {
      marginTop: mainTheme.spacing(6),
      marginLeft: mainTheme.spacing(4.5),
      animation: "flipInX",
      animationDuration: "2s",
    },
    [mainTheme.breakpoints.only("sm")]: {
      marginTop: mainTheme.spacing(6),
      marginLeft: mainTheme.spacing(1),
      animation: "flipInX",
      animationDuration: "2s",
    },
  },
  gridListTileItem: {
    padding: mainTheme.spacing(1.875),
    color: "white",
    [mainTheme.breakpoints.only("lg")]: {
      marginLeft: mainTheme.spacing(2.5),
    },
  },
  typeStyle: {
    fontSize: "19px",
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "15px",
    },
  },
  notifdrawerstyle: {
    "& .MuiDrawer-paper": {
      borderRadius: "40px 0px 0px 40px",
      height: "100%",
    },
  },
  drawerstyle: {
    "& .MuiDrawer-paper": {
      borderRadius: "40px 0px 0px 40px",
      height: "100%",
      backgroundColor: "#20253b",
      [mainTheme.breakpoints.only("md")]: {
        width: "580px",
      },
      [mainTheme.breakpoints.only("xs")]: {
        width: "480px",
        overflowX: "scroll",
      },
    },
  },
  menudrawerstyle: {
    "& .MuiDrawer-paper": {
      borderRadius: "0px 40px 40px 0px",
      height: "100%",
      backgroundColor: "#20253b",
      scrollbarColor: "transparent transparent",
      scrollbarWidth: "thin",
      "@global": {
        "*::-webkit-scrollbar": {
          width: "0px",
          display: "none",
          "-ms-overflow-style": "none" /* IE 11 */,
          scrollbarWidth: "none",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
        },
      },
    },
  },
  drawarContainer: {
    [mainTheme.breakpoints.up("xl")]: {
      width: "580px",
    },
    [mainTheme.breakpoints.only("lg")]: {
      width: "375px",
    },
  },
  notificationContainer: {
    display: "flex",
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  userImg: {
    height: "65px",
    width: "65px",
    marginTop: mainTheme.spacing(2),
  },
  name: {
    marginLeft: mainTheme.spacing(-1),
    marginTop: mainTheme.spacing(1),
    [mainTheme.breakpoints.up("xl")]: {
      marginTop: mainTheme.spacing(3),
      marginLeft: mainTheme.spacing(-2),
    },
  },
  time: {
    fontSize: "11px",
    marginTop: mainTheme.spacing(2),
    color: "#20253b",
    opacity: "0.6",
    [mainTheme.breakpoints.only("xl")]: {
      marginTop: mainTheme.spacing(3),
    },
  },
  disp: {
    marginLeft: mainTheme.spacing(-1),
    fontSize: "13px",
    color: "#20253b",
    opacity: "0.7",
    [mainTheme.breakpoints.up("xl")]: {
      marginLeft: mainTheme.spacing(-2),
    },
  },
  closeIconRightPenal: {
    color: "white",
    position: "absolute",
    left: "2%",
    top: "-20px",
    cursor: "pointer",
    fontSize: "24px",
  },
  root: {
    flexGrow: 1,
    padding: mainTheme.spacing(0),
    margin: mainTheme.spacing(0),
    maxWidth: "100%",
  },
  sidebarContainer: {
    overflow: "hidden",
    maxWidth: "100%",

    [mainTheme.breakpoints.down("md")]: {
      height: "100%",
    },
  },
  mainGridContainer: {
    maxWidth: "100%",
  },
  navHeading: {
    color: "white",
    [mainTheme.breakpoints.only("md")]: {
      marginTop: mainTheme.spacing(4),
      fontSize: "24px",
      fontWeight: "normal",
      letterSpacing: "1px",
      marginLeft: mainTheme.spacing(1),
    },
    [mainTheme.breakpoints.only("sm")]: {
      marginLeft: mainTheme.spacing(10),
      marginTop: mainTheme.spacing(4),
      fontSize: "23px",
      fontWeight: "normal",
      letterSpacing: "2px",
    },
    [mainTheme.breakpoints.down("xs")]: {
      marginLeft: mainTheme.spacing(10),
      marginTop: mainTheme.spacing(2),
      fontSize: "23px",
      fontWeight: "normal",
      letterSpacing: "2px",
    },
  },
  navWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100%",
    [mainTheme.breakpoints.only("md")]: {
      marginTop: mainTheme.spacing(3),
      minHeight: "1500px",
    },
    [mainTheme.breakpoints.only("sm")]: {
      minHeight: "1200px",
      marginTop: mainTheme.spacing(3),
    },
    [mainTheme.breakpoints.only("xs")]: {
      marginTop: mainTheme.spacing(4),
    },
  },
  links: {
    cursor: "pointer",
    height: "22px",
    width: "25px",
    margin: "10px 0px 0px 0px",
    [mainTheme.breakpoints.down("md")]: {
      height: "22px",
      width: "22px",
    },
    [mainTheme.breakpoints.only("xs")]: {
      height: "15px",
      width: "15px",
    },
  },
  logOut: {
    marginTop: mainTheme.spacing(2),
    [mainTheme.breakpoints.down("sm")]: {
      marginTop: mainTheme.spacing(2),
      marginBottom: mainTheme.spacing(0),
    },
    [mainTheme.breakpoints.down("xs")]: {
      marginTop: mainTheme.spacing(2),
      marginBottom: mainTheme.spacing(0),
    },
  },
  myDiv: {
    color: "#20253B",
  },
  scrollbar: {
    width: "100%",
    minHeight: "100%",
    height: "100%",
  },
  linkNames: {
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
    fontSize: "12px",
    letterSpacing: "0.2em",
    textAlign: "center",
    top: 0,
    // [mainTheme.breakpoints.only("lg")]: {
    //   marginLeft: mainTheme.spacing(2),
    //   // paddingTop: mainTheme.spacing(1),
    //   paddingBottom: mainTheme.spacing(4),
    //   // marginTop: mainTheme.spacing(0),
    //   backgroundColor: "#20253B",
    //   width: "500px",
    // },
    [mainTheme.breakpoints.only("md")]: {
      marginLeft: mainTheme.spacing(0),
      // paddingTop: mainTheme.spacing(1),
      paddingBottom: mainTheme.spacing(4),
      // marginTop: mainTheme.spacing(0),
      backgroundColor: "#20253B",
      width: "100px",
    },
    [mainTheme.breakpoints.only("sm")]: {
      marginLeft: mainTheme.spacing(0),
      // marginTop: mainTheme.spacing(0),
      paddingTop: mainTheme.spacing(0),
      paddingBottom: mainTheme.spacing(3),
      backgroundColor: "#20253B",
    },
    [mainTheme.breakpoints.only("xs")]: {
      marginBottom: "20px",
    },
  },
}));

export default connect(null, { logoutUser: logoutUserAction })(
  ResponsiveTopbar
);
