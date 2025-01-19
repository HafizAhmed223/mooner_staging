import React, { useState, useEffect } from "react";

import { Menu, MenuItem, Button, Typography, makeStyles } from "@material-ui/core";

import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import TableBase from "../UserDetailTables";
import Edit from "../../../assets/svg/edit.svg";
import Active from "../../../assets/svg/green.svg";
import InActive from "../../../assets/svg/red.svg";
import Status from "../../../assets/svg/status.svg";
import Delete from "../../../assets/svg/delete.svg";
import Actions from "../../../assets/svg/actions.svg";

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
}));

const SingleSPAllDetails = (props) => {
  useEffect(() => {
    getIdFromParams();
  }, []);
  const [id, setid] = useState(null);
  const history = useHistory();
  const getIdFromParams = () => {
    const { location } = history;
    const { pathname } = location;
    let name = pathname;
    let nameArr = name.split("/");
    let spId = nameArr[nameArr.length - 1];
    setid(spId);
  };
  const classes = useStyles();
  const { DATA } = props;

  const COLUMNS = [
    // {
    //   Header: "Job Id",
    //   accessor: "job_id",
    // },
    // {
    //   Header: "Job Id",
    //   accessor: "job_id",
    // },
    {
      Header: "First Name",
      accessor: "first_name",
    },
    {
      Header: "Last Name",
      accessor: "last_name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone",
      accessor: "cell_phone",
    },
    {
      Header: "Ref. Id",
      accessor: "reference_id",
    },
    {
      Header: "Level",
      accessor: "level",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: function renderStatus(props) {
        return props.value === true ? (
          <img
            src={Active}
            style={{ paddingLeft: "10px", height: "10px", widht: "10px" }}
          />
        ) : (
          <img
            src={InActive}
            style={{ paddingLeft: "10px", height: "10px", widht: "10px" }}
          />
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
                  <NavLink
                    to={`/mooner/sp_management/change_status/${id && id}`}
                    className={classes.links}
                  >
                    <div className={classes.FlexWrapper}>
                      <img src={Status} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        Change Status
                      </Typography>
                    </div>
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink
                    to={`/mooner/edit_sp_management/${id && id}`}
                    className={classes.links}
                  >
                    <div className={classes.FlexWrapper}>
                      <img src={Edit} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        Edit User
                      </Typography>
                    </div>
                  </NavLink>
                </MenuItem>
                {/* <MenuItem>
                  <div className={classes.FlexWrapper}>
                    <img src={Delete} className={classes.actionImage} />
                    <Typography className={classes.actionsLabel}>
                      Delete
                    </Typography>
                  </div>
                </MenuItem> */}
              </Menu>
            </div>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Typography className={classes.title}>SP Details</Typography>
      <TableBase DATA={DATA} COLUMNS={COLUMNS} />
    </>
  );
};

export default SingleSPAllDetails;
