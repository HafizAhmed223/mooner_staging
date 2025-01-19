import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";

import {
  Grid,
  Container,
  CircularProgress,
  makeStyles,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";

import { NavLink, useParams } from "react-router-dom";
import { useHistory } from "react-router";
import Search from "@material-ui/icons/Search";

import Actions from "../../../assets/svg/actions.svg";
import View from "../../../assets/svg/view.svg";
import Edit from "../../../assets/svg/edit.svg";
import Delete from "../../../assets/svg/delete.svg";
import { connect } from "react-redux";
import StatusCard from "../../../common/StatusCard";
import Topbar from "../../topbar";
import TablePagination from "../../../common/pagination/Pagination";
import {
  allRattingReviews,
  deleteRattingAction,
} from "../../../redux/actions/ratting/ratting.actions";
import ConformationModal from "../../../common/modals/ConformationModal";
import { canDelete } from "../../subAdmin/canDelete";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    display: "flex",
    paddingRight: mainTheme.spacing(0),
    marginRight: mainTheme.spacing(0),
    marginLeft: mainTheme.spacing(2),
  },
  profileContainer: {
    // marginLeft: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("xl")]: {
      // marginLeft: mainTheme.spacing(2),
      marginTop: mainTheme.spacing(9),
    },
  },
  TopContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: mainTheme.spacing(5),
  },
  container: {
    position: "absolute",
    backgroundColor: "transparent",
  },
  collapse: {
    position: "relative",
    right: "171px",
  },
  paper: {
    margin: mainTheme.spacing(0),
  },
  actionContent: {
    backgroundImage: `url(../../assets/images/blue.PNG)`,
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
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "18px",
      lineHeight: "28px",
      letterSpacing: "0.2em",
      color: "#20253B",
      fontWeight: "600",
      marginTop: mainTheme.spacing(7.6),
      marginLeft: mainTheme.spacing(1),
    },
  },
}));

const AllRatingReviews = ({
  allRattingReviews,
  deleteRattingAction,
  rattingList,
  loading,
  count,
  next,
  previous,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    allRattingReviews(id, currentPage);
  }, []);

  useEffect(() => {
    if (count > 10) {
      setTotalPages(Math.ceil(count / 10));
    } else setTotalPages(1);
  }, [rattingList]);

  const COLUMNS = [
    {
      Header: "Name",
      accessor: "ratedby",
    },
    {
      Header: "Catagory",
      accessor: "category_name",
    },
    {
      Header: "Seeker Id",
      accessor: "seeker_id",
    },
    {
      Header: "Stars",
      accessor: "star",
    },
    {
      Header: " ",
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
                  <div className={classes.FlexWrapper}>
                    <img src={View} className={classes.actionImage} />
                    <NavLink
                      to={`/mooner/view_ratting_reviews/${props.value}`}
                      className={classes.links}
                    >
                      <Typography className={classes.actionsLabel}>
                        View
                      </Typography>
                    </NavLink>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className={classes.FlexWrapper}>
                    <img src={Edit} className={classes.actionImage} />
                    <NavLink
                      to={`/mooner/edit_ratting_reviews/${props.value}`}
                      className={classes.links}
                    >
                      <Typography className={classes.actionsLabel}>Edit</Typography>
                    </NavLink>
                  </div>
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
                actionName={open && deleteRattingAction}
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
  } = useTable(
    {
      columns,
      data: rattingList,
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <Container maxWidth="xl">
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Topbar
                module="SP Management"
                item="Edit"
                bckLink="/mooner/details/sp_management"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.header}>
            <Grid item xs={12} sm={12} md={8} lg={9} xl={10}>
              <Grid container spacing={2} className={classes.header}>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.title}>
                    {" "}
                    Rating & Reviews{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12} xl={6}>
                  <div className="globalFilterContainer">
                    <div className="icon">
                      <Search />
                    </div>
                    <input type="text" className="globalFilter" placeholder="search" />
                    {/* <div className="circleContainer">
                                            <img src={Filter} className="filter" />
                                        </div>     */}
                  </div>
                </Grid>
              </Grid>
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress />
                </div>
              ) : (
                <>
                  {rattingList && rattingList.length > 0 ? (
                    <>
                      <table className="reportTable" {...getTableProps()}>
                        <thead>
                          {headerGroups.map((headerGroup) => (
                            <tr
                              key={headerGroup.id}
                              {...headerGroup.getHeaderGroupProps()}
                            >
                              {headerGroup.headers.map((column) => (
                                <th
                                  key={column.id}
                                  {...column.getHeaderProps()}
                                >
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
                        getPageDataAction={allRattingReviews}
                        id={id && id}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                      />
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
              )}
            </Grid>
            <Grid item xs={12} sm={5} md={4} lg={3} xl={2} className={classes.profileContainer}>
              <StatusCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({ ratting }) => {
  return {
    rattingList: ratting.rattingList,
    loading: ratting.loading,
    count: ratting.total,
    next: ratting.next,
    previous: ratting.previous,
  };
};
export default connect(mapStateToProps, {
  allRattingReviews,
  deleteRattingAction,
})(AllRatingReviews);
