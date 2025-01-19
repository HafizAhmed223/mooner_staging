import React, { useMemo, useState, useEffect } from "react";
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

import Actions from "../../../assets/svg/actions.svg";
import Edit from "../../../assets/svg/edit.svg";
import Delete from "../../../assets/svg/delete.svg";
import View from "../../../assets/svg/view.svg";
import Pending from "../../../assets/svg/panding.svg";
import { NavLink } from "react-router-dom";
import TablePagination from "../../../common/pagination/Pagination";

import {
  getAllPendingDoc,
  deletePendingDocAction,
  updateDocumentAction,
} from "../../../redux/actions/document/document.action";
import ConformationModal from "../../../common/modals/ConformationModal";
import Permissions from "../../subAdmin/Permissions";
import { canDelete } from "../../subAdmin/canDelete";
import Filter from "../../../assets/svg/filter.svg";
import Search from "@material-ui/icons/Search";

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
}));

const PendingDocuments = ({
  getAllPendingDoc,
  deletePendingDocAction,
  updateDocumentAction,
  documentList,
  loading,
  count,
  next,
  previous,
}) => {
  useEffect(() => {
    getAllPendingDoc(1);
    setFilterValue("")
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(count / 10));
  }, [documentList]);

  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: "/mooner/details/document_management",
    });
  };

  const classes = useStyles();

  const COLUMNS = [
    {
      Header: "Name",
      accessor: "user_name",
      // accessor: (props) => {
      //   return props.sp_name && props.sp_name != null
      //     ? props.sp_name
      //     : props.ss_name;
      // },
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
        return <img src={Pending} style={{ height: "10px", width: "10px" }} />;
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

        // const handleClickPendingDocument = (id) => {
        //   //(id)
        //   let formData = new FormData();
        //   formData.append("status", "Approved");
        //   updateDocumentAction(formData, id);
        // };

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
                  <div className={classes.FlexWrapper} onClick={() => {handleClickPendingDocument(props.value)}}>
                    <Typography className={classes.actionsLabel}>
                      Aprove
                    </Typography>
                  </div>
                </MenuItem> */}
                <MenuItem>
                  <NavLink
                    to={`/mooner/view_pendding_document/${props.value}`}
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
                    to={`/mooner/edit_pendding_document/${props.value}`}
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
                actionName={open && deletePendingDocAction}
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
      data: documentList,
    },
    useGlobalFilter,
    usePagination
  );


  const [filterValue, setFilterValue] = useState("");
  const handleFilterChange = (e) => {
    setCurrentPage(1);
    setFilterValue(e.target.value);
    if (e.target.value.length >= 3) {
      getAllPendingDoc("1&search=" + e.target.value);;
    }
    if (!e.target.value) {
      setFilterValue("");
      getAllPendingDoc(1);
      setCurrentPage(1);
    }
  };
  return (
    <Container maxWidth="xl">
      <Permissions page="view_document" />
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container className={classes.header}>
          <Grid item xs={12} sm={7} md={6} lg={6} xl={7}>
             <Typography className={classes.title} onClick={handleClick}>
              Document Management
            </Typography>
            <ArrowRightIcon />
            <Typography className={classes.title2}>
              Pending Documents
            </Typography>
          </Grid>
          <Grid items xs={12} sm={5} md={6} lg={6} xl={5}>
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

        <br />
        <br />
        {documentList && documentList.length > 0 ? (
          <>
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
            <TablePagination
              totalPages={totalPages}
              count={count}
              getPageDataAction={getAllPendingDoc}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <div
            style={{ margin: "30px 0px", textAlign: "center", opacity: 0.3 }}
          >
            {" "}
            No Record Found{" "}
          </div>
        )}
      </Grid>
    </Container>
  );
};
const mapStateToProps = ({ document }) => {
  return {
    documentList: document.doclist,
    loading: document.loading,
    count: document.total,
    next: document.next,
    previous: document.previous,
  };
};
export default connect(mapStateToProps, {
  getAllPendingDoc,
  deletePendingDocAction,
  updateDocumentAction,
})(PendingDocuments);
