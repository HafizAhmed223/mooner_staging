import React from "react";
import { Grid, Container, makeStyles, Typography, Button, TextField } from "@material-ui/core";

import Topbar from "../topbar";
import { MyCustomStyle } from "../Announcement/MyStyles";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F0F3F8",
    height: "auto",
    [mainTheme.breakpoints.up("lg")]: {
      height: "100ch",
    },
  },
}));

const CrowlBack = () => {
  const singleStyle = useStyles();
  const classes = MyCustomStyle();
  // const classes = useStyles();

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar module="Booking" item="Crowl Back" bckLink="/mooner/details/user_management" />
          </Grid>
        </Grid>
        <div className={singleStyle.root}>
          <Typography className={classes.Title} gutterBottom>
            Payment History
          </Typography>
          <Grid Container spacing={2} className={classes.mainContainer}>
            <Grid xs={12}>
              {/* <form className={classes.form} noValidate autoComplete="off"> */}
              <Grid Container spacing={2} className={classes.mainContainer}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} className={classes.mainRow}>
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
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} className={classes.mainRow}>
                  <Typography className={classes.label} gutterBottom>
                    Amount
                  </Typography>
                  <TextField
                    type="number"
                    id="outlined-basic"
                    placeholder="$99.00"
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                    main={0}
                  />
                </Grid>
              </Grid>
              <Grid Container spacing={2} className={classes.mainContainer}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} className={classes.mainRow}>
                  <Typography className={classes.label} gutterBottom>
                    Type
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    placeholder="visa"
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} className={classes.mainRow}>
                  <Typography className={classes.label} gutterBottom>
                    Bank
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    placeholder="HSBC"
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  />
                </Grid>
              </Grid>
              <Button variant="contained" color="secondary" size="large" className={classes.button}>
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

export default CrowlBack;
