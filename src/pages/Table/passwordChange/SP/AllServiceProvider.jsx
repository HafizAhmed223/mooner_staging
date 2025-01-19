import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";

import {
  Grid,
  makeStyles,
  Typography,
  CircularProgress,
  MenuItem,
  Menu,
  Button,
} from "@material-ui/core";

import { NavLink } from "react-router-dom";

import { connect } from "react-redux";

import Search from "@material-ui/icons/Search";

import Active from "../../../../assets/svg/green.svg";
import InActive from "../../../../assets/svg/red.svg";
import Panding from "../../../../assets/svg/yellow.svg";

import Actions from "../../../../assets/svg/actions.svg";
import Filter from "../../../../assets/svg/filter.svg";
import { getAllServiceProvider } from "../../../../redux/actions/spManagement/spmanagement.actions";
import ChangePassword from "../../../../assets/svg/changePassword.svg";

import TablePagination from "../../../../common/pagination/Pagination";
import Permissions from "../../../subAdmin/Permissions";

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
  header: {
    display: "flex",
  },
  title: {
    marginTop: mainTheme.spacing(7),
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#20253B",
    fontWeight: "600",
    [mainTheme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  subTitle: {
    marginTop: mainTheme.spacing(4),
    marginBottom: mainTheme.spacing(4),
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#20253B",
    fontWeight: "600",
    [mainTheme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
}));

const AllServiceProvider = ({
  getAllServiceProvider,
  spListData,
  loading,
  count,
  next,
  previous,
}) => {
  useEffect(() => {
    getAllServiceProvider(1);
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(count / 10));
  }, [spListData]);

  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const classes = useStyles();

  const COLUMNS = [
    {
      Header: "Name",
      accessor: "username",
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
        return props.value === true ? (
          <img
            src={Active}
            style={{ paddingLeft: "20px", height: "10px", widht: "10px" }}
          />
        ) : (
          <img
            src={InActive}
            style={{ paddingLeft: "20px", height: "10px", widht: "10px" }}
          />
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
                  <NavLink
                    to={`/mooner/changepassword/${props.value}?from=Service Provider`}
                    className={classes.links}
                  >
                    <div className={classes.FlexWrapper}>
                      <img
                        src={ChangePassword}
                        className={classes.actionImage}
                      />
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

  const columns = useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    page,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: spListData,
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter } = state;

  return (
    <Grid maxWidth="xl">
      <Permissions page="change_userprofile" />
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container className={classes.header}>
          <Grid item xs={12} sm={6} md={6} lg={5} xl={6}>
            <Typography className={classes.title}>Change Password</Typography>
          </Grid>
          <Grid items xs={12} sm={6} md={6} lg={7} xl={6}>
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
          </Grid>
        </Grid>
        <Typography className={classes.subTitle}>Service Provider</Typography>
        {loading ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <table className="reportTable" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id} {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="tableBody" {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    key={row.id}
                    className="roundBorder"
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Grid>
      <TablePagination
        totalPages={totalPages}
        count={count}
        getPageDataAction={getAllServiceProvider}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Grid>
  );
};
const mapStateToProps = ({ spManagement }) => {
  return {
    spListData: spManagement.allSpList,
    loading: spManagement.loading,
    count: spManagement.total,
    next: spManagement.next,
    previous: spManagement.previous,
  };
};
export default connect(mapStateToProps, {
  getAllServiceProvider,
})(AllServiceProvider);
