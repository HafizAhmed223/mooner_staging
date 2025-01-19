import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import TableBase from ".";

import {
  Typography,
  Button,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";

import Actions from "../../../assets/svg/actions.svg";
import Delete from "../../../assets/svg/delete.svg";
import { connect } from "react-redux";
import { getSpeByIdAction } from "../../../redux/actions/spManagement/spmanagement.actions";
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

const UserBankWallet = ({ modulename, getSpeByIdAction, wallet_details }) => {
  const history = useHistory();
  const classes = useStyles();
  //("wallet_details", wallet_details);
  const DATA = [
    {
      bank_name: "HSBC",
      Country: "Canada",
      name: "Harry Johnson",
      exp_date: "08/22",
      number: "1234-456...",
      amount: "$85888",
      type: "Visa",
    },
    {
      bank_name: "HSBC",
      Country: "Canada",
      name: "Harry Johnson",
      exp_date: "08/22",
      number: "1234-456...",
      amount: "$85888",
      type: "Master",
    },
  ];

  const COLUMNS = [
    {
      Header: "Job Id",
      accessor: "job_id",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Sender Name",
      accessor: "sender_name",
    },
    {
      Header: "Receiver Name",
      accessor: "receiver_name",
    },
    {
      Header: "Token",
      accessor: "token",
    },
    {
      Header: "Date",
      accessor: "booking_time",
      Cell: function renderStatus(props) {
        //("props", props?.value);
        return moment(props?.value).format("MMMM Do YYYY");
      },
      id: "56",
    },
    {
      Header: "Time",
      accessor: "booking_time",
      Cell: function renderStatus(props) {
        //("props", props?.value);
        return moment(props?.value).format("h:mm:ss a");
      },
    },
    {
      Header: "Transaction Name",
      accessor: "transaction_name",
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

  const { id } = useParams();
  //("idinuserbank", id);
  const handleClick = () => {
    if (modulename) {
      history.push({
        pathname: "/mooner/bank_Details",
        search: `?modulename=${modulename}`,
        state: { id: id },
      });
    }
    if (!modulename) {
      history.push({
        pathname: "/mooner/bank_Details",
        state: { id: id },
      });
    }
  };

  useEffect(() => {
    getSpeByIdAction(id);
  }, []);
  return (
    <>
      <Typography className={classes.title}>Bank / Wallet Details</Typography>
      {wallet_details?.length > 0 ? (
        <>
          <TableBase
            DATA={(wallet_details && wallet_details) || []}
            COLUMNS={COLUMNS}
          />
          <div className={classes.btnWrapper}>
            <Button
              variant="contained"
              size="large"
              className={classes.editBtn}
              onClick={handleClick}
              // disabled={ false : true}
            >
              View All
            </Button>
          </div>
        </>
      ) : (
        <div style={{ margin: "30px 0px", textAlign: "center", opacity: 0.3 }}>
          {" "}
          No Recordss{" "}
        </div>
      )}
    </>
  );
};

// export default UserBankWallet;
const mapStateToProps = ({ spManagement }) => {
  return {
    wallet_details: spManagement?.wallet_details,
  };
};
export default connect(mapStateToProps, { getSpeByIdAction })(UserBankWallet);
