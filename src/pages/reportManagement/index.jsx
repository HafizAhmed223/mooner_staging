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
import { getAllCategoriesAction } from "../../redux/actions/category/category.action";
import { connect } from "react-redux";
import PdfButton from "./PdfButton";
import Download from "./Download";
import Permissions from "../subAdmin/Permissions";
import { downloadExcel } from "react-export-table-to-excel";
import Actions from "../../assets/svg/actions.svg";
import TablePagination from "../../common/pagination/Pagination";
import jsPDF from "jspdf";
import { useState } from "react";
import TableComponent from "./TableComponent";
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

const ReportManagement = ({ categoryData, getAllCategories, getReport, reportData, loading, handleListLoader }) => {
  const classes = useStyles();
  const [Date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
console.log(categoryData,"api data")
  const [ticketCatagories, setTicketCatagories] = useState([]);
  const [ticketCatagoriesList, setTicketCatagoriesList] = useState([{ id: 'Accounts', label: 'Accounts' },
  { id: 'Bugs Reporting', label: 'Bugs Reporting' },
  { id: 'General', label: 'General' },
  { id: 'Dispute', label: 'Dispute' }]);

  const [catagories, setCatagories] = useState([]);
  const [catagoriesList, setCatagoriesList] = useState([]);

  useEffect(() => {
    getReport(Date, endDate, catagories, ticketCatagories);
  }, [endDate, Date, catagories, ticketCatagories]);
  useEffect(() => {
    getAllCategories();
  }, []);
  useEffect(() => {
    getCatagories();
  }, [categoryData]);

  const generatePDF = () => {
    console.log("generatePDF");

    var col = [];
    var row = [];
    column.forEach(el => {
      col.push(el.Header)

    })

    reportData.forEach(e => {
      var c = []
      column.forEach(el => {
        c.push(e[el.accessor])

      })
      row.push(c)
    })

    // console.log(row)
    var doc = new jsPDF("l", "pt");
    doc.text(350, 50, `Report Management`);

    autoTable(doc, {
      theme: "grid",
      startY: 100,
      styles: { fontSize: 8, halign: 'center' },
      headStyles: { fillColor: [179, 148, 5] },
      alternateRowStyles: { fillColor: [223, 226, 240] },
      tableLineColor: [179, 148, 5],
      tableLineWidth: 0.1,
      html: '#my-table'
    })
    //   autoTable(doc, {
    //     theme: "grid",
    //     startY: 100,
    //     styles: { fontSize: 15 },
    //     columnStyles: {
    //       0: { cellWidth: "50%", minCellHeight: 40 },
    //       1: { cellWidth: 100, minCellHeight: 40 },
    //     },
    //     head: [col],
    // body: [row
    // ],
    //     // body: [
    //     //   ["Total Number of Users:", reportData?.service_seeker?.toFixed(2)],
    //     //   [
    //     //     "Total number of service providers:",
    //     //     reportData?.service_provider?.toFixed(2),
    //     //   ],
    //     //   ["Total number of Bookings:", reportData?.bookings?.toFixed(2)],
    //     //   ["Total amount earned on app", reportData?.mooner_earning?.toFixed(2)],
    //     //   [
    //     //     "Total amount of paid out MNR's:",
    //     //     reportData?.total_paid_out?.toFixed(2),
    //     //   ],
    //     //   ["Total numbers of complaints:", reportData?.complains?.toFixed(2)],
    //     //   ["Pending Complaints:", reportData?.pending_complains?.toFixed(2)],
    //     //   ["Completed Complaints:", reportData?.pending_complains?.toFixed(2)],
    //     //   ["Total App Revenue:", reportData?.app_mln?.toFixed(2)],
    //     //   ["Cancelled Bookings:", reportData?.bookings_canceled?.toFixed(2)],
    //     //   ["Completed Services:", reportData?.completed_services?.toFixed(2)],
    //     //   [
    //     //     "Inactive Service Provider:",
    //     //     reportData?.inactive_service_provider?.toFixed(2),
    //     //   ],
    //     //   ["Reffer & MLN in MNR:", reportData?.referrals_mln?.toFixed(2)],
    //     //   ["Refund MLN:", reportData?.refund_mln?.toFixed(2)],
    //     //   ["Reviews:", reportData?.reviews?.toFixed(2)],
    //     //   ["Seeker With Provider:", reportData?.seeker_with_provider?.toFixed(2)],
    //     //   [
    //     //     "Seeker Without Provider:",
    //     //     reportData?.seeker_without_provider?.toFixed(2),
    //     //   ],
    //     //   ["Tip MLN:", reportData?.tip_mln?.toFixed(2)],
    //     // ],
    //   });
    var img = new Image();
    img.src = imag;
    doc.addImage(img, "png", 370, 500, 70, 70);
    doc.save("report.pdf");
  };

  //Excel Download

  function handleDownloadExcel() {
    const body = [],
      header = [];
    const format = Object.entries(reportData);
    console.log(format,"api format")
    // //("format", format);
    format?.map((item) => {
      header.push(item[0]?.replaceAll("_", " "));
      body.push("" + item[1]);
    });
    //("header", header);
    //("body", body);

    // const header = ["Firstname", "Lastname", "Age"];
    // const body = [
    //   ["Edison", "Padilla", 14],
    //   ["Cheila", "Rodrigez", 56],
    // ];

    downloadExcel({
      fileName: "Report.xls",
      sheet: "Report.xls",
      tablePayload: {
        header,
        // accept two different data structures
        body: [body],
      },
    });
  }
  const handleDateChange = (e) => {
    //("datechange", e.target.value);
    setDate(e.target.value);
  };



  const getCatagories = () => {
    let items = categoryData?.filter((Allcategories) => Allcategories.behaviour === "Default")
      .map((res, i) => {
        return { value: res.id, label: res.name };
      });
    setCatagoriesList(items && items.length > 0 ? items : "");
  };
  const handleChangeCategories = (event) => {
    // setCatagories(event.target.value);

    const {
      target: { value },
    } = event;
    setCatagories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  }

  const handleChangeTicketCategories = (event) => {
    // setTicketCatagories(event.target.value);

    const {
      target: { value },
    } = event;
    console.log("value", value);
    setTicketCatagories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  }

  const [column, setColumn] = useState([
    { Header: 'Category', accessor: 'category_name', id: 1, enable: true, link: false },
    { Header: 'Tip MNR/SGD', accessor: 'Tip', id: 3, enable: true, link: false },
    { Header: 'Total Amount Earned Mooner App MNR/SGD', accessor: 'total_amount_earned_mooner_app', id: 4, enable: true, link: false },
    { Header: 'total Amount Moolah Paid Out MNR/SGD', accessor: 'total_amount_of_moolah_paid_out', id: 5, enable: false, link: false },
    { Header: 'Total amount Paid OutMNR/SGD', accessor: 'total_amount_paid_out', id: 7, enable: true, link: false },
    { Header: 'Total No Booking', accessor: 'total_no_booking', id: 8, enable: true, link: false },
    { Header: 'Total No Cancelled booking', accessor: 'total_no_cancelled_booking', id: 9, enable: true, link: true },
    { Header: 'Total No Refund', accessor: 'total_no_refund', id: 10, enable: true, link: true },
    { Header: 'Total No Service Provied', accessor: 'total_no_services_provided', id: 11, enable: true, link: false },
    { Header: 'Total No SP', accessor: 'total_no_sp', id: 12, enable: true },
    { Header: 'Total No users', accessor: 'total_no_users', id: 13, enable: true, link: false },
    { Header: 'Total No of Completed Complaints', accessor: 'total_number_of_completed_complaints', id: 14, enable: true, link: false },
    { Header: 'Total No of Pending COmplaints', accessor: 'total_number_of_pending_complaints', id: 15, enable: true, link: false },
    { Header: 'Total share on social media', accessor: 'total_share_on_social_media', id: 16, enable: true, link: false }])

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
  const handleOpen = (id) => {
    setOpen(true);
    setIsChecked(null);
    setId(id);
  };
  const [currentPage, setCurrentPage] = useState(1);

  /////////
  return (
    <Container maxWidth="xl" >
      <Permissions page="view_tickets" />
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.title}> Reports </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
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

                  renderValue={(selected) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {selected.map(
                        (value) => (
                          <Chip
                            key={value?.id}
                            label={value?.label}
                          />
                        )
                      )}
                    </Box>
                  )}
                >
                  {catagoriesList &&
                    catagoriesList.map((res, index) => (
                      <MenuItem
                        key={index}
                        className={classes.dropdownMenuStyle}
                        value={res.value}
                      >
                        {res.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography >
                Ticket Categories
              </Typography>
              <FormControl
                variant="outlined"
                className={[classes.field, classes.removeOutline]}
              >

                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={ticketCatagories}
                  onChange={handleChangeTicketCategories}
                  label="Ticket Categories"
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

                  renderValue={(selected) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {selected.map(
                        (value) => (
                          <Chip
                            key={value?.label?.replace(" ", "_")}
                            label={value?.label}
                          />
                        )
                      )}
                    </Box>
                  )}
                >
                  {ticketCatagoriesList &&
                    ticketCatagoriesList.map((res, index) => (
                      <MenuItem
                        key={index}
                        className={classes.dropdownMenuStyle}
                        value={res.label}
                      >
                        {res.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
            {/* <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <FormControl
                variant="outlined"
                className={[classes.field, classes.removeOutline]}
              >
                <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                <Select
                  //   onChange={handleChangeCountry}
                  //   value={country}
                  name="country"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="subCategories"
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
                >
                  <MenuItem value={"global"}>Pak</MenuItem>
                  <MenuItem value={"regional"}>UK</MenuItem>
                  <MenuItem value={"local"}>USA</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            {/* <Grid
              item
              xs={12}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              className={[classes.field, classes.removeOutline]}
              style={{
                display: "flex",
                backgroundColor: "transparent",
                paddingLeft: "30px",
              }}
            >
              <Download data={reportData} />
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <div style={{ width: '100%', textAlign: 'right' }}>
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
          <Button
            onClick={(event) => {
              setIsChecked(event.currentTarget);
            }}
            color="primary"
            
          >
            <img src={Actions} className="actions" />
          </Button>
          
        </div>

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
        {!loading ?
          <TableComponent date={Date} endDate={endDate} columns={column.filter(res => res.enable == true)} data={reportData} /*data={reportData.slice(currentPage, currentPage * 10)}*/ totalPages={Math.ceil(reportData?.length / 10)} currentPage={currentPage} setCurrentPage={(e) => setCurrentPage(e)} />
          : ''}

      </Grid>

    </Container>
  );
};
const mapStateToProps = ({ category, report, loader }) => {
  return {
    reportData: report?.data,
    loading: loader.loading,
    categoryData: category.data,
  };
};
export default connect(mapStateToProps, {
  getReport,
  handleListLoader,
  getAllCategories: getAllCategoriesAction,
})(ReportManagement);
