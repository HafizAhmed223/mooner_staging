import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { postBookingObject } from "../../redux/actions/analytics/analytics.action";


// ... (your imports remain the same)

const BookingObject = ({ postBookingObject, id, bookingList }) => {
    const [bookingData, setBookingData] = useState([]);
    console.log("bookingList===", bookingList)
    const [loading, setLoading] = useState(false);
    const [page, setPage] = React.useState(0);
    const itemPerPage = 10;
    console.log(id, "id coming")
    useEffect(() => {
        console.log('Effect Triggered with ID:', id);
        postBookingObject(id, "total_no_booking", page + 1);
    }, [id, page]);

    const pageChange = (e, newPage) => {
        console.log(newPage, "ccoming")
        setPage(newPage)
    }
    return (
        <Box>
            <TableContainer>
                <Typography style={{ padding: "10px" }}>Booking object</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Id</TableCell>
                            <TableCell>Seeker</TableCell>
                            <TableCell>Provider</TableCell>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Start Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : bookingList?.results?.length ? (
                            bookingList?.results?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.job_id}</TableCell>
                                    <TableCell>{item.seeker}</TableCell>
                                    <TableCell>{item.provider}</TableCell>
                                    <TableCell>{item.category_name}</TableCell>
                                    <TableCell>{item.order_status}</TableCell>
                                    <TableCell>{moment(item.start_date).format("MMMM Do YYYY")}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                                    No records found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TablePagination count={bookingList?.count} page={page} onPageChange={pageChange} rowsPerPage={[]} labelRowsPerPage="" SelectProps={{ native: true, style: { display: 'none' } }} />
                </Table>
            </TableContainer>
        </Box>
    );
};

// export default BookingObject;
const mapStateToProps = ({ analytics }) => {
    console.log(analytics.data, "data========")
    return {
        //   getReport,
        bookingList: analytics.data,
        //   reportData: report?.data,
        //   loading: loader.loading,
        //   categoryData: category?.data,
    };
};
export default connect(mapStateToProps, {
    postBookingObject,
})(BookingObject);