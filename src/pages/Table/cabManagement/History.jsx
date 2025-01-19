import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import {
    disputeHistoryList
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
    Container
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
import { useHistory, useParams } from "react-router";

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

const DisputeHistory = ({
    disputeHistoryList,
    historyList,
    loading,
}) => {
    const {id} = useParams();
    useEffect(() => {
        const payload = {
            booking_id: id,
        }
        disputeHistoryList(payload);
    }, [id]);

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
            Header: "Category",
            accessor: "category_name",
        },
        {
            Header: "Booking ID",
            accessor: "booking_id",
        },
        {
            Header: "SS Created at",
            accessor: (d) => {
                const date = d.ss_created_at.slice(0, 10);
                return (
                    <div> {date} </div>
                );
            }
        },
        {
            Header: "Status",
            accessor: "dispute_status",
            Cell: function renderStatus(props) {
              return(
                <>
                 {props.value === "Approved" &&   <img src={Active} />}
                 {props.value === "Rejected" &&   <img src={InActive} />}
                 {props.value === "Pending" &&   <img style={{ height: "12px", width: "12px" }} src={Pending} />}
                </> 
              )
            },
          },
        {
            Header: "",
            accessor: "id",
            Cell: function renderActions(props) {
                return (
                    <>
                        <Button>
                        </Button>
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
                data: historyList,
            },
            usePagination
        );
    const handleBack = () => {
        history.push("/mooner/details/refund_management")
    }
    return (
        <Container maxWidth="xl">
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
                            Dispute Management
                        </Typography>
                        <ArrowRightIcon />
                        <Typography className={classes.title2}>
                            History
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={3}
                        xl={3}
                        className={classes.categoryHeading}
                    >
                    </Grid>

                </Grid>
                <br />
                <br />
                {historyList && historyList.length > 0 ?
                    <>
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
                    </>
                    :
                    <div style={{ margin: '30px 0px', textAlign: 'center', opacity: 0.3 }}> No Record Found  </div>
                }
            </Grid>
        </Container>

    );
};
const mapStateToProps = ({ dispute }) => {
    return {
        historyList: dispute.historyList,
        loading: dispute.loading,
    };
};
export default connect(mapStateToProps, {
    disputeHistoryList,
})(DisputeHistory);
