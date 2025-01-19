import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { spDocumentAction } from "../../../redux/actions/spManagement/spmanagement.actions";

import {
  Grid,
  Container,
  makeStyles,
  Typography,
  Menu,
  MenuItem,
  CircularProgress,
  Button,
} from "@material-ui/core";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import Search from "@material-ui/icons/Search";

import Edit from "../../../assets/svg/edit.svg";
import View from "../../../assets/svg/view.svg";
import Delete from "../../../assets/svg/delete.svg";

import Active from "../../../assets/svg/green.svg";
import InActive from "../../../assets/svg/red.svg";
import Actions from "../../../assets/svg/actions.svg";

import StatusCard from "../../../common/StatusCard";
import ConformationModal from "../../../common/modals/ConformationModal";

import Topbar from "../../topbar";
import TablePagination from "../../../common/pagination/Pagination";
import { canDelete } from "../../subAdmin/canDelete";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    display: "flex",
    paddingRight: mainTheme.spacing(0),
    marginRight: mainTheme.spacing(0),
    // marginLeft: mainTheme.spacing(2),
  },
  profileContainer: {
    [mainTheme.breakpoints.only("lg")]: {
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
    [mainTheme.breakpoints.down("xs")]: {
      fontSize: "18px",
      lineHeight: "28px",
      letterSpacing: "0.2em",
      color: "#20253B",
      fontWeight: "600",
      marginTop: mainTheme.spacing(7.6),
      textAlign: "center",
    },
  },
}));

const SpAllDocuments = ({
  spDocumentAction,
  allSpDoc,
  loading,
  count,
  next,
  previous,
}) => {
  const { id } = useParams();
  const classes = useStyles();
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    spDocumentAction(id, currentPage);
  }, []);
  useEffect(() => {
    setTotalPages(Math.ceil(count / 10));
  }, [allSpDoc]);

  const COLUMNS = [
    {
      Header: "Name",
      accessor: "user_name",
    },
    {
      Header: "Label",
      accessor: "label",
    },
    {
      Header: "Expiration Date",
      accessor: "expiration_date",
    },
    {
      Header: "Type",
      accessor: "doc_question_type",
    },
    {
      Header: "KYC For",
      accessor: "document_for",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: function renderStatus(props) {
        return props.value === "Approve" ? (
          <img src={Active} style={{ marginLeft: "35px" }} />
        ) : (
          <img src={InActive} style={{ marginLeft: "35px" }} />
        );
      },
    },
    {
      Header: " ",
      accessor: "id",
      Cell: function renderActions(props) {
        const [isChecked, setIsChecked] = useState(null);
        const [open, setOpen] = useState(false);
        const [id, setId] = useState(null);
        const handleClose = () => {
          setIsChecked(null);
        };
        const handleOpen = (id) => {
          setOpen(true);
          setIsChecked(null);
          setId(id);
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
              {/* <div style={{height: '40px'}}></div> */}
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
                    to={`/mooner/view_document/${props.value}`}
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
                {/* <MenuItem>
                        <NavLink to={`/mooner/edit_document/${props.value}`} className={classes.links}>
                        <div className={classes.FlexWrapper}>
                            <img src={Edit} className={classes.actionImage} />
                            <Typography className={classes.actionsLabel}>
                            Edit
                              </Typography>
                        </div>
                        </NavLink>
                    </MenuItem> 
                     */}
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
                actionName={open && deleteApprovedAction}
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
    nextPage,
    pageOptions,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: allSpDoc,
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter } = state;

  return (
    <Container maxWidth="xl">
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Topbar
                module="SP Management"
                item="Edit"
                bckLink="/mooner/details/sp_management"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.header}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={10}>
              <Grid container spacing={2} className={classes.header}>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.title}>
                    {" "}
                    SP Documents{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
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
                  </div>
                </Grid>
              </Grid>
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress />
                </div>
              ) : (
                <>
                  {allSpDoc && allSpDoc.length > 0 ? (
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
                        getPageDataAction={spDocumentAction}
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
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.profileContainer}>
              <StatusCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({ spManagement }) => {
  return {
    allSpDoc: spManagement.allSpDoc,
    loading: spManagement.loading,
    count: spManagement.total,
    next: spManagement.next,
    previous: spManagement.previous,
  };
};
export default connect(mapStateToProps, {
  spDocumentAction,
})(SpAllDocuments);
