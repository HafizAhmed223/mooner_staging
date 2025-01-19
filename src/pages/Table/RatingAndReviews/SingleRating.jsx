import React, { useState } from "react";
import { useHistory } from "react-router";

import { Typography, Button, makeStyles, Menu, MenuItem } from "@material-ui/core";

import { NavLink } from "react-router-dom";

import Actions from "../../../assets/svg/actions.svg";
import View from "../../../assets/svg/view.svg";
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

const SingleRating = ({ DATA, id }) => {
  const history = useHistory();
  const classes = useStyles();

  const COLUMNS = [
    // {
    //   Header: "Job Id",
    // },
    {
      Header: "Name",
      accessor: "seeker_name",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Seeker Id",
      accessor: "seeker_id",
    },
    {
      Header: "Stars",
      accessor: "star",
    },
    {
      Header: "",
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
                  <div className={classes.FlexWrapper}>
                    <img src={View} className={classes.actionImage} />
                    <NavLink
                      to={`/mooner/view_ratting_reviews/${props.value}`}
                      className={classes.links}
                    >
                      <Typography className={classes.actionsLabel}>View</Typography>
                    </NavLink>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className={classes.FlexWrapper}>
                    <img src={Edit} className={classes.actionImage} />
                    <NavLink
                      to={`/mooner/edit_ratting_reviews/${props.value}`}
                      className={classes.links}
                    >
                      <Typography className={classes.actionsLabel}>Edit</Typography>
                    </NavLink>
                  </div>
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

  const handleClick = () => {
    history.push({
      pathname: `/mooner/rating_reviews/${id}`,
    });
  };

  return (
    <>
      <Typography className={classes.title}> Rating & Reviews </Typography>
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
          No Record Found{" "}
        </div>
      )}
    </>
  );
};

export default SingleRating;
