import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import {
  getAllServiceProvider,
  deleteSPAction,
  searchServiceProviderAction,
} from "../../../redux/actions/spManagement/spmanagement.actions";
import {
  Grid,
  makeStyles,
  Typography,
  MenuItem,
  Menu,
  Button,
  CircularProgress,
} from "@material-ui/core";
import downloadBtn from "../../../assets/images/downloadBtn.svg";

import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Search from "@material-ui/icons/Search";

import Active from "../../../assets/svg/green.svg";
import InActive from "../../../assets/svg/red.svg";
import Panding from "../../../assets/svg/yellow.svg";
import Actions from "../../../assets/svg/actions.svg";
import Filter from "../../../assets/svg/filter.svg";
import Status from "../../../assets/svg/status.svg";
import Edit from "../../../assets/svg/edit.svg";
import Delete from "../../../assets/svg/delete.svg";
import TablePagination from "../../../common/pagination/Pagination";
import ConformationModal from "../../../common/modals/ConformationModal";
import { downloadExcel } from "react-export-table-to-excel";
import Permissions from "../../subAdmin/Permissions";
import { canDelete } from "../../subAdmin/canDelete";
import axios from "axios";
import { baseURL } from "../../../api";
import { base_url_staging } from "../../../utils/global";
// import { base_url_staging } from "../../../utils/global";

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

const SPManagementTable = ({
  allSpListAction,
  searchData,
  searchServiceProviderAction,
  deleteSPAction,
  spListData,
  loading,
  count,
  next,
  previous,
}) => {
  useEffect(() => {
    allSpListAction(1);
    setFilterValue("");
  }, []);

  useEffect(() => {
    if (count > 10) {
      setTotalPages(Math.ceil(count / 10));
    } else setTotalPages(1);
  }, [spListData]);

  const [totalPages, setTotalPages] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (e) => {
    setCurrentPage(1);
    setFilterValue(e.target.value);
    if (e.target.value.length >= 3) {
      searchServiceProviderAction(1, e.target.value);
    }
    if (!e.target.value) {
      setFilterValue("");
      allSpListAction(1);
      setCurrentPage(1);
    }
  };
  const history = useHistory();
  const viewSP = (id) => {
    // to={`/mooner/view_sp_management/${props.value}`}
    history.push({
      pathname: `/mooner/view_sp_management/${id}`,
    });
    //("id", id);
  };
  const classes = useStyles();
  const COLUMNS = [
    {
      Header: "Name",
      accessor: "first_name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Reference Id",
      accessor: "reference_id",
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
        return props.value === true ? (
          <img
            src={Active}
            style={{ paddingLeft: "20px", height: "10px", widht: "10px" }}
          />
        ) : (
          <img
            src={InActive}
            style={{ paddingLeft: "20px", height: "10px", widht: "10px" }}
          />
        );
      },
    },
    {
      Header: "",
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
                    to={`/mooner/sp_management/change_status/${props.value}`}
                    className={classes.links}
                  >
                    <div className={classes.FlexWrapper}>
                      <img src={Status} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        Change Status
                      </Typography>
                    </div>
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={() => viewSP(props?.value)}>
                  {/* <NavLink
                    to={`/mooner/view_sp_management/${props.value}`}
                    className={classes.links}
                  > */}
                  <div className={classes.FlexWrapper}>
                    <img src={Edit} className={classes.actionImage} />
                    <Typography className={classes.actionsLabel}>
                      View and Edit
                    </Typography>
                  </div>
                  {/* </NavLink> */}
                </MenuItem>
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
                actionName={open && deleteSPAction}
              />
            </div>
          </>
        );
      },
    },
  ];
  //Excel Download
  // const excelData = [];
  // spListData?.map((item) => {
  //   excelData.push([
  //     item.first_name,
  //     item.reference_id,
  //     item.telephone,
  //     item.email,
  //     item.active_service,
  //   ]);
  // });

  // const header = [
  //   "NAME",
  //   "REFFERAL ID",
  //   "TELEPHONE",
  //   "EMAIL",
  //   "ACTIVE SERVICES",
  // ];
  // function handleDownloadExcel() {
  //   downloadExcel({
  //     fileName: "SP Management",
  //     sheet: "react-export-table-to-excel",
  //     tablePayload: {
  //       header,
  //       // accept two different data structures
  //       body: excelData,
  //     },
  //   });
  // }
  ///////////////////


  const columns = useMemo(() => COLUMNS, [spListData]);

  const { getTableProps, headerGroups, getTableBodyProps, prepareRow, page } =
    useTable(
      {
        columns,
        data: spListData,
      },
      usePagination
    );
  //("spListData", spListData);
  const token = localStorage.getItem("authToken");
  const getURL = async () => {
    try {
      const res = await axios.get(
        `${baseURL}user_management/download_user_list/?list_for=sp`,
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
  
  
  return (
    <Grid maxWidth="xl">
      <Permissions page={"view_spservices"} />
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container className={classes.header}>
          <Grid item xs={12} sm={4} md={5} lg={5} xl={6}>
            <Typography className={classes.title}>
              Service Provider Management
            </Typography>
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
              <div className="circleContainer1"
              //  onClick={handleDownloadExcel}
               onClick={getURL}
               >
                <img src={downloadBtn} className="filter" />
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
            {spListData && spListData.length > 0 ? (
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
        getPageDataAction={allSpListAction}
        searchPaginationAction={filterValue && searchServiceProviderAction}
        searchString={filterValue && filterValue}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Grid>
  );
};
const mapStateToProps = ({ spManagement }) => {
  return {
    spListData: spManagement.allSpList,
    searchData: spManagement.filterData,
    loading: spManagement.loading,
    count: spManagement.total,
    next: spManagement.next,
    previous: spManagement.previous,
  };
};
export default connect(mapStateToProps, {
  allSpListAction: getAllServiceProvider,
  deleteSPAction,
  searchServiceProviderAction,
})(SPManagementTable);
