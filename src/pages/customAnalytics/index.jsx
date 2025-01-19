import React, { useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import {
  Typography,
  Container,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Menu,
  InputLabel,
  CircularProgress,
  Box,
  Chip,
} from "@material-ui/core";
import {
  getApprovedDocuments,
  deleteApprovedAction,
} from "../../redux/actions/document/document.action";

import StatusCard from "../../common/reportsCards/StatusCard";
import ModuleCard from "../../common/reportsCards/ModuleCard";
import TipsCard from "../../common/reportsCards/TipsCard";

import Usage from "../../assets/reportSVG/usage.svg";
import imag from "../../assets/images/moonerfooter.png";
import autoTable from "jspdf-autotable";

import User from "../../assets/reportSVG/user.svg";
import Trending from "../../assets/reportSVG/trending.svg";
import Assessment from "../../assets/reportSVG/assessment.svg";
import Doolar from "../../assets/reportSVG/dollar.png";
import BugReport from "../../assets/reportSVG/bugreport.svg";
import Equalizer from "../../assets/reportSVG/equalizer.svg";
import Facebook from "../../assets/reportSVG/facebook.svg";
import Bookings from "../../assets/reportSVG/bookings.svg";
import Check from "../../assets/reportSVG/check.svg";
import Pdf from "../../assets/reportSVG/pdf.png";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import Table from "./Table";
// import { PdfDocument } from "./pdf";
import { getReport, handleListLoader } from "../../redux/actions/reports/report.actions";
import { getCustomAnalytics } from "../../redux/actions/analytics/analytics.action";
import { connect } from "react-redux";
import Permissions from "../subAdmin/Permissions";
import { downloadExcel } from "react-export-table-to-excel";
import Actions from "../../assets/svg/actions.svg";
import TablePagination from "../../common/pagination/Pagination";
import jsPDF from "jspdf";
import { useState } from "react";
import TableComponent from "./TableComponent";
import Search from "@material-ui/icons/Search";
import { getAllCategoriesAction } from "../../redux/actions/category/category.action";

const useStyles = makeStyles((mainTheme) => ({
  title: {
    fontSize: "22px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#000000",
    marginLeft: "7px",
    fontWeight: "600",
    marginTop: mainTheme.spacing(7),
    marginBottom: mainTheme.spacing(4),
    [mainTheme.breakpoints.down("lg")]: {
      fontSize: "18px",
    },
    [mainTheme.breakpoints.down("xs")]: {
      marginBottom: mainTheme.spacing(4),
      textAlign: "center",
      fontSize: "18px",
    },
  },
  CardWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  field: {
    width: "95%",
    borderRadius: "15px",
    height: "55px",
    backgroundColor: "#fff",
    fontSize: "14px",
    marginTop: mainTheme.spacing(1),
    marginBottom: mainTheme.spacing(4),
    "& .MuiOutlinedInput-input": {
      [mainTheme.breakpoints.down("lg")]: {
        padding: "15.5px 15px",
      },
    },
    [mainTheme.breakpoints.down("lg")]: {
      width: "90%",
      height: "54px",
    },
  },
  removeOutline: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        border: 0,
      },
      "&:hover fieldset": {
        border: 0,
      },
      "& fieldset": {
        border: 0,
      },
    },
  },
  textStyle: {
    "& .MuiInputBase-input": {
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
      color: "#20253B",
      opacity: "0.8",
      backgroundColor: "#fff",
      borderRadius: "20px",
      // height: '5px',
    },
  },
}));

const CustomAnalytics = ({ filterUserSearchAction, getCustomAnalytics, categoryData, getReport, reportData, getAllCategories, analyticList, loading }) => {
  const classes = useStyles();
  // console.log(reportData, "reportData data")
  console.log(analyticList, "analyticList data")

  const [catagoriesList, setCatagoriesList] = useState([]);

  const [column, setColumn] = useState([
    { Header: 'Category Name', accessor: 'category_name', id: 1, enable: true, link: false },
    { Header: 'Total No Booking', accessor: 'total_no_booking', id: 2, enable: true, link: true },
    { Header: 'Total No Cancel Booking', accessor: 'cancelled_booking', id: 2, enable: true, link: true },
    { Header: 'Total No Ongoing Booking', accessor: 'ongoing_booking', id: 2, enable: true, link: true },
    { Header: 'Total No Service Provided', accessor: 'service_provided', id: 3, enable: true, link: true },
    { Header: 'Total No SP', accessor: 'total_sp', id: 4, enable: true, link: true },
    { Header: 'Total No Users', accessor: 'total_no_users', id: 5, enable: true, link: true },
    { Header: 'Total Stripe Fee', accessor: 'stripe_fee_total', id: 6, enable: true, link: true },
    { Header: 'Gas fee Paid', accessor: 'gas_fee_paid', id: 7, enable: true, link: true },
    { Header: 'Retention Rate', accessor: 'retention_rate', id: 8, enable: true, link: true },
    { Header: 'SS Spent', accessor: 'total_spent', id: 9, enable: true, link: true },
    { Header: "Total Amount Paidout", accessor: "total_earning", id: 10, enable: true, link: true },
    { Header: 'Total MLN Paid', accessor: 'total_sp_earning_mln', id: 11, enable: true, link: true },
    { Header: 'Total Active User', accessor: 'total_active_users', id: 12, enable: true, link: true },
    { Header: 'Non Active Users', accessor: 'total_non_users', id: 13, enable: true, link: true }
  ])



  const [filterValue, setFilterValue] = useState("");
  const [catagories, setCatagories] = useState([]);
  const [Date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // console.log("filterValue", filterValue)

  useEffect(() => {
    // console.log("in use effect", [endDate, Date, catagories] )
    // console.log("====")
    if (Date || endDate || catagories.length >= 1)
      getCustomAnalytics(Date, endDate, categoryData.filter((item) => catagories.includes(item.name)).map(itm2 => itm2.id), filterValue);
  }, [endDate, Date, catagories]);

  useEffect(() => {
    getCustomAnalytics();
  }, []);
  useEffect(() => {
    getAllCategories();
  }, []);

  const handleList = (id) => {
    handleListLoader();
    var list = column;
    list.forEach(el => {
      if (el.id == id) {
        el.enable = !el.enable;
      }
    })
    setColumn(list);
  }
  const [isChecked, setIsChecked] = useState(null);
  const handleClose = () => {
    setIsChecked(null);
  };



  const handleFilterChange = (e) => {
    // setCurrentPage(1);
    // console.log(e.target.value)
    setFilterValue(e.target.value);
    if (e.target.value.length >= 3) {
      getCustomAnalytics(null, null, null, e.target.value);
    }
    if (!e.target.value) {
      setFilterValue("");
      getCustomAnalytics();
      // setCurrentPage(1);
    }
  };

  const handleChangeCategories = (event) => {
    // console.log({ event })
    // setCatagories(event.target.value);

    const {
      target: { value },
    } = event;
    setCatagories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  }
  const handleDateChange = (e) => {
    //("datechange", e.target.value);
    setDate(e.target.value);
  };
  /////////
  // console.log("categories", catagories)
  return (
    <Container maxWidth="xl" >
      <Permissions page="view_tickets" />
      <Grid container>

        <Grid item xs={12}>

          <Typography className={classes.title}> Custom Analytics </Typography>
          <Grid items
            xs={12} sm={12} md={12} lg={12} xl={12}
          // xs={12} sm={8} md={7} lg={7} xl={6}
          >
            <div className="globalFilterContainer">
              <div className="icon">
                <Search />
              </div>
              <input
                type="text"
                value={filterValue}
                onChange={handleFilterChange}
                className="globalFilter"
                placeholder="search"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {/* <div style={{ width: '100%', textAlign: 'right' }}>
              <Button
                onClick={(event) => {
                  generatePDF();
                }}
                color="primary"
                variant="contained"
                size="small"
                className={classes.button}
              >
                Download PDF
              </Button>
              &nbsp;
              <Button
                onClick={(event) => {
                  handleDownloadExcel();
                }}
                color="primary"
                variant="contained"
                size="small"
                className={classes.button}
              >
                Download Excel
              </Button>


            </div> */}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography >
            Category
          </Typography>
          <FormControl
            variant="outlined"
            className={[classes.field, classes.removeOutline]}
          >
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={catagories}
              onChange={handleChangeCategories}
              label="categories"
              multiple
              className={classes.textStyle}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}

            // renderValue={(selected) => (
            //   <Box
            //     sx={{
            //       display: "flex",
            //       flexWrap: "wrap",
            //       gap: 0.5,
            //     }}
            //   >
            //     {selected.map(
            //       (value) => (
            //         <Chip
            //           key={value?.name}
            //           label={value?.name}
            //         />
            //       )
            //     )}
            //   </Box>
            // )}
            >
              {categoryData &&
                categoryData.map((res, index) => (
                  <MenuItem
                    key={index}
                    className={classes.dropdownMenuStyle}
                    value={res.name}
                  >
                    {res.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className={classes.CardWrapper} align="right">

            <Menu
              id="simple-menu"
              anchorEl={isChecked}
              keepMounted
              open={Boolean(isChecked)}
              onClose={handleClose}
            >
              {column.map((item, index) =>
                <MenuItem>
                  <div className={classes.FlexWrapper}>
                    <Typography className={classes.actionsLabel}>
                      <input type="checkbox" defaultChecked={item.enable} onChange={() => handleList(item.id)} />{item.Header}
                    </Typography>
                  </div>
                </MenuItem>
              )}
            </Menu>
          </div>
          <Typography>From</Typography>
          <TextField
            onChange={handleDateChange}
            type="date"
            id="outlined-basic"
            variant="outlined"
            placeholder="DD/MM/YYYY"
            className={[classes.field, classes.removeOutline]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography>To</Typography>
          <TextField
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            id="outlined-basic"
            variant="outlined"
            name="to"
            placeholder="DD/MM/YYYY"
            className={[classes.field, classes.removeOutline]}
          />
        </Grid>

      </Grid>

      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {!loading ?
          <TableComponent  data={filterValue.length>0 ? analyticList.filter(item => item?.user_name?.toLowerCase()?.includes(filterValue)) : analyticList} columns={column} />
          : ''
        }
      </Grid> */}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableComponent data={filterValue.length > 0 ? analyticList.filter(item => item?.user_name?.toLowerCase()?.includes(filterValue)) : analyticList} columns={column} />
        )}
      </Grid>

    </Container>
  );
};
const mapStateToProps = ({ category, analytics, report, loader }) => {
  // console.log(category, "mata state")
  return {
    getReport,
    analyticList: analytics?.data,
    reportData: report?.data,
    loading: loader.loading,
    categoryData: category?.data,
  };
};
export default connect(mapStateToProps, {
  getCustomAnalytics,
  getReport,
  getAllCategories: getAllCategoriesAction,
})(CustomAnalytics);
