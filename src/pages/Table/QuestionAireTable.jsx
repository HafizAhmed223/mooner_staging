import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import {
  deleteQuestionAireAction,
  getAllQuestionaireAction,
  searchQuestionairesAction,
} from "../../redux/actions/questionaire/questionaire.actions";

import {
  Grid,
  makeStyles,
  Menu,
  CircularProgress,
  Typography,
  MenuItem,
  Button,
  Container,
  GridListTile,
  Tooltip,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import Search from "@material-ui/icons/Search";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Actions from "../../assets/svg/actions.svg";
import Filter from "../../assets/svg/filter.svg";
import AddQuesstion from "../../assets/svg/question.svg";
import View from "../../assets/svg/view.svg";
import Edit from "../../assets/svg/edit.svg";
import Delete from "../../assets/svg/delete.svg";
import ConformationModal from "../../common/modals/ConformationModal";
import TablePagination from "../../common/pagination/Pagination";
import Permissions from "../subAdmin/Permissions";
import { canDelete } from "../subAdmin/canDelete";

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
  field: {
    backgroundColor: "#fff",
    marginTop: mainTheme.spacing(-1.5),
    fontSize: "14px",
    [mainTheme.breakpoints.only("xl")]: {
      width: "35%",
      height: "50px",
    },
    "& .MuiInputBase-input": {
      padding: "5px 3px 0px 3px",
    },
    "& .MuiOutlinedInput-input": {
      [mainTheme.breakpoints.only("xl")]: {
        fontSize: "18px",
      },
      [mainTheme.breakpoints.only("xl")]: {
        width: "95%",
        height: "40px",
      },
      [mainTheme.breakpoints.down("lg")]: {
        // padding: "15.5px 15px",
        padding: "10.5px 5px 15.5px 10px",
        fontSize: "16px",
      },
    },
    [mainTheme.breakpoints.down("lg")]: {
      width: "90%",
      height: "40px",
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
  blueBtn: {
    fontSize: "15px",
    borderRadius: "7px",
    color: "white",
    marginLeft: mainTheme.spacing(1),
    marginTop: mainTheme.spacing(-2),
    [mainTheme.breakpoints.down("lg")]: {
      height: "40px",
    },
  },
  button: {
    float: "right",
    width: "20%",
    height: "55px",
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    [mainTheme.breakpoints.only("lg")]: {
      width: "22%",
      height: "50px",
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.down("md")]: {
      width: "22%",
      height: "50px",
      borderRadius: "10px",
      marginRight: mainTheme.spacing(5),
      marginTop: mainTheme.spacing(2),
      marginBottom: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.only("xs")]: {
      width: "42%",
      height: "50px",
      borderRadius: "10px",
      float: "left",
      marginLeft: mainTheme.spacing(13),
      marginTop: mainTheme.spacing(2),
      marginBottom: mainTheme.spacing(2),
    },
  },
}));

const QuestionAireTable = ({
  getAllQuestionaire,
  questionaireData,
  deleteQuestion,
  loading,
  count,
  next,
  previous,
  setErrors,
  searchQuestionairesAction,
}) => {
  useEffect(() => {
    getAllQuestionaire(1);
  }, []);
  /////
  useEffect(() => {
    setTotalPages(Math.ceil(count / 10));
  }, [questionaireData]);
  const [totalPages, setTotalPages] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showWholeDescription, setshowWholeDescription] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  const handleFilterChange = (e) => {
    setCurrentPage(1);
    setFilterValue(e.target.value);
    if (e.target.value.length >= 3) {
      searchQuestionairesAction(1, e.target.value);
    }
    if (!e.target.value) {
      setFilterValue("");
      getAllQuestionaire(1);
      setCurrentPage(1);
    }
  };

  const COLUMNS = [
    {
      Header: "Categories",
      accessor: "parent_category_name",
    },
    // {
    //   Header: "Subcategories",
    //   accessor: "sub_category_name"
    // },
    {
      Header: "Subcategories",
      accessor: (props) => {
        return (
          <div>
            {" "}
            {props.parent_category != props.sub_category &&
              props.sub_category_name}{" "}
          </div>
        );
      },
    },
    {
      Header: "Subchild",
      accessor: "sub_child_name",
    },
    {
      Header: "Type",
      accessor: "question_for",
    },
    {
      Header: "Position",
      accessor: "sorting_key",
    },
    {
      Header: "Questions",
      accessor: (d) => {
        const Question = `${d.question_text}`;
        return (
          <Tooltip title={Question} placement="top">
            <div>
              {Question.length > 10
                ? Question.substring(0, 13) + "..."
                : Question}
            </div>
          </Tooltip>
        );
      },
    },
    // {
    //   Header: "Questions",
    //   accessor: "question_text",
    // },
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
                    to={`/mooner/view_questionaire/${props.value}`}
                    className={classes.links}
                  >
                    <div className={classes.FlexWrapper}>
                      <img src={View} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        View
                      </Typography>
                    </div>
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink
                    to={`/mooner/edit_questionaire/${props.value}`}
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
                {canDelete("delete_categoryquestions") && (
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
                actionName={open && deleteQuestion}
              />
            </div>
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
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: questionaireData,
    },
    useSortBy,
    usePagination
  );

  const handleAddQuesion = () => {
    history.push({
      pathname: "/mooner/add_questionaire",
      // pathname: "/mooner/test_question",
    });
  };

  return (
    <>
      <Grid maxWidth="xl">
        <Permissions page="view_categoryquestions" />
        <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
          <Grid container className={classes.header}>
            <Grid item xs={12} sm={4} md={5} lg={5} xl={6}>
              <Typography className={classes.title}>Questionnaire</Typography>
            </Grid>
            <Grid xs={12} sm={8} md={7} lg={7} xl={6}>
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
              </div>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleAddQuesion}
            className={classes.button}
          >
            Add Question
          </Button>
          {loading ? (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <CircularProgress />
            </div>
          ) : (
            <>
              {questionaireData && questionaireData.length > 0 ? (
                <table className="reportTable" {...getTableProps()}>
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr
                        key={headerGroup.id}
                        {...headerGroup.getHeaderGroupProps()}
                        style={{ verticalAlign: "baseline" }}
                      >
                        {headerGroup.headers.map((column) => (
                          <th
                            key={column.id}
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                          >
                            <span>{column.Header}</span>
                            {column.Header === "Categories" ||
                            column.Header === "Subcategories" ? (
                              <span style={{ verticalAlign: "middle" }}>
                                <ExpandLess style={{ color: "#FEDB29" }} />
                                <ExpandMore style={{ color: "#FEDB29" }} />
                              </span>
                            ) : null}
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
                              <td
                                style={{ height: "52px" }}
                                key={cell.id}
                                {...cell.getCellProps()}
                              >
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
          getPageDataAction={getAllQuestionaire}
          searchPaginationAction={filterValue && searchQuestionairesAction}
          searchString={filterValue && filterValue}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Grid>
    </>
  );
};

const mapStateToProps = ({ questionaire }) => {
  return {
    questionaireData: questionaire.questionaireList,
    loading: questionaire.loading,
    count: questionaire.total,
    next: questionaire.next,
    previous: questionaire.previous,
  };
};
export default connect(mapStateToProps, {
  getAllQuestionaire: getAllQuestionaireAction,
  deleteQuestion: deleteQuestionAireAction,
  searchQuestionairesAction,
})(QuestionAireTable);
