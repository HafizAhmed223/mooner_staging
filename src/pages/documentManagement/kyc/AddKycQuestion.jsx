import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  TextField,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import Topbar from "../../topbar";
import { useHistory, useParams } from "react-router-dom";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";
import BannerImage from "../../../assets/svg/bannerimg.svg";
import { createKycQuestionAction } from "../../../redux/actions/document/document.action";
import Permissions from "../../subAdmin/Permissions";

const validationSchema = Yup.object().shape({
  kyc_label: Yup.string().required("* Field is required"),
  doc_type: Yup.string().required("* Field is required"),
  // expiration_date: Yup.string().required("* Field is required"),
  kyc_for: Yup.string().required("* Field is required"),
  doc_privacy: Yup.string().required("* Field is required"),
});

const AddKYC = ({ createKycQuestionAction }) => {
  const classes = MyCustomStyle();

  const handleSubmit = (values) => {
    const payload = {
      // expiration_date: values.expiration_date,
      doc_label: values.kyc_label,
      doc_for: values.kyc_for,
      doc_question_type: values.doc_type,
      doc_privacy: values.doc_privacy,
    };
    createKycQuestionAction(payload);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="add_document" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" Documents Details "
              item=" Create KYC "
              bckLink="/mooner/details/document_management"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            KYC
          </Typography>
          <Grid container spacing={2} className={classes.mainContainer}>
            <Grid xs={12}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  kyc_label: "",
                  kyc_for: "",
                  // expiration_date:'',
                  doc_type: "",
                  doc_privacy: "",
                }}
                validationSchema={validationSchema}
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
                      container
                      spacing={2}
                      className={classes.mainContainer}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          KYC Name
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.kyc_label}
                          name="kyc_label"
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="Doc Name"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.kyc_label && touched.kyc_label ? (
                          <div className="error-text">{errors.kyc_label}</div>
                        ) : null}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Question Type
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.doc_type}
                            name="doc_type"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="doc_type"
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
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"Image"}
                            >
                              Image
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"File"}
                            >
                              File
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {errors.doc_type && touched.doc_type ? (
                          <div className="error-text">{errors.doc_type}</div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      className={classes.mainContainer}
                    >
                      <Grid
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          KYC For
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.kyc_for}
                            name="kyc_for"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="kyc_for"
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
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"SS"}
                            >
                              SS
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"SP"}
                            >
                              SP
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"Driver"}
                            >
                              Driver
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"Hitch"}
                            >
                              Hitch
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {errors.kyc_for && touched.kyc_for ? (
                          <div className="error-text">{errors.kyc_for}</div>
                        ) : null}
                      </Grid>
                      <Grid
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Privacy
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.doc_privacy}
                            name="doc_privacy"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="doc_privacy"
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
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"Public"}
                            >
                              Public
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"Private"}
                            >
                              Private
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {errors.doc_privacy && touched.doc_privacy ? (
                          <div className="error-text">{errors.doc_privacy}</div>
                        ) : null}
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

export default connect(mapStateToProps, {
  createKycQuestionAction,
})(AddKYC);
