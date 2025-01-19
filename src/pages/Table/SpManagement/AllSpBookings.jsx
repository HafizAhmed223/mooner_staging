import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import {
  geSpActiveBookingtAction,
  geSpCompletedBookingtAction,
} from "../../../redux/actions/spManagement/spmanagement.actions";
import View from "../../../assets/svg/view.svg";

import {
  Grid,
  Container,
  makeStyles,
  Typography,
  Menu,
  MenuItem,
  CircularProgress,
  Button,
} from "@material-ui/core";
import moment from "moment";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import Search from "@material-ui/icons/Search";

import Edit from "../../../assets/svg/edit.svg";
import Delete from "../../../assets/svg/delete.svg";

import Active from "../../../assets/svg/green.svg";
import InActive from "../../../assets/svg/red.svg";
import Pending from "../../../assets/svg/panding.svg";
import Actions from "../../../assets/svg/actions.svg";
import Status from "../../../assets/svg/status.svg";
import Crowl from "../../../assets/svg/crowl.svg";

import StatusCard from "../../../common/StatusCard";

import queryString from "query-string";
import Topbar from "../../topbar";
import TablePagination from "../../../common/pagination/Pagination";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    display: "flex",
    paddingRight: mainTheme.spacing(0),
    marginRight: mainTheme.spacing(0),
    // marginLeft: mainTheme.spacing(2),
  },
  profileContainer: {
    [mainTheme.breakpoints.only("lg")]: {
      marginTop: mainTheme.spacing(9),
    },
  },
  TopContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: mainTheme.spacing(5),
  },
  container: {
    position: "absolute",
    backgroundColor: "transparent",
  },
  collapse: {
    position: "relative",
    right: "171px",
  },
  paper: {
    margin: mainTheme.spacing(0),
  },
  actionContent: {
    backgroundImage: `url(../../assets/images/blue.PNG)`,
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
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "18px",
      lineHeight: "28px",
      letterSpacing: "0.2em",
      color: "#20253B",
      fontWeight: "600",
      marginTop: mainTheme.spacing(7.6),
      marginLeft: mainTheme.spacing(1),
    },
    [mainTheme.breakpoints.down("xs")]: {
      fontSize: "18px",
      lineHeight: "28px",
      letterSpacing: "0.2em",
      color: "#20253B",
      fontWeight: "600",
      marginTop: mainTheme.spacing(7.6),
      textAlign: "center",
    },
  },
}));

const AllSpBookings = ({
  geSpActiveBookingtAction,
  geSpCompletedBookingtAction,
  activeBookings,
  completedBookings,
  loading,
  count,
  next,
  previous,
}) => {
  useEffect(() => {
    getBookingStatus();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(count / 10));
  }, [activeBookings]);

  useEffect(() => {
    setTotalPages(Math.ceil(count / 10));
  }, [completedBookings]);
  const [statusCheck, setStatusCheck] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState(null);
  const classes = useStyles();
  const history = useHistory();

  const getBookingStatus = () => {
    const { location } = history;
    const { pathname } = location;
    let params = queryString.parse(location.search);
    const { status } = params;
    setStatusCheck(status && status);

    let name = pathname;
    let nameArr = name.split("/");
    let spId = nameArr[nameArr.length - 1];
    setId(spId);
    if (status === "Active") {
      const defaultPage = 1;
      geSpActiveBookingtAction(spId, defaultPage);
    }
    if (status === "Completed") {
      const defaultPage = 1;
      geSpCompletedBookingtAction(spId, defaultPage);
    }
  };

  const COLUMNS = [
    
    {
      Header: "Name",
      accessor: "seeker_name",
    },
    {
      Header: "Category",
      accessor: "category_name",
    },
    {
      Header: "Date",
      accessor: (d) => {
        const date = moment(d.start_date).format("MMMM Do YYYY, h:mm a");
        return <div> {date} </div>;
      },
    },
    {
      Header: "Time",
      accessor: (d) => {
        const time = d.start_date.substring(12);
        const newTime = time.slice(0, -1);

        return <div> {moment(d.start_date).format("LTS")} </div>;
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
      accessor: "id",
      Cell: function renderActions(prop) {
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
                <MenuItem onClick={() => viewCompletedBooking(prop.value)}>
                  <div className={classes.FlexWrapper}>
                    <img src={View} className={classes.actionImage} />
                    <Typography className={classes.actionsLabel}>
                      View
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
  const activeData = useMemo(() => activeBookings || [], [activeBookings]);
  const completedData = useMemo(
    () => completedBookings || [],
    [completedBookings]
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,

    prepareRow,
    page,
    nextPage,
    pageOptions,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: statusCheck === "Active" ? activeData : completedData,
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter } = state;
  const viewCompletedBooking = (id) => {
    //("bugtest", id);
    history.push({
      pathname: "/mooner/single_sp_booking/" + id,
    });
  };
  return (
    <Container maxWidth="xl">
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Topbar
                module="SP Management"
                item="Edit"
                bckLink="/mooner/details/sp_management"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.header}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={10}>
              <Grid container spacing={2} className={classes.header}>
                <Grid item xs={12} sm={6}>
                  {statusCheck === undefined ? (
                    <Typography className={classes.title}>Booking</Typography>
                  ) : (
                    <Typography className={classes.title}>
                      Booking{statusCheck && "(" + statusCheck + ")"}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
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
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress />
                </div>
              ) : (
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
              )}
              <TablePagination
                totalPages={totalPages}
                count={count}
                getPageDataAction={
                  status === "Active"
                    ? geSpActiveBookingtAction
                    : geSpCompletedBookingtAction
                }
                id={id && id}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              className={classes.profileContainer}
            >
              <StatusCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({ spManagement }) => {
  return {
    activeBookings: spManagement.sp_all_active_bookings,
    completedBookings:
      spManagement && spManagement.sp_all_completed_bookings
        ? spManagement.sp_all_completed_bookings
        : [],
    loading: spManagement.loading,
    count: spManagement.total,
    next: spManagement.next,
    previous: spManagement.previous,
  };
};
export default connect(mapStateToProps, {
  geSpActiveBookingtAction,
  geSpCompletedBookingtAction,
})(AllSpBookings);
