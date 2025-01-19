import React, { useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { connect } from "react-redux";

import Topbar from "../../topbar";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";

import { getCommonKycById } from "../../../redux/actions/categoryKyc/categoryKyc.actions";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useHistory, useParams } from "react-router";
import Permissions from "../../subAdmin/Permissions";

const SpValidationschema = Yup.object().shape({});

const ViewCommonKyc = ({ getCommonKycById, commonKycData }) => {
  const history = useHistory();
  const { id } = useParams();
  const classes = MyCustomStyle();

  useEffect(() => {
    getCommonKycById(id);
  }, [id]);

  const handleSubmit = () => {};

  const handleBack = () => {
    history.push("/mooner/details/common_category_kyc");
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        label: commonKycData && commonKycData.label ? commonKycData.label : "",
        file_type:
          commonKycData && commonKycData.doc_file_type
            ? commonKycData.doc_file_type
            : "",
        question_type:
          commonKycData && commonKycData.question_type
            ? commonKycData.question_type
            : "",
        doc_type:
          commonKycData && commonKycData.doc_type ? commonKycData.doc_type : "",
        expiration_date_required:
          commonKycData &&
          commonKycData.expiration_date_required &&
          commonKycData.expiration_date_required === true
            ? "true"
            : "false",
      }}
      validationSchema={SpValidationschema}
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
            <Permissions page="view_categorykyc" />
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <Topbar
                  module="Common Category KYC"
                  item="View"
                  bckLink="/mooner/details/common_category_kyc"
                />
              </Grid>
            </Grid>
            <div className={classes.root}>
              <Typography className={classes.Title} gutterBottom>
                Common Documents
              </Typography>
              <Grid container className={classes.mainContainer}>
                <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid container className={classes.mainContainer}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      xl={4}
                      className={classes.mainRow}
                    >
                      <Typography className={classes.label} gutterBottom>
                        Label
                      </Typography>
                      <TextField
                        type="text"
                        // maxRows={5}
                        // style={{
                        //   width: "100%",
                        //   border: "0px",
                        //   backgroundColor: "#fff",
                        //   cursor: "not-allowed",
                        //   borderRadius: "20px",
                        //   font: "inherit",
                        //   padding: "18.5px 14px",
                        // }}
                        name="label"
                        id="outlined-basic"
                        value={values.label}
                        placeholder="kyc label"
                        variant="outlined"
                        disabled={true}
                        className={[
                          // blockTextArea
                          classes.disableField,
                          classes.disableRemoveOutline,
                        ]}
                        // className={[classes.field, classes.removeOutline]}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.mainContainer}>
                    <Grid
                      item
                      xs={11}
                      sm={6}
                      md={6}
                      lg={8}
                      xl={4}
                      className={classes.mainRow}
                    >
                      <Typography className={classes.subtitle}>
                        {" "}
                        File type{" "}
                      </Typography>
                      <FormControl component="fieldset">
                        <RadioGroup
                          className={classes.typeContainer}
                          value={values.file_type}
                          aria-label="type"
                          name="file_type"
                        >
                          <FormControlLabel
                            value="Image"
                            disabled={true}
                            control={<Radio />}
                            label="Image"
                          />
                          <FormControlLabel
                            value="File"
                            disabled={true}
                            control={<Radio />}
                            label="File"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.mainContainer}>
                    <Grid
                      item
                      xs={11}
                      sm={6}
                      md={6}
                      lg={8}
                      xl={4}
                      className={classes.mainRow}
                    >
                      <Typography className={classes.subtitle}>
                        {" "}
                        Expiration Date{" "}
                      </Typography>
                      <FormControl component="fieldset">
                        <RadioGroup
                          className={classes.typeContainer}
                          aria-label="type"
                          name="expiration_date_required"
                          value={values.expiration_date_required}
                        >
                          <FormControlLabel
                            value="false"
                            disabled={true}
                            control={<Radio />}
                            label="Not Required"
                          />
                          <FormControlLabel
                            value="true"
                            disabled={true}
                            control={<Radio />}
                            label="Required"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.mainContainer}>
                    <Grid
                      item
                      xs={11}
                      sm={6}
                      md={6}
                      lg={8}
                      xl={4}
                      className={classes.mainRow}
                    >
                      <Typography className={classes.subtitle}>
                        {" "}
                        Question type{" "}
                      </Typography>
                      <FormControl component="fieldset">
                        <RadioGroup
                          className={classes.typeContainer}
                          aria-label="type"
                          name="question_type"
                          value={values.question_type}
                        >
                          <FormControlLabel
                            value="Mandatory"
                            disabled={true}
                            control={<Radio />}
                            label="Mandatory"
                          />
                          <FormControlLabel
                            value="Optional"
                            disabled={true}
                            control={<Radio />}
                            label="Optional"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.mainContainer}>
                    <Grid
                      item
                      xs={11}
                      sm={6}
                      md={6}
                      lg={8}
                      xl={4}
                      className={classes.mainRow}
                    >
                      <Typography className={classes.subtitle}>
                        {" "}
                        Documents type{" "}
                      </Typography>
                      <FormControl component="fieldset">
                        <RadioGroup
                          className={classes.typeContainer}
                          aria-label="type"
                          name="doc_type"
                          value={values.doc_type}
                        >
                          <FormControlLabel
                            value="Private"
                            disabled={true}
                            control={<Radio />}
                            label="Private"
                          />
                          <FormControlLabel
                            value="Public"
                            disabled={true}
                            control={<Radio />}
                            label="Public"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Button
                  onClick={handleBack}
                  variant="contained"
                  color="secondary"
                  size="large"
                  className={classes.button}
                >
                  Back
                </Button>
              </Grid>
            </div>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ categoryKycData }) => {
  return {
    commonKycData: categoryKycData.commonKyc,
  };
};
export default connect(mapStateToProps, {
  getCommonKycById,
})(ViewCommonKyc);
