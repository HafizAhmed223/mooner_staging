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
import { getAllAdminNotification } from "../../../redux/actions/adminNotification/adminNotification.action";
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

const StickyNoteTable = ({ getAllAdminNotification, notificationData, count, }) => {
  const history = useHistory();
  const handleRoute = () => {
    history.push({
      pathname: "/mooner/details/announcemet",
    });
  };
  const [pageNumber, setPageNumber] = useState(1);
  const handleClick = () => {
    history.push({
      pathname: "/mooner/create_stickey_notice",
    });
  }
  useEffect(() => {
    getAllAdminNotification(pageNumber)
  }, [pageNumber])
  useEffect(() => {
    console.log(notificationData)
  }, [notificationData])

  const classes = useStyles();
  const DATA = [
    {
      date: '15/04/2020',
      time: '05:00',
      heading: 'Lorem ipsum',
      content: 'Lorem ipsum dolor sit amount.........'
    },
    {
      date: '15/04/2020',
      time: '05:00',
      heading: 'Lorem ipsum',
      content: 'Lorem ipsum dolor sit amount.........'
    },
    {
      date: '15/04/2020',
      time: '05:00',
      heading: 'Lorem ipsum',
      content: 'Lorem ipsum dolor sit amount.........'
    },
    {
      date: '15/04/2020',
      time: '05:00',
      heading: 'Lorem ipsum',
      content: 'Lorem ipsum dolor sit amount.........'
    },
    {
      date: '15/04/2020',
      time: '05:00',
      heading: 'Lorem ipsum',
      content: 'Lorem ipsum dolor sit amount.........'
    },
  ];

  const COLUMNS = [
    {
      Header: "Message Title",
      accessor: "message_title",
    },
    {
      Header: "Message Body",
      accessor: "message_body",
    },
    // {
    //   Header: "Heading",
    //   accessor: "heading",
    // },
    // {
    //   Header: "Content",
    //   accessor: "content",
    // },
    {
      Header: " ",
      accessor: "",
      Cell: function renderActions() {
        const [isChecked, setIsChecked] = useState(null);
        const handleClose = () => {
          setIsChecked(null);
        };
        return (
          <>
            {/* <Button
              onClick={(event) => {
                setIsChecked(event.currentTarget);
              }}
            >
              <img src={Actions} className="actions" />
            </Button> */}
            <div className={classes.container}>
              <Menu
                id="simple-menu"
                anchorEl={isChecked}
                keepMounted
                open={Boolean(isChecked)}
                onClose={handleClose}
              >
                {/* <MenuItem>
                  <NavLink to="/mooner/view_stickey_notice" className={classes.links}>
                    <div className={classes.FlexWrapper}>
                      <img src={View} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        View
                      </Typography>
                    </div>
                  </NavLink>
                </MenuItem> */}
                {/* <MenuItem>
                  <NavLink to="/mooner/Edit_stickey_notice" className={classes.links}>
                    <div className={classes.FlexWrapper}>
                      <img src={Edit} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        Edit
                      </Typography>
                    </div>
                  </NavLink>
                </MenuItem> */}
                <MenuItem>
                  <div className={classes.FlexWrapper}>
                    <img src={Delete} className={classes.actionImage} />
                    <Typography className={classes.actionsLabel}>
                      Delete
                    </Typography>
                  </div>
                </MenuItem>
              </Menu>
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
      data: notificationData,
    },
    useGlobalFilter,
    usePagination
  );

  // console.log(notificationData, '88888888888888')
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
              Notification
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
              Notification Details
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
              // className={classes.managecategory}
              variant="contained"
              color="secondary"
              size="large"
              className={classes.managecategory}
              onClick={handleClick}
            >
              Add Notification
            </Button>
            {/* </Link> */}
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
                      <td key={cell.id} {...cell.getCellProps()} style={{minWidth:'250px', maxWidth:'420px', wordWrap:'break-word'}}>
                        {/* <div > */}
                        {cell.render("Cell")}
                        {/* </div> */}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Grid>
      {/* <div className="paginationContainer">
        <img
          src={TableLeftArrow}
          onClick={() => previousPage()}
          className={canPreviousPage ? "previousbtn" : "disabledPreviousBtn"}
        />
        {console.log(arrayPageIndex, '----------------pagination')}
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
      <TablePagination count={count} page={pageNumber} onPageChange={pageChange} rowsPerPage={[]} labelRowsPerPage="" SelectProps={{ native: true, style: { display: 'none' } }}
        labelDisplayedRows={({ from, to, count }) => `${startItem}-${endItem} of ${count}`}
        backIconButtonProps={{
          disabled: pageNumber === 1
        }}
        nextIconButtonProps={{
          disabled: count === endItem
        }} 
        />

    </Container>
  );
};
const mapStateToProps = ({ adminNotification }) => {
  console.log(adminNotification)
  return {

    notificationData: adminNotification.data,
    count: adminNotification.count,
    canNextPage: adminNotification.next==null? false: true,

  };
};


export default connect(mapStateToProps, {
  getAllAdminNotification
})(StickyNoteTable);

// export default connect(mapStateToProps,)(
//   StickyNoteTable, {
//   getAllAdminNotification
// }
// );
