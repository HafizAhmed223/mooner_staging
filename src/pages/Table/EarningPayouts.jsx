import React, { useMemo, useState, useEffect } from "react";
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

import Search from "@material-ui/icons/Search";

import Actions from "../../assets/svg/actions.svg";
import View from "../../assets/svg/view.svg";
import Filter from "../../assets/svg/filter.svg";

import {
  getEarningListAction,
  earningFilter,
} from "../../redux/actions/earnings/earning.actions";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import TablePagination from "../../common/pagination/Pagination";
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
    [mainTheme.breakpoints.only("xl")]: {
      marginLeft: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.down("lg")]: {
      fontSize: "18px",
      lineHeight: "28px",
      letterSpacing: "0.2em",
      color: "#20253B",
      fontWeight: "600",
      marginTop: mainTheme.spacing(7.6),
      marginLeft: mainTheme.spacing(2),
    },
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
  },
  button: {
    float: "right",
    width: "20%",
    height: "55px",
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    [mainTheme.breakpoints.only("lg")]: {
      width: "22%",
      height: "50px",
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.down("md")]: {
      width: "22%",
      height: "50px",
      borderRadius: "10px",
      marginRight: mainTheme.spacing(5),
      marginTop: mainTheme.spacing(2),
      marginBottom: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.only("xs")]: {
      width: "42%",
      height: "50px",
      borderRadius: "10px",
      float: "left",
      marginLeft: mainTheme.spacing(13),
      marginTop: mainTheme.spacing(2),
      marginBottom: mainTheme.spacing(2),
    },
  },
}));

const EarningPayouts = ({
  getEarningListAction,
  earningListData,
  earningFilter,
  loading,
  count,
  next,
  previous,
}) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    getEarningListAction(1);
    setFilterValue("");
  }, []);

  //("earningListData", earningListData);
  // console.log(earningListData,"api data")

  useEffect(() => {
    if (count > 10) {
      setTotalPages(Math.ceil(count / 10));
    } else setTotalPages(1);
  }, [earningListData]);

  const [totalPages, setTotalPages] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const handleFilterChange = (e) => {
    setCurrentPage(1);
    setFilterValue(e.target.value);
    if (e.target.value.length >= 3) {
      earningFilter(1, e.target.value);
    }
    if (!e.target.value) {
      setFilterValue("");
      getEarningListAction(1);
      setCurrentPage(1);
    }
  };
  const COLUMNS = [
    {
      Header: "Category",
      accessor: "job_description",
    },
   
    {
      Header: "Service Provider",
      accessor: "sp_name",
    },
    {
      Header: "Service Seeker",
      accessor: "ss_name",
    },
    {
      Header:"Job Id",
      accessor:"job_id"
    },
    {
      Header:"Job Value",
      accessor:()=>{
        return "N/A"
      }
    },
    {
      Header: "MNRs Earned",
      accessor: "earn_tokens",
    },
    {
      Header:"SGD Paid"
    },

    // {
    //   Header: " ",
    //   accessor: "id",
    //   Cell: function renderActions(props) {
    //     const [isChecked, setIsChecked] = useState(false);
    //     const handleClose = () => {
    //       setIsChecked(null);
    //     };
    //     return (
    //       <>
    //         <Button
    //           disabled
    //           onClick={(event) => {
    //             setIsChecked(event.currentTarget);
    //           }}
    //         >
    //           <img src={Actions} className="actions" />
    //         </Button>
    //         <div className={classes.container}>
    //           <Menu
    //             id="simple-menu"
    //             anchorEl={isChecked}
    //             keepMounted
    //             open={Boolean(isChecked)}
    //             onClose={handleClose}
    //           >
    //             <MenuItem>
    //               <NavLink
    //                 to={`/mooner/referrals/${props.value}`}
    //                 className={classes.links}
    //               >
    //                 <div className={classes.FlexWrapper}>
    //                   <img src={View} className={classes.actionImage} />
    //                   <Typography className={classes.actionsLabel}>
    //                     View Referrals
    //                   </Typography>
    //                 </div>
    //               </NavLink>
    //             </MenuItem>
    //           </Menu>
    //         </div>
    //       </>
    //     );
    //   },
    // },
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
                    to={`/mooner/viewearning/${props.value}`}
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
  } = useTable(
    {
      columns,
      data: earningListData,
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Permissions page="view_admintransactionlist" />
        <Grid container spacing={2} className={classes.header}>
          <Grid item xs={12} sm={4} md={5} lg={5} xl={6}>
            <Typography className={classes.title}>Earnings</Typography>
          </Grid>
          <Grid xs={12} sm={8} md={7} lg={7} xl={6}>
            <div className="globalFilterContainer">
              <div className="icon">
                <Search />
              </div>
              <input
                type="text"
                className="globalFilter"
                placeholder="search"
                value={filterValue}
                onChange={handleFilterChange}
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
            {earningListData && earningListData.length > 0 ? (
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
            {/* <h1>Earning Table</h1> */}
          </>
        )}
      </Grid>
      <TablePagination
        totalPages={totalPages}
        count={count}
        getPageDataAction={getEarningListAction}
        searchPaginationAction={filterValue && earningFilter}
        searchString={filterValue && filterValue}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

const mapStateToProps = ({ earning }) => {
  // console.log(earning?.earningList[0]?.job_description,"meta state")
  return {
    earningListData: earning.earningList?.filter(res=>res!=null),
    loading: earning.loading,
    count: earning.count,
    next: earning.next,
    previous: earning.previous,
  };
 
};
export default connect(mapStateToProps, {
  getEarningListAction,
  earningFilter,
})(EarningPayouts);
