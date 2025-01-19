import React from "react";
import {
  Grid,
  Container,
  makeStyles,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";

import Topbar from "../topbar";
import { MyCustomStyle } from '../Announcement/MyStyles';

const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F0F3F8",
    height: "auto",
    [mainTheme.breakpoints.up("lg")]:{
      height: "100ch"
    },
  },
}));

const RefundPayment = () => {
  const singleStyle = useStyles();
  const classes = MyCustomStyle();

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar module="Booking" item="Refund Payment" bckLink="/mooner/details/user_management" />
          </Grid>
        </Grid>
        <div className={singleStyle.root}>
          <Typography className={classes.Title} gutterBottom>
            Payment
          </Typography>
          <Grid Container spacing={2} className={classes.mainContainer}>
            <Grid  item xs={12}>
              {/* <form className={classes.form} noValidate autoComplete="off"> */}
              <Grid Container spacing={2} className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Id
                  </Typography>
                  <TextField
                    type="number"
                    id="outlined-basic"
                    placeholder="1548"
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                    main={0}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Amount
                  </Typography>
                  <TextField
                    type="number"
                    id="outlined-basic"
                    placeholder="1548"
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                    main={0}
                  />
                  <Typography className={classes.limitPayment}>
                    Max refund $59.00
                  </Typography>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
              >
                Refund
              </Button>
              {/* </form> */}
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default RefundPayment;
