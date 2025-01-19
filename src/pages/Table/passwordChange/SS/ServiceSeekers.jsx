import React, { useEffect, useState } from "react";
import TableBase from "../../UserDetailTables";

import {
  Menu,
  MenuItem,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { NavLink } from "react-router-dom";

import Active from "../../../../assets/svg/green.svg";
import InActive from "../../../../assets/svg/red.svg";
import Actions from "../../../../assets/svg/actions.svg";
import ChangePassword from "../../../../assets/svg/changePassword.svg";

import Edit from "../../../../assets/svg/edit.svg";
import Delete from "../../../../assets/svg/delete.svg";

import { useHistory } from "react-router-dom";

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
    // marginLeft: mainTheme.spacing(2),
    marginTop: mainTheme.spacing(2),
    marginBottom: mainTheme.spacing(2),
    fontWeight: "600",
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
    [mainTheme.breakpoints.only("lg")]:{
      width: "93%",
      height: "50px",
    }
  },
}));

const ServiceSeekers = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const { sslist } = props;


  const handleClick = () => {
    history.push({
      pathname: '/mooner/details/all_service_seekers'
    })
  }

  // const DATA = [
  //   {
  //     username: "Anna",
  //     email: "anna@gmail.com",
  //     reference_id: 14587,
  //     level: 2,
  //     earning: "$123",
  //     bookings: 30,
  //     status: "active",
  //   },
  //   {
  //     username: "Anna",
  //     email: "anna@gmail.com",
  //     reference_id: 14587,
  //     level: 2,
  //     earning: "$123",
  //     bookings: 30,
  //     status: "active",
  //   },
  //   {
  //     username: "Anna",
  //     email: "anna@gmail.com",
  //     reference_id: 14587,
  //     level: 2,
  //     earning: "$123",
  //     bookings: 30,
  //     status: "active",
  //   },
  // ];

  const COLUMNS = [
    {
      Header: "Name",
      accessor: (d) => `${d.first_name} ${d.last_name}`,
      // accessor: (d) => {
      //   const Name = `${d.user.first_name}`
      //   return(
      //     <div> {(Name).length > 7 ? (((Name).substring(0, 7)) + '...') : Name } </div>
      //   );
      // }  
    },
    {
      Header: "Email",
      accessor: (d) => {
        const Email = `${d.email}`
        return(
          <div> {(Email).length > 7 ? (((Email).substring(0, 13)) + '...') : Email } </div>
        );
      }  
    },
    {
      // Header: "Reference Id",
      Header: "Ref...  Id",
      // accessor: "user.profile.r_code",
      accessor: (d) => {
        const ref =  d  && d.reference_id ? `${d && d.reference_id}` : ""
        return(
          <div> {(ref).length > 7 ? (((ref).substring(0, 5)) + '...') : ref } </div>
        );
      }
    },
    {
      Header: "Level",
      accessor: "level",
    },
    {
      Header: "Earning",
      accessor: "earning",
    },
    {
      Header: "Bookings",
      accessor: "bookings",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: function renderStatus(props) {
        return (
          <>
            {props.value === true && <img src={Active} />}
            {props.value === false && <img src={InActive} />}
            {props.value === "Onhold" && <img src={Panding} />}
          </>
        );
      },
    },
    {
      Header: " ",
      accessor: "id",
      Cell: function renderActions(props) {
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
                  <NavLink to={`/mooner/changepassword/${props.value}?from=Service Seeker`} className={classes.links}>
                    <div className={classes.FlexWrapper}>
                      <img src={ChangePassword} className={classes.actionImage} />
                        <Typography className={classes.actionsLabel}>
                          Change Password
                        </Typography>
                    </div>
                    </NavLink>
                </MenuItem>
              </Menu>
            </div>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Typography className={classes.title}> Service Seeker </Typography>
      <TableBase DATA={sslist} COLUMNS={COLUMNS} />
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

export default ServiceSeekers;
