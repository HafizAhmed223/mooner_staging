import React, { useMemo, useState, useEffect, useRef } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import downloadBtn from "../../assets/images/downloadBtn.svg";
import {
  Grid,
  makeStyles,
  Typography,
  CircularProgress,
  MenuItem,
  Menu,
  Button,
  IconButton,
  Container,
} from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import {
  getAllUsersAction,
  deleteUser,
  filterUserAction,
} from "../../redux/actions/users/users.actions";
import { getUserDetailReportAction, handleListLoader } from "../../redux/actions/reports/report.actions";
import Search from "@material-ui/icons/Search";

import Active from "../../assets/svg/green.svg";
import InActive from "../../assets/svg/red.svg";
import Panding from "../../assets/svg/yellow.svg";

import Actions from "../../assets/svg/actions.svg";
import Filter from "../../assets/svg/filter.svg";

import Status from "../../assets/svg/status.svg";
import User from "../../assets/svg/user.svg";
import Edit from "../../assets/svg/edit.svg";
import Delete from "../../assets/svg/delete.svg";
import TablePagination from "../../common/pagination/Pagination";
import ConformationModal from "../../common/modals/ConformationModal";
import { CallMissedSharp } from "@material-ui/icons";
import { downloadExcel } from "react-export-table-to-excel";
import { baseURL } from "../../api";
import axios from "axios";
import { base_url_production, base_url_staging } from "../../utils/global";
import { canDelete } from "../subAdmin/canDelete";
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
    // justifyContent: "center",
    // alignItems: "center",
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
}));

const UsersTable = ({
  getAllUsers,
  filterUserAction,
  loading,
  usersData,
  deleteUser,
  count,
  next,
  previous,
  getUserDetailReport,
  userDetailReportData
}) => {
  useEffect(() => {

    getUserDetailReport()

    
    
    getAllUsers(1);
    setFilterValue("");
  }, []);
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const getURL = async () => {
    try {
      const res = await axios.get(
        `${baseURL}user_management/download_user_list/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      //("getURL", `${res?.data?.data}`);
      const a = document.createElement("a");
      a.href = `${base_url_staging}${res?.data?.data}`;
      a.download = `${base_url_staging}${res?.data?.data}`.split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      //("error", err);
    }
  };

  useEffect(() => {
    if (count > 10) {
      setTotalPages(Math.ceil(count / 10));
    } else setTotalPages(1);
  }, [usersData]);
  const [totalPages, setTotalPages] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  //("usersData", usersData);

  const handleFilterChange = (e) => {
    setCurrentPage(1);
    setFilterValue(e.target.value);
    if (e.target.value.length >= 3) {
      filterUserAction(1, e.target.value);
    }
    if (!e.target.value) {
      setFilterValue("");
      getAllUsers(1);
      setCurrentPage(1);
    }
  };
  const classes = useStyles();


  const openModal = async (item) => {
    console.log("clicked", item);
    const payload = {
      user_id: item,
      category_id: [],
      from: "",
      to: ""
    };

    try {
      const res = await axios.post(
        `${baseURL}ticket_management/download_user_report/`,
        payload,
        config
      );

      const a = document.createElement("a");
      a.href = `${base_url_staging}${res?.data?.data}`;
      a.download = `${base_url_staging}${res?.data?.data}`.split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (error) {
      console.log(error);
    }
  };

  const COLUMNS = [
    {
      Header: "Name",
      accessor: (d) => `${d.first_name} ${d.last_name}`,
      // accessor: (d) => {
      //   const Name = `${d.user.first_name}`
      //   return(
      //     <div> {(Name).length > 7 ? (((Name).substring(0, 7)) + '...') : Name } </div>
      //   );
      // }
    },
    {
      Header: "Email",
      accessor: (d) => {
        const Email = `${d.email}`;
        return (
          <div>
            {" "}
            {Email.length > 7 ? Email.substring(0, 13) + "..." : Email}{" "}
          </div>
        );
      },
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Reference Id",
      // Header: "Ref...  Id",
      accessor: "reference_id",
      // accessor: (d) => {
      //   const ref =  d  && d.reference_id ? `${d && d.reference_id}` : ""
      //   return(
      //     <div> {(ref).length > 7 ? (((ref).substring(0, 5)) + '...') : ref } </div>
      //   );
      // }
    },
    {
      Header: "Level",
      accessor: "level",
    },
    {
      Header: "Earning",
      accessor: "earning",
    },
    {
      Header: "Bookings",
      accessor: "bookings",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: function renderStatus(props) {
        return (
          <>
            {props.value === true && <img src={Active} />}
            {props.value === false && <img src={InActive} />}
            {props.value === "Onhold" && <img src={Panding} />}
          </>
        );
      },
    },
    {
      Header: " ",
      accessor: "id",
      Cell: function renderActions(props) {
        const [isChecked, setIsChecked] = useState(null);
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
          <div style={{ width: '120px' }}>
            <IconButton onClick={() => openModal(props.value)} >
              <CloudDownloadIcon />
            </IconButton>
            <Button
              onClick={(event) => {
                setIsChecked(event.currentTarget);
              }}
              className="m-0 p-0"
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
                <NavLink
                  to={`/mooner/change_status/${props.value}`}
                  className={classes.links}
                >
                  <MenuItem>
                    <div className={classes.FlexWrapper}>
                      <img src={Status} className={classes.actionImage} />

                      <Typography className={classes.actionsLabel}>
                        Change Status
                      </Typography>
                    </div>
                  </MenuItem>
                </NavLink>

                <NavLink
                  to={`/mooner/user_detail/${props.value}`}
                  className={classes.links}
                >
                  <MenuItem>
                    <div className={classes.FlexWrapper}>
                      <img src={Edit} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        View and Edit
                      </Typography>
                    </div>
                  </MenuItem>
                </NavLink>

                {canDelete() && (
                  <MenuItem>
                    <div
                      className={classes.FlexWrapper}
                      onClick={() => {
                        handleOpen(props.value);
                      }}
                    >
                      <img src={Delete} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        Delete
                      </Typography>
                    </div>
                  </MenuItem>
                )}
              </Menu>
              <ConformationModal
                isVisible={open}
                id={open && id}
                onClose={handleModalClose}
                actionName={open && deleteUser}
              />
            </div>
          </div>
        );
      },
    },
  ];

  //Excel Download
  const excelData = [];

  

  const header = [
    "ID",
    "FIRST NAME",
    "LAST NAME",
    "EMAIL",
    "PHONE No",
    "CATEGORY",
    "FLOOR NO",
    "NRIC FRONT",
    "NRIC BACK",
    "TYPE",
    "UNIT NO",
    "ADDRESS",
  ];

  function handleDownloadExcel() {
    
    userDetailReportData.data.forEach((item) => {
      if(item.nric_front){
        var urlList=[],urlbackList=[]
        item?.nric_front?.forEach(el => {
          urlList.push(base_url_production+el+' , ')
        })
        item?.nric_back?.forEach(el => {
          urlbackList.push(base_url_production+el+' , ')
        })
        item.nric_front=urlList
        item.nric_back=urlbackList
      }

      excelData.push([
        item.id,
        item.first_name,
        item.last_name,
        item.email,
        item?.phone_no,
        item.category_names,
        item.floor_no,
        item.nric_front,
        item?.nric_back,
        item.type,
        item.unit_no,
        item.address,
      ]);
    });

    downloadExcel({
      fileName: "User Detail Report",
      sheet: "User Detail",
      tablePayload: {
        header,
        // accept two different data structures
        body: excelData,
      },
    });
  }
  ///////////////////

  const columns = useMemo(() => COLUMNS, []);

  const { getTableProps, headerGroups, getTableBodyProps, prepareRow, page } =
    useTable(
      {
        columns,
        data: usersData || [],
      },
      usePagination
    );



  return (
    <Grid maxWidth="xl">
      <Permissions page="view_user" />
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container className={classes.header}>
          <Grid item xs={12} sm={4} md={5} lg={5} xl={6}>
            <Typography className={classes.title}>User Management</Typography>
          </Grid>

          <Grid items xs={12} sm={8} md={7} lg={7} xl={6}>
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
              <div className="circleContainer">
                <img src={Filter} className="filter" />
              </div>

              <div className="circleContainer1" onClick={getURL}>
                <img src={downloadBtn} className="filter" />
              </div>
            </div>
          </Grid>
        </Grid>
        <div style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleDownloadExcel}
            className={classes.button}
          >
            <img src={downloadBtn} className="filter m-2" width={15} style={{ marginRight: '5px' }} /> User Detail
          </Button>
        </div>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {usersData && usersData.length > 0 ? (
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
        getPageDataAction={getAllUsers}
        searchPaginationAction={filterValue && filterUserAction}
        searchString={filterValue && filterValue}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Grid>
  );
};
const mapStateToProps = ({ users, auth, report }) => {
  return {
    usersData: users.data,
    loading: users.loading,
    name: auth.user.first_name,
    count: users.count,
    next: users.next,
    previous: users.previous,
    userDetailReportData: report,
  };
};
export default connect(mapStateToProps, {
  getAllUsers: getAllUsersAction,
  getUserDetailReport: getUserDetailReportAction,
  deleteUser,
  filterUserAction,
})(UsersTable);
