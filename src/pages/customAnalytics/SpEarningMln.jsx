import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { postBookingObject } from "../../redux/actions/analytics/analytics.action";

const SpEarningMln = ({postBookingObject,cancelBookingList, id }) => {
  const [cancelBookingData, setCancelBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const[page,setPage]=useState(0)
console.log(id,"id coming")
  useEffect(() => {
    postBookingObject(id,'total_amount_paidout',page+1);
  }, [id,page]);

  const itemPerPage=10;
  const pageChange=(e, newPage)=>{
    console.log(newPage,"ccoming")
    setPage(newPage)
}

  return (
    <Box>
      <TableContainer>
      <Typography style={{ padding: "10px" }}>Total Sp Earning Mln</Typography>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Transaction Name</TableCell>
            <TableCell>MNR</TableCell>
            <TableCell>SGD</TableCell>
            <TableCell>Token Price</TableCell>
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
                 <TableCell>{item.transaction_name}</TableCell>
                 <TableCell>{item.mnr}</TableCell>
                 <TableCell>{item.sgd}</TableCell>
                 <TableCell>{item.token_price}</TableCell>
                 <TableCell>{item.gas_fee_sgd}</TableCell>
                 <TableCell>{moment(item.created_at).format("MMMM Do YYYY")}</TableCell>
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
          <TablePagination count={cancelBookingList?.count}  page={page} onPageChange={pageChange} rowsPerPage={[]} labelRowsPerPage="" SelectProps={{ native: true, style: { display: 'none' } }} />

        </Table>
      </TableContainer>
    </Box>
  );
};

const mapStateToProps = ({analytics}) => {
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
})(SpEarningMln);