import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { postBookingObject } from "../../redux/actions/analytics/analytics.action";

const SSpentObject = ({ postBookingObject, cancelBookingList, id }) => {
  const [cancelBookingData, setCancelBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  console.log(id, "id coming")
  useEffect(() => {
    postBookingObject(id, 'ss_spent', page + 1);
  }, [id, page]);


  const itemPerPage = 10;
  const pageChange = (e, newPage) => {
    console.log(newPage, "ccoming")
    setPage(newPage)
  }



  return (
    <Box>
      <TableContainer>
        <Typography style={{ padding: "10px" }}>Total Spent object</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Id</TableCell>
              <TableCell>Seeker</TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Tip</TableCell>
              <TableCell>AddOn</TableCell>
              {/* <TableCell>Total Stripe Fee</TableCell> */}
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
                  <TableCell>{item.job_id}</TableCell>
                  <TableCell>{item.Seeker}</TableCell>
                  <TableCell>{item.provider}</TableCell>
                  <TableCell>{item.category_name}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.discount_amount}</TableCell>
                  <TableCell>{item.total_amount}</TableCell>
                  <TableCell>{item.tip}</TableCell>
                  <TableCell>{item.add_on}</TableCell>
                  {/* <TableCell>{item.total_amount}</TableCell> */}
                  <TableCell>{moment(item.start_date).format("MMMM Do YYYY")}</TableCell>
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
})(SSpentObject);