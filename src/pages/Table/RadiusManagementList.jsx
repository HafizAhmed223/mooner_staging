import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import {
  Grid,
  makeStyles,
  Typography,
  MenuItem,
  Menu,
  Button,
  CircularProgress,
} from "@material-ui/core";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Search from "@material-ui/icons/Search";

import Actions from "../../assets/svg/actions.svg";
import Filter from "../../assets/svg/filter.svg";
import View from "../../assets/svg/view.svg";
import Edit from "../../assets/svg/edit.svg";
import Alocate from "../../assets/svg/alocate.svg";

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
    fontSize: "22px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#000000",
    marginLeft: "7px",
    fontWeight: "600",
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "18px",
      lineHeight: "28px",
      letterSpacing: "0.2em",
      color: "#20253B",
      fontWeight: "600",
      marginTop: mainTheme.spacing(7.6),
      marginLeft: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.only("xs")]: {
      marginTop: mainTheme.spacing(7.6),
      textAlign: "center",
    },
  },
}));


const RadiusManagementList = () => {
  const classes = useStyles();
  const DATA = [
    {
        country: 'Malaysia',
        city: 'Kudla Lumpur',
        state: 'Johor',
        radius: '2',
    },
    {
        country: 'Malaysia',
        city: 'Kudla Lumpur',
        state: 'Johor',
        radius: '2',
    },
    {
        country: 'Malaysia',
        city: 'Kudla Lumpur',
        state: 'Johor',
        radius: '2',
    },
    {
        country: 'Malaysia',
        city: 'Kudla Lumpur',
        state: 'Johor',
        radius: '2',
    },
  ];
  const COLUMNS = [
    {
      Header: "Country",
      accessor: "country",
    },
    {
      Header: "City",
      accessor: "city",
    },
    {
      Header: "State",
      accessor: "state",
    },
    {
      Header: "Radius",
      accessor: "radius",
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
              {/* <Menu
                id="simple-menu"
                anchorEl={isChecked}
                keepMounted
                open={Boolean(isChecked)}
                onClose={handleClose}
              >
                <MenuItem>
                  <NavLink
                    to={`/mooner/cancellation_management_view`}
                    className={classes.links}
                  >
                    <div className={classes.FlexWrapper}>
                      <img src={View} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        View
                      </Typography>
                    </div>
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink
                    to={`/mooner/cancellation_management/Refund`}
                    className={classes.links}
                  >
                    <div className={classes.FlexWrapper}>
                      <img src={Edit} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        Refund
                      </Typography>
                    </div>
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink
                    to={`/mooner/cancellation_management/Allocate`}
                    className={classes.links}
                  >
                    <div className={classes.FlexWrapper}>
                      <img src={Alocate} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        Allocate
                      </Typography>
                    </div>
                  </NavLink>
                </MenuItem>
              </Menu>
            */}
            </div>
          </>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

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
      data,
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter } = state;
  return (
    <Grid maxWidth="xl">
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container className={classes.header}>
          <Grid item xs={12} sm={4} md={5} lg={5} xl={6}>
            <Typography className={classes.title}>
              Radius Management
            </Typography>
          </Grid>
          <Grid items xs={12} sm={8} md={7} lg={7} xl={6}>
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
                <tr key={row.id} className="roundBorder" {...row.getRowProps()}>
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
      </Grid>
    </Grid>
  );
};

const mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps, {})(RadiusManagementList);
