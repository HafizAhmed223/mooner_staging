import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

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
import Pending from "../../../assets/svg/panding.svg";
import Actions from "../../../assets/svg/actions.svg";
import Status from "../../../assets/svg/status.svg";
import Crowl from "../../../assets/svg/crowl.svg";
import Edit from "../../../assets/svg/edit.svg";
import Delete from "../../../assets/svg/delete.svg";
import TableBase from "../UserDetailTables";
import moment from "moment";
import axios from "axios";
import { baseURL } from "../../../api";

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
    fontWeight: "600",
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "20px",
    },
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

const SPServiceView = ({ id, DATA }) => {
  const classes = useStyles();
  //("DATA ff", DATA && DATA);
  const [service, setService] = useState([]);
  const history = useHistory();
  // const data = [
  //   {
  //     budget: 6,
  //     category_name: "Dispatch",
  //     id: 936,
  //     portfolio: "n",
  //     order_status: "Completed",
  //     seeker_name: "Umair Khanss",
  //   },
  // ];
  const COLUMNS = [
    {
      Header: "Service Id",
      accessor: "id",
    },
    {
      Header: "Category Name",
      accessor: "category_name",
    },
    // {
    //   Header: "Status",
    //   accessor: "order_status",
    // },
    {
      Header: "Portfolio",
      accessor: "portfolio",
    },
    {
      Header: "Status",
      accessor: (d) => {
        return <div> {d?.is_active ? "Active" : "Non Active"} </div>;
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
      pathname: `/mooner/update_service/${id}`,
      // search: status ? `?status=${status}` : "",
    });
  };
  return (
    <>
      <Typography className={classes.title}>
        Sp Services {status && "(" + status + ")"}{" "}
      </Typography>
      <>
        <TableBase DATA={DATA || []} COLUMNS={COLUMNS} />
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
    </>
  );
};

export default SPServiceView;
