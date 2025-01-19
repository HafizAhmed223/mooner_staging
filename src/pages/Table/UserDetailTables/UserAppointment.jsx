import React, { useState } from "react";
import { useHistory } from "react-router";
import TableBase from ".";

import {
  Typography,
  Button,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";

import { NavLink } from "react-router-dom";

import Active from "../../../assets/svg/green.svg";
import InActive from "../../../assets/svg/red.svg";
import Panding from "../../../assets/svg/yellow.svg";
import Actions from "../../../assets/svg/actions.svg";
import Status from "../../../assets/svg/status.svg";
import Delete from "../../../assets/svg/delete.svg";

const useStyles = makeStyles((mainTheme) => ({
  title: {
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
    marginLeft: mainTheme.spacing(3),
    marginTop: mainTheme.spacing(2),
    marginBottom: mainTheme.spacing(2),
  },
  container: {
    position: "absolute",
    backgroundColor: "#fff",
  },
  collapse: {},
  paper: {
    margin: mainTheme.spacing(0),
  },
  actionContent: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  FlexWrapper: {
    display: "flex",
    padding: mainTheme.spacing(0.5),
  },
  actionImage: {
    cursor: "pointer",
  },
  links: {
    textDecoration: "none",
  },
  actionsLabel: {
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    color: "#20253B",
    marginLeft: mainTheme.spacing(2),
    cursor: "pointer",
  },
  btnWrapper: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  },
  editBtn: {
    width: "97%",
    height: "60px",
    borderRadius: "24px",
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(1),
    marginBottom: mainTheme.spacing(4),
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "0.2em",
    color: "#20253B",
    backgroundColor: "white",
    boxShadow: "none",
  },
}));

const UserAppointment = () => {
  const history = useHistory();
  const classes = useStyles();
  const DATA = [
    {
      id: 1,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "active",
    },
    {
      id: 1,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "inactive",
    },
    {
      id: 1,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
  ];

  const COLUMNS = [
    {
      Header: "Seeker",
      accessor: "seeker",
    },
    {
      Header: "Catagory",
      accessor: "catagory",
    },
    {
      Header: "Booking Date",
      accessor: "booking_date",
    },
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Schedule Date",
      accessor: "schedule_date",
    },
    {
      Header: "Schedule Time",
      accessor: "schedule_time",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: function renderStatus(props) {
        return (
          <>
            {props.value === "Active" && <img src={Active} />}
            {props.value === "Inactive" && <img src={InActive} />}
            {props.value === "OnHold" && <img src={Panding} />}
          </>
        );
      },
    },
    {
      Header: " ",
      accessor: "",
      Cell: function renderActions() {
        const [isChecked, setIsChecked] = useState(false);
        const handleClose = () => {
          setIsChecked(null);
        };
        return (
          <>
            <Button
              onClick={(event) => {
                setIsChecked(event.currentTarget);
              }}
            >
              <img src={Actions} className="actions" />
            </Button>
            <div className={classes.container}>
              <Menu
                id="simple-menu"
                anchorEl={isChecked}
                keepMounted
                open={Boolean(isChecked)}
                onClose={handleClose}
              >
                <MenuItem>
                  <div className={classes.FlexWrapper}>
                    <img src={Status} className={classes.actionImage} />
                    <NavLink
                      to="/mooner/appoitment/change_status"
                      className={classes.links}
                    >
                      <Typography className={classes.actionsLabel}>
                        Change Status
                      </Typography>
                    </NavLink>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className={classes.FlexWrapper}>
                    <img src={Delete} className={classes.actionImage} />
                    <Typography className={classes.actionsLabel}>
                      Delete
                    </Typography>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </>
        );
      },
    },
  ];

  const handleClick = () => {
    history.push({
      pathname: "/mooner/all_appointments",
    });
  };

  return (
    <>
      <Typography className={classes.title}>Appointment</Typography>
      <TableBase DATA={DATA} COLUMNS={COLUMNS} />
      <div className={classes.btnWrapper}>
        <Button
          variant="contained"
          size="large"
          className={classes.editBtn}
          onClick={handleClick}
        >
          View All
        </Button>
      </div>
    </>
  );
};

export default UserAppointment;
