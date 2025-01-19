import React, { useState, useMemo, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { IMAGE_BASE_URL } from "../../api/constants";
import {
  deleteCategory,
  changeImage,
  getParticularSubCategory,
  filterSubCatergoryUsers,
} from "../../redux/actions/subCategory/subcategory.action";
import {
  getRegisterUserAgainestCategoryAction,
  filtercategoryregistereduser,
} from "../../redux/actions/category/category.action";

import {
  Grid,
  Container,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";

import Search from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import Actions from "../../assets/svg/actions.svg";
import Active from "../../assets/svg/green.svg";
import InActive from "../../assets/svg/red.svg";
import Panding from "../../assets/svg/yellow.svg";
import Filter from "../../assets/svg/filter.svg";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Edit from "../../assets/svg/Cedit.svg";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TablePagination from "../../common/pagination/Pagination";
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
  categoryHeading: {
    marginTop: mainTheme.spacing(8),
    display: "flex",
    //   direction: "row",
  },
  title: {
    fontSize: "32px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#696969",
    marginRight: "7px",
    cursor: "pointer",
    [mainTheme.breakpoints.down("lg")]: {
      fontSize: "18px",
    },
  },
  title2: {
    fontSize: "32px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#000000",
    marginLeft: "7px",
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden !important",
    textOverflow: "ellipsis",
    [mainTheme.breakpoints.down("lg")]: {
      fontSize: "18px",
    },
  },
  registertypo: {
    color: "#20253B",
    fontWeight: "600",
    fontSize: "20px",
    letterSpacing: "0.2em",
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
    [mainTheme.breakpoints.down("lg")]: {
      fontSize: "16px",
    },
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
    borderRadius: "12px",
    padding: "19px 42px 19px 42px",
    backgroundColor: "#FEDB29",
    textTransform: "none",
    color: "#20253B",
    fontSize: "19px",
    "&:hover": {
      backgroundColor: "#20253B",
      color: "#FEDB29",
    },
    [mainTheme.breakpoints.down("md")]: {
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.down("xs")]: {
      marginRight: "25px",
    },
  },
  link: {
    textDecoration: "none",
  },
}));

const SubCategorylist = (props) => {
  const {
    subCategoryData,
    deleteCategory,
    getParticularSubCategory,
    getRegisterUserAgainestCategoryAction,
    filterSubCatergoryUsers,
    count,
    next,
    previous,
    registerUsers,
    filtercategoryregistereduser,
  } = props;
  const { id } = props.match.params;
  const [filterValue, setFilterValue] = useState("");
  const history = useHistory();
  useEffect(() => {
    getParticularSubCategory(id);
    setFilterValue("");
  }, []);
  useEffect(() => {
    getRegisterUserAgainestCategoryAction(id, 1);
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(count / 10));
  }, [registerUsers]);

  const [statusCheck, setStatusCheck] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryHandle = () => {
    history.push({
      pathname: "/mooner/details/categories",
    });
  };
  const editHandle = (id) => {
    history.push({
      pathname: "/mooner/edit_SubCategory/" + id,
    });
  };
  const classes = useStyles();

  const COLUMNS = [
    {
      Header: " Sp Id",
      accessor: "sp_id",
    },
    {
      Header: "name",
      accessor: "name",
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
      Header: "Reference Id",
      accessor: "reference_id",
    },
    {
      Header: "Booking",
      accessor: "bookings",
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
      Header: "Status",
      accessor: "status",
      Cell: function renderStatus(props) {
        return (
          <>
            {props.value === true && <img src={Active} />}
            {props.value === false && <img src={InActive} />}
            {/* {props.value === "Onhold" && <img src={Panding} />} */}
          </>
        );
      },
    },
    {
      Header: " ",
      accessor: "",
      Cell: function renderActions() {
        return (
          <>
            <div style={{ height: "35px" }}></div>
          </>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,

    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data: registerUsers,
    },
    useGlobalFilter,
    usePagination
  );

  const handleDelete = (id) => {
    deleteCategory(id);
  };

  const handleFilterChange = (e) => {
    setCurrentPage(1);
    setFilterValue(e.target.value);
    if (e.target.value.length >= 3) {
      // debugger;
      filtercategoryregistereduser(id, e.target.value);
    }
    if (!e.target.value) {
      setFilterValue("");
      getRegisterUserAgainestCategoryAction(id, 1);
      setCurrentPage(1);
    }
  };
  const handleImageChange = (e) => {
    let formData = new FormData();
    formData.append("name", subCategoryData.name);
    formData.append("cat_icon", e.target.files[0]);
    formData.append(
      "category_heading_text",
      subCategoryData.category_heading_text
    );
    formData.append(
      "category_heading_text2",
      subCategoryData.category_heading_text2
    );
    props.changeImage(formData, subCategoryData.id);
  };
  //("registerUsers", registerUsers);
  return (
    <>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Permissions page="change_category" />
        <Grid container spacing={2} className={classes.header}>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={5}
            xl={6}
            className={classes.categoryHeading}
          >
            {/* <Typography className={classes.title}>FAQs</Typography> */}
            <Typography className={classes.title} onClick={categoryHandle}>
              Category
            </Typography>
            <ArrowRightIcon />
            <Typography className={classes.title2}>
              {subCategoryData && subCategoryData.name}{" "}
            </Typography>
          </Grid>
          <Grid xs={12} sm={6} md={6} lg={7} xl={6}>
            <div className="globalFilterContainer">
              <div className="icon">
                <Search />
              </div>
              <input
                className="globalFilter"
                placeholder="search"
                value={filterValue}
                onChange={handleFilterChange}
              />
              <div className="circleContainer">
                <img src={Filter} className="filter" />
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={5} className={classes.header}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={classes.middleGridwrapper}>
              <div className={classes.middleUpperdiv}>
                <img
                  src={`${IMAGE_BASE_URL}${subCategoryData.category_icon}`}
                  alt="image not found"
                  className={classes.Eggplateimg}
                />
                <div className={classes.cameraIcondiv}>
                  <label htmlFor="avatarUpload">
                    <CameraAltIcon className={classes.Cameraicon} />
                  </label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    name="cat_icon"
                    accept="image/*"
                    name="avatarUpload"
                    id="avatarUpload"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className={classes.middleRightdiv}>
                <div className={classes.rightUpperdiv}>
                  <Typography className={classes.categoryname}>
                    {subCategoryData.name}
                  </Typography>
                </div>
                <br />
                <img
                  src={Edit}
                  alt="image not found"
                  className={classes.editimg}
                  onClick={() => editHandle(subCategoryData.id)}
                />
                <DeleteOutlineIcon
                  className={classes.editimg}
                  onClick={(e) => handleDelete(id)}
                />
                <div>
                  <Typography className={classes.distributors}>
                    Providers
                  </Typography>
                </div>
              </div>
            </div>
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
            <Link
              to={`/mooner/details/sub_category/${id}`}
              className={classes.link}
            >
              <Button className={classes.managecategory}>
                Manage Sub Category
              </Button>
            </Link>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Typography className={classes.registertypo}>
            Registererd Provider
          </Typography>
        </Grid>
        {registerUsers && registerUsers.length > 0 ? (
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
            style={{ margin: "30px 0px", textAlign: "center", opacity: 0.3 }}
          >
            {" "}
            No Service Provider Registered{" "}
          </div>
        )}
      </Grid>
      {registerUsers && registerUsers.length > 0 && (
        <TablePagination
          totalPages={totalPages}
          count={count}
          getPageDataAction={getRegisterUserAgainestCategoryAction}
          searchPaginationAction={filterValue && filtercategoryregistereduser}
          searchString={filterValue && filterValue}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    subCategoryData: state.subCategory.particularSubCatgegory,
    registerUsers: state.category.registerUsers,
    count: state.category.total,
    next: state.category.next,
    previous: state.category.previous,
  };
};
export default connect(mapStateToProps, {
  deleteCategory,
  changeImage,
  getParticularSubCategory,
  getRegisterUserAgainestCategoryAction,
  filterSubCatergoryUsers,
  filtercategoryregistereduser,
})(SubCategorylist);
