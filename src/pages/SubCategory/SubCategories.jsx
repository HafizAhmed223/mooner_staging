import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Box, CircularProgress } from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import Filter from "../../assets/svg/filter.svg";
import CarWash from "../../assets/images/carWash.png";
import Edit from "../../assets/svg/Cedit.svg";
import { connect } from "react-redux";
import {
  getAllSubCategories,
  filtersubcategory,
} from "../../redux/actions/subCategory/subcategory.action";
import { IMAGE_BASE_URL } from "../../api/constants";
import Permissions from "../subAdmin/Permissions";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
    marginTop: mainTheme.spacing(3),
    marginLeft: mainTheme.spacing(2),
  },
  hoverdiv: {
    marginTop: mainTheme.spacing(3),
    marginLeft: mainTheme.spacing(7),
    display: "felx",
    alignItems: "center",
    justifyContent: "center",
    "&:hover $boxgrid": {
      opacity: "1",
    },
  },

  imagegrid: {
    borderRadius: "35%",
    display: "block",
    opacity: "1",
    backfacevisibility: "hidden",
    transition: ".5s ease",
    width: "70px",
    height: "70px",
    "&:hover": {
      opacity: "0.3",
      visibilty: "visible",
    },
  },
  boxgrid: {
    transition: ".9s ease",
    opacity: "0",
    position: "relative",
    bottom: "40px",
    left: "30px",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
  },
  typogrid: {
    textAlign: "center",
    marginLeft: mainTheme.spacing(6),
    marginTop: "3px",
    marginBottom: mainTheme.spacing(3),
    display: "inline-block",
    width: "100px",
    whiteSpace: "nowrap",
    overflow: "hidden !important",
    textOverflow: "ellipsis",
  },
  title: {
    marginTop: mainTheme.spacing(7),
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#20253B",
    [mainTheme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  addNewBtn: {
    marginLeft: mainTheme.spacing(6),
    width: "84px",
    height: "87px",
    backgroundColor:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.secondary &&
      mainTheme.palette.secondary.main,
    borderRadius: "35%",
    boxShadow: " 0px 10px 10px rgba(32, 37, 59, 0.15)",
    marginTop: "4px",
  },
  iconWrapper: {
    textAlign: "center",
  },
  typodiv: {
    marginTop: "12px",
  },
}));

const SubCategories = ({
  subCategoryData,
  loading,
  getAllSubCategories,
  filtersubcategory,
  match,
}) => {
  const history = useHistory();
  const { id } = match.params;
  const [filterValue, setFilterValue] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [typingTimeout, setTypingTimeout] = useState(0);
  useEffect(() => {
    let formData = new FormData();
    formData.append("tn_parent", id);
    getAllSubCategories(formData);
  }, []);
  const addnewHandle = (id) => {
    history.push({
      pathname: "/mooner/addsub_category/" + id,
    });
  };
  const editHandle = (id) => {
    history.push({
      pathname: "/mooner/details/list_subcategory/" + id,
    });
  };
  const handleFilterChange = (e) => {
    //("e.target.value", e.target.value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setFilterValue(e.target.value);
    const value = e.target.value;
    setTypingTimeout(setTimeout(doSearch(value), 3000));
  };
  const doSearch = (value) => {
    // search
    if (value.length >= 3) {
      filtersubcategory(value, id);
    } else {
      var formData1 = new FormData();
      formData1.append("tn_parent", id);
      getAllSubCategories(formData1);
    }
  };
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={2} className={classes.header}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Permissions page="change_category" />
          <Typography className={classes.title}> Sub Category </Typography>
        </Grid>
        <Grid items xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className="globalFilterContainer">
            <div className="icon">
              <Search />
            </div>
            <input
              type="text"
              value={filterValue}
              onChange={(e) => handleFilterChange(e)}
              className="globalFilter"
              placeholder="search"
            />
            <div className="circleContainer">
              <img src={Filter} className="filter" />
            </div>
          </div>
        </Grid>
      </Grid>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <>
            {loading && (
              <div style={{ textAlign: "center" }}>
                <CircularProgress />
              </div>
            )}
          </>
          <>
            {!loading &&
            subCategoryData !== undefined &&
            subCategoryData.length > 0 ? (
              <>
                {loading ? (
                  <div style={{ textAlign: "center" }}>
                    <CircularProgress />
                  </div>
                ) : (
                  subCategoryData &&
                  subCategoryData.map((subCategory) => {
                    return (
                      <>
                        <Grid item key={subCategory.id}>
                          <div
                            // style={{ position: "relative", width: "50%" }}
                            className={classes.hoverdiv}
                          >
                            <img
                              src={`${IMAGE_BASE_URL}${subCategory.cat_icon}`}
                              alt="Image not found"
                              className={classes.imagegrid}
                              onClick={() => editHandle(subCategory.id)}
                            />
                            <div className={classes.boxgrid}>
                              {/* <AddIcon /> */}
                              <img
                                src={Edit}
                                alt="image not found"
                                onClick={() => editHandle(subCategory.id)}
                              />
                            </div>
                          </div>

                          <div>
                            <Typography className={classes.typogrid}>
                              {subCategory.name}
                            </Typography>
                          </div>
                        </Grid>
                      </>
                    );
                  })
                )}
              </>
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
          <Grid item onClick={() => addnewHandle(id)}>
            <div className={classes.addNewBtn}>
              <Box className={classes.iconWrapper}>
                <AddIcon
                  style={{
                    fontSize: "30px",
                    marginTop: "31px",
                  }}
                />
              </Box>
            </div>
            <div className={classes.typodiv}>
              <Typography className={classes.typogrid}>Add new</Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
const mapStateToProps = ({ subCategory }) => {
  return {
    subCategoryData: subCategory.data,
    loading: subCategory.loading,
    count: subCategory.count,
    next: subCategory.next,
    previous: subCategory.previous,
  };
};
export default connect(mapStateToProps, {
  getAllSubCategories,
  filtersubcategory,
})(SubCategories);
