import React, { useState } from "react";
import {
  Grid,
  Container,
  makeStyles,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@material-ui/core";

import Topbar from "../topbar";

import { MyCustomStyle } from "../../assets/styles/MyStyles";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { changeStatus } from "../../redux/actions/booking/booking.action";
const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F0F3F8",
    height: "auto",
    [mainTheme.breakpoints.up("lg")]: {
      height: "100vh",
    },
  },
}));

const ChangeStatus = ({ changeStatus, match }) => {
  const singleStyle = useStyles();
  const classes = MyCustomStyle();
  const { id } = match.params;
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append("order_status", values.status);
    changeStatus(formData, id);
  };
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Booking"
              item="Change Status"
              bckLink="/mooner/details/user_management"
            />
          </Grid>
        </Grid>
        <div className={singleStyle.root}>
          <Typography className={classes.Title} gutterBottom>
            Booking
          </Typography>
          <Grid Container spacing={2} className={classes.mainContainer}>
            <Grid item xs={12}>
              {/* <form className={classes.form} noValidate autoComplete="off"> */}
              <Formik
                enableReinitialize={true}
                initialValues={{
                  status: "",
                }}
                // validationSchema={SpValidationschema}
                onSubmit={handleSubmit}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                }) => (
                  <Form onSubmit={handleSubmit} autoComplete="off">
                    <Grid
                      Container
                      spacing={2}
                      className={classes.mainContainer}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Status
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={values.status}
                            name="status"
                            onChange={handleChange}
                            label="staus"
                            MenuProps={{
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              transformOrigin: {
                                vertical: "top",
                                horizontal: "left",
                              },
                              getContentAnchorEl: null,
                            }}
                            className={
                              status === "Active"
                                ? classes.changeColor
                                : classes.changeColorRed
                            }
                            // className={
                            //   status === "completed" && classes.changeColor
                            //   // (status === "cancelled" && classes.changeColorRed) ||
                            //   // (status === "underprocess" && classes.changeColorYellow)
                            // }
                          >
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              style={{ color: "green" }}
                              value={"Completed"}
                            >
                              Completed
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              style={{ color: "#F2994A" }}
                              value={"Active"}
                            >
                              Active
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              style={{ color: "red" }}
                              value={"Cancelled"}
                            >
                              Cancelled
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      Save
                    </Button>
                  </Form>
                )}
              </Formik>

              {/* </form> */}
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default connect(null, { changeStatus })(ChangeStatus);
