import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { useHistory } from "react-router-dom";
import {
  Grid,
  makeStyles,
  Typography,
  Container,
  MenuItem,
  Menu,
  Button,
  CircularProgress,
} from "@material-ui/core";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import Actions from "../../assets/svg/actions.svg";
import Filter from "../../assets/svg/filter.svg";
import Edit from "../../assets/svg/edit.svg";
import Delete from "../../assets/svg/delete.svg";
import View from "../../assets/svg/view.svg";
import Search from "@material-ui/icons/Search";
import AddQuesstion from "../../assets/svg/question.svg";
import TablePagination from "../../common/pagination/Pagination";
import ConformationModal from "../../common/modals/ConformationModal";
import {
  getfaqAction,
  deletefaqAction,
  filterFaqAction,
} from "../../redux/actions/faq/faq.actions";
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
  button: {
    float: "right",
    width: "20%",
    height: "55px",
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    marginBottom: mainTheme.spacing(2),
    marginTop: mainTheme.spacing(2),
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

const FQATable = ({
  getfaqAction,
  filterFaqAction,
  count,
  faqData,
  loading,
  deletefaqAction,
}) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    getfaqAction(1);
    setFilterValue("");
  }, []);

  useEffect(() => {
    if (count > 10) {
      setTotalPages(Math.ceil(count / 10));
    } else setTotalPages(1);
  }, [faqData]);

  const [totalPages, setTotalPages] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (e) => {
    setCurrentPage(1);
    setFilterValue(e.target.value);
    if (e.target.value.length >= 3) {
      filterFaqAction(1, e.target.value);
    }
    if (!e.target.value) {
      setFilterValue("");
      getfaqAction(1);
      setCurrentPage(1);
    }
  };

  const COLUMNS = [
    {
      Header: "Questions",
      accessor: (d) => {
        const question = `${d.question}`;
        return (
          <div>
            {" "}
            {question.length > 25
              ? question.substring(0, 24) + "..."
              : question}{" "}
          </div>
        );
      },
    },
    {
      Header: "Answers",
      accessor: (d) => {
        const answer = `${d.answer}`;
        return (
          <div>
            {" "}
            {answer.length > 25 ? answer.substring(0, 24) + "..." : answer}{" "}
          </div>
        );
      },
    },
    {
      Header: "Position",
      accessor: "sorting_key",
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
          //(id);
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
                {/* <MenuItem>
                  <NavLink to="/mooner/create_fqa" className={classes.links}>
                    <div className={classes.FlexWrapper}>
                      <img src={AddQuesstion} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        Add FAQ
                      </Typography>
                    </div>
                  </NavLink>
                </MenuItem> */}
                <MenuItem>
                  <NavLink
                    to={`/mooner/viw_faqs/${props.value}`}
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
                    to={`/mooner/edit_faqs/${props.value}`}
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
                {canDelete("delete_faqs") && (
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
                actionName={open && deletefaqAction}
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
        data: faqData,
      },
      usePagination
    );
  const handleAddFaq = () => {
    history.push({
      pathname: "/mooner/create_fqa",
    });
  };

  return (
    <Grid maxWidth="xl">
      <Permissions page="view_faqs" />
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container spacing={2} className={classes.header}>
          <Grid item xs={12} sm={4} md={5} lg={5} xl={6}>
            <Typography className={classes.title}>FAQs</Typography>
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
            </div>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleAddFaq}
          className={classes.button}
        >
          Add FAQ
        </Button>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {faqData && faqData.length > 0 ? (
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
        getPageDataAction={getfaqAction}
        searchPaginationAction={filterValue && filterFaqAction}
        searchString={filterValue && filterValue}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Grid>
  );
};

const mapStateToProps = ({ faq }) => {
  return {
    faqData: faq.data,
    loading: faq.loading,
    count: faq.count,
    next: faq.next,
    previous: faq.previous,
  };
};
export default connect(mapStateToProps, {
  getfaqAction,
  deletefaqAction,
  filterFaqAction,
})(FQATable);
