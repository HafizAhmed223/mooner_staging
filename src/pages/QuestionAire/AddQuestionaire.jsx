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

import Topbar from "../topbar";
import { useHistory } from "react-router";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import Delete from "../../assets/svg/delete.svg";
import Permissions from "../subAdmin/Permissions";

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

  const [handleFields, setHandleFields] = useState(false);
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
  const [userType, setUserType] = useState("");
  const [userTypeError, setUserTypeError] = useState(false);
  const [count, mycount] = useState(0);
  const [position, setPosition] = useState(0);
  const [positionError, setPositionError] = useState(false);

  const questionTemplete = {
    question_type: "text",
    question_text: "",
    r_text_one: "",
    r_text_two: "",
    r_text_three: "",
    r_text_four: "",
    r_text_five: "",
    r_text_six: "",
  };
  const [questions, setQuestions] = useState([questionTemplete]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    if (userType === "") {
      setUserTypeError(true);
      return;
    }
    if (position === "" || position <= 0) {
      setPositionError(true);
      return;
    }
    const newarr = !subCatagories
      ? questions.map((v) => ({
          ...v,
          user: userData.id,
          question_for: userType,
          parent_category: catagories,
          sub_category_child: subCatagoriesChild ? subCatagoriesChild : "",
          sorting_key: position,
        }))
      : questions.map((v) => ({
          ...v,
          user: userData.id,
          question_for: userType,
          parent_category: catagories,
          sub_category: subCatagories,
          sub_category_child: subCatagoriesChild ? subCatagoriesChild : "",
          sorting_key: position,
        }));
    addQuestion(newarr, history);
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

  const handleChangeUserType = (event) => {
    setUserType(event.target.value);
    setUserTypeError(false);
  };
  const handleChangePostion = (event) => {
    setPosition(event.target.value);
    // setPositionError(false);
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

  const onChange = (e, index) => {
    const updateQuestion = questions.map((question, i) =>
      index == i
        ? Object.assign(question, { [e.target.name]: e.target.value })
        : question
    );
    setQuestions(updateQuestion);
  };

  const addQuestions = () => {
    setQuestions([...questions, questionTemplete]);
  };
  const removeQuestion = (index) => {
    const filterQuestion = [...questions];
    filterQuestion.splice(index, 1);
    setQuestions(filterQuestion);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Container maxWidth="xl">
        <Permissions page="add_categoryquestions" />
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
                      name="userType"
                      value={userType}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="subCategories"
                      className={classes.textStyle}
                      onChange={handleChangeUserType}
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
                  </FormControl>
                  {userTypeError && (
                    <div className="error"> Field is required </div>
                  )}
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
                    <TextField
                      variant="outlined"
                      type="number"
                      onChange={handleChangePostion}
                    />
                  </FormControl>
                  {positionError && (
                    <div className="error">
                      {" "}
                      Please Input a valid position(Greater than 0){" "}
                    </div>
                  )}
                </Grid>
              </Grid>

              {/* Dynamic Form */}

              {questions.map((question, index) => {
                return (
                  <div key={index}>
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
                            name="question_type"
                            value={question.question_type}
                            onChange={(e) => onChange(e, index)}
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
                            <FormControlLabel
                              value="image"
                              control={<Radio />}
                              label="Image"
                            />
                            <FormControlLabel
                              value="file"
                              control={<Radio />}
                              label="File"
                            />
                            <FormControlLabel
                              value="address"
                              control={<Radio />}
                              label="Address"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                    {question.question_type === "text" ||
                    question.question_type === "address" ||
                    question.question_type === "image" ||
                    question.question_type === "file" ? (
                      <Grid container className={classes.mainContainer}>
                        <Grid
                          item
                          xs={12}
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
                            onChange={(e) => onChange(e, index)}
                            name="question_text"
                            value={question.question_text}
                            aria-label="minimum height"
                            rowsMin={8}
                            required={true}
                            maxLength={250}
                            placeholder="questions"
                            className={classes.textArea}
                          />
                        </Grid>
                        {index && index >= 0 ? (
                          <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                            <img
                              src={Delete}
                              style={{ marginTop: "60px", cursor: "pointer" }}
                              onClick={() => removeQuestion(index)}
                            />
                          </Grid>
                        ) : (
                          ""
                        )}
                      </Grid>
                    ) : (
                      ""
                    )}
                    {question.question_type === "radio" && (
                      <>
                        <Grid container className={classes.mainContainer}>
                          <Grid
                            item
                            xs={12}
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
                              onChange={(e) => onChange(e, index)}
                              name="question_text"
                              value={question.question_text}
                              aria-label="minimum height"
                              rowsMin={5}
                              placeholder="questions"
                              required={true}
                              maxLength={250}
                              className={classes.textArea}
                            />
                          </Grid>
                          {index && index >= 0 ? (
                            <Grid item xs={12} sm={2} md={2} lg={2} xl={3}>
                              <img
                                src={Delete}
                                style={{ marginTop: "60px", cursor: "pointer" }}
                                onClick={() => removeQuestion(index)}
                              />
                            </Grid>
                          ) : (
                            ""
                          )}
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
                              onChange={(e) => onChange(e, index)}
                              name="r_text_one"
                              value={question.r_text_one}
                              id="outlined-basic"
                              placeholder="radio 1 text"
                              variant="outlined"
                              required={true}
                              className={[classes.field, classes.removeOutline]}
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
                            <Typography className={classes.label} gutterBottom>
                              Radio 2 Text
                            </Typography>
                            <TextField
                              onChange={(e) => onChange(e, index)}
                              name="r_text_two"
                              value={question.r_text_two}
                              id="outlined-basic"
                              placeholder="radio 2 text"
                              variant="outlined"
                              required={true}
                              className={[classes.field, classes.removeOutline]}
                            />
                            {genralError && (
                              <div className="error-text">
                                {" "}
                                Radio 2 text should be different from Radio 1
                                text{" "}
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
                                onChange={(e) => onChange(e, index)}
                                name="r_text_three"
                                value={question.r_text_three}
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
                                onChange={(e) => onChange(e, index)}
                                name="r_text_four"
                                value={question.r_text_four}
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
                        {count === 4 ? (
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
                                onChange={(e) => onChange(e, index)}
                                name="r_text_five"
                                value={question.r_text_five}
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
                                Radio 6 Text
                              </Typography>
                              <TextField
                                onChange={(e) => onChange(e, index)}
                                name="r_text_six"
                                value={question.r_text_six}
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
                  </div>
                );
              })}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
              >
                Save
              </Button>
              <Button
                onClick={addQuestions}
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
              >
                Add More
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </form>
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
