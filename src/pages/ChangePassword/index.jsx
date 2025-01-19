import React, { useState, useEffect } from "react";

import { Grid, Container, makeStyles, Typography } from "@material-ui/core";

import Search from "@material-ui/icons/Search";

import Filter from "../../assets/svg/filter.svg";

import { connect } from "react-redux";

import ServiceSeekers from "../Table/passwordChange/SS/ServiceSeekers";
import ServiceProvider from "../Table/passwordChange/SP/ServiceProvider";
import SubAdmins from "../Table/passwordChange/SubAdmin/SubAdmin";

import { getAllServiceProvider } from "../../redux/actions/spManagement/spmanagement.actions";
import { getAllUsersAction } from "../../redux/actions/users/users.actions";
import Permissions from "../subAdmin/Permissions";

const useStyles = makeStyles((mainTheme) => ({
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
    padding: mainTheme.spacing(2),
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
  header: {
    display: "flex",
  },
  title: {
    marginTop: mainTheme.spacing(7),
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#20253B",
    animation: "slideInRight",
    fontWeight: "600",
  },
}));

const ChangePassword = ({
  getAllServiceProvider,
  getAllUsersAction,
  spListData,
  loading,
  usersData,
}) => {
  useEffect(() => {
    getAllServiceProvider(1);
    getAllUsersAction(1);
  }, []);

  useEffect(() => {
    getOnlySP();
  }, [spListData]);

  useEffect(() => {
    getOnlySS();
  }, [usersData]);

  const [sp, setSp] = useState();
  const [ss, setSs] = useState();

  function getOnlySP() {
    let splist = spListData.slice(0, 3).map((res, index) => {
      return res;
    });
    setSp(splist);
  }
  function getOnlySS() {
    let sslist = usersData.slice(0, 3).map((res, index) => {
      return res;
    });
    setSs(sslist);
  }
  const classes = useStyles();
  const [globalFilter, setGlobalFilter] = useState("");
  return (
    <Container maxWidth="xl">
      <Permissions page="change_userprofile" />
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container spacing={2} className={classes.header}>
          <Grid item xs={12} sm={4} md={5} lg={5} xl={6}>
            <Typography className={classes.title}> Change Password </Typography>
          </Grid>
          {/* <Grid items xs={12} sm={8} md={7} lg={7} xl={6}>
            <div className="globalFilterContainer">
              <div className="icon">
                <Search />
              </div>
              <input
                type="text"
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="globalFilter"
                placeholder="search"
              />
              <div className="circleContainer">
                <img src={Filter} className="filter" />
              </div>
            </div>
          </Grid> */}
        </Grid>
        {ss && <ServiceSeekers sslist={ss} />}
        {sp && <ServiceProvider splist={sp} />}
        <SubAdmins />
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({ spManagement, users }) => {
  return {
    spListData: spManagement.allSpList,
    loading: spManagement.loading,
    usersData: users.data,
  };
};

export default connect(mapStateToProps, {
  getAllServiceProvider,
  getAllUsersAction,
})(ChangePassword);
