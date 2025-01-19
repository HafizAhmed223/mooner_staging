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
import { connect } from "react-redux";
import {
  DAYS,
  MONTHS,
  getWeekDate,
  DateOption,
  getTotalDaysOfMonth,
  getMonthDate,
  getPreviousWeekDate,
} from "../utils";
import { getAllStats } from "../redux/actions/auth/auth.action";
import Brightness from "../assets/svg/brightness.svg";
import Notifications from "../assets/svg/notifications.svg";

import leftArrow from "../assets/svg/leftArrow.svg";
import rightArrow from "../assets/svg/rightArrow.svg";
import Notes from "../assets/svg/notes.svg";
import ServiceProvider from "../assets/svg/serviceProvider.svg";
import PlayStore from "../assets/svg/playStore.svg";
import AppStore from "../assets/svg/appStore.svg";
import User from "../assets/svg/user.svg";
import Flag from "../assets/svg/flag.svg";
import Bars from "../assets/svg/bars.svg";
import Ellipse1 from "../assets/svg/Ellipse1.svg";
import Ellipse2 from "../assets/svg/Ellipse2.svg";
import Ellipse3 from "../assets/svg/Ellipse3.svg";
import Ellipse4 from "../assets/svg/Ellipse4.svg";
import Ellipse5 from "../assets/svg/Ellipse5.svg";
import Ellipse6 from "../assets/svg/Ellipse6.svg";
import Ellipse7 from "../assets/svg/Ellipse7.svg";
import Profile from "../assets/images/monnerNotificationImage.png";

import { BASE_URL } from "../utils/";
import { useEffect } from "react";
import {
  getAllNotification,
  updateNotification,
} from "./../redux/actions/notifications/notification.actions";
import moment from "moment";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
const RightPenal = ({
  name,
  image,
  getAllStats,
  stats,
  notificationList,
  getAllNotification,
  updateNotification,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [drawerState, setDrawerState] = React.useState({
    right: false,
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
  const [sDate, setSdate] = React.useState(
    new Date().getFullYear() +
    `${"-"}` +
    DateOption[month] +
    `${"-"}` +
    new Date().getDate()
  );
  useEffect(() => {
    const payload = {
      date: sDate,
    };
    if (payload) {
      getAllStats(payload);
    }
  }, [sDate]);
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
    setSdate(
      `${new Date().getFullYear() +
      "-" +
      `${DateOption[month]}` +
      "-" +
      `${activeDate.day + index}`
      }`
    );
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
    getAllNotification();
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const history = useHistory();
  const edit_pending_dispute = (e, dispute) => {
    updateNotification({ id: dispute?.id, read_status: false });
    //('dispute', dispute)
    if (dispute?.type === "Dispute") {
      history.push({
        pathname: "/mooner/edit_pending_dispute/" + dispute?.type_id,
      });
    } else if (dispute?.type === "CabDispute") {
      history.push({
        pathname: "/mooner/edit_pending_cab_dispute/" + dispute?.type_id,
      });
    } else {
      // //('dispute?.type', dispute?.type)

      history.push({
        pathname: `/mooner/edit_ticket/${dispute?.type_id}/`,
      });
    }
  };
  const NotificationsList = (anchor) => (
    <div
      className={classes.drawarContainer}
      role="presentation"
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid container>
        <Grid item lg={1}></Grid>
        <Grid item lg={3}>
          <br />
          <Typography
            variant="h1"
            style={{ cursor: "pointer" }}
            onClick={toggleDrawer(anchor, false)}
          >
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
      {notificationList?.map((data, index) => (
        <div
          onClick={(e) => edit_pending_dispute(e, data)}
          style={{ cursor: "pointer" }}
        >
          <Container>
            <Grid container>
              <Grid item lg={3} xl={2}>
                <img
                  src={
                    data?.profile_image === "" ? Profile : data?.profile_image
                  }
                  className={classes.userImg}
                />
              </Grid>
              <Grid item lg={9} xl={10}>
                <div className={classes.notificationContainer}>
                  <Typography
                    variant="subtitle2"
                    className={`${classes.name} ${classes.actionsLabel}`}
                  >
                    {" "}
                    {data?.user_name}
                  </Typography>
                  <Typography className={classes.time}>
                    {moment(data?.created_at).fromNow()}{" "}
                  </Typography>
                </div>
                <Typography className={classes.disp}>
                  {" "}
                  {data?.message_body}
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <Divider />
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.rightPenal}>
          <Grid item container spacing={2}>
            <Grid item xs={5}>
              <div className={classes.headerIcon}>
                <img
                  src={Brightness}
                  className={classes.rightBarIcon}
                  alt="Brightness"
                />
                {notificationList?.filter(res => res != null && res != {}).every(
                  (item) => item.read_status === true
                ) ? (
                  <div
                    className={classes.rightBarIcon}
                    alt="Notifications"
                    onClick={toggleDrawer("right", true)}
                  >
                    <NotificationsNoneIcon color="secondary" />
                  </div>
                ) : (
                  <img
                    src={Notifications}
                    className={classes.rightBarIcon}
                    alt="Notifications"
                    onClick={toggleDrawer("right", true)}
                  />
                )}

                <Drawer
                  className={classes.drawerstyle}
                  anchor={"right"}
                  open={drawerState["right"]}
                  onClose={toggleDrawer("right", false)}
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
                  {/* <img
                    src={`${BASE_URL}/media/user_images/585e4bf3cb11b227491c339a.png`}
                    className={classes.ProfileImage}
                  /> */}
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
                  {stats && stats.active_orders}
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
                  {stats && stats.completed_orders}
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

          <div className={classes.statsMainWrapper}>
            <div className={classes.statsContentWrapper}>
              <div className={classes.statsContent}>
                <img src={ServiceProvider} className={classes.notesImage} />
                <Typography className={classes.orderamount}>
                  {stats && stats.total_user_type_sp}
                </Typography>
                <Typography className={classes.pandingOrder}>
                  Sp services
                </Typography>
              </div>
            </div>
          </div>

          <div className={classes.statsMainWrapper}>
            <div className={classes.statsContentWrapper}>
              <div className={classes.statsContent}>
                <img src={User} className={classes.notesImage} />
                <Typography className={classes.orderamount}>
                  {stats && stats.total_users}
                </Typography>
                <Typography className={classes.pandingOrder}>
                  Total User
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
                  {stats && stats.weekly_sign_ups}
                </Typography>
                <img src={Bars} className={classes.graph} />
              </div>
            </div>
          </div>

          <div className={classes.statsMainWrapper}>
            <div className={classes.statsContentWrapper}>
              <div className={classes.statsContent}>

                <a href="https://play.google.com/console/u/0/developers/?_gl=1*1cdavkw*_up*MQ..&gclid=CjwKCAjwko21BhAPEiwAwfaQCAjuE7BGo50cxY9pbLzeuu31ErMftxmDuqlB670HrXGoqdhBLaAS2RoChaUQAvD_BwE " target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none',display:'flex' }}>
                  <img src={PlayStore} className={classes.notesImage} />
                  <span style={{padding:'10px',color:'#20253b'}}> Google play console</span>
                </a>
              </div>
            </div>
          </div>
          <div className={classes.statsMainWrapper} style={{ marginBottom: '10px' }}>
            <div className={classes.statsContentWrapper}>
              <div className={classes.statsContent}>

                <a href="https://appstoreconnect.apple.com/login" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none',display:'flex' }}>
                  <img src={AppStore} className={classes.notesImage} width={40} />
                  <span style={{padding:'10px',color:'#20253b'}}>  Appstore connect</span>
                </a>
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
    </>
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
  rightPenal: {
    backgroundColor:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
    borderRadius: "40px 40px 40px 40px",
    paddingLeft: mainTheme.spacing(0),
    marginLeft: mainTheme.spacing(0),
    height: "auto",
    maxWidth: "100%",
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
    [mainTheme.breakpoints.up("xl")]: {
      marginLeft: mainTheme.spacing(8),
      fontSize: "22px",
      animation: "fadeIn",
      animationDuration: "1s",
    },
    [mainTheme.breakpoints.only("lg")]: {
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
    width: "70%",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
    [mainTheme.breakpoints.up("xl")]: {
      animation: "fadeInRight",
      animationDuration: "2s",
    },
    [mainTheme.breakpoints.only("lg")]: {
      width: "82%",
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
    [mainTheme.breakpoints.up("xl")]: {
      marginLeft: mainTheme.spacing(8),
      fontSize: "22px",
      animation: "fadeIn",
      animationDuration: "1s",
    },
    [mainTheme.breakpoints.only("lg")]: {
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
    width: "90%",
    height: "auto",
    borderRadius: "24px",
    boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
    [mainTheme.breakpoints.up("xl")]: {
      width: "75%",
      marginLeft: mainTheme.spacing(5),
      animation: "fadeInUp",
      animationDuration: "1s",
    },
    [mainTheme.breakpoints.only("lg")]: {
      width: "82%",
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
    [mainTheme.breakpoints.only("xl")]: {
      marginTop: mainTheme.spacing(6),
      marginLeft: mainTheme.spacing(4.5),
      animation: "flipInX",
      animationDuration: "2s",
    },
    [mainTheme.breakpoints.only("lg")]: {
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
  drawerstyle: {
    "& .MuiDrawer-paper": {
      borderRadius: "40px 0px 0px 40px",
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
  links: {
    textDecoration: "none",
  },
  actionsLabel: {
    color: "#20253B",
    cursor: "pointer",
  },
}));

const mapStateToProps = ({ auth, notification }) => {
  return {
    // stats: auth.stats.data,
    notificationList: notification?.data?.results || [],
  };
};

export default connect(mapStateToProps, {
  getAllStats,
  getAllNotification,
  updateNotification,
})(RightPenal);
