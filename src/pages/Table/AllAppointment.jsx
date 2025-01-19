import React, { useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";

import {
  Grid,
  Container,
  makeStyles,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";

import { NavLink } from "react-router-dom";

import Search from "@material-ui/icons/Search";

import TableLeftArrow from "../../assets/svg/tableLeftArrow.svg";
import TableRightArrow from "../../assets/svg/tableRightArrow.svg";
import Pagination from "../../assets/svg/pagination.svg";

import Active from "../../assets/svg/green.svg";
import InActive from "../../assets/svg/red.svg";
import Panding from "../../assets/svg/yellow.svg";
import Actions from "../../assets/svg/actions.svg";
import Status from "../../assets/svg/status.svg";
import Delete from "../../assets/svg/delete.svg";

import Topbar from "../topbar";
import StatusCard from "../../common/StatusCard";

import UserCountCard from "../../common/usersCuntcard";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    display: "flex",
    paddingRight: mainTheme.spacing(0),
    marginRight: mainTheme.spacing(0),
    marginLeft: mainTheme.spacing(5),
  },
  profileContainer: {
    marginLeft: mainTheme.spacing(5),
  },
  TopContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: mainTheme.spacing(5),
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
  header: {
    display: "flex",
  },
  title: {
    marginTop: mainTheme.spacing(7),
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#20253B",
  },
}));

const AllAppointment = () => {
  const classes = useStyles();

  const DATA = [
    {
      id: 1,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "active",
    },
    {
      id: 2,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "inactive",
    },
    {
      id: 3,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
    {
      id: 4,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
    {
      id: 5,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
    {
      id: 6,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
    {
      id: 7,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
    {
      id: 8,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
    {
      id: 9,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
    {
      id: 10,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
    {
      id: 11,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
    {
      id: 12,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
    {
      id: 13,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
    {
      id: 14,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
    {
      id: 15,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
    {
      id: 16,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
    {
      id: 17,
      seeker: "Harry Johnson",
      catagory: "Hair Style",
      booking_date: "14/08/20",
      schedule_time: "22:05:48 SGT",
      schedule_date: "14/08/20",
      status: "panding",
    },
  ];

  const COLUMNS = [
    {
      Header: "Seeker",
      accessor: "seeker",
    },
    {
      Header: "Catagory",
      accessor: "catagory",
    },
    {
      Header: "Booking Date",
      accessor: "booking_date",
    },
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Schedule Date",
      accessor: "schedule_date",
    },
    {
      Header: "Schedule Time",
      accessor: "schedule_time",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: function renderStatus(props) {
        return (
          <>
            {props.value === "active" && <img src={Active} />}
            {props.value === "inactive" && <img src={InActive} />}
            {props.value === "panding" && <img src={Panding} />}
          </>
        );
      },
    },
    {
      Header: " ",
      accessor: "",
      Cell: function renderActions() {
        const [isChecked, setIsChecked] = useState(null);
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
                    <img src={Status} className={classes.actionImage} />
                    <NavLink
                      to="/mooner/appoitment/change_status"
                      className={classes.links}
                    >
                      <Typography className={classes.actionsLabel}>
                        Change Status
                      </Typography>
                    </NavLink>
                  </div>
                </MenuItem>
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

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    page,
    nextPage,
    pageOptions,
    state,
    gotoPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );

  const { pageIndex, globalFilter } = state;
  const arrayPageIndex =
    pageIndex - 2 < 0
      ? pageOptions.slice(0, pageIndex + 3)
      : pageOptions.slice(pageIndex - 2, pageIndex + 3);

  return (
    <Container maxWidth="xl">
      <Grid Container spacing={0} className={classes.root}>
        <Grid item xs={12}>
          <Grid Container spacing={0}>
            <Grid item xs={12}>
              <Topbar module="Appointment" />
            </Grid>
          </Grid>
          <Grid Container spacing={2} className={classes.header}>
            <Grid item xs={12} sm={7} md={8} lg={10} xl={10}>
              <Grid Container spacing={2} className={classes.header}>
                <Grid item xs={6}>
                  <Typography className={classes.title}>Appointment</Typography>
                </Grid>
                <Grid item xs={6}>
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
                    {/* <div className="circleContainer">
                                            <img src={Filter} className="filter" />
                                        </div>     */}
                  </div>
                </Grid>
              </Grid>
              <table className="reportTable" {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
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
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              lg={2}
              xl={2}
              className={classes.profileContainer}
            >
              <StatusCard />
              <UserCountCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className="paginationContainer">
        <img
          src={TableLeftArrow}
          onClick={() => previousPage()}
          className={canPreviousPage ? "previousbtn" : "disabledPreviousBtn"}
        />
        {arrayPageIndex.map((i) => (
          <div className="pagination__item" active={pageIndex === i} key={i}>
            <div
              key={i}
              className={`paginationLink ${
                pageIndex === i ? "paginationLinkActive" : ""
              }`}
              onClick={() => gotoPage(i)}
            >
              {i + 1}
            </div>
          </div>
        ))}
        {pageIndex + 3 <= arrayPageIndex.length && (
          <img src={Pagination} className="paginationDot" />
        )}
        <img
          src={TableRightArrow}
          onClick={() => nextPage()}
          className={canNextPage ? "nextbtn" : "disabledPreviousBtn"}
        />
      </div>
    </Container>
  );
};

export default AllAppointment;
