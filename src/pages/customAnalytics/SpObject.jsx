import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../api";

const SpObject = () => {
    const [serviceData, setServiceData] = useState([]);
    useEffect(() => {
        makeApiCall();
    }, [])
    const token = localStorage.getItem("authToken");
    // const apiUrl = '${baseURL}ticket_management/custom_filter/';
    const apiUrl = `${baseURL}ticket_management/custom_filter/`
    const formData = {
        category_id: 80,
        request_for: 'total_no_service_sp'
    };
    const makeApiCall = async () => {
        try {
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Response:', response?.data?.data);
            setServiceData(response?.data?.data)
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    return (
        <Box>
            <TableContainer>
                <Typography style={{ padding: "10px" }} >Sp object</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Id</TableCell>
                            <TableCell>Seeker</TableCell>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Order Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {serviceData?.results?.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.job_id}</TableCell>
                                <TableCell>{item.seeker}</TableCell>
                                <TableCell>{item.category_name}</TableCell>
                                {/* <TableCell>{item.start_date}</TableCell> */}
                                <TableCell>{moment(item.start_date).format("MMMM Do YYYY")}</TableCell>
                                <TableCell>{item.order_status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default SpObject;