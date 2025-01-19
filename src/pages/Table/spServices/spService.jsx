import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import {
  Typography,
  Button,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";

import { NavLink } from "react-router-dom";

import Active from "../../../assets/svg/green.svg";
import InActive from "../../../assets/svg/red.svg";
import Pending from "../../../assets/svg/panding.svg";
import Actions from "../../../assets/svg/actions.svg";
import Status from "../../../assets/svg/status.svg";
import Crowl from "../../../assets/svg/crowl.svg";
import Edit from "../../../assets/svg/edit.svg";
import Delete from "../../../assets/svg/delete.svg";
import TableBase from "../UserDetailTables";
import moment from "moment";
import axios from "axios";
import { baseURL } from "../../../api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import TablePagination from "../../../common/pagination/Pagination";

const useStyles = makeStyles((mainTheme) => ({
  title: {
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
    marginLeft: mainTheme.spacing(3),
    marginTop: mainTheme.spacing(2),
    marginBottom: mainTheme.spacing(2),
    fontWeight: "600",
    [mainTheme.breakpoints.only("lg")]: {
      fontSize: "20px",
    },
  },
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
  btnWrapper: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  },
  editBtn: {
    width: "97%",
    height: "60px",
    borderRadius: "24px",
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(1),
    marginBottom: mainTheme.spacing(4),
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "0.2em",
    color: "#20253B",
    backgroundColor: "white",
    boxShadow: "none",
    [mainTheme.breakpoints.only("lg")]: {
      width: "93%",
      height: "50px",
    },
  },
}));

const SPServices = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [count, setCount] = useState(null);
  const [service, setService] = useState([]);

  const history = useHistory();

  const classes = useStyles();
  const params = useParams();
  const id = params?.id;
  //("id history", id);
  // useEffect(() => {
  //   if (count > 10) {
  //     setTotalPages(Math.ceil(count / 10));
  //   } else setTotalPages(1);
  // }, [service]);
  useEffect(() => {
    getAllService(currentPage, id);
  }, [id, currentPage, totalPages]);
  const token = localStorage.getItem("authToken");
  const getAllService = async (page, Id) => {
    const res = await axios.get(
      `${baseURL}service_provider/sp_services_list/${Id}/?page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    //(res.data.results);
    setService(res?.data?.results);
    setCount(res?.data?.count);
    const Count = res?.data?.count;
    //("res?.data?.count", Count, "pages", Math.ceil(Count / 10));
    if (res?.data?.count > 10) {
      setTotalPages(Math.ceil(count / 10));
    } else setTotalPages(1);
  };

  // const data = [
  //   {
  //     budget: 6,
  //     category_name: "Dispatch",
  //     id: 936,
  //     portfolio: "n",
  //     order_status: "Completed",
  //     seeker_name: "Umair Khanss",
  //   },
  // ];
  const COLUMNS = [
    {
      Header: "Service Id",
      accessor: "id",
    },
    {
      Header: "Category Name",
      accessor: "category_name",
    },

    {
      Header: "Portfolio",
      accessor: "portfolio",
    },
    {
      Header: "Status",
      accessor: (d) => {
        return <div> {d?.is_active ? "Active" : "Non Active"} </div>;
      },
    },
    // {
    //   Header: "Date",
    //   accessor: (d) => {
    //     const date = moment(d.start_date).format("MMMM Do YYYY");
    //     return <div> {date} </div>;
    //   },
    // },
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
                  <div className={classes.FlexWrapper}>
                    <img src={Delete} className={classes.actionImage} />
                    <Typography className={classes.actionsLabel}>
                      Delete
                    </Typography>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Typography className={classes.title}>Sp Services </Typography>
      <>
        <TableBase DATA={service || []} COLUMNS={COLUMNS} />
        <TablePagination
          totalPages={totalPages}
          count={count}
          getPageDataAction={getAllService}
          id={id && id}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}

          // totalPages={2}
          // count={15}
          // getPageDataAction={getAllService}
          // id={id && id}
          // currentPage={1}
          // setCurrentPage={setCurrentPage}
        />
      </>
    </>
  );
};

export default SPServices;
