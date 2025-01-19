import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";
import Topbar from "../../topbar";
import moment from "moment";
// import { MyCustomStyle } from "../../assets/styles/MyStyles";

const ActiveServiceObject = () => {
  const classes = MyCustomStyle();


  const location = useLocation();
  const selectedItem = location.state?.selectedItem;
  console.log(selectedItem, "previous record")
  return (
    <>
      <Grid container className={classes.mainContainer}>
        <Grid item sm={12}>
          <Topbar
            module="Active Service"
            item="Service Object Details"
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
                value={selectedItem.job_id}
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
                Address
              </Typography>
              <TextField
                type="text"
                value={selectedItem.address}
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
                Seeker
              </Typography>
              <TextField
                type="text"
                value={selectedItem.seeker}
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
                Category Name
              </Typography>
              <TextField
                type="text"
                value={selectedItem.category_name}
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
                Status
              </Typography>
              <TextField
                type="text"
                value={selectedItem.order_status}
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
                Start Date
              </Typography>
              <TextField
                type="text"
                // value={selectedItem.start_date}
                value={moment(selectedItem.start_date).format("MMMM Do YYYY")}
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

export default ActiveServiceObject;