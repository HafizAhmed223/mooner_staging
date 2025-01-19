import React, { useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";

import { 
    Grid, 
    Container, 
    makeStyles, 
    Typography, 
    Button,
    Menu,
    MenuItem, 
} from "@material-ui/core";

import Search from "@material-ui/icons/Search";

import Actions from "../../assets/svg/actions.svg";
import Edit from "../../assets/svg/edit.svg";
import TableLeftArrow from "../../assets/svg/tableLeftArrow.svg";
import TableRightArrow from "../../assets/svg/tableRightArrow.svg";
import Pagination from "../../assets/svg/pagination.svg";
import Filter from "../../assets/svg/filter.svg";

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
  title: {
    marginTop: mainTheme.spacing(7),
    marginBottom: mainTheme.spacing(5),
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#20253B",
    animation: "slideInRight",
    fontWeight: '600'
  },
}));

const ReferrlsUsers = () => {
  const classes = useStyles();
  const DATA = [
    {
      id: 2151,
      name: "Anna",
      email: "anna@mail.com",
      level: "1",
      earning: '$650',
      parent_profit: '$120',
      company_profit: '$80',

    },
    {
        id: 2151,
        name: "Anna",
        email: "anna@mail.com",
        level: "1",
        earning: '$650',
        parent_profit: '$120',
        company_profit: '$80',
  
      },
      {
        id: 2151,
        name: "Anna",
        email: "anna@mail.com",
        level: "1",
        earning: '$650',
        parent_profit: '$120',
        company_profit: '$80',
  
      },
      {
        id: 2151,
        name: "Anna",
        email: "anna@mail.com",
        level: "1",
        earning: '$650',
        parent_profit: '$120',
        company_profit: '$80',
  
      },
    
  ];

  const COLUMNS = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
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
        Header: "Parent Profit",
        accessor: "parent_profit",
    },
    {
        Header: "Company Profit",
        accessor: "company_profit",
    },

    {
        Header: " ",
        accessor: "",
        Cell: function renderActions() {
          const [isChecked, setIsChecked] = useState(false);
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
                    <NavLink to="/mooner/edit_mln_user" className={classes.links}>
                      <div className={classes.FlexWrapper}>
                        <img src={Edit} className={classes.actionImage} />
                        <Typography className={classes.actionsLabel}>
                          Edit
                        </Typography>
                      </div>
                    </NavLink>
                  </MenuItem>
                </Menu>
              </div>
            </>
          );
        },
    }    
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
          <Grid item xs={6}>
            <Typography className={classes.title}>Referral Users</Typography>
          </Grid>
          <Grid xs={6}>
            {/* <div className="globalFilterContainer">
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
            </div> */}
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

export default ReferrlsUsers;
