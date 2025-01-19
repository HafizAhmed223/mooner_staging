// import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";

import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { postBookingObject } from "../../redux/actions/analytics/analytics.action";

const ActiveUser = ({ postBookingObject, cancelBookingList, id }) => {
  // const [cancelBookingData, setCancelBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  console.log(id, "id coming")
  useEffect(() => {
    postBookingObject(id, 'total_active_user', page);
  }, [id, page]);

  const itemPerPage = 10;
  const pageChange = (e, newPage) => {
    console.log(newPage, "ccoming")
    setPage(newPage)
  }

  // const token = localStorage.getItem("authToken");
  // const apiUrl = 'https://api.mooner.com.sg/ticket_management/custom_filter/';

  // const makeApiCall = async (categoryData) => {
  //   const formData = {
  //     category_id: categoryData,
  //     request_for: 'total_no_service_sp'
  //   };
  //   try {
  //     const response = await axios.post(apiUrl, formData, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
  //     console.log('Response:', response?.data?.data);
  //     setCancelBookingData(response?.data?.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     setLoading(false);
  //   }
  // };

  return (
    <Box>
      <TableContainer>
        <Typography style={{ padding: "10px" }}>Total Active Users</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Gas Fee SGD</TableCell>
              <TableCell>Start Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : cancelBookingList?.results?.length ? (
              cancelBookingList?.results?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.first_name}</TableCell>
                  <TableCell>{item.last_name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.telephone}</TableCell>
                  <TableCell>{moment(item.created_at).format("MMMM Do YYYY")}</TableCell>
                  <TableCell>{item.gas_fee_sgd}</TableCell>
                  <TableCell>{item.stripe_fee}</TableCell>
                  <TableCell>{item.order_status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: 'center' }}>
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TablePagination count={cancelBookingList?.count} page={page} onPageChange={pageChange} rowsPerPage={[]} labelRowsPerPage="" SelectProps={{ native: true, style: { display: 'none' } }} />

        </Table>
      </TableContainer>
    </Box>
  );
};

const mapStateToProps = ({ analytics }) => {
  console.log(analytics.data, "data========")
  return {
    //   getReport,
    cancelBookingList: analytics.data,
    //   reportData: report?.data,
    //   loading: loader.loading,
    //   categoryData: category?.data,
  };
};
export default connect(mapStateToProps, {
  postBookingObject,
})(ActiveUser);