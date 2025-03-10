import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  makeStyles,
  Typography,
  Container,
  MenuItem,
  Menu,
  Button,
} from "@material-ui/core";
import Pagination from "../../common/pagination/Pagination";
import Search from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import Actions from "../../assets/svg/actions.svg";
// import TableLeftArrow from "../../../assets/svg/tableLeftArrow.svg";
// import TableRightArrow from "../../../assets/svg/tableRightArrow.svg";
// import Pagination from "../../../assets/svg/pagination.svg";
import Active from "../../assets/svg/green.svg";
import InActive from "../../assets/svg/red.svg";
import TablePagination from "../../common/pagination/Pagination";

import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../api";
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
    [mainTheme.breakpoints.only("xs")]: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
  },
  //   title: {
  //     marginTop: mainTheme.spacing(7),
  //     fontSize: "24px",
  //     lineHeight: "28px",
  //     letterSpacing: "0.2em",
  //     color: "#20253B",
  //     animation: "slideInRight",
  //   },
  categoryHeading: {
    marginTop: mainTheme.spacing(8),
    display: "flex",
    //   direction: "row",
  },
  title: {
    fontSize: "27px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "##000000",
    opacity: "0.5",
    marginRight: "7px",
    cursor: "pointer",
    fontWeight: "700",
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "15px",
    },
  },
  title2: {
    fontSize: "22px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#000000",
    marginLeft: "7px",
    fontWeight: "600",
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "12px",
      marginLeft: "2px",
    },
  },
  registertypo: {
    color: "#20253B",
    fontWeight: "600",
    fontSize: "20px",
    letterSpacing: "0.2em",
    marginTop: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "14px",
    },
  },
  middleGridwrapper: {
    display: "flex",
    flexDirection: "row",
  },
  middleUpperdiv: {
    position: "relative",
  },
  Eggplateimg: {
    width: "150px",
    height: "140px",
  },
  cameraIcondiv: {
    width: "50px",
    height: "45px",
    backgroundColor: "#FEDB29",
    position: "absolute",
    top: "54%",
    left: "111px",
    borderRadius: "35%",
    justifyContent: "center",
  },
  Cameraicon: {
    marginTop: "10px",
    marginLeft: "11px",
  },
  middleRightdiv: {
    marginTop: "9%",
    marginLeft: "20px",
  },
  rightUpperdiv: {
    display: "flex",
    flexDirection: "row",
  },
  categoryname: {
    fontFamily: "Gilroy-Bold",
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#000000",
    fontWeight: "50px",
  },
  editimg: {
    width: "20px",
    height: "20px",
    marginLeft: "20px",
    cursor: "pointer",
  },
  distributors: {
    marginTop: "10px",
    fontFamily: "Gilroy-Medium",
    fontSize: "14px",
    lineHeight: "16px",
    /* identical to box height */
    letterSpacing: "0.2em",
    color: "#000000",
    opacity: "0.7",
  },
  rightGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  managecategory: {
    width: "42%",
    height: "60px",
    borderRadius: "24px",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(3),
    marginBottom: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
      width: "55%",
    },
    [mainTheme.breakpoints.only("sm")]: {
      width: "auto",
    },
    [mainTheme.breakpoints.down("xs")]: {
      width: "auto",
    },
  },
  link: {
    textDecoration: "none",
  },
}));

const CategoryListing = () => {
  const history = useHistory();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state: { date, endDate } = {} } = location;
  console.log("date", date);
  //("roleinsubadmin", role === "Super_Admin");
  const handleClick = () => {
    history.push({
      pathname: "/mooner/create_sub_admin",
    });
  };
  const handleClickRole = () => {
    history.push({
      pathname: "/mooner/create_role",
    });
  };

  const [Data, setData] = useState([]);
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  //("currentPage in table", currentPage);
  const getTableData = async (currentPage) => {
    // debugger;

    try {
      const res = await axios.get(
        `${baseURL}ticket_management/category_listing/?page=${currentPage}&date=${date}&to=${endDate}`,
        config
      );
      //("res", res);
      setData(res?.data?.data);
      const Count = res?.data?.data?.count;
      if (Count > 10) {
        setTotalPages(Math.ceil(Count / 10));
      } else setTotalPages(1);
    } catch (error) {
      //("error", error);
    }
  };
  //("Data", Data);
  useEffect(() => {
    getTableData(currentPage);
  }, []);

  const classes = useStyles();
  const COLUMNS = [
    // {
    //   Header: "Job Id",
    //   accessor: "job_id",
    // },
    {
      Header: "Category Name",
      accessor: "name",
    },

    {
      Header: "Completed Jobs",
      accessor: "completed_job",
    },
    {
      Header: "Service Providers",
      accessor: "sp_registered",
    },

    {
      Header: "Status",
      accessor: "cat_is_active",
      Cell: function renderStatus(props) {
        return (
          <div style={{ textAlign: "center" }}>
            {props.value === true && <img src={Active} />}
            {props.value === false && <img src={InActive} />}
            {/* {props.value === "Onhold" && <img src={Panding} />} */}
          </div>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Data?.results || [], [Data]);
  //("data", data);
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

  const { pageIndex } = state;
  const arrayPageIndex =
    pageIndex - 2 < 0
      ? pageOptions.slice(0, pageIndex + 3)
      : pageOptions.slice(pageIndex - 2, pageIndex + 3);

  return (
    <Container maxWidth="xl">
      <Permissions page="view_tickets" />
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container spacing={5} className={classes.header}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Typography className={classes.registertypo}>
              Completed Services
            </Typography>
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
      <TablePagination
        totalPages={totalPages}
        count={count}
        getPageDataAction={getTableData}
        // searchPaginationAction={filterValue && filtercategoryregistereduser}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

export default CategoryListing;
