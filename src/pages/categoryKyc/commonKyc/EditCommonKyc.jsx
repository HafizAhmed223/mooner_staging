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
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import { connect } from "react-redux";

import Topbar from "../../topbar";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";

import {
  getCommonKycById,
  updateCommonKycAction,
} from "../../../redux/actions/categoryKyc/categoryKyc.actions";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useHistory, useParams } from "react-router";
import Permissions from "../../subAdmin/Permissions";

const SpValidationschema = Yup.object().shape({
  label: Yup.string().required("* Field is required"),
  file_type: Yup.string().required("* Field is required"),
  question_type: Yup.string().required("* Field is required"),
  doc_type: Yup.string().required("* Field is required"),
});

const EditCommonKyc = ({
  getCommonKycById,
  commonKycData,
  updateCommonKycAction,
}) => {
  const { id } = useParams();
  const classes = MyCustomStyle();

  useEffect(() => {
    getCommonKycById(id);
  }, [id]);

  const handleSubmit = (values) => {
    const payload = {
      label: values.label,
      category_kyc_type: "Common",
      doc_file_type: values.file_type,
      doc_type: values.doc_type,
      question_type: values.question_type,
      expiration_date_required: values.expiration_date_required,
    };
    //("paload", payload);
    updateCommonKycAction(payload, id);
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
            <Permissions page="change_categorykyc" />
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <Topbar
                  module="Common Category KYC"
                  item="Edit"
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
                        inputProps={{ maxLength: 255 }}
                        name="label"
                        id="outlined-basic"
                        value={values.label}
                        placeholder="kyc label"
                        variant="outlined"
                        onChange={handleChange}
                        className={[classes.field, classes.removeOutline]}
                      />
                      {errors.label && touched.label ? (
                        <div className="error-text">{errors.label}</div>
                      ) : null}
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
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="Image"
                            control={<Radio />}
                            label="Image"
                          />
                          <FormControlLabel
                            value="File"
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
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="Not Required"
                          />
                          <FormControlLabel
                            value="true"
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
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="Mandatory"
                            control={<Radio />}
                            label="Mandatory"
                          />
                          <FormControlLabel
                            value="Optional"
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
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="Private"
                            control={<Radio />}
                            label="Private"
                          />
                          <FormControlLabel
                            value="Public"
                            control={<Radio />}
                            label="Public"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
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
  updateCommonKycAction,
})(EditCommonKyc);
