import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import moment from "moment";

import {
  Grid,
  Container,
  makeStyles,
  Typography,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import View from "../../assets/svg/view.svg";
import Actions from "../../assets/svg/actions.svg";
import TableLeftArrow from "../../assets/svg/tableLeftArrow.svg";
import TableRightArrow from "../../assets/svg/tableRightArrow.svg";
import Pagination from "../../assets/svg/pagination.svg";
import { useParams } from "react-router-dom";
import Delete from "../../assets/svg/delete.svg";
import { useHistory } from "react-router";
import { getPayments } from "../../redux/actions/booking/booking.action";
import Topbar from "../topbar";
import StatusCard from "../../common/StatusCard";
import queryString from "query-string";
import UserCountCard from "../../common/usersCuntcard";
import { baseURL } from "../../api";
import { connect } from "react-redux";
import TablePagination from "../../common/pagination/Pagination";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    display: "flex",
    paddingRight: mainTheme.spacing(0),
    marginRight: mainTheme.spacing(0),
    marginLeft: mainTheme.spacing(2),
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

const AllPaymentHistory = ({
  getPayments,
  allPaymentsList,
  count,
  loading,
}) => {
  //("loading", loading);
  const classes = useStyles();
  const history = useHistory();
  const { location } = history;
  //("location", location?.state?.id);
  const { pathname } = location;
  let params = queryString.parse(location.search);
  const { modulename } = params;
  //Pagination related
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ViewPaymentDetails = (id) => {
    //("roeid", id);
    history.push({
      pathname: `/mooner/payment/${location?.state?.id}`,
      state: { id: id, usrId: location?.state?.id },
    });
  };
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
    // {
    //   Header: "Description",
    //   accessor: "job_description",
    // },
    // {
    //   Header: "Level 1 Sp",
    //   accessor: "level1_sp",
    // },
    // {
    //   Header: "Sp",
    //   accessor: "sp",
    // },
    // {
    //   Header: "Sp Name",
    //   accessor: "sp_name",
    // },
    // {
    //   Header: "Sp Token",
    //   accessor: "sp_tokens",
    // },
    // {
    //   Header: "Sp Token",
    //   accessor: "token_price",
    // },

    {
      Header: " ",
      accessor: "id",
      Cell: function renderActions(props) {
        //("columnData", props?.value);
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
                <MenuItem onClick={() => ViewPaymentDetails(props?.value)}>
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

  const [userPayments, setUserPayments] = useState([]);
  const [allPaymentsData, setAllPaymentsData] = useState({});

  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getPayments(location?.state?.id, currentPage);
  }, []);
  useEffect(() => {
    if (count > 10) {
      setTotalPages(Math.ceil(count / 10));
    } else setTotalPages(1);
  }, [allPaymentsList]);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => allPaymentsList || [], [allPaymentsList]);
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
      data: data,
    },

    useGlobalFilter,
    usePagination
  );
  const { pageIndex, globalFilter } = state;
  // const arrayPageIndex =
  //   pageIndex - 2 < 0
  //     ? pageOptions.slice(0, pageIndex + 3)
  //     : pageOptions.slice(pageIndex - 2, pageIndex + 3);

  return (
    <Container maxWidth="xl">
      {allPaymentsList?.length > 0 && (
        <Grid Container spacing={0} className={classes.root}>
          <Grid item xs={12}>
            <Grid Container spacing={0}>
              <Grid item xs={12}>
                {modulename ? (
                  <Topbar
                    module="SP Management"
                    item="Edit"
                    bckLink="/mooner/details/sp_management"
                  />
                ) : (
                  <Topbar
                    module="User Management"
                    item="View"
                    bckLink="/mooner/details/user_management"
                  />
                )}
              </Grid>
            </Grid>
            <Grid Container spacing={2} className={classes.header}>
              <Grid item xs={12} sm={7} md={8} lg={9} xl={10}>
                <Grid Container spacing={2} className={classes.header}>
                  <Grid item xs={6}>
                    <Typography className={classes.title}>
                      Payment History
                    </Typography>
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
                {!loading ? (
                  <>
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
                    <TablePagination
                      totalPages={totalPages}
                      count={count}
                      getPageDataAction={getPayments}
                      id={location?.state?.id}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <CircularProgress />
                  </div>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={5}
                md={4}
                lg={3}
                xl={2}
                className={classes.profileContainer}
              >
                <StatusCard />
                <UserCountCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* <div className="paginationContainer">
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
      </div> */}
    </Container>
  );
};
const mapStateToProps = ({ booking, loader }) => {
  //("allPayments", booking?.allPayments);
  return {
    allPaymentsObj: booking?.allPayments,
    allPaymentsList: booking?.allPayments?.results,
    count: booking?.allPayments.count,
    next: booking?.allPayments.next,
    previous: booking?.allPayments.previous,
    loading: loader.loading,
  };
};
// export default AllPaymentHistory;
export default connect(mapStateToProps, { getPayments })(AllPaymentHistory);
