import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import moment from "moment";
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

import Edit from "../../assets/svg/edit.svg";
import View from "../../assets/svg/view.svg";

import Active from "../../assets/svg/green.svg";
import InActive from "../../assets/svg/red.svg";
import Actions from "../../assets/svg/actions.svg";
import Pending from "../../assets/svg/panding.svg";

import Status from "../../assets/svg/status.svg";
import Crowl from "../../assets/svg/crowl.svg";

import Topbar from "../topbar";
import StatusCard from "../../common/StatusCard";

import UserCountCard from "../../common/usersCuntcard";
import { geSpCompletedBookingtAction } from "../../redux/actions/spManagement/spmanagement.actions";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { NavigateBefore } from "@material-ui/icons";
import TablePagination from "../../common/pagination/Pagination";
import { baseURL } from "../../api";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    display: "flex",
    paddingRight: mainTheme.spacing(0),
    marginRight: mainTheme.spacing(0),
    marginLeft: mainTheme.spacing(2),
  },
  profileContainer: {
    marginLeft: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("xl")]: {
      marginTop: mainTheme.spacing(8),
      marginLeft: mainTheme.spacing(3),
    },
    [mainTheme.breakpoints.only("lg")]: {
      marginTop: mainTheme.spacing(10),
      marginLeft: mainTheme.spacing(0),
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
  },
}));

const AllEarnings = ({
  geSpCompletedBookingtAction,
  spEarningPayload,
  spEarningList,
  count,
  loading,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const id = localStorage.getItem("userId");
  //("spEarningList", spEarningList);
  useEffect(() => {
    geSpCompletedBookingtAction(id, currentPage);
  }, []);

  useEffect(() => {
    if (count > 10) {
      setTotalPages(Math.ceil(count / 10));
    } else setTotalPages(1);
  }, [spEarningList]);
  // debugger
  // const {results}=useSelector((stat)=>stat?.spManagement?.spBookingList)

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const COLUMNS = [
    {
      Header: "Job Id",
      accessor: "job_id",
    },
    {
      Header: "Category Name",
      accessor: "category_name",
    },
    {
      Header: "Seeker Name",
      accessor: "seeker_name",
    },

    {
      Header: "Budget",
      accessor: "budget",
    },
    {
      Header: "Date",
      accessor: "start_date",
      Cell: function renderStatus(props) {
        //("props", props?.value);
        return moment(props?.value).format("MMMM Do YYYY");
      },
      id: "56",
    },
    {
      Header: "Time",
      accessor: "start_date",
      Cell: function renderStatus(props) {
        //("props", props?.value);
        return moment(props?.value).format(" h:mm:ss a");
      },
    },

    {
      Header: " ",
      accessor: "id",
      Cell: function renderActions({ value }) {
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
                <MenuItem onClick={() => viewEarning(value)}>
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
  const data = useMemo(() => spEarningList || [], [spEarningList]);

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

  const history = useHistory();
  const viewEarning = (id) => {
    // history.push({
    //   pathname: `view_earning/` + id,
    // });
    //("id", id);
  };

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
                  <Typography className={classes.title}>Earnings</Typography>
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
                    {/* <div className="circleContainer">
                                            <img src={Filter} className="filter" />
                                        </div>     */}
                  </div>
                </Grid>
              </Grid>
              {spEarningList != undefined && spEarningList.length > 0 ? (
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
                    getPageDataAction={geSpCompletedBookingtAction}
                    id={id}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              ) : (
                "No Record Found"
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({ spManagement }) => {
  //("spManagementcheckinAllEarning", spManagement?.total);

  return {
    spEarningList: spManagement?.sp_all_completed_bookings,
    count: spManagement?.total,
    loading: spManagement?.loading,
  };
};
export default connect(mapStateToProps, { geSpCompletedBookingtAction })(
  AllEarnings
);
