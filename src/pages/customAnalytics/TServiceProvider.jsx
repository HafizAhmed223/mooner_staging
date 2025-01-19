import { Box, Button, CircularProgress, IconButton, Table, TableBody, TableCell, TableContainer,Container, TableHead,  TableRow, Typography, makeStyles } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { postBookingObject } from "../../redux/actions/analytics/analytics.action";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import downloadBtn from "../../assets/images/downloadBtn.svg";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { baseURL } from "../../api";
import { base_url_staging } from "../../utils/global";
import TablePagination from "../../common/pagination/Pagination";

const TServiceProvider = ({ postBookingObject, cancelBookingList, id,count }) => {
  const [cancelBookingData, setCancelBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null);
  const itemPerPage = 10;

  useEffect(() => {
    if (count > itemPerPage) {
      setTotalPages(Math.ceil(count / itemPerPage));
    } else setTotalPages(1);
  }, [cancelBookingList]);

  useEffect(() => {
    
    postBookingObject(id, 'total_no_service_sp', 1);
  }, [id, page]);
 
  const pageChange = (e, newPage) => {
    console.log(newPage, "ccoming")
    setPage(newPage)
  }

  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const openModal = async (item) => {
    console.log("clicked", item);
    const payload = {
      user_id: item.s_user_id,
      category_id: [Number(id)],
      from: "",
      to: ""
    };

    try {
      const res = await axios.post(
        `${baseURL}ticket_management/download_user_report/`,
        payload,
        config
      );

      const a = document.createElement("a");
      a.href = `${base_url_staging}${res?.data?.data}`;
      a.download = `${base_url_staging}${res?.data?.data}`.split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <Container maxWidth="xl" >
    <Box>
      {/* <TableContainer> */}
        <Typography style={{ padding: "10px" }}>Total Num Of Service Provider</Typography>
        <table className="reportTable">
        <thead>
            <tr>
              <th>User Id</th>
              <th>User Name</th>
              <th>Portfolio</th>
              <th>About</th>
              <th>Category Name</th>
              <th>Address</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <CircularProgress />
                </td>
              </tr>
            ) : cancelBookingList?.results?.length ? (
              cancelBookingList?.results?.map((item) => (
                <tr key={item.id}>
                  <td>{item.s_user_id}</td>
                  <td>{item.username}</td>
                  <td>{item.portfolio}</td>
                  <td>{item.about}</td>
                  <td>{item.category_name}</td>
                  <td>{item.address}</td>
                  <td>{moment(item.created_at).format("MMMM Do YYYY")}</td>
                  <td>
                    <IconButton onClick={() => openModal(item)} >
                      <CloudDownloadIcon />
                    </IconButton>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center' }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>

          

        </table>
        <TablePagination
        totalPages={totalPages}
        count={count}
        getPageDataAction={()=>postBookingObject(id, 'total_no_service_sp', page + 1)}
        // searchPaginationAction={filterValue && filterUserAction}
        // searchString={filterValue && filterValue}
        currentPage={page}
        setCurrentPage={setPage}
      />
      {/* </TableContainer> */}
    </Box>
    </Container>

  );
};

const mapStateToProps = ({ analytics }) => {
  console.log(analytics.data.count, "data========")
  return {
    //   getReport,
    cancelBookingList: analytics.data,
    count: analytics.data.count,
    next: analytics.next,
    previous: analytics.previous,
    //   reportData: report?.data,
    //   loading: loader.loading,
    //   categoryData: category?.data,
  };
};
export default connect(mapStateToProps, {
  postBookingObject,
})(TServiceProvider);

