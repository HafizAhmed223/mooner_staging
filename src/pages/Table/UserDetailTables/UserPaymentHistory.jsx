import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
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
import axios from "axios";
import { baseURL } from "../../../api";
import moment from "moment";
import { useParams } from "react-router";

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
    [mainTheme.breakpoints.only("sm")]: {
      width: "93%",
      height: "52px",
    },
    [mainTheme.breakpoints.only("xs")]: {
      width: "93%",
      height: "45px",
      borderRadius: "10px",
    },
  },
}));

const UserPaymentHistory = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { modulename } = props;
  //("modulename", modulename);
  const { id } = useParams();
  //("MYID", id);
  const [userPayments, setUserPayments] = useState([]);
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  const getPayments = async () => {
    try {
      const res = await axios.get(
        `${baseURL}booking/user_payment/?user_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      //("UserPayments", res?.data?.results);
      setUserPayments(res?.data?.results);
    } catch (err) {
      //("error", err);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

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
      Header: "Date",
      accessor: (d) => {
        const date = moment(d?.booking_time).format("MMMM Do YYYY");
        return <div> {date} </div>;
      },
    },
    {
      Header: "Time",
      accessor: (d) => {
        const time = moment(d?.booking_time).format("h:mm:ss a");
        return <div> {time} </div>;
      },
    },
    {
      Header: "Amount",
      accessor: "sp_amount",
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
            {/* <div className={classes.container}>
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
            </div> */}
          </>
        );
      },
    },
  ];

  const handleClick = () => {
    if (modulename) {
      history.push({
        pathname: "/mooner/payment_history",
        search: `?modulename=${modulename}`,
        state: {
          id: id,
        },
      });
    }
    if (!modulename) {
      history.push({
        pathname: "/mooner/payment_history",
        state: {
          id: id,
        },
      });
    }
  };

  return (
    <>
      <Typography className={classes.title}>Payment History</Typography>
      {userPayments?.length > 0 ? (
        <>
          <TableBase
            DATA={userPayments && userPayments ? userPayments : []}
            COLUMNS={COLUMNS}
          />
          <div className={classes.btnWrapper}>
            <Button
              variant="contained"
              size="large"
              className={classes.editBtn}
              onClick={handleClick}
              disabled={userPayments?.length > 0 ? false : true}
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

export default UserPaymentHistory;
