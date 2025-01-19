import React, { useState, useEffect } from "react";
import axios from "axios";
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
import {
  getQuestionAireByIdAction,
  updateeQuestionAireAction,
} from "../../redux/actions/questionaire/questionaire.actions";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import Topbar from "../topbar";
import { useHistory } from "react-router";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import CommonCard from "../../common/CommonCard";
import { baseURL } from "../../api";
import Permissions from "../subAdmin/Permissions";

const EditQuestionAire = ({
  categoryData,
  loading,
  getAllCategories,
  getCategoryByIb,
  categoryByIdData,
  userData,
  getQById,
  questionByIdData,
  updateQuestion,
  getSubcategoryChild,
  sub_Childs,
}) => {
  const history = useHistory();
  // const [id,setId]=useState()
  const getIdFromParams = () => {
    const { location } = history;
    const { pathname } = location;
    let name = pathname;
    let nameArr = name.split("/");
    let questionaireId = nameArr[nameArr.length - 1];
    const res = getQById(questionaireId);
    // setId(questionaireId)
    getAllQuestions(questionaireId);
  };
  // //('id', id)
  const passInitialValues = () => {
    setHandleFields(
      questionByIdData && questionByIdData.r_text_three ? true : false
    );
    setRth(
      questionByIdData && questionByIdData.r_text_three
        ? questionByIdData.r_text_three
        : ""
    );

    setRf(
      questionByIdData && questionByIdData.r_text_four
        ? questionByIdData.r_text_four
        : ""
    );
    mycount(
      questionByIdData && questionByIdData.r_text_five
        ? 4
        : questionByIdData && questionByIdData.r_text_three
        ? 2
        : 0
    );

    setValue(
      questionByIdData && questionByIdData.question_type
        ? questionByIdData.question_type
        : "text"
    );
    setCatagories(questionByIdData && questionByIdData.parent_category);
    setSubCatagories(
      questionByIdData &&
        questionByIdData.parent_category != questionByIdData.sub_category &&
        questionByIdData.sub_category != null
        ? questionByIdData.sub_category
        : ""
    );
    setSubCatagoriesChild(
      questionByIdData && questionByIdData.sub_category_child
    );
    let formData = new FormData();
    formData.append(
      "tn_parent",
      questionByIdData && questionByIdData.parent_category
    );
    getCategoryByIb(formData);
  };
  const getSubChild = () => {
    if (questionByIdData && questionByIdData.sub_category) {
      let formData = new FormData();
      formData.append(
        "tn_parent",
        questionByIdData && questionByIdData.sub_category
      );
      getSubcategoryChild(formData);
    }
  };
  const token = localStorage.getItem("authToken");

  const getAllQuestions = async (id) => {
    try {
      const dataArr = await axios.get(
        `${baseURL}category_management/updateQuestions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      //("sorting_key", dataArr.data.sorting_key);
      setData(dataArr.data.sorting_key);
    } catch (err) {
      //("err", err);
    }
  };
  useEffect(() => {
    getIdFromParams();
    getAllCategories();
    // getAllQuestions();
  }, []);
  useEffect(() => {
    passInitialValues();
    getSubChild();
  }, [questionByIdData]);
  useEffect(() => {
    getCatagories();
  }, [categoryData]);

  useEffect(() => {
    getSubCatagories();
  }, [categoryByIdData]);

  useEffect(() => {
    assignChildToArray();
  }, [sub_Childs]);

  const classes = MyCustomStyle();

  const [catagories, setCatagories] = useState("");
  const [handleFields, setHandleFields] = useState(false);
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
  const [r_text_three, setRth] = useState("");
  const [r_text_four, setRf] = useState("");
  const [count, mycount] = useState(0);
  const [data, setData] = useState();
  const [position, setPosition] = useState();
  const [positionError, setPositionError] = useState(false);

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
      .max(250, "Question lenght should be less then 250 characters")
      .required("* question is required"),
    userType: Yup.string().required("* Field is required"),
  });
  const handleSubmit = (values) => {
    //("values", values);
    if (catagories === "") {
      setCategoryError(true);
      return;
    }
    if (position === "") {
      setPositionError(true);
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
    if (value === "text" || value === "address") {
      const id = questionByIdData && questionByIdData.id;
      let formData = new FormData();
      formData.append("user", userData.id);
      formData.append("parent_category", catagories);
      formData.append("sub_category", subCatagories ? subCatagories : "");
      formData.append(
        "sub_category_child",
        subCatagoriesChild ? subCatagoriesChild : ""
      );
      formData.append("question_for", values.userType);
      formData.append("question_type", value);
      formData.append("question_text", values.question);
      formData.append("r_text_one", "");
      formData.append("r_text_two", "");
      formData.append("r_text_three", "");
      formData.append("r_text_four", "");
      formData.append("r_text_five", "");
      formData.append("r_text_six", "");
      formData.append("sorting_key", position || data);
      updateQuestion(formData, id, history);
    }
    if (value === "image") {
      const id = questionByIdData && questionByIdData.id;
      let formData = new FormData();
      formData.append("user", userData.id);
      formData.append("parent_category", catagories);
      formData.append("sub_category", subCatagories ? subCatagories : "");
      formData.append(
        "sub_category_child",
        subCatagoriesChild ? subCatagoriesChild : ""
      );
      formData.append("question_for", values.userType);
      formData.append("question_type", value);
      formData.append("question_text", values.question);
      formData.append("r_text_one", "");
      formData.append("r_text_two", "");
      formData.append("r_text_three", "");
      formData.append("r_text_four", "");
      formData.append("r_text_five", "");
      formData.append("r_text_six", "");
      formData.append("sorting_key", position || data);
      updateQuestion(formData, id, history);
    }
    if (value === "file") {
      const id = questionByIdData && questionByIdData.id;
      let formData = new FormData();
      formData.append("user", userData.id);
      formData.append("parent_category", catagories);
      formData.append("sub_category", subCatagories ? subCatagories : "");
      formData.append(
        "sub_category_child",
        subCatagoriesChild ? subCatagoriesChild : ""
      );
      formData.append("question_for", values.userType);
      formData.append("question_type", value);
      formData.append("question_text", values.question);
      formData.append("r_text_one", "");
      formData.append("r_text_two", "");
      formData.append("r_text_three", "");
      formData.append("r_text_four", "");
      formData.append("r_text_five", "");
      formData.append("r_text_six", "");
      formData.append("sorting_key", position || data);
      updateQuestion(formData, id, history);
    }
    if (value === "radio") {
      const id = questionByIdData && questionByIdData.id;
      let formData = new FormData();
      formData.append("user", userData.id);
      formData.append("parent_category", catagories);
      formData.append("sub_category", subCatagories ? subCatagories : "");
      formData.append(
        "sub_category_child",
        subCatagoriesChild ? subCatagoriesChild : ""
      );
      formData.append("question_for", values.userType);
      formData.append("question_type", value);
      formData.append("question_text", values.response);
      formData.append("r_text_one", values.rOneText);
      formData.append("r_text_two", values.rTwoText);
      formData.append(
        "r_text_three",
        count === 2 || count === 4 ? r_text_three : ""
      );
      formData.append(
        "r_text_four",
        count === 2 || count === 4 ? r_text_four : ""
      );
      formData.append("r_text_five", count === 4 ? values.rFiveText : "");
      formData.append("r_text_six", count === 4 ? values.rSixText : "");
      formData.append("sorting_key", position || data);
      updateQuestion(formData, id, history);
    }
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

  const assignChildToArray = () => {
    let item =
      sub_Childs &&
      sub_Childs.map((res, i) => {
        return { value: res.id, label: res.name };
      });
    setSubChildList(item && item.length > 0 ? item : "");
  };

  const handleChangeType = (event) => {
    setValue(event.target.value);
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
      setSubCatagories(questionByIdData.sub_category);
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
  const handleChangePostion = (e) => {
    const val = parseInt(e.target.value);
    setPosition(Math.abs(val));
    // //( Math.abs(val));
    setPositionError(false);
  };

  // const handleRemove = () => {
  //   setHandleFields(false);
  // }

  // const handleAdd = () => {
  //   setHandleFields(true);
  // }

  const handleChangeRT = (e) => {
    setRth(e.target.value);
  };

  const handleChangeRF = (e) => {
    setRf(e.target.value);
  };

  const handleRemove = () => {
    if (count === 0) {
      return;
    } else {
      mycount(count - 2);
    }
    // setHandleFields(false);
  };

  const handleAdd = () => {
    if (count === 4) {
      return;
    } else {
      mycount(count + 2);
    }
    // setHandleFields(true);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="change_categoryquestions" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Questionnaire"
              item="Edit"
              bckLink="/mooner/details/questionaire"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Questionnaire
          </Typography>
          <Grid container className={classes.mainContainer}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={10}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  question: questionByIdData
                    ? questionByIdData.question_text
                    : "",
                  response:
                    questionByIdData &&
                    questionByIdData.question_type === "radio"
                      ? questionByIdData.question_text
                      : "",
                  rOneText:
                    questionByIdData &&
                    questionByIdData.question_type === "radio"
                      ? questionByIdData.r_text_one
                      : "",
                  rTwoText:
                    questionByIdData &&
                    questionByIdData.question_type === "radio"
                      ? questionByIdData.r_text_two
                      : "",

                  rFiveText:
                    questionByIdData &&
                    questionByIdData.question_type === "radio"
                      ? questionByIdData.r_text_five
                      : "",

                  rSixText:
                    questionByIdData &&
                    questionByIdData.question_type === "radio"
                      ? questionByIdData.r_text_six
                      : "",

                  userType: questionByIdData
                    ? questionByIdData.question_for
                    : "",
                }}
                validationSchema={
                  value === "text" ||
                  value === "image" ||
                  value === "file" ||
                  value === "address"
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
                            disabled={true}
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
                              disabled={true}
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
                              disabled={true}
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
                            disabled={true}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.userType}
                            name="userType"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="subCategories"
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
                        sm={8}
                        md={5}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Position
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          {data != null && (
                            <TextField
                              variant="outlined"
                              type="number"
                              value={position}
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                              defaultValue={data}
                              onChange={handleChangePostion}
                            />
                          )}
                        </FormControl>
                        {positionError && (
                          <div className="error">
                            {" "}
                            Please Input a valid position{" "}
                          </div>
                        )}
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
                            value={value != undefined ? value : "text"}
                            onChange={handleChangeType}
                          >
                            <FormControlLabel
                              disabled={true}
                              value="text"
                              control={<Radio />}
                              label="Text"
                            />
                            <FormControlLabel
                              disabled={true}
                              value="radio"
                              control={<Radio />}
                              label="Input"
                            />
                            <FormControlLabel
                              disabled={true}
                              value="image"
                              control={<Radio />}
                              label="Image"
                            />
                            <FormControlLabel
                              disabled={true}
                              value="file"
                              control={<Radio />}
                              label="File"
                            />
                            <FormControlLabel
                              disabled={true}
                              value="address"
                              control={<Radio />}
                              label="Address"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                    {value === "text" ||
                    value === "file" ||
                    value === "address" ||
                    value === "image" ? (
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
                    ) : (
                      ""
                    )}
                    {value === "radio" && (
                      <>
                        <Grid
                          container
                          spacing={2}
                          className={classes.mainContainer}
                        >
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
                              rowsMin={8}
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
                            sm={5}
                            md={5}
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
                              placeholder="radio 1 text"
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
                            sm={5}
                            md={5}
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
                                Text must be Different
                              </div>
                            )}
                          </Grid>
                        </Grid>
                        {count === 2 || count === 4 ? (
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
                              <Typography
                                className={classes.label}
                                gutterBottom
                              >
                                Radio 3 Text
                              </Typography>
                              <TextField
                                onChange={handleChangeRT}
                                value={r_text_three}
                                name="r_text_three"
                                id="outlined-basic"
                                placeholder="radio 3 text"
                                variant="outlined"
                                className={[
                                  classes.field,
                                  classes.removeOutline,
                                ]}
                              />
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
                              <Typography
                                className={classes.label}
                                gutterBottom
                              >
                                Radio 4 Text
                              </Typography>
                              <TextField
                                onChange={handleChangeRF}
                                value={r_text_four}
                                name="r_text_four"
                                id="outlined-basic"
                                placeholder="radio 4 text"
                                variant="outlined"
                                className={[
                                  classes.field,
                                  classes.removeOutline,
                                ]}
                              />
                            </Grid>
                          </Grid>
                        ) : (
                          <></>
                        )}
                        {count === 4 && (
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
                              <Typography
                                className={classes.label}
                                gutterBottom
                              >
                                Radio 5 Text
                              </Typography>
                              <TextField
                                onChange={handleChange}
                                value={values.rFiveText}
                                name="rFiveText"
                                id="outlined-basic"
                                placeholder="radio 6 text"
                                variant="outlined"
                                className={[
                                  classes.field,
                                  classes.removeOutline,
                                ]}
                              />
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
                              <Typography
                                className={classes.label}
                                gutterBottom
                              >
                                Radio 6 Text
                              </Typography>
                              <TextField
                                onChange={handleChange}
                                value={values.rSixText}
                                name="rSixText"
                                id="outlined-basic"
                                placeholder="radio 6 text"
                                variant="outlined"
                                className={[
                                  classes.field,
                                  classes.removeOutline,
                                ]}
                              />
                            </Grid>
                          </Grid>
                        )}
                        <Grid container className={classes.mainContainer}>
                          <Grid
                            item
                            xs={12}
                            sm={8}
                            md={8}
                            lg={8}
                            xl={8}
                            className={classes.mainRow}
                          >
                            <div className={classes.optionhandler}>
                              <div
                                className={
                                  count === 0
                                    ? classes.disableAddBtn
                                    : classes.remove
                                }
                                onClick={handleRemove}
                              >
                                -
                              </div>
                              <div
                                className={
                                  count === 4
                                    ? classes.disableAddBtn
                                    : classes.add
                                }
                                onClick={handleAdd}
                              >
                                +
                              </div>
                            </div>
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
            <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
              <CommonCard
                message="Create Question"
                btnText="Add"
                link="/mooner/add_questionaire"
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = ({ category, categoryById, auth, questionaire }) => {
  return {
    userData: auth.user,
    questionByIdData: questionaire.QById,
    categoryByIdData: category.questionCatagory,
    sub_Childs: category.questionSubCategoryChild,
    categoryData: category.data,
    loading: category.loading,
  };
};
export default connect(mapStateToProps, {
  getAllCategories: getAllCategoriesAction,
  getCategoryByIb: getCategoriesByIdAction,
  getQById: getQuestionAireByIdAction,
  getSubcategoryChild: getSubcategoryChildAction,
  updateQuestion: updateeQuestionAireAction,
})(EditQuestionAire);
