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
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { connect } from "react-redux";

import Topbar from "../../topbar";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";

import {
  getCategorySpecficKycById,
  getAllCommonKycFor,
} from "../../../redux/actions/categoryKyc/categoryKyc.actions";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useHistory, useParams } from "react-router";
import Permissions from "../../subAdmin/Permissions";

const SpValidationschema = Yup.object().shape({});

const ViewSpecificKyc = ({
  getCategorySpecficKycById,
  getAllCommonKycFor,
  specficKycData,
  commonQuestions,
}) => {
  const history = useHistory();
  const { id } = useParams();
  const classes = MyCustomStyle();

  useEffect(() => {
    getAllCommonKycFor();
  }, []);
  useEffect(() => {
    getCategorySpecficKycById(id);
  }, [id]);

  const handleSubmit = () => {};

  const handleBack = () => {
    history.push("/mooner/details/category_specfic_kyc");
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        label:
          specficKycData && specficKycData.label ? specficKycData.label : "",
        file_type:
          specficKycData && specficKycData.doc_file_type
            ? specficKycData.doc_file_type
            : "",
        question_type:
          specficKycData && specficKycData.question_type
            ? specficKycData.question_type
            : "",
        doc_type:
          specficKycData && specficKycData.doc_type
            ? specficKycData.doc_type
            : "",
        common_questions:
          specficKycData && specficKycData.common_questions
            ? specficKycData.common_questions
            : [],
        expiration_date_required:
          specficKycData &&
          specficKycData.expiration_date_required &&
          specficKycData.expiration_date_required === false
            ? "false"
            : "true",
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
          <Permissions page="view_categorykyc" />
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <Topbar
                  module="Category Specific KYC"
                  item="View"
                  bckLink="/mooner/details/category_specfic_kyc"
                />
              </Grid>
            </Grid>
            <div className={classes.root}>
              <Typography className={classes.Title} gutterBottom>
                Category Specific Documents
              </Typography>
              <Grid container className={classes.mainContainer}>
                <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
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
                          value={specficKycData && specficKycData.category}
                          className={classes.disableTextStyle}
                          label="staus"
                          disabled={true}
                          displayEmpty
                        >
                          <MenuItem
                            value={specficKycData && specficKycData.category}
                            className={classes.dropdownMenuStyle}
                          >
                            {specficKycData && specficKycData.category_name}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {specficKycData && specficKycData.sub_category && (
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
                              specficKycData &&
                              specficKycData.category !=
                                specficKycData.sub_category &&
                              specficKycData.sub_category
                            }
                            label="subCategories"
                            disabled={true}
                            className={classes.disableTextStyle}
                            displayEmpty
                          >
                            <MenuItem
                              value={
                                specficKycData &&
                                specficKycData.category !=
                                  specficKycData.sub_category &&
                                specficKycData.sub_category
                              }
                              className={classes.dropdownMenuStyle}
                            >
                              {specficKycData &&
                                specficKycData.category !=
                                  specficKycData.sub_category &&
                                specficKycData.sub_category_name}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    )}

                    {specficKycData && specficKycData.sub_category_child && (
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
                            value={
                              specficKycData &&
                              specficKycData.sub_category_child
                            }
                            label="subCategories"
                            disabled={true}
                            className={classes.disableTextStyle}
                            displayEmpty
                          >
                            <MenuItem
                              value={
                                specficKycData &&
                                specficKycData.sub_category_child
                              }
                              className={classes.dropdownMenuStyle}
                            >
                              {specficKycData &&
                                specficKycData.sub_category_child_name}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                  </Grid>
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
                        name="label"
                        id="outlined-basic"
                        value={values.label}
                        placeholder="kyc label"
                        variant="outlined"
                        disabled={true}
                        className={[
                          classes.disableField,
                          classes.disableRemoveOutline,
                        ]}
                        // className={[classes.field, classes.removeOutline]}
                      />
                    </Grid>
                  </Grid>
                  {values &&
                  values.common_questions &&
                  values.common_questions.length > 0 ? (
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
                          Current Common Documents
                        </Typography>
                        <TextField
                          classes={{ root: classes.root }}
                          select
                          name="common_questions"
                          id="common_questions"
                          variant="outlined"
                          label=""
                          displayEmpty
                          disabled={true}
                          className={[
                            classes.multipleSelect,
                            classes.disableRemoveOutline,
                          ]}
                          SelectProps={{
                            multiple: true,
                            value: values.common_questions,
                          }}
                        >
                          {commonQuestions &&
                            commonQuestions.length > 0 &&
                            commonQuestions.map((common, i) => {
                              return (
                                <MenuItem value={common.id}>
                                  {common.label}
                                </MenuItem>
                              );
                            })}
                        </TextField>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
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
    specficKycData: categoryKycData.specficKyc,
    commonQuestions: categoryKycData.commonQuestions,
  };
};
export default connect(mapStateToProps, {
  getCategorySpecficKycById,
  getAllCommonKycFor,
})(ViewSpecificKyc);
