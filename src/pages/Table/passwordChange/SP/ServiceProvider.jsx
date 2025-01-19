import React, { useState } from "react";
import TableBase from "../../UserDetailTables";

import { Menu, MenuItem, Button, Typography, makeStyles } from "@material-ui/core";

import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Active from "../../../../assets/svg/green.svg";
import InActive from "../../../../assets/svg/red.svg";
import Actions from "../../../../assets/svg/actions.svg";
import ChangePassword from "../../../../assets/svg/changePassword.svg";

const useStyles = makeStyles((mainTheme) => ({
  title: {
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color:
      mainTheme && mainTheme.palette && mainTheme.palette.primary && mainTheme.palette.primary.main,
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
    [mainTheme.breakpoints.only("lg")]: {
      width: "93%",
      height: "50px",
    },
  },
}));

const ServiceProvider = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { splist } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    history.push({
      pathname: "/mooner/details/all_service_provider",
    });
  };
  // const DATA = [
  //   {
  //     name: "Anna",
  //     email: "anna@gmail.com",
  //     reference_id: 14587,
  //     level: 2,
  //     earning: "$123",
  //     bookings: 30,
  //     status: "active",
  //   },
  //   {
  //     name: "Anna",
  //     email: "anna@gmail.com",
  //     reference_id: 14587,
  //     level: 2,
  //     earning: "$123",
  //     bookings: 30,
  //     status: "active",
  //   },
  //   {
  //     name: "Anna",
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
      accessor: "first_name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Reference Id",
      accessor: "reference_id",
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
        return props.value === true ? <img src={Active} /> : <img src={InActive} />;
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
                  <NavLink
                    to={`/mooner/changepassword/${props.value}?from=Service Provider`}
                    className={classes.links}
                  >
                    <div className={classes.FlexWrapper}>
                      <img src={ChangePassword} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>Change Password</Typography>
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
      <Typography className={classes.title}> Service Provider </Typography>
      <TableBase DATA={splist} COLUMNS={COLUMNS} />
      <div className={classes.btnWrapper}>
        <Button variant="contained" size="large" className={classes.editBtn} onClick={handleClick}>
          View All
        </Button>
      </div>
    </>
  );
};

export default ServiceProvider;
