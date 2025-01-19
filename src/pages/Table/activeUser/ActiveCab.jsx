import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Typography, Box, Button } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { baseURL } from "../../../api";

const ActiveService = () => {
    const [cabBooking, setCabBooking] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory()

    const token = localStorage.getItem("authToken");
    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await axios.get(`${baseURL}mooner_cab/active_booking/?page=1`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setCabBooking(response?.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchServiceData();
    }, [token]);


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, []);
    const openDetailPage = (id) => {
        console.log("clicked", id);
        const selectedItem = cabBooking.results.find(item => item.id === id);

        history.push({
            pathname: `/mooner/details/active_cab/${id}`,
            state: { selectedItem }
        });
    }
    return (
        <Container>
            <TableContainer style={{ overflowX: 'hidden' }}>
                <Typography>Active Cab Bookings</Typography>
                <Table className="reportTable">
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Id</TableCell>
                            <TableCell>Driver Name</TableCell>
                            <TableCell>Passenger Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Price($)</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (

                            <TableRow>
                                <TableCell colSpan={7} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : cabBooking?.results?.length > 0 ? (
                            cabBooking?.results?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.driver_username}</TableCell>
                                    <TableCell>{item.passenger_username}</TableCell>
                                    <TableCell>{moment(item.created_at).format("MMMM Do YYYY")}</TableCell>
                                    <TableCell>{moment(item.created_at).format("HH:mm:ss")}</TableCell>
                                    <TableCell>{item.budget}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>
                                        <Box>
                                            <Button size="small" style={{ textTransform: "capitalize" }} onClick={() => openDetailPage(item.id)} >View</Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} style={{ textAlign: 'center' }}>
                                    <Typography>No records found</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ActiveService;
