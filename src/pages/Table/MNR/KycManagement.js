import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useHistory } from "react-router-dom";
import {
  Grid,
  makeStyles,
  Typography,
  Container,
  MenuItem,
  Menu,
  Button,
  CircularProgress
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
// import { getApprovedDocuments,deleteApprovedAction } from "../../../redux/actions/document/document.action";
import TablePagination from "../../../common/pagination/Pagination";
import { connect } from "react-redux";
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
    fontWeight: '600',
    [mainTheme.breakpoints.only("xl")]:{
      marginLeft: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.down("lg")]:{
      fontSize: "18px",
      lineHeight: "28px",
      letterSpacing: "0.2em",
      color: "#20253B",
      fontWeight: '600',
      marginTop: mainTheme.spacing(7.6),
      marginLeft: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.down("xs")]:{
      textAlign: 'center'
    },
  },
  managecategory: {
    float: "right",
    width: "36%",
    height: "60px",
    borderRadius: "24px",
    fontSize: "15px",
    fontWeight: '600',
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(4),
    marginBottom: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
      width: '60%',
      height: "50px",
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.down("md")]: {
      width: '60%',
      height: "50px",
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.down("xs")]: {
      marginRight: mainTheme.spacing(4),
      width: '80%',
      height: "50px",
      borderRadius: "10px",
    }
  },
  
}));

const KycManagement = () => {
    const history = useHistory();
  const handleClick = () => {
    history.push({
      pathname: "/mooner/details/pendding_kyc",
    });
  }

  const classes = useStyles();
  const DATA = [
    {
        id: 1,
        name: "Jhon",
        document: 'Document',
        status: 'Active'
    },
    {
        id: 2,
        name: "Peter",
        document: 'Document',
        status: 'Inactive'
    },
    {
        id: 3,
        name: "Willium",
        document: 'Document',
        status: 'Active'
    },
    {
        id: 4,
        name: "Andrson",
        document: 'Document',
        status: 'Inactive'
    },
  ]
  const COLUMNS = [
    {
      Header: "Name",
      accessor: "name",
       
    },
    {
      Header: "Document",
      accessor: "document",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: function renderStatus(props) {
        return props.value === "Active" ? (
          <img src={Active} style={{ marginLeft: '35px' }} />
        ) : (
          <img src={InActive} style={{ marginLeft: '35px' }} />
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
                </MenuItem>
                 <MenuItem>
                  {/* <NavLink to={`/mooner/edit_document/${props.value}`} className={classes.links}> */}
                    <div className={classes.FlexWrapper}>
                      <img src={Edit} className={classes.actionImage} />
                      <Typography className={classes.actionsLabel}>
                        Edit
                          </Typography>
                    </div>
                  {/* </NavLink> */}
                </MenuItem> 
                <MenuItem>
                  <div className={classes.FlexWrapper}   
                //   onClick={() => {
                //         handleOpen(props.value);
                //       }}
                    >
                    <img src={Delete} className={classes.actionImage} />
                    <Typography className={classes.actionsLabel}>
                      Delete
                      </Typography>
                  </div>
                </MenuItem>
              </Menu>
              {/* <ConformationModal
                
                isVisible={open}
                id={open && id}
                onClose={handleModalClose}
                actionName={open && deleteApprovedAction}
              /> */}
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
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <Container maxWidth="xl">
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container spacing={5} className={classes.header}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.categoryHeading}>
            <Typography className={classes.title}>
              KYC Management
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            className={classes.rightGrid}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.managecategory}
              onClick={handleClick}
            >
              Pending KYC
            </Button>
          </Grid>
        </Grid>
        {/* {loading ? <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div> : ( */}
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
        {/* )} */}

      </Grid>
      {/* <TablePagination
        totalPages={totalPages}
        count={count}
        getPageDataAction={getApprovedDocuments}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> */}
    </Container>
  );
};

const mapStateToProps = () => {
 
};
export default connect(mapStateToProps, {

})
(KycManagement);
