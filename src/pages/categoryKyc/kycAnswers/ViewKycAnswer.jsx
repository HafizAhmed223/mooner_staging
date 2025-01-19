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
  TextareaAutosize,
} from "@material-ui/core";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import Topbar from "../../topbar";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";

import {
  getKycAnswerById,
  updateKycAnswerAction,
} from "../../../redux/actions/categoryKyc/categoryKyc.actions";
import { base_url_auto } from "../../../utils/global";
import Permissions from "../../subAdmin/Permissions";

// import { IMAGE_BASE_URL } from "../../../api/constants";

const validationSchema = Yup.object().shape({
  reason: Yup.string().required("* Field is required"),
});

const EditKycAnswers = ({
  getKycAnswerById,
  updateKycAnswerAction,
  kycAnswer,
}) => {
  const classes = MyCustomStyle();
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    getKycAnswerById(id);
  }, [id]);

  const handleSubmit = (values) => {
    const payload = {
      disapproval_reason: values.reason,
      status: "Disapprove",
    };
    updateKycAnswerAction(payload, id);
  };

  const handleApprove = (values) => {
    const payload = {
      disapproval_reason: values.reason,
      status: "Approve",
    };
    updateKycAnswerAction(payload, id);
  };

  return (
    <>
      <Permissions page="change_categorykyc" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          reason: "",
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
            <Container maxWidth="xl">
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <Topbar
                    module="Kyc Answer"
                    item="Edit"
                    bckLink="/mooner/details/kyc_answers"
                  />
                </Grid>
              </Grid>
              <div className={classes.root}>
                <Typography className={classes.Title} gutterBottom>
                  Kyc Answer
                </Typography>
                <Grid container spacing={2} className={classes.mainContainer}>
                  <Grid xs={12}>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
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
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="tn_parent"
                            value={kycAnswer && kycAnswer.category}
                            className={classes.disableTextStyle}
                            label="staus"
                            disabled={true}
                            displayEmpty
                          >
                            <MenuItem
                              value={kycAnswer && kycAnswer.category}
                              className={classes.dropdownMenuStyle}
                            >
                              {kycAnswer && kycAnswer.category_name}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      {kycAnswer && kycAnswer.sub_category_name && (
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={4}
                          lg={4}
                          xl={4}
                          className={classes.mainRow}
                        >
                          <Typography className={classes.label} gutterBottom>
                            Subcategories
                          </Typography>
                          <FormControl
                            variant="outlined"
                            className={[classes.field, classes.removeOutline]}
                          >
                            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={
                                kycAnswer &&
                                kycAnswer.category != kycAnswer.sub_category &&
                                kycAnswer.sub_category
                              }
                              label="subCategories"
                              disabled={true}
                              className={classes.disableTextStyle}
                              displayEmpty
                            >
                              <MenuItem
                                value={
                                  kycAnswer &&
                                  kycAnswer.category !=
                                    kycAnswer.sub_category &&
                                  kycAnswer.sub_category
                                }
                                className={classes.dropdownMenuStyle}
                              >
                                {kycAnswer &&
                                  kycAnswer.category !=
                                    kycAnswer.sub_category &&
                                  kycAnswer.sub_category_name}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      )}

                      {kycAnswer && kycAnswer.sub_category_child && (
                        <Grid
                          xs={12}
                          sm={4}
                          md={4}
                          lg={4}
                          xl={4}
                          className={classes.mainRow}
                        >
                          <Typography className={classes.label} gutterBottom>
                            Subchild
                          </Typography>
                          <FormControl
                            variant="outlined"
                            className={[classes.field, classes.removeOutline]}
                          >
                            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={kycAnswer && kycAnswer.sub_category_child}
                              label="subCategories"
                              disabled={true}
                              className={classes.disableTextStyle}
                              displayEmpty
                            >
                              <MenuItem
                                value={
                                  kycAnswer && kycAnswer.sub_category_child
                                }
                                className={classes.dropdownMenuStyle}
                              >
                                {kycAnswer && kycAnswer.sub_category_child_name}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      )}
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      className={classes.mainContainer}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          SP Name
                        </Typography>
                        <TextField
                          type="text"
                          name="sp_name"
                          id="outlined-basic"
                          value={kycAnswer && kycAnswer.user_name}
                          variant="outlined"
                          // onChange={handleChange}
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          category kyc type
                        </Typography>
                        <TextField
                          type="text"
                          name="ss_name"
                          id="outlined-basic"
                          value={kycAnswer && kycAnswer.category_kyc_type}
                          variant="outlined"
                          // onChange={handleChange}
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Staus
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={kycAnswer && kycAnswer.status}
                            name="status"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="status"
                            disabled={true}
                            displayEmpty
                            className={
                              kycAnswer &&
                              kycAnswer.status === "Pending" &&
                              classes.changeColorYellow
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
                            <MenuItem
                              style={{ color: "yellow" }}
                              value={"Pending"}
                            >
                              Pending
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      className={classes.mainContainer}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          Expiration Date
                        </Typography>
                        <TextField
                          type="text"
                          name="booking_id"
                          id="outlined-basic"
                          value={kycAnswer && kycAnswer.expiration_date}
                          variant="outlined"
                          // onChange={handleChange}
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                        />
                      </Grid>
                    </Grid>

                    <Typography className={classes.Title} gutterBottom>
                      Document Details
                    </Typography>
                    {kycAnswer &&
                      kycAnswer.doc_file_type === "Image" &&
                      kycAnswer &&
                      kycAnswer.file_in_cat_kyc_answer.map((res, i) => {
                        return (
                          <Grid
                            container
                            spacing={2}
                            className={classes.bannerContainer}
                          >
                            <Grid items xs={12} sm={6} md={6} lg={6} xl={5}>
                              <img
                                src={`${base_url_auto}${res.answer_url}`}
                                // src={`${res}`}
                                className={classes.bannerAvatar}
                                // style={{ width: "100%", height: "500px" }}
                              />
                            </Grid>
                          </Grid>
                        );
                      })}
                    {kycAnswer &&
                      kycAnswer.doc_file_type === "File" &&
                      kycAnswer &&
                      kycAnswer.file_in_cat_kyc_answer.map((res, i) => {
                        return (
                          <Grid
                            container
                            spacing={2}
                            className={classes.mainContainer}
                          >
                            <Grid
                              items
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                              className={classes.mainRow}
                            >
                              <a href={`${base_url_auto}${res.answer_url}`}>
                                {/* <a href={`${res}`}> */}
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="large"
                                  className={classes.button}
                                >
                                  Download File
                                </Button>
                              </a>
                            </Grid>
                          </Grid>
                        );
                      })}
                    <Grid
                      container
                      spacing={2}
                      className={classes.mainContainer}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={8}
                        lg={8}
                        xl={8}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          Disapproval Reason
                        </Typography>
                        <TextareaAutosize
                          name="reason"
                          aria-label="minimum height"
                          rowsMin={8}
                          value={values.reason}
                          className={classes.textArea}
                          onChange={handleChange}
                        />
                        {errors && errors.reason && touched.reason ? (
                          <div className="error-text">{errors.reason}</div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.button}
                      onClick={handleSubmit}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={handleApprove}
                      className={classes.button}
                    >
                      Approve
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </Form>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = ({ categoryKycData }) => {
  return {
    kycAnswer: categoryKycData.kycAnswer,
  };
};
export default connect(mapStateToProps, {
  getKycAnswerById,
  updateKycAnswerAction,
})(EditKycAnswers);
