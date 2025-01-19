import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";

import { Typography, Button, makeStyles, Menu, MenuItem } from "@material-ui/core";

import { NavLink } from "react-router-dom";

import Active from "../../../assets/svg/green.svg";
import InActive from "../../../assets/svg/red.svg";
import Actions from "../../../assets/svg/actions.svg";
import Status from "../../../assets/svg/status.svg";
import Pending from "../../../assets/svg/panding.svg";
import Crowl from "../../../assets/svg/crowl.svg";
import Edit from "../../../assets/svg/edit.svg";
import Delete from "../../../assets/svg/delete.svg";
import TableBase from "../UserDetailTables";

const useStyles = makeStyles((mainTheme) => ({
  title: {
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color:
      mainTheme && mainTheme.palette && mainTheme.palette.primary && mainTheme.palette.primary.main,
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

const SpDocument = (props) => {
  const { id } = useParams();
  const history = useHistory();

  const classes = useStyles();
  const { DATA } = props;

  const COLUMNS = [
    // {
    //   Header: "Job Id",
    // },
    {
      Header: "Name",
      accessor: "user_name",
    },
    {
      Header: "Label",
      accessor: "label",
    },
    {
      Header: "Expiration Date",
      accessor: "expiration_date",
    },
    {
      Header: "Type",
      accessor: "doc_question_type",
    },
    {
      Header: "KYC For",
      accessor: "document_for",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: function renderStatus(props) {
        return props.value === "Pending" ? (
          <img src={Pending} style={{ height: "12px", width: "12px" }} />
        ) : (
          <img src={Active} />
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
                  <NavLink to={`/mooner/view_document/${props.value}`} className={classes.links}>
                    <div className={classes.FlexWrapper}>
                      <img src={Status} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>View</Typography>
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

  const handleClick = () => {
    history.push({
      pathname: `/mooner/sp_kyc_list/${id}`,
    });
  };
  return (
    <>
      <Typography className={classes.title}> SP Documents </Typography>
      {DATA && DATA.length > 0 ? (
        <>
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
      ) : (
        <div style={{ margin: "30px 0px", textAlign: "center", opacity: 0.3 }}>
          {" "}
          No {status && status} Bookings{" "}
        </div>
      )}
    </>
  );
};

export default SpDocument;
