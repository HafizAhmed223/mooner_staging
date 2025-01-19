import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import {
  allpendingDisputeAction,
  deletePendingDispute,
} from "../../../redux/actions/disputeManagement/dispute.actions";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import {
  Grid,
  makeStyles,
  Typography,
  MenuItem,
  Menu,
  Button,
  CircularProgress,
  Container,
} from "@material-ui/core";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Search from "@material-ui/icons/Search";

import Active from "../../../assets/svg/green.svg";
import Pending from "../../../assets/svg/panding.svg";
import InActive from "../../../assets/svg/red.svg";
import Actions from "../../../assets/svg/actions.svg";
import Filter from "../../../assets/svg/filter.svg";
import Status from "../../../assets/svg/view.svg";
import Edit from "../../../assets/svg/edit.svg";
import Delete from "../../../assets/svg/delete.svg";
import TablePagination from "../../../common/pagination/Pagination";
import ConformationModal from "../../../common/modals/ConformationModal";
import { useHistory } from "react-router";
import Permissions from "../../subAdmin/Permissions";
import { canDelete } from "../../subAdmin/canDelete";
import { baseURL } from "../../../api";
import axios from "axios";
import moment from "moment";

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
  // header: {
  //   display: "flex",
  // },
  categoryHeading: {
    marginTop: mainTheme.spacing(6),
    display: "flex",
  },
  title: {
    fontSize: "27px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "##000000",
    opacity: "0.5",
    marginRight: "7px",
    fontWeight: "700",
    cursor: "pointer",
    [mainTheme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
    [mainTheme.breakpoints.down("xs")]: {
      fontSize: "16px",
    },
  },
  title2: {
    fontSize: "22px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#000000",
    marginLeft: "7px",
    fontWeight: "600",
    [mainTheme.breakpoints.down("lg")]: {
      fontSize: "18px",
      marginLeft: "2px",
    },
    [mainTheme.breakpoints.down("xs")]: {
      fontSize: "16px",
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
    width: "36%",
    height: "60px",
    borderRadius: "24px",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(4),
    marginBottom: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
      width: "60%",
    },
  },
  link: {
    textDecoration: "none",
  },
  button: {
    float: "right",
    width: "100%",
    height: "55px",
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    [mainTheme.breakpoints.only("lg")]: {
      width: "100%",
      height: "50px",
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.down("md")]: {
      width: "70%",
      height: "50px",
      borderRadius: "10px",
      marginRight: mainTheme.spacing(5),
      marginTop: mainTheme.spacing(2),
      marginBottom: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.only("xs")]: {
      width: "100%",
      height: "50px",
      borderRadius: "10px",
      float: "left",
      marginLeft: mainTheme.spacing(13),
      marginTop: mainTheme.spacing(2),
      marginBottom: mainTheme.spacing(2),
    },
  },
}));

const PendingDisputeList = ({
  allpendingDisputeAction,
  deletePendingDispute,
  pendingList,
  loading,
  next,
  previous,
}) => {
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const getBanners = async () => {
    const res = await axios.get(
      `${baseURL}dispute_management/cab_disputes/?page=${currentPage}`,
      config
    );

    setData(res?.data?.results);
    let Count = res?.data?.count;
    setCount(Count);
    if (Count > 10) {
      setTotalPages(Math.ceil(Count / 10));
    } else setTotalPages(1);
  };
  useEffect(() => {
    console.log("cab pending");
    getBanners();
  }, [currentPage]);
  console.log("data pending cab", data);

  const classes = useStyles();
  const history = useHistory();
  const COLUMNS = [
    {
      Header: "SP Name",
      accessor: "sp_name",
    },
    {
      Header: "SS Name",
      accessor: "ss_name",
    },
    {
      Header: "Cab Booking",
      accessor: "cab_booking",
    },
    {
      Header: "Budget",
      accessor: "budget",
    },
    {
      Header: "Dispute By",
      accessor: "disputed_by",
    },
    {
      Header: "Sp Description",
      accessor: "sp_description",
    },
    {
      Header: "SS Description",
      accessor: "ss_description",
    },
    {
      Header: "Won By",
      accessor: "won_by",
    },
    {
      Header: "Admin Comments",
      accessor: "admin_comments",
    },
    {
      Header: "SS Created at",
      accessor: (d) => {
        const date = moment(d?.ss_created_at).format("MMMM Do YYYY, h:mm a");
        return <div> {date} </div>;
      },
    },
    {
      Header: "Status",
      accessor: "dispute_status",
      Cell: function renderStatus(props) {
        return (
          <>
            {props.value === "Approved" && <img src={Active} />}
            {props.value === "Rejected" && <img src={InActive} />}
            {props.value === "Pending" && (
              <img style={{ height: "12px", width: "12px" }} src={Pending} />
            )}
          </>
        );
      },
    },
    // {
    //   Header: "History",
    //   accessor: (d) => {
    //     const id = d.booking_id;
    //     return (
    //       <NavLink
    //         to={`/mooner/details/dispute_History/${id}`}
    //         className={classes.links}
    //       >
    //         <Button>
    //           <img src={Status} className={classes.actionImage} />
    //         </Button>
    //       </NavLink>
    //     );
    //   },
    // },
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
                    to={{
                      pathname: `/mooner/edit_pending_cab_dispute/${props.value}`,
                      state: {
                        admin_comments: props.row.original.admin_comments,
                      },
                    }}
                    className={classes.links}
                  >
                    <div className={classes.FlexWrapper}>
                      <img src={Edit} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        Edit
                      </Typography>
                    </div>
                  </NavLink>
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
                actionName={open && deletePendingDispute}
              />
            </div>
          </>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  const { getTableProps, headerGroups, getTableBodyProps, prepareRow, page } =
    useTable(
      {
        columns,
        data: data,
      },
      usePagination
    );
  const handleBack = () => {
    history.push("/mooner/details/cab_refund_management");
  };
  return (
    <Container maxWidth="xl">
      <Permissions page="view_dispute" />
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container spacing={5} className={classes.header}>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={9}
            xl={9}
            className={classes.categoryHeading}
          >
            <Typography className={classes.title} onClick={handleBack}>
              Refund Management
            </Typography>
            <ArrowRightIcon />
            <Typography className={classes.title2}>Pending Disputes</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={3}
            xl={3}
            className={classes.categoryHeading}
          ></Grid>
        </Grid>
        <br />
        <br />
        {data && data.length > 0 ? (
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
              getPageDataAction={allpendingDisputeAction}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <div
            style={{ margin: "30px 0px", textAlign: "center", opacity: 0.3 }}
          >
            {" "}
            No Record Found{" "}
          </div>
        )}
      </Grid>
    </Container>
  );
};
const mapStateToProps = ({ dispute }) => {
  return {
    pendingList: dispute.pendingDisputeList,
    loading: dispute.loading,
    count: dispute.total,
    next: dispute.next,
    previous: dispute.previous,
  };
};
export default connect(mapStateToProps, {
  allpendingDisputeAction,
  deletePendingDispute,
})(PendingDisputeList);
