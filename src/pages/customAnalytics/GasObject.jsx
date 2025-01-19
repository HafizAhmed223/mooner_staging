// import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
// import axios from "axios";
// import moment from "moment";
// import React, { useEffect, useState } from "react";

// const GasObject = ({ id }) => {
//     const [gasObjectData, setGasObjectData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         makeApiCall(id);
//     }, [id]);

//     const token = localStorage.getItem("authToken");
//     const apiUrl = 'https://api.mooner.com.sg/ticket_management/custom_filter/';

//     const makeApiCall = async (categoryData) => {
//         const formData = {
//             category_id: categoryData,
//             request_for: 'gas_fee_paid'
//         };
//         try {
//             const response = await axios.post(apiUrl, formData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             // console.log('api response:', response?.data?.data);
//             setGasObjectData(response?.data?.data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error:', error.message);
//             setLoading(false);
//         }
//     };

//     return (
//         <Box>
//             <TableContainer>
//                 <Typography style={{ padding: "10px" }}>Gas Object</Typography>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Booking Id</TableCell>
//                             <TableCell>Seeker</TableCell>
//                             <TableCell>Provider</TableCell>
//                             <TableCell>Category Name</TableCell>
//                             <TableCell>Total Num of BnB</TableCell>
//                             <TableCell>Total num of SGD</TableCell>
//                             <TableCell>BnB Transfer</TableCell>
//                             <TableCell>Deducted Amount</TableCell>
//                             <TableCell>Create At</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell colSpan={7} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
//                                     <CircularProgress />
//                                 </TableCell>
//                             </TableRow>
//                         ) : gasObjectData?.results?.length ? (
//                             gasObjectData?.results?.map((item) => (
//                                 <TableRow key={item.id}>
//                                     <TableCell>{item.booking_id}</TableCell>
//                                     <TableCell>{item.seeker}</TableCell>
//                                     <TableCell>{item.provider}</TableCell>
//                                     <TableCell>{item.category_name}</TableCell>
//                                     <TableCell>{item.totalInBnb}</TableCell>
//                                     <TableCell>{item.totalInSgd}</TableCell>
//                                     <TableCell>{item.bnb_transfer}</TableCell>
//                                     <TableCell>{item.deduct_amount}</TableCell>
//                                     <TableCell>{moment(item.start_date).format("MMMM Do YYYY")}</TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={7} style={{ textAlign: 'center' }}>
//                                     No records found
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// };

// export default GasObject;

import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { postBookingObject } from "../../redux/actions/analytics/analytics.action";

const GasObject = ({ postBookingObject, cancelBookingList, id }) => {
  const [cancelBookingData, setCancelBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  console.log(id, "id coming")
  useEffect(() => {
    postBookingObject(id, 'gas_fee_paid', page);
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
        <Typography style={{ padding: "10px" }}>Total Num Of Gas Object</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking Id</TableCell>
              <TableCell>Seeker</TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Total Num of BnB</TableCell>
              <TableCell>Total num of SGD</TableCell>
              <TableCell>BnB Transfer</TableCell>
              <TableCell>Deducted Amount</TableCell>
              <TableCell>Create At</TableCell>
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
                  <TableCell>{item.booking_id}</TableCell>
                  <TableCell>{item.seeker}</TableCell>
                  <TableCell>{item.provider}</TableCell>
                  <TableCell>{item.category_name}</TableCell>
                  <TableCell>{item.totalInBnb}</TableCell>
                  <TableCell>{item.totalInSgd}</TableCell>
                  <TableCell>{item.bnb_transfer}</TableCell>
                  <TableCell>{item.deduct_amount}</TableCell>
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
})(GasObject);

