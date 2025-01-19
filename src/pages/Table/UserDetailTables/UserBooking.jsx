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
import Pending from "../../../assets/svg/panding.svg";
import Actions from "../../../assets/svg/actions.svg";
import Status from "../../../assets/svg/status.svg";
import Crowl from "../../../assets/svg/crowl.svg";
import Edit from "../../../assets/svg/edit.svg";
import Delete from "../../../assets/svg/delete.svg";
import moment from "moment";

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

const UserBooking = ({ DATA, id }) => {
  //("DATA", DATA);
  const history = useHistory();
  const classes = useStyles();

  const COLUMNS = [
    {
      Header: "Job Id ",
      accessor: "jobs_id",
    },
    
    {
      Header: "Seeker",
      accessor: "seeker",
    },

    {
      Header: "Category",
      accessor: "category_name",
    },
    // {
    //   Header: "Start Date",
    //   accessor: (d) => {
    //     const date = d.start_date.slice(0, 10);
    //     return <div> {date} </div>;
    //   },
    // },
    {
      Header: "Date",
      accessor: (d) => {
        return <div> {moment(d?.start_date).format("MMMM Do YYYY")} </div>;
      },
    },
    // {
    //   Header: "Bid Price",
    //   accessor:"bid_price"
    // },
    // {
    //   Header: "Tip",
    //   accessor:"Tip"
    // },
    // {
    //   Header: "Additional Price",
    //   accessor:"additional_price"
    // },
    // {
    //   Header: "Disputes Id",
    //   accessor:"disputes_id"
    // },
    // {
    //   Header: "Jobs Description",
    //   accessor:"jobs_description"
    // },
    // {
    //   Header: "Jobs Id",
    //   accessor:"jobs_id"
    // },
    // {
    //   Header: "Provider",
    //   accessor:"provider"
    // },

    // {
    //   Header: "Provider Rating",
    //   accessor:"provider_rating"
    // },
    {
      Header: "Time",
      accessor: (d) => {
        // return <div> {moment(d?.start_date).format("MMMM Do YYYY")} </div>;
        return <div> {moment(d?.start_date).format("hh:mm:ss")} </div>;
      },
    },
    {
      Header: "Price($)",
      accessor: "budget",
    },
    {
      Header: "Transaction",
      accessor: "transaction_hash",
      Cell: function renderStatus(props) {
        return (
          <div style={{maxWidth:'150px',wordWrap: 'break-word'}}>{props.value}
          </div>
        );
      },
    },
    {
      Header: "Status",
      accessor: "order_status",
      Cell: function renderStatus(props) {
        return (
          <>
            {props.value === "Completed" && <img src={Active} />}
            {props.value === "Cancelled" && <img src={InActive} />}
            {props.value === "Active" && (
              <img style={{ height: "12px", width: "12px" }} src={Pending} />
            )}
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
            <div style={{ height: "40px" }}></div>
          </>
        );
      },
    },
  ];

  const handleClick = (id) => {
  //  console.log(id,"id of onbject")
    //("listingId", id);
    localStorage.setItem("listingId", id);
    history.push({
      pathname: "/mooner/all_bookings/" + id,
    });
  };

  return (
    <>
      <Typography className={classes.title}>Bookings</Typography>
      {DATA && DATA.length > 0 ? (
        <>
          <TableBase DATA={DATA} COLUMNS={COLUMNS} />
          <div className={classes.btnWrapper}>
            <Button
              variant="contained"
              size="large"
              className={classes.editBtn}
              onClick={() => handleClick(id)}
            >
              View All
            </Button>
          </div>
        </>
      ) : (
        <div style={{ margin: "30px 0px", textAlign: "center", opacity: 0.3 }}>
          {" "}
          No {status && status} Bookings{" "}
        </div>
      )}
    </>
  );
};

export default UserBooking;
