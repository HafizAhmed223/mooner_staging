import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  makeStyles,
  TextareaAutosize,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
} from "@material-ui/core";
import { connect } from "react-redux";
import {
  getAllCategoriesAction,
  getCategoriesByIdAction,
  getSubcategoryChildAction,
} from "../../redux/actions/category/category.action";
import { createQuestionAireAction } from "../../redux/actions/questionaire/questionaire.actions";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import Topbar from "../topbar";
import { useHistory } from "react-router";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import { FormatListBulletedTwoTone } from "@material-ui/icons";

const AddQuestionaire = ({
  categoryData,
  loading,
  getAllCategories,
  getCategoryByIb,
  categoryByIdData,
  userData,
  addQuestion,
  getSubcategoryChild,
  subCategoryChilds,
}) => {
  useEffect(() => {
    getAllCategories();
  }, []);
  useEffect(() => {
    getCatagories();
  }, [categoryData]);

  useEffect(() => {
    getSubCatagories();
  }, [categoryByIdData]);

  useEffect(() => {
    getSubcategoryChilds();
  }, [subCategoryChilds]);
  const history = useHistory();
  const classes = MyCustomStyle();
  const [catagories, setCatagories] = useState("");
  const [subCatagories, setSubCatagories] = useState("");
  const [subCatagoriesChild, setSubCatagoriesChild] = useState("");
  const [value, setValue] = useState("text");
  const [catagoriesList, setCatagoriesList] = useState([]);
  const [subCatagoriesList, setSubCatagoriesList] = useState([]);
  const [subChildList, setSubChildList] = useState([]);
  const [catagoryError, setCategoryError] = useState(false);
  const [subCategoryError, setsubCategoryError] = useState(false);
  const [genralError, setGenralError] = useState(false);
  const [subCategoryChildError, setSubcategoryChildError] = useState(false);

  // *  Yup Validation Schema ////////

  const TypevalidationSchema = Yup.object().shape({
    response: Yup.string()
      .max(250, "Question length should be less then 250 characters")
      .required("* response is required"),
    rOneText: Yup.string().required("* Field is required"),
    rTwoText: Yup.string().required("* Field is required"),
    userType: Yup.string().required("* Field is required"),
  });
  const simpleValidationSchema = Yup.object().shape({
    question: Yup.string()
      .max(250, "Question length should be less then 250 characters")
      .required("* question is required"),
    userType: Yup.string().required("* Field is required"),
  });
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
    if (
      value === "radio" &&
      values.rTwoText.toLowerCase() === values.rOneText.toLowerCase()
    ) {
      setGenralError(true);
      return;
    }
    if (value === "text") {
      let formData = new FormData();
      formData.append("user", userData.id);
      formData.append("parent_category", catagories);
      formData.append(
        "sub_category",
        !subCatagories ? catagories : subCatagories
      );
      formData.append(
        "sub_category_child",
        subCatagoriesChild ? subCatagoriesChild : ""
      );
      formData.append("question_for", values.userType);
      formData.append("question_type", value);
      formData.append("question_text", values.question);
      formData.append("r_text_one", values.rOneText);
      formData.append("r_text_two", values.rTwoText);
      addQuestion(formData, history);
    } else {
      let formData = new FormData();
      formData.append("user", userData.id);
      formData.append("parent_category", catagories);
      formData.append(
        "sub_category",
        !subCatagories ? catagories : subCatagories
      );
      formData.append(
        "sub_category_child",
        subCatagoriesChild ? subCatagoriesChild : ""
      );
      formData.append("question_for", values.userType);
      formData.append("question_type", value);
      formData.append("question_text", values.response);
      formData.append("r_text_one", values.rOneText);
      formData.append("r_text_two", values.rTwoText);
      addQuestion(formData, history);
    }
    // formik.resetForm(values);
  };

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

  const getSubcategoryChilds = () => {
    let item =
      subCategoryChilds &&
      subCategoryChilds.map((res, i) => {
        return { value: res.id, label: res.name };
      });
    setSubChildList(item && item.length > 0 ? item : "");
  };

  const handleChangeType = (event) => {
    setValue(event.target.value);
  };
  const handleChangeCategories = (event) => {
    setCatagories(event.target.value);
    setSubCatagoriesList([]);
    setSubCatagoriesChild("");
    setSubCatagories("");
    setCategoryError(false);
    let formData = new FormData();
    formData.append("tn_parent", event.target.value);
    getCategoryByIb(formData);
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

  const handleSubCategoriesChilds = (event) => {
    setSubCatagoriesChild(event.target.value);
    setSubcategoryChildError(false);
  };
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Questionnaire"
              item="Create"
              bckLink="/mooner/details/questionaire"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Questionnaire
          </Typography>
          <Grid container className={classes.mainContainer}>
            <Grid xs={12}>
              <Formik
                initialValues={{
                  question: "",
                  response: "",
                  rOneText: "",
                  rTwoText: "",
                  userType: "",
                }}
                validationSchema={
                  value === "text"
                    ? simpleValidationSchema
                    : TypevalidationSchema
                }
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
                      {subCatagoriesList && subCatagoriesList.length > 0 && (
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
                      {/* ? subCategoryChild Select */}
                      {subChildList && subChildList.length > 0 && (
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
                              onChange={handleSubCategoriesChilds}
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
                      {/* //? End------------// */}
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Select Type
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.userType}
                            name="userType"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
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
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"seeker"}
                            >
                              Service Seeker
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"provider"}
                            >
                              Service Provider
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"business"}
                            >
                              Business
                            </MenuItem>
                          </Select>
                          {errors.userType && touched.userType ? (
                            <div
                              className="error-text"
                              style={{ marginTop: "10px" }}
                            >
                              {errors.userType}
                            </div>
                          ) : null}
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={8}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.subtitle}>
                          {" "}
                          Questionnaire Type{" "}
                        </Typography>
                        <FormControl component="fieldset">
                          <RadioGroup
                            className={classes.typeContainer}
                            aria-label="type"
                            name="type"
                            value={value}
                            onChange={handleChangeType}
                          >
                            <FormControlLabel
                              value="text"
                              control={<Radio />}
                              label="Text"
                            />
                            <FormControlLabel
                              value="radio"
                              control={<Radio />}
                              label="Input"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                    {value === "text" && (
                      <Grid container className={classes.mainContainer}>
                        <Grid
                          item
                          xs={11}
                          sm={10}
                          md={10}
                          lg={8}
                          xl={8}
                          className={classes.mainRow}
                        >
                          <Typography className={classes.label} gutterBottom>
                            Questions
                          </Typography>
                          <TextareaAutosize
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.question}
                            name="question"
                            aria-label="minimum height"
                            rowsMin={8}
                            placeholder="questions"
                            className={classes.textArea}
                          />
                          {errors.question && touched.question ? (
                            <div className="error-text">{errors.question}</div>
                          ) : null}
                        </Grid>
                      </Grid>
                    )}
                    {value === "radio" && (
                      <>
                        <Grid container className={classes.mainContainer}>
                          <Grid
                            item
                            xs={11}
                            sm={10}
                            md={10}
                            lg={8}
                            xl={8}
                            className={classes.mainRow}
                          >
                            <Typography className={classes.label} gutterBottom>
                              Response
                            </Typography>
                            <TextareaAutosize
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.response}
                              name="response"
                              aria-label="minimum height"
                              rowsMin={5}
                              placeholder="questions"
                              className={classes.textArea}
                            />
                            {errors.response && touched.response ? (
                              <div className="error-text">
                                {errors.response}
                              </div>
                            ) : null}
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          className={classes.mainContainer}
                          style={{ marginTop: "20px" }}
                        >
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
                              Radio 1 Text
                            </Typography>
                            <TextField
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.rOneText}
                              name="rOneText"
                              id="outlined-basic"
                              placeholder="radio 2 text"
                              variant="outlined"
                              className={[classes.field, classes.removeOutline]}
                            />
                            {errors.rOneText && touched.rOneText ? (
                              <div className="error-text">
                                {errors.rOneText}
                              </div>
                            ) : null}
                          </Grid>
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
                              Radio 2 Text
                            </Typography>
                            <TextField
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.rTwoText}
                              name="rTwoText"
                              id="outlined-basic"
                              placeholder="radio 2 text"
                              variant="outlined"
                              className={[classes.field, classes.removeOutline]}
                            />
                            {errors.rTwoText && touched.rTwoText ? (
                              <div className="error-text">
                                {errors.rTwoText}
                              </div>
                            ) : null}
                            {genralError && (
                              <div className="error-text">
                                {" "}
                                Radio 2 text should be different from Radio 1
                                text{" "}
                              </div>
                            )}
                          </Grid>
                        </Grid>
                      </>
                    )}
                    <Button
                      onClick={handleSubmit}
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

const mapStateToProps = ({ category, auth }) => {
  return {
    userData: auth.user,
    categoryByIdData: category.questionCatagory,
    categoryData: category.data,
    subCategoryChilds: category.questionSubCategoryChild,
    loading: category.loading,
  };
};
export default connect(mapStateToProps, {
  getAllCategories: getAllCategoriesAction,
  getCategoryByIb: getCategoriesByIdAction,
  addQuestion: createQuestionAireAction,
  getSubcategoryChild: getSubcategoryChildAction,
})(AddQuestionaire);
