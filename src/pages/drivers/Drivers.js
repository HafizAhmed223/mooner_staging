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
  Avatar,
  Box,
} from "@material-ui/core";

import { connect, useDispatch } from "react-redux";

import TablePagination from "../../common/pagination/Pagination";

import Permissions from "../subAdmin/Permissions";
import axios from "axios";
import { baseURL } from "../../api";
import { setSnackbar } from "../../utils/global.actions";

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

const Drivers = ({ getfaqAction, filterFaqAction }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [banners, setBanners] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  const [reRender, setReRender] = useState(0);
  useEffect(() => {
    setFilterValue("");
  }, []);
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getBanners = async () => {
    const res = await axios.get(
      `${baseURL}mooner_cab/taxi/?page=${currentPage}`,
      config
    );
    console.log("resp", res);
    setBanners(res?.data?.results);
    let Count = res?.data?.count;
    setCount(Count);
    if (Count > 10) {
      setTotalPages(Math.ceil(Count / 10));
    } else setTotalPages(1);
  };

  useEffect(() => {
    getBanners();
  }, [currentPage, reRender]);

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
  const deleteBanner = async (idd) => {
    //("delete");
    const res = await axios.delete(`${baseURL}privacy/banners/${idd}/`, config);
    //("res", res);
    if (res?.data?.status) {
      //("setting rerender");
      //("prev", reRender, "Current", reRender + 1);
      setReRender((current) => (current += 1));

      dispatch(setSnackbar(res?.data?.message));
    }

    //("resdel", res);
  };

  const COLUMNS = [
    {
      Header: "Driver Name",
      accessor: "username",
    },
    {
      Header: "Make/Model",
      accessor: "brand_model",
    },

    {
      Header: "Color",
      accessor: "color",
    },
    {
      Header: "License Plate",
      accessor: "plate_number",
      Cell: (cell) => <Box sx={{ textAlign: "center" }}> {cell?.value}</Box>,
    },

    {
      Header: "Driver Rating",
      accessor: "driver_rating",
      Cell: (cell) => <Box sx={{ textAlign: "center" }}> {cell?.value}</Box>,
    },

    // {
    //   Header: "Image",
    //   accessor: "banners_image",
    //   Cell: (cell) => {
    //     return (
    //       <Box display={"flex"} justifyContent="center">
    //         <Avatar
    //           src={cell?.value}
    //         />
    //       </Box>
    //     );
    //   },
    // },

    // {
    //   Header: " ",
    //   accessor: "id",
    //   Cell: function renderActions(record) {
    //     const [isChecked, setIsChecked] = useState(null);
    //     const [open, setOpen] = useState(false);
    //     const [id, setId] = useState(null);
    //     const handleOpen = (id) => {
    //       setOpen(true);
    //       setIsChecked(null);
    //       setId(id);
    //     };

    //     const handleModalClose = () => {
    //       setOpen(false);
    //     };
    //     const handleClose = () => {
    //       setIsChecked(null);
    //     };
    //     return (
    //       <>
    //         <Button
    //           onClick={(event) => {
    //             setIsChecked(event.currentTarget);
    //           }}
    //         >
    //           <img src={Actions} className="actions" />
    //         </Button>
    //         <div className={classes.container}>
    //           <Menu
    //             id="simple-menu"
    //             anchorEl={isChecked}
    //             keepMounted
    //             open={Boolean(isChecked)}
    //             onClose={handleClose}
    //           >
    //             <MenuItem>
    //               <NavLink
    //                 to={`/mooner/view_banners/${record.value}`}
    //                 className={classes.links}
    //               >
    //                 <div className={classes.FlexWrapper}>
    //                   <img src={View} className={classes.actionImage} />
    //                   <Typography className={classes.actionsLabel}>
    //                     View
    //                   </Typography>
    //                 </div>
    //               </NavLink>
    //             </MenuItem>
    //             <MenuItem>
    //               <NavLink
    //                 to={{
    //                   pathname: `/mooner/edit_banner/${record.value}`,
    //                   state: { selectedBanner: record?.row?.original },
    //                 }}
    //                 className={classes.links}
    //               >
    //                 <div className={classes.FlexWrapper}>
    //                   <img src={Edit} className={classes.actionImage} />
    //                   <Typography className={classes.actionsLabel}>
    //                     Edit
    //                   </Typography>
    //                 </div>
    //               </NavLink>
    //             </MenuItem>
    //             {canDelete("delete_banners") && (
    //               <MenuItem>
    //                 <div
    //                   className={classes.FlexWrapper}
    //                   onClick={() => handleOpen(record.value)}
    //                 >
    //                   <img src={Delete} className={classes.actionImage} />
    //                   <Typography className={classes.actionsLabel}>
    //                     Delete
    //                   </Typography>
    //                 </div>
    //               </MenuItem>
    //             )}
    //           </Menu>
    //           <ConformationModal
    //             isVisible={open}
    //             id={open && id}
    //             onClose={handleModalClose}
    //             actionName={open && deleteBanner}
    //           />
    //         </div>
    //       </>
    //     );
    //   },
    // },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const bannersData = useMemo(() => banners || [], [banners]);

  const { getTableProps, headerGroups, getTableBodyProps, prepareRow, page } =
    useTable(
      {
        columns,
        data: bannersData,
      },
      usePagination
    );
  const handleAddFaq = () => {
    history.push({
      pathname: "/mooner/add_banner",
    });
  };

  return (
    <Grid maxWidth="xl">
      <Permissions page="view_banners" />
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        {/* <Grid container spacing={2} className={classes.header}>
          <Grid item xs={12} sm={4} md={5} lg={5} xl={6}>
            <Typography className={classes.title}>Banners</Typography>
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
        </Grid> */}
        <Typography className={classes.title}>Drivers</Typography>

        <>
          {banners && banners?.length > 0 ? (
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
      </Grid>
      <TablePagination
        totalPages={totalPages}
        count={count}
        getPageDataAction={getBanners}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Grid>
  );
};

export default Drivers;
