import { Box, Button, CircularProgress, Grid, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, makeStyles } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ActiveServiceObject from "./ActiveServiceObject";
import { baseURL } from "../../../api";

const useStyles = makeStyles((mainTheme) => ({

    managecategory: {
        float: "right",
        width: "36%",
        height: "35px",
        marginLeft: '5px',
        marginRight: '5px',
        borderRadius: "24px",
        fontSize: "15px",
        fontWeight: "600",
        textTransform: "Capitalize",
        // marginTop: mainTheme.spacing(4),
        marginBottom: mainTheme.spacing(5),
        [mainTheme.breakpoints.only("lg")]: {
            width: "80%",
            height: "50px",
            borderRadius: "10px",
        },
        [mainTheme.breakpoints.down("md")]: {
            width: "80%",
            height: "50px",
            borderRadius: "10px",
        },
        [mainTheme.breakpoints.down("xs")]: {
            marginRight: mainTheme.spacing(4),
            width: "80%",
            height: "50px",
            borderRadius: "10px",
            marginTop:"5px"
        },
    },

}));

const ActiveService = () => {
    const classes = useStyles();

    const [title, setTitle] = useState('Ongoing jobs');

    const [serviceBooking, setServiceBooking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState([])
    const history = useHistory();

    const token = localStorage.getItem("authToken");
    const fetchServiceData = async () => {
        try {
            const response = await axios.get(`${baseURL}booking/get_booking_list/?page=1${title == 'Ongoing jobs' ? '' : '&type=job_post'}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setServiceBooking(response?.data?.data)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {

        fetchServiceData()
    }, [])

    const handleService = (lable) => {

        setTitle(pre => { return lable })
        fetchServiceData()
    }
    const openDetailPage = (id) => {
        console.log("clicked", id);
        const selectedItem = serviceBooking.results.find(item => item.id === id);

        history.push({
            pathname: `/mooner/details/active_service/${id}`,
            state: { selectedItem }
        });
    }


    return (
        <TableContainer style={{ overflowX: 'hidden' }}>
            <Grid container>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Typography>{title}</Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>

                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.managecategory}
                        onClick={() => handleService('Ongoing jobs')}
                    >
                        Ongoing jobs
                    </Button>

                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.managecategory}
                        onClick={() => handleService('Active jobs')}
                    >
                        Active Job
                    </Button>

                </Grid>
            </Grid>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Job Id</TableCell>
                        <TableCell>Seeker</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>DateTime</TableCell>
                        <TableCell>Price</TableCell>
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
                    ) : serviceBooking?.results?.length > 0 ? (

                        serviceBooking?.results?.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.seeker}</TableCell>
                                <TableCell>{item.category_name}</TableCell>
                                <TableCell>{moment(item.created_at).format("MMMM Do YYYY")}</TableCell>
                                <TableCell>{moment(item.created_at).format("HH:mm:ss")}</TableCell>
                                <TableCell>{item.budget}</TableCell>
                                <TableCell>{item.order_status}</TableCell>
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
    )
}
export default ActiveService;