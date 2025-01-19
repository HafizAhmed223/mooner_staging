import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";

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
import TablePagination from "../../common/pagination/Pagination";

import Search from "@material-ui/icons/Search";

import Actions from "../../assets/svg/actions.svg";
import TableLeftArrow from "../../assets/svg/tableLeftArrow.svg";
import TableRightArrow from "../../assets/svg/tableRightArrow.svg";
import Pagination from "../../assets/svg/pagination.svg";

import View from "../../assets/svg/view.svg";

import Topbar from "../topbar";
import StatusCard from "../../common/StatusCard";
import queryString from "query-string";
import UserCountCard from "../../common/usersCuntcard";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { allWalletDetailsAction } from "../../redux/actions/spManagement/spmanagement.actions";
import moment from "moment";

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

const AllBankDetails = ({
  allWalletDetailsAction,
  wallet_details,
  count,
  loading,
}) => {
  //("wallet_details", wallet_details);
  const classes = useStyles();
  const history = useHistory();
  const id = history?.location?.state?.id;
  const { pathname } = location;
  let params = queryString.parse(location.search);
  const { modulename } = params;

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
    {
      bank_name: "HSBC",
      Country: "Canada",
      name: "Harry Johnson",
      exp_date: "08/22",
      number: "1234-456...",
      amount: "$85888",
      type: "Master",
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
    {
      bank_name: "HSBC",
      Country: "Canada",
      name: "Harry Johnson",
      exp_date: "08/22",
      number: "1234-456...",
      amount: "$85888",
      type: "Master",
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
    {
      bank_name: "HSBC",
      Country: "Canada",
      name: "Harry Johnson",
      exp_date: "08/22",
      number: "1234-456...",
      amount: "$85888",
      type: "Master",
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
    {
      bank_name: "HSBC",
      Country: "Canada",
      name: "Harry Johnson",
      exp_date: "08/22",
      number: "1234-456...",
      amount: "$85888",
      type: "Master",
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
    {
      bank_name: "HSBC",
      Country: "Canada",
      name: "Harry Johnson",
      exp_date: "08/22",
      number: "1234-456...",
      amount: "$85888",
      type: "Master",
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
    {
      bank_name: "HSBC",
      Country: "Canada",
      name: "Harry Johnson",
      exp_date: "08/22",
      number: "1234-456...",
      amount: "$85888",
      type: "Master",
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
    {
      bank_name: "HSBC",
      Country: "Canada",
      name: "Harry Johnson",
      exp_date: "08/22",
      number: "1234-456...",
      amount: "$85888",
      type: "Master",
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
    {
      bank_name: "HSBC",
      Country: "Canada",
      name: "Harry Johnson",
      exp_date: "08/22",
      number: "1234-456...",
      amount: "$85888",
      type: "Master",
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
    {
      bank_name: "HSBC",
      Country: "Canada",
      name: "Harry Johnson",
      exp_date: "08/22",
      number: "1234-456...",
      amount: "$85888",
      type: "Master",
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
    {
      bank_name: "HSBC",
      Country: "Canada",
      name: "Harry Johnson",
      exp_date: "08/22",
      number: "1234-456...",
      amount: "$85888",
      type: "Master",
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
    {
      bank_name: "HSBC",
      Country: "Canada",
      name: "Harry Johnson",
      exp_date: "08/22",
      number: "1234-456...",
      amount: "$85888",
      type: "Master",
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
        return moment(props?.value).format(" h:mm:ss a");
      },
    },
    {
      Header: "Token",
      accessor: "token",
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
  // const data = useMemo(() => DATA, []);
  const data = useMemo(() => wallet_details || [], [wallet_details]);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const { pageIndex, globalFilter } = state;
  const arrayPageIndex =
    pageIndex - 2 < 0
      ? pageOptions.slice(0, pageIndex + 3)
      : pageOptions.slice(pageIndex - 2, pageIndex + 3);

  useEffect(() => {
    if (count > 10) {
      setTotalPages(Math.ceil(count / 10));
    } else setTotalPages(1);
  }, [wallet_details]);
  useEffect(() => {
    allWalletDetailsAction(id, currentPage);
  }, []);
  return (
    <Container maxWidth="xl">
      <Grid Container spacing={0} className={classes.root}>
        <Grid item xs={12}>
          <Grid Container spacing={0}>
            <Grid item xs={12}>
              <Topbar
                module="SP Management"
                item="Edit"
                bckLink="/mooner/details/sp_management"
              />
            </Grid>
          </Grid>
          <Grid Container spacing={2} className={classes.header}>
            <Grid item xs={12} sm={7} md={8} lg={9} xl={10}>
              <Grid Container spacing={2} className={classes.header}>
                <Grid item xs={4}>
                  <Typography className={classes.title}>Wallets</Typography>
                </Grid>
                <Grid item xs={8}>
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
                  </div>
                </Grid>
              </Grid>

              <table className="reportTable" {...getTableProps()}>
                {loading ? (
                  <div style={{ textAlign: "center" }}>
                    <CircularProgress />
                  </div>
                ) : (
                  <>
                    {wallet_details?.length > 0 ? (
                      <>
                        <thead>
                          {headerGroups.map((headerGroup) => (
                            <tr
                              key={headerGroup.id}
                              {...headerGroup.getHeaderGroupProps()}
                            >
                              {headerGroup.headers.map((column) => (
                                <th
                                  key={column.id}
                                  {...column.getHeaderProps()}
                                >
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
                      </>
                    ) : (
                      "No Record Found"
                    )}
                  </>
                )}
              </table>

              <TablePagination
                totalPages={totalPages}
                count={count}
                getPageDataAction={allWalletDetailsAction}
                id={id}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

// export default AllBankDetails;
const mapStateToProps = ({ spManagement }) => {
  return {
    wallet_details:
      spManagement?.all_wallet_details?.sp_active_bookings?.results,
    count: spManagement?.all_wallet_details?.sp_active_bookings?.count,
    loading: spManagement?.loading,
  };
};
export default connect(mapStateToProps, { allWalletDetailsAction })(
  AllBankDetails
);
