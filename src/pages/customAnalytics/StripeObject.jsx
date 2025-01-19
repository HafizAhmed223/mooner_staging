
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { postBookingObject } from "../../redux/actions/analytics/analytics.action";

const StripeObject = ({ postBookingObject, cancelBookingList, id }) => {
  const [cancelBookingData, setCancelBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0)
  console.log(id, "id coming")
  useEffect(() => {
    postBookingObject(id, 'total_stripe_fee', page + 1);
  }, [id, page]);

  const itemPerPage = 10;
  const pageChange = (e, newPage) => {
    console.log(newPage, "ccoming")
    setPage(newPage)
  }


  return (
    <Box>
      <TableContainer>
        <Typography style={{ padding: "10px" }}>Total Num Of Stripe Object</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Id</TableCell>
              <TableCell>Seeker</TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Price($)</TableCell>
              <TableCell>Stripe Fee</TableCell>
              <TableCell>Order Status</TableCell>
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
                  <TableCell>{item.seeker}</TableCell>
                  <TableCell>{item.provider}</TableCell>
                  <TableCell>{item.category_name}</TableCell>
                  <TableCell>{moment(item.start_date).format("MMMM Do YYYY")}</TableCell>
                  <TableCell>{item.budget}</TableCell>
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
})(StripeObject);



