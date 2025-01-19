import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { useHistory } from "react-router-dom";
import {
  Grid,
  makeStyles,
  Typography,
  Container,
  MenuItem,
  Menu,
  Button,
  CircularProgress,
  Avatar,
  Box,
} from "@material-ui/core";

import { useDispatch } from "react-redux";

import TablePagination from "../../common/pagination/Pagination";

import Permissions from "../subAdmin/Permissions";
import axios from "axios";
import { baseURL } from "../../api";
import { setSnackbar } from "../../utils/global.actions";
import moment from "moment";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

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
    marginBottom: mainTheme.spacing(2),
    marginTop: mainTheme.spacing(2),
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

const PaidoutListing = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [results, setResults] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const location = useLocation();
  const { state: { date, endDate } = {} } = location;
  const [reRender, setReRender] = useState(0);
  useEffect(() => {
    setFilterValue("");
  }, []);
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getPaidout = async (currentPage) => {
    const res = await axios.get(
      `${baseURL}ticket_management/paidout_listing/?page=${currentPage}&date=${date}&to=${endDate}`,
      config
    );
    console.log("resp", res);
    setResults(res?.data?.data?.results);
    let Count = res?.data?.data?.count;
    setCount(Count);
    if (Count > 10) {
      setTotalPages(Math.ceil(Count / 10));
    } else setTotalPages(1);
  };

  useEffect(() => {
    getPaidout(currentPage);
  }, [reRender]);

  const COLUMNS = [
    {
      Header: "Job Id",
      accessor: "job_id",
    },
    {
      Header: "MNR",
      accessor: (d) => {
        const mnr = +d?.mnr;
        return <div> {mnr?.toFixed(2)} </div>;
      },
    },

    {
      Header: "SGD",
      accessor: (d) => {
        const sgd = +d?.sgd;
        return <div> {sgd?.toFixed(2)} </div>;
      },
    },
    {
      Header: "Transaction Name",
      accessor: "transaction_name",
    },
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Withdraw Date",
      accessor: (d) => {
        const date = moment(d?.withdraw_at).format("MMMM Do YYYY");
        return <div> {date} </div>;
      },
    },
    {
      Header: "Withdraw Time",
      accessor: (d) => {
        const date = moment(d?.withdraw_at).format("h:mm:ss a");
        return <div style={{ textAlign: "center" }}> {date} </div>;
      },
    },
  ];
  const columns = useMemo(() => COLUMNS, []);
  const bannersData = useMemo(() => results || [], [results]);

  const { getTableProps, headerGroups, getTableBodyProps, prepareRow, page } =
    useTable(
      {
        columns,
        data: bannersData,
      },
      usePagination
    );

  return (
    <Grid maxWidth="xl">
      <Permissions page="view_banners" />
      <Grid xs={12} sm={12} md={10} style={{ marginLeft: "5rem" }}>
        <Typography className={classes.title}>Paid Out Listing</Typography>

        <>
          {results && results?.length > 0 ? (
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
      </Grid>
      <Grid item xs={12} md={10} style={{ marginLeft: "5rem" }}>
        <TablePagination
          totalPages={totalPages}
          count={count}
          getPageDataAction={getPaidout}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Grid>
    </Grid>
  );
};

export default PaidoutListing;
