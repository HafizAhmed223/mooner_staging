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
import ConformationModal from "../../common/modals/ConformationModal";
import Actions from "../../assets/svg/actions.svg";
import Filter from "../../assets/svg/filter.svg";
import View from "../../assets/svg/view.svg";
import Edit from "../../assets/svg/edit.svg";
import Alocate from "../../assets/svg/alocate.svg";
import {
  getCancelListAction,
  getCancelFilterAction,
} from "../../redux/actions/cancelationManagement/cancellation.action";
import TablePagination from "../../common/pagination/Pagination";

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

const CancellationManagementList = (props) => {
  const {
    getCancelListAction,
    getCancelFilterAction,
    cancelData,
    loading,
    count,
    next,
    previous,
  } = props;

  useEffect(() => {
    getCancelListAction(1, "");
    setFilterValue("");
  }, []);

  useEffect(() => {
    if (count > 10) {
      setTotalPages(Math.ceil(count / 10));
    } else setTotalPages(1);
  }, [cancelData]);

  const [totalPages, setTotalPages] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (e) => {
    setCurrentPage(1);
    setFilterValue(e.target.value);
    if (e.target.value.length >= 3) {
      getCancelFilterAction(1, e.target.value);
    }
    if (!e.target.value) {
      setFilterValue("");
      getCancelListAction(1, "");
      setCurrentPage(1);
    }
  };

  const classes = useStyles();

  const COLUMNS = [
    {
      Header: "SP name",
      accessor: "sp",
    },
    {
      Header: "SS Name",
      accessor: "ss",
    },
    {
      Header: "Booking Id",
      accessor: "booking",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Date",
      accessor: (d) => {
        const date = d.created_at.slice(0, 10);
        return <div> {date} </div>;
      },
    },
    {
      Header: "Time",
      accessor: (d) => {
        const time = d.created_at.substring(11);
        const newTime = time.slice(0, 8);
        //("time", newTime);
        return <div> {newTime} SGT </div>;
      },
    },
    // {
    //   Header: "Date/Time",
    //   accessor: "created_at",
    // },
    {
      Header: " ",
      accessor: "id",
      Cell: function renderActions(props) {
        const [isChecked, setIsChecked] = useState(false);
        const [open, setOpen] = useState(false);
        const [id, setId] = useState(null);
        const handleOpen = (id) => {
          setOpen(true);
          setIsChecked(null);
          setId(id);
        };

        const handleModalClose = () => {
          setOpen(false);
        };

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
                    to={`/mooner/cancellation_management_view/${props.value}`}
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
                {/* <MenuItem>
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
                </MenuItem> */}
              </Menu>
              <ConformationModal
                isVisible={open}
                id={open && id}
                onClose={handleModalClose}
                actionName={open && deleteTicket}
              />
            </div>
          </>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  //("cancelData",cancelData)
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    page,
    pageOptions,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: cancelData,
    },
    useGlobalFilter,
    usePagination
  );

  // const { globalFilter } = state;
  const { pageIndex, globalFilter } = state;
  const arrayPageIndex =
    pageIndex - 2 < 0
      ? pageOptions.slice(0, pageIndex + 3)
      : pageOptions.slice(pageIndex - 2, pageIndex + 3);
  return (
    <Grid maxWidth="xl">
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container className={classes.header}>
          <Grid item xs={12} sm={4} md={5} lg={5} xl={6}>
            <Typography className={classes.title}>
              Cancellation Management
            </Typography>
          </Grid>
          <Grid items xs={12} sm={8} md={7} lg={7} xl={6}>
            <div className="globalFilterContainer">
              <div className="icon">
                <Search />
              </div>
              <input
                type="text"
                // value={globalFilter || ""}
                // onChange={(e) => setGlobalFilter(e.target.value)}
                value={filterValue}
                onChange={handleFilterChange}
                className="globalFilter"
                placeholder="search"
              />
              <div className="circleContainer">
                <img src={Filter} className="filter" />
              </div>
            </div>
          </Grid>
        </Grid>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {cancelData && cancelData.length > 0 ? (
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
            ) : (
              <div
                style={{
                  margin: "30px 0px",
                  textAlign: "center",
                  opacity: 0.3,
                }}
              >
                {" "}
                No Record Found{" "}
              </div>
            )}
          </>
        )}
      </Grid>
      <TablePagination
        totalPages={totalPages}
        count={count}
        getPageDataAction={getCancelListAction}
        searchPaginationAction={filterValue && getCancelFilterAction}
        searchString={filterValue && filterValue}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Grid>
  );
};

const mapStateToProps = ({ cancel }) => {
  return {
    cancelData: cancel.allCancelList,
    count: cancel.count,
    next: cancel.next,
    previous: cancel.previous,
    loading: cancel.loading,
  };
};

export default connect(mapStateToProps, {
  getCancelListAction,
  getCancelFilterAction,
})(CancellationManagementList);
