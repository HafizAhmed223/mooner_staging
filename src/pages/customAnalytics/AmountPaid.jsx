// import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
// import axios from "axios";
// import moment from "moment";
// import React, { useEffect, useState } from "react";

// const AmountPaid = ({ id }) => {
//   const [amountPaidData, setAmountPaidData] = useState([]);
//   const [loading, setLoading] = useState(true);
// console.log(id,"id coming")
//   useEffect(() => {
//     makeApiCall(id);
//   }, [id]);

//   const token = localStorage.getItem("authToken");
//   const apiUrl = 'https://api.mooner.com.sg/ticket_management/custom_filter/';

//   const makeApiCall = async (categoryData) => {
//     const formData = {
//       category_id: categoryData,
//       request_for: 'total_amount_paidout'
//     };
//     try {
//       const response = await axios.post(apiUrl, formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       console.log('Response:', response?.data?.data);
//       setAmountPaidData(response?.data?.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error:', error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <Box>
//       <TableContainer>
//         <Typography style={{ padding: "10px" }}>Amount Paid out object</Typography>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Job Id</TableCell>
//               <TableCell>Seeker</TableCell>
//               <TableCell>Provider</TableCell>
//               <TableCell>Category Name</TableCell>
//               <TableCell>Transaction Name</TableCell>
//               <TableCell>MNR</TableCell>
//               <TableCell>SGD</TableCell>
//               <TableCell>Token Price</TableCell>
//               <TableCell>Gas Fee SGD</TableCell>
//               <TableCell>Start Date</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={7} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
//                   <CircularProgress />
//                 </TableCell>
//               </TableRow>
//             ) : amountPaidData?.results?.length ? (
//               amountPaidData?.results?.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>{item.job_id}</TableCell>
//                   <TableCell>{item.seeker}</TableCell>
//                   <TableCell>{item.provider}</TableCell>
//                   <TableCell>{item.category_name}</TableCell>
//                   <TableCell>{item.transaction_name}</TableCell>
//                   <TableCell>{item.mnr}</TableCell>
//                   <TableCell>{item.sgd}</TableCell>
//                   <TableCell>{item.token_price}</TableCell>
//                   <TableCell>{item.gas_fee_sgd}</TableCell>
//                   <TableCell>{moment(item.created_at).format("MMMM Do YYYY")}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} style={{ textAlign: 'center' }}>
//                   No records found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default AmountPaid;

import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { postBookingObject } from "../../redux/actions/analytics/analytics.action";

const AmountPaid = ({ postBookingObject, cancelBookingList, id }) => {
  const [cancelBookingData, setCancelBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  console.log(id, "id coming")
  useEffect(() => {
    postBookingObject(id, 'total_amount_paidout', page);
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
        <Typography style={{ padding: "10px" }}>Amount Paid out object</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Id</TableCell>
              <TableCell>Seeker</TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Category Name</TableCell>
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
                  <TableCell>{item.job_id}</TableCell>
                  <TableCell>{item.seeker}</TableCell>
                  <TableCell>{item.provider}</TableCell>
                  <TableCell>{item.category_name}</TableCell>
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
})(AmountPaid);