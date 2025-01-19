import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { connect } from "react-redux";

import Topbar from "../../topbar";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";

import {
  getCategorySpecficKycById,
  getAllCommonKycFor,
  updateSpecificKycAction,
} from "../../../redux/actions/categoryKyc/categoryKyc.actions";
import {
  getAllCategoriesAction,
  getCategoriesByIdAction,
  getSubcategoryChildAction,
} from "../../../redux/actions/category/category.action";
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

const EditSpecficKyc = ({
  getCategorySpecficKycById,
  getAllCategories,
  updateSpecificKycAction,
  getCategoryByIb,
  getSubcategoryChild,
  getAllCommonKycFor,
  specficKycData,
  categoryByIdData,
  sub_Childs,
  categoryData,
  commonQuestions,
}) => {
  const { id } = useParams();
  const classes = MyCustomStyle();
  const [catagories, setCatagories] = useState("");
  const [catagoriesList, setCatagoriesList] = useState([]);
  const [catagoryError, setCategoryError] = useState(false);
  const [subCatagoriesList, setSubCatagoriesList] = useState([]);
  const [subCatagories, setSubCatagories] = useState("");
  const [subCategoryError, setsubCategoryError] = useState(false);
  const [subChildList, setSubChildList] = useState([]);
  const [subCatagoriesChild, setSubCatagoriesChild] = useState("");
  const [subCategoryChildError, setSubcategoryChildError] = useState(false);
  useEffect(() => {
    getCategorySpecficKycById(id);
  }, [id]);
  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getAllCommonKycFor();
  }, []);

  useEffect(() => {
    getCatagories();
  }, [categoryData]);

  useEffect(() => {
    getSubCatagories();
  }, [categoryByIdData]);

  useEffect(() => {
    assignChildToArray();
  }, [sub_Childs]);

  const passInitialValues = () => {
    setCatagories(specficKycData && specficKycData.category);
    setSubCatagories(
      specficKycData &&
        specficKycData.category != specficKycData.sub_category &&
        specficKycData.sub_category != null
        ? specficKycData.sub_category
        : ""
    );
    setSubCatagoriesChild(specficKycData && specficKycData.sub_category_child);
    let formData = new FormData();
    formData.append("tn_parent", specficKycData && specficKycData.category);
    getCategoryByIb(formData);
  };
  const getSubChild = () => {
    if (specficKycData && specficKycData.sub_category) {
      let formData = new FormData();
      formData.append(
        "tn_parent",
        specficKycData && specficKycData.sub_category
      );
      getSubcategoryChild(formData);
    }
  };

  useEffect(() => {
    passInitialValues();
    getSubChild();
  }, [specficKycData]);

  const getCatagories = () => {
    let items = categoryData
      .filter((Allcategories) => Allcategories.behaviour === "Default")
      .map((res, i) => {
        return { value: res.id, label: res.name };
      });
    setCatagoriesList(items && items.length > 0 ? items : "");
  };

  const getSubCatagories = () => {
    let item =
      categoryByIdData &&
      categoryByIdData.map((res, i) => {
        return { value: res.id, label: res.name };
      });
    setSubCatagoriesList(item && item.length > 0 ? item : "");
  };

  const assignChildToArray = () => {
    let item =
      sub_Childs &&
      sub_Childs.map((res, i) => {
        return { value: res.id, label: res.name };
      });
    setSubChildList(item && item.length > 0 ? item : "");
  };

  const handleSubmit = (values) => {
    if (catagories === "") {
      setCategoryError(true);
      return;
    }
    if (subCatagoriesList && subCatagories === "") {
      setsubCategoryError(true);
      return;
    }
    if (subChildList && subCatagoriesChild === "") {
      setSubcategoryChildError(true);
      return;
    }
    const payload = {
      label: values.label,
      category_kyc_type: "Specific",
      doc_file_type: values.file_type,
      doc_type: values.doc_type,
      question_type: values.question_type,
      expiration_date_required: values.expiration_date_required,
      common_questions: values.common_questions,
      category: catagories ? catagories : null,
      sub_category: subCatagories ? subCatagories : null,
      sub_category_child: subCatagoriesChild ? subCatagoriesChild : null,
    };
    //("paload", payload);
    updateSpecificKycAction(payload, id);
  };

  const handleChangeCategories = (event) => {
    setCatagories(event.target.value);
    setCategoryError(false);
    setSubCatagoriesList([]);
    setSubCatagoriesChild("");
    setSubCatagories("");
    let formData = new FormData();
    formData.append("tn_parent", event.target.value);
    getCategoryByIb(formData);
    if (subCatagoriesList.lenght > 0) {
      setSubCatagories(specficKycData && specficKycData.sub_category);
    } else {
      setSubCatagories("");
    }
  };
  const handleChangeSubCategories = (event) => {
    setSubCatagories(event.target.value);
    setsubCategoryError(false);
    setSubChildList([]);
    setSubCatagoriesChild("");
    let formData = new FormData();
    formData.append("tn_parent", event.target.value);
    getSubcategoryChild(formData);
  };
  const handleChangeSubCategoriesChild = (event) => {
    setSubCatagoriesChild(event.target.value);
    setSubcategoryChildError(false);
  };
  //("commonQuestions && commonQuestions.label", specficKycData);
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
          <Permissions page="change_categorykyc" />
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <Topbar
                  module="Category Specific Documents"
                  item="Edit"
                  bckLink="/mooner/details/category_specfic_kyc"
                />
              </Grid>
            </Grid>
            <div className={classes.root}>
              <Typography className={classes.Title} gutterBottom>
                Category Specific Document
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
                          value={catagories}
                          onChange={handleChangeCategories}
                          label="categories"
                          className={classes.textStyle}
                          displayEmpty
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
                          {catagoriesList &&
                            catagoriesList.map((res, index) => (
                              <MenuItem
                                key={index}
                                className={classes.dropdownMenuStyle}
                                value={res.value}
                              >
                                {res.label}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      {catagoryError && (
                        <div className="error"> Field is required </div>
                      )}
                    </Grid>
                    {subCatagoriesList && (
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
                            value={subCatagories}
                            onChange={handleChangeSubCategories}
                            label="subCategories"
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
                            {subCatagoriesList &&
                              subCatagoriesList.map((res, index) => (
                                <MenuItem
                                  key={index}
                                  className={classes.dropdownMenuStyle}
                                  value={res.value}
                                >
                                  {res.label}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                        {subCategoryError && (
                          <div className="error"> Field is required </div>
                        )}
                      </Grid>
                    )}
                    {subChildList && (
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
                            value={subCatagoriesChild}
                            onChange={handleChangeSubCategoriesChild}
                            label="subCategories"
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
                            {subChildList &&
                              subChildList.map((res, index) => (
                                <MenuItem
                                  key={index}
                                  className={classes.dropdownMenuStyle}
                                  value={res.value}
                                >
                                  {res.label}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                        {subCategoryChildError && (
                          <div className="error"> Field is required </div>
                        )}
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
                        inputProps={{ maxLength: 255 }}
                        type="text"
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
                          className={[
                            classes.multipleSelect,
                            classes.removeOutline,
                          ]}
                          onChange={handleChange}
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

const mapStateToProps = ({ categoryKycData, category }) => {
  return {
    specficKycData: categoryKycData.specficKyc,
    commonQuestions: categoryKycData.commonQuestions,
    categoryData: category.data,
    categoryByIdData: category.questionCatagory,
    sub_Childs: category.questionSubCategoryChild,
  };
};
export default connect(mapStateToProps, {
  getCategorySpecficKycById,
  getAllCommonKycFor,
  getAllCategories: getAllCategoriesAction,
  getCategoryByIb: getCategoriesByIdAction,
  getSubcategoryChild: getSubcategoryChildAction,
  updateSpecificKycAction,
})(EditSpecficKyc);
