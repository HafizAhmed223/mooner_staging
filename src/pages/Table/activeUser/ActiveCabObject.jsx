import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";
import Topbar from "../../topbar";
// import { MyCustomStyle } from "../../assets/styles/MyStyles";

const ActiveCabObject = () => {
    const classes = MyCustomStyle();


    const location = useLocation();
    const selectedItem = location.state?.selectedItem;
    console.log(selectedItem, "previous record")
    return (
        <>
            <Grid container className={classes.mainContainer}>
                <Grid item sm={12}>
                    <Topbar
                        module="Active Cab"
                        item="Cab Object Details"
                        bckLink={"/mooner/details/active_jobs"}
                    />
                </Grid>
            </Grid>
            <Grid container className={classes.mainContainer}>
                <Grid item xs={12} sm={12} md={8} lg={9} xl={10}>
                    <Grid container className={classes.mainContainer}>
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={3}
                            className={classes.mainRow}
                        >
                            <Typography className={classes.label} gutterBottom>
                                Job Id
                            </Typography>
                            <TextField
                                type="text"
                                value={selectedItem.id}
                                variant="outlined"
                                className={[classes.field, classes.removeOutline]}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={3}
                            className={classes.mainRow}
                        >
                            <Typography className={classes.label} gutterBottom>
                                Driver Name
                            </Typography>
                            <TextField
                                type="text"
                                value={selectedItem.driver_username}
                                variant="outlined"
                                className={[classes.field, classes.removeOutline]}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={3}
                            className={classes.mainRow}
                        >
                            <Typography className={classes.label} gutterBottom>
                                Passenger Name
                            </Typography>
                            <TextField
                                type="text"
                                value={selectedItem.passenger_username}
                                variant="outlined"
                                className={[classes.field, classes.removeOutline]}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={3}
                            className={classes.mainRow}
                        >
                            <Typography className={classes.label} gutterBottom>
                                Pickup
                            </Typography>
                            <TextField
                                type="text"
                                value={selectedItem.pickup.address}
                                variant="outlined"
                                className={[classes.field, classes.removeOutline]}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={3}
                            className={classes.mainRow}
                        >
                            <Typography className={classes.label} gutterBottom>
                                Budget
                            </Typography>
                            <TextField
                                type="text"
                                value={selectedItem.budget}
                                variant="outlined"
                                className={[classes.field, classes.removeOutline]}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={3}
                            className={classes.mainRow}
                        >
                            <Typography className={classes.label} gutterBottom>
                                Car Name
                            </Typography>
                            <TextField
                                type="text"
                                value={selectedItem.brand_model}
                                variant="outlined"
                                className={[classes.field, classes.removeOutline]}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={3}
                            className={classes.mainRow}
                        >
                            <Typography className={classes.label} gutterBottom>
                                Car Color
                            </Typography>
                            <TextField
                                type="text"
                                value={selectedItem.color}
                                variant="outlined"
                                className={[classes.field, classes.removeOutline]}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={3}
                            className={classes.mainRow}
                        >
                            <Typography className={classes.label} gutterBottom>
                                Destination 1
                            </Typography>
                            <TextField
                                type="text"
                                value={selectedItem.destination1.address}
                                variant="outlined"
                                className={[classes.field, classes.removeOutline]}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={3}
                            className={classes.mainRow}
                        >
                            <Typography className={classes.label} gutterBottom>
                                Destination 2
                            </Typography>
                            <TextField
                                type="text"
                                  value={selectedItem.destination?selectedItem.destination2:""}
                                variant="outlined"
                                className={[classes.field, classes.removeOutline]}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={3}
                            className={classes.mainRow}
                        >
                            <Typography className={classes.label} gutterBottom>
                                Destination 3
                            </Typography>
                            <TextField
                                type="text"
                                  value={selectedItem.destination3?selectedItem.destination3:""}
                                variant="outlined"
                                className={[classes.field, classes.removeOutline]}
                            />
                        </Grid>
                        
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={3}
                            className={classes.mainRow}
                        >
                            <Typography className={classes.label} gutterBottom>
                                Location Description
                            </Typography>
                            <TextField
                                type="text"
                                value={selectedItem.location_description}
                                variant="outlined"
                                className={[classes.field, classes.removeOutline]}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={3}
                            className={classes.mainRow}
                        >
                            <Typography className={classes.label} gutterBottom>
                                Plate Number
                            </Typography>
                            <TextField
                                type="text"
                                value={selectedItem.plate_number}
                                variant="outlined"
                                className={[classes.field, classes.removeOutline]}
                            />

                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ActiveCabObject;