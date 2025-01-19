import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../api";

const RetentionObject = () => {
    const [serviceData, setServiceData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        makeApiCall();
    }, []);

    const token = localStorage.getItem("authToken");
    // const apiUrl = 'https://api.mooner.com.sg/ticket_management/custom_filter/';
    const apiUrl = `${baseURL}ticket_management/custom_filter/`
    const formData = {
        category_id: 80,
        request_for: 'retention_rate'
    };

    const makeApiCall = async () => {
        try {
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Response:', response?.data?.data);
            setServiceData(response?.data?.data);
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            // Set loading to false once the API call is complete (whether successful or not)
            setLoading(false);
        }
    };

    return (
        <Box>
            <TableContainer>
                <Typography style={{ padding: "10px" }} >Retention Rate object</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Id</TableCell>
                            <TableCell>Deducted Amount</TableCell>
                            {/* <TableCell>Category Name</TableCell> */}
                            <TableCell>Start Date</TableCell>
                            {/* <TableCell>Order Status</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (
                            serviceData?.results?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.deduct_amount}</TableCell>
                                    <TableCell>{moment(item.start_date).format("MMMM Do YYYY")}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default RetentionObject;
