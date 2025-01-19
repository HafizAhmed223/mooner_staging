import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  makeStyles,
  TextField,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

import * as Yup from "yup";
import Topbar from "../topbar";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { MyCustomStyle } from "../../assets/styles/MyStyles";
import {
  getSpeByIdAction,
  updateServiceProviderProfileAction,
} from "../../redux/actions/spManagement/spmanagement.actions";

// const SpValidationschema = Yup.object().shape({
//   status: Yup.string().required("* Field is required"),
// });

// const statusOptions = {
//   true: "Active",
//   false: "Inactive",
// };

const EditServiceProvider = () => {
  const classes = MyCustomStyle();

  const history = useHistory();

  const handleNumberFields = (e) => {
    if (
      (e.keyCode < 48 || e.keyCode > 57) &&
      e.keyCode != 8 &&
      e.keyCode != 38 &&
      e.keyCode != 40
    ) {
      return e.preventDefault();
    }
  };
  const handleSubmit = () => {};

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Country Management"
              item="Create"
              bckLink="/mooner/details/country_management_list"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Country Details
          </Typography>
          <Grid container spacing={2} className={classes.mainContainer}>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
              {/* <Formik
            enableReinitialize={true}
            initialValues={{
              status:'',
            }}
            validationSchema={SpValidationschema}
            onSubmit={handleSubmit}
            > */}
              {/* {({ */}
              {/* handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
              }) => ( */}
              {/* <Form onSubmit={handleSubmit} autoComplete="off"> */}
              <Grid container className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={3}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Country
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                      //   onChange={handleChange}
                      //   onBlur={handleBlur}
                      //   value={values.country}
                      name="country"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="country"
                      displayEmpty
                      className={classes.textStyle}
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
                    >
                      {/* <MenuItem value={"Active"}>Active</MenuItem>
                      <MenuItem value={"Inactive"}>Inactive</MenuItem> */}
                    </Select>
                  </FormControl>

                  {/* {errors.country && touched.country ? (
                                <div className="error-text">{errors.country}</div>
                            ) : null} */}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={3}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    City
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                      //   onChange={handleChange}
                      //   onBlur={handleBlur}
                      //   value={values.city}
                      name="city"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="city"
                      displayEmpty
                      className={classes.textStyle}
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
                    >
                      {/* <MenuItem value={"Active"}>Active</MenuItem>
                      <MenuItem value={"Inactive"}>Inactive</MenuItem> */}
                    </Select>
                  </FormControl>
                  {/* {errors.city && touched.city ? (
                    <div className="error-text">{errors.city}</div>
                  ) : null} */}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={3}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    State
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                      //   onChange={handleChange}
                      //   onBlur={handleBlur}
                      //   value={values.state}
                      name="state"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="state"
                      displayEmpty
                      className={classes.textStyle}
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
                    >
                      {/* <MenuItem value={"Active"}>Active</MenuItem>
                      <MenuItem value={"Inactive"}>Inactive</MenuItem> */}
                    </Select>
                  </FormControl>
                  {/* {errors.state && touched.state ? (
                    <div className="error-text">{errors.state}</div>
                  ) : null} */}
                </Grid>
              </Grid>
              <Grid container className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={3}
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
                      //   onChange={handleChange}
                      //   onBlur={handleBlur}
                      //   value={values.status}
                      name="status"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="status"
                      displayEmpty
                      className={
                        // values.status === "Active"
                        //   ? classes.changeColor
                        //   :
                        classes.changeColorRed
                      }
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
                    >
                      <MenuItem style={{ color: "green" }} value={"Active"}>
                        Active
                      </MenuItem>
                      <MenuItem style={{ color: "red" }} value={"Inactive"}>
                        Inactive
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {/* {errors.status && touched.status ? (
                    <div className="error-text">{errors.status}</div>
                  ) : null} */}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={3}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Currency
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                      //   onChange={handleChange}
                      //   onBlur={handleBlur}
                      //   value={values.currency}
                      name="currency"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="currency"
                      displayEmpty
                      className={classes.textStyle}
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
                    >
                      {/* <MenuItem value={"Active"}>Active</MenuItem>
                      <MenuItem value={"Inactive"}>Inactive</MenuItem> */}
                    </Select>
                  </FormControl>
                  {/* {errors.currency && touched.currency ? (
                    <div className="error-text">{errors.currency}</div>
                  ) : null} */}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={3}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Postal/ zip code
                  </Typography>
                  <TextField
                    type="number"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.account_number}
                    name="account_number"
                    id="outlined-basic"
                    placeholder="zip_code"
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                    onKeyDown={(e) => handleNumberFields(e)}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                  {/* {errors.account_number && touched.account_number ? (
                    <div className="error-text">{errors.account_number}</div>
                  ) : null} */}
                </Grid>
              </Grid>
              <Grid container className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={3}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Category
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                      //   onChange={handleChange}
                      //   onBlur={handleBlur}
                      //   value={values.category}
                      name="category"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="category"
                      displayEmpty
                      className={classes.textStyle}
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
                    ></Select>
                  </FormControl>
                  {/* {errors.category && touched.category ? (
                    <div className="error-text">{errors.category}</div>
                  ) : null} */}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={3}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Account Number
                  </Typography>
                  <TextField
                    type="number"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.zip_code}
                    name="zip_code"
                    id="outlined-basic"
                    placeholder="account_number"
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                    onKeyDown={(e) => handleNumberFields(e)}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                  {/* {errors.category && touched.category ? (
                    <div className="error-text">{errors.category}</div>
                  ) : null} */}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={3}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Telephone
                  </Typography>
                  <TextField
                    type="tel"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.phone}
                    name="phone"
                    id="outlined-basic"
                    placeholder="phone"
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                    // onKeyDown={ e => handleNumberFields(e) }
                    // InputProps={{ inputProps: { min: 1} }}
                  />
                  {/* {errors.phone && touched.phone ? (
                    <div className="error-text">{errors.phone}</div>
                  ) : null} */}
                </Grid>
              </Grid>
              <Grid container className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  lg={6}
                  xl={6}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Address Line 1
                  </Typography>
                  <TextField
                    type="text"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.address1}
                    name="address1"
                    id="outlined-basic"
                    placeholder="user name"
                    variant="outlined"
                    placeholder="address line 1"
                    className={[classes.field, classes.removeOutline]}
                  />
                  {/* {errors.address1 && touched.address1 ? (
                    <div className="error-text">{errors.address1}</div>
                  ) : null} */}
                </Grid>
              </Grid>
              <Grid container className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  lg={6}
                  xl={6}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Address Line 2
                  </Typography>
                  <TextField
                    type="text"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.address2}
                    name="address2"
                    id="outlined-basic"
                    placeholder="user name"
                    variant="outlined"
                    placeholder="address line 2"
                    className={[classes.field, classes.removeOutline]}
                  />
                  {/* {errors.address2 && touched.address2 ? (
                    <div className="error-text">{errors.address2}</div>
                  ) : null} */}
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className={classes.blueBtn}
              >
                Delete
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
              >
                Save
              </Button>

              {/* </Form> */}
              {/* )} */}
              {/* </Formik> */}
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps, {})(EditServiceProvider);
