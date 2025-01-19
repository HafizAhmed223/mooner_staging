import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  makeStyles,
  Typography,
  Container,
  MenuItem,
  Menu,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  CircularProgress,
  TablePagination,
} from "@material-ui/core";

import Search from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import Actions from "../../../assets/svg/actions.svg";
import TableLeftArrow from "../../../assets/svg/tableLeftArrow.svg";
import TableRightArrow from "../../../assets/svg/tableRightArrow.svg";
import Pagination from "../../../assets/svg/pagination.svg";
import Filter from "../../../assets/svg/filter.svg";

import Edit from "../../../assets/svg/edit.svg";
import Delete from "../../../assets/svg/delete.svg";
import View from "../../../assets/svg/view.svg";
import { NavLink } from "react-router-dom";
import { allPopupList, deletepPopupAction } from "../../../redux/actions/popups/popup.action";
import axios from "axios";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { getPopupAction } from "../../../redux/actions/popups/popup.action";
import { canDelete } from "../../subAdmin/canDelete";
import ConformationModal from "../../../common/modals/ConformationModal";
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
    fontWeight: '700',
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "15px",
    }
  },
  title2: {
    fontSize: "22px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#000000",
    marginLeft: "7px",
    fontWeight: '600',
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "12px",
      marginLeft: "2px",
    }
  },
  registertypo: {
    color: "#20253B",
    fontWeight: "600",
    fontSize: "20px",
    letterSpacing: "0.2em",
    marginTop: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: '14px',
    }
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
    width: "32%",
    height: "60px",
    borderRadius: "24px",
    fontSize: "15px",
    fontWeight: '600',
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(3),
    marginBottom: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
      width: '55%',
    }
  },
  link: {
    textDecoration: "none",
  },
}));

const PopupTable = ({ getPopupAction, popupData, loading, deletepPopupAction, count }) => {
  console.log(popupData, "api data popup")
  const history = useHistory();
  const handleRoute = () => {
    history.push({
      pathname: "/mooner/details/announcemet",
    });
  };
  const handlePopup = () => {
    history.push({
      pathname: '/mooner/create_popup'
    })
  }
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {

    getPopupAction(pageNumber)
  }, [pageNumber])

  const classes = useStyles();

  const DATA = [
    {
      id: '1',
      heading: 'Lorem ipsum',
      content: 'Lorem ipsum dolor sit amount.........'
    },
    {
      id: '1',
      heading: 'Lorem ipsum',
      content: 'Lorem ipsum dolor sit amount.........'
    },
    {
      id: '1',
      heading: 'Lorem ipsum',
      content: 'Lorem ipsum dolor sit amount.........'
    },
    {
      id: '1',
      heading: 'Lorem ipsum',
      content: 'Lorem ipsum dolor sit amount.........'
    },
    {
      id: '1',
      heading: 'Lorem ipsum',
      content: 'Lorem ipsum dolor sit amount.........'
    },
  ];

  const COLUMNS = [
    {
      Header: "Title",
      accessor: "message_title",
    },
    {
      Header: "Body",
      accessor: "message_body",
    },
    // {
    //   Header: "Content",
    //   accessor: "content",
    // },
    {
      Header: " ",
      accessor: "id",
      Cell: function renderActions(props) {
        const [isChecked, setIsChecked] = useState(null);
        const [id, setId] = useState(null);
        const [open, setOpen] = useState(false);

        const handleOpen = (id) => {
          setOpen(true);
          setIsChecked(null);
          setId(id);
          //(id);
        };
        const handleClose = () => {
          setIsChecked(null);
        };
        const handleModalClose = () => {
          setOpen(false);
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
                {/* <MenuItem>
                  <NavLink to="/mooner/view_popup" className={classes.links}>
                    <div className={classes.FlexWrapper}>
                      <img src={View} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        View
                      </Typography>
                    </div>
                  </NavLink>
                </MenuItem> */}
                <MenuItem>
                  <NavLink to={`/mooner/edit_popup/${props.value}`} className={classes.links}>
                    <div className={classes.FlexWrapper}>
                      <img src={Edit} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        Edit
                      </Typography>
                    </div>
                  </NavLink>
                </MenuItem>
                {canDelete("delete_popup") && (
                  <MenuItem>
                    <div
                      className={classes.FlexWrapper}
                      onClick={() => handleOpen(props.value)}
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
                actionName={open && deletepPopupAction}
              />
            </div>
          </>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
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
      data: popupData,
    },
    useGlobalFilter,
    usePagination
  );

  const { pageIndex, globalFilter } = state;
  const arrayPageIndex =
    pageIndex - 2 < 0
      ? pageOptions.slice(0, pageIndex + 3)
      : pageOptions.slice(pageIndex - 2, pageIndex + 3);
  const pageChange = (e, newPage) => {
    console.log(newPage, "ccoming")
    setPageNumber(newPage)
  }
  const startItem = (pageNumber - 1) * 10 + 1;
  const endItem = Math.min(pageNumber * 10, count);
  return (
    <Container maxWidth="xl">
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid Container spacing={2} className={classes.header}>
          <Grid item xs={6} className={classes.categoryHeading}>
            <Typography className={classes.title} onClick={handleRoute}>
              Announcement
            </Typography>
            <ArrowRightIcon />
            <Typography className={classes.title2}>
              Popup
            </Typography>
          </Grid>
          <Grid xs={6}>
            <div className="globalFilterContainer">
              <div className="icon">
                <Search />
              </div>
              <input
                type="text"
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="globalFilter"
                placeholder="search"
              />
              <div className="circleContainer">
                <img src={Filter} className="filter" />
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid Container spacing={5} className={classes.header}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography className={classes.registertypo}>
              Popup Details
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            className={classes.rightGrid}
          >
            {/* <Link
              to={`/mooner/details/sub_category/${id}`}
              className={classes.link}
            > */}
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.managecategory}
              onClick={handlePopup}
            >
              Add Popup
            </Button>
            {/* </Link> */}
          </Grid>
        </Grid>

        {loading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {popupData && popupData?.length > 0 ? (
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
                            <td key={cell.id} {...cell.getCellProps()} >
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
      </Grid >
      <TablePagination count={count} page={pageNumber} onPageChange={pageChange} rowsPerPage={[]} labelRowsPerPage="" SelectProps={{ native: true, style: { display: 'none' } }} labelDisplayedRows={({ from, to, count }) => `${startItem}-${endItem} of ${count}`}
        backIconButtonProps={{
          disabled: pageNumber === 1
        }} 
        nextIconButtonProps={{
          disabled: count === endItem
        }} 
        />
        

      {/* <div className="paginationContainer">
        <img
          src={TableLeftArrow}
          onClick={() => previousPage()}
          className={canPreviousPage ? "previousbtn" : "disabledPreviousBtn"}
        />
        {arrayPageIndex.map((i) => (
          <div className="pagination__item" active={pageIndex === i} key={i}>
            <div
              key={i}
              className={`paginationLink ${pageIndex === i ? "paginationLinkActive" : ""
                }`}
              onClick={() => gotoPage(i)}
            >
              {i + 1}
            </div>
          </div>
        ))}
        {pageIndex + 3 <= arrayPageIndex.length && (
          <img src={Pagination} className="paginationDot" />
        )}
        <img
          src={TableRightArrow}
          onClick={() => nextPage()}
          className={canNextPage ? "nextbtn" : "disabledPreviousBtn"}
        />
      </div> */}
    </Container >
  );
};
const mapStateToProps = ({ popup }) => {
  return {
    popupData: popup.data,
    loading: popup.loading,
    count: popup.count,
    // next: popup.next,
    // previous: popup.previous,
  };
};
export default connect(mapStateToProps, {
  getPopupAction,
  deletepPopupAction
  // deletefaqAction,
  // filterFaqAction,
})(PopupTable);
