import React, { useMemo, useState } from "react";
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
import Active from "../../../assets/svg/green.svg";
import InActive from "../../../assets/svg/red.svg";
import { NavLink } from "react-router-dom";

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
    [mainTheme.breakpoints.only("lg")]:{
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
    [mainTheme.breakpoints.only("lg")]:{
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
    width: "35%",
    height: "60px",
    borderRadius: "24px",
    fontSize: "15px",
    fontWeight: '600',
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(3),
    marginBottom: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]:{
        width: '63%',
        fontSize: "13px"
    }
  },
  link: {
    textDecoration: "none",
  },
}));

const BannerTable = (props) => {
  const history = useHistory();
    const handleRoute = () => {
      history.push({
      pathname: "/mooner/details/announcemet",
      });
    };
  const handleBanner = () => {
    history.push({
      pathname: '/mooner/create_banner'
    })
  }
  const classes = useStyles();
  const DATA = [
    {
      id: '1',
      heading: 'Lorem ipsum',
      category: 'Haircut',
      sub_category: 'Child Haircut',
      content: 'Lorem ipsum dolor sit amount.........',
      status: 'Active'
    },
    {
        id: '1',
        heading: 'Lorem ipsum',
        category: 'Haircut',
        sub_category: 'Child Haircut',
        content: 'Lorem ipsum dolor sit amount.........',
        status: 'InActive'
      },
  ];

  const COLUMNS = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Heading",
      accessor: "heading",
    },
    {
        Header: "Category",
        accessor: "category",
    },
    {
        Header: "Subcategory",
        accessor: "sub_category",
    },  
    {
      Header: "Content",
      accessor: "content",
    },
    {
        Header: "Status",
        accessor: "status",
        Cell: function renderStatus(props) {
          return props.value === "Active" ? (
            <img src={Active} />
          ) : (
            <img src={InActive} />
          );
        },
    },
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
                    <NavLink to="/mooner/view_banner" className={classes.links}>
                      <div className={classes.FlexWrapper}>
                        <img src={View} className={classes.actionImage} />
                          <Typography className={classes.actionsLabel}>
                            View
                          </Typography>
                      </div>
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to="/mooner/edit_banner" className={classes.links}>
                      <div className={classes.FlexWrapper}>
                        <img src={Edit} className={classes.actionImage} />
                          <Typography className={classes.actionsLabel}>
                            Edit
                          </Typography>
                      </div>
                    </NavLink>
                  </MenuItem>
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
      data,
    },
    useGlobalFilter,
    usePagination
  );

  const { pageIndex, globalFilter } = state;
  const arrayPageIndex =
    pageIndex - 2 < 0
      ? pageOptions.slice(0, pageIndex + 3)
      : pageOptions.slice(pageIndex - 2, pageIndex + 3);

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
                Category Banner
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
                Banner Details
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
                onClick={handleBanner}
                className={classes.managecategory}
              >
                Add Category Banner
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
      <div className="paginationContainer">
        <img
          src={TableLeftArrow}
          onClick={() => previousPage()}
          className={canPreviousPage ? "previousbtn" : "disabledPreviousBtn"}
        />
        {arrayPageIndex.map((i) => (
          <div className="pagination__item" active={pageIndex === i} key={i}>
            <div
              key={i}
              className={`paginationLink ${
                pageIndex === i ? "paginationLinkActive" : ""
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
      </div>
    </Container>
  );
};
const mapStateToProps = () => {
  return {

  };
};
export default connect(mapStateToProps, )(
  BannerTable
);
