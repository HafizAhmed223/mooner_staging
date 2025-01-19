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

import Topbar from "../topbar";
import CommonCard from "../../common/CommonCard";
import { useHistory } from "react-router";
import queryString from "query-string";
import { connect } from "react-redux";
import { getQuestionAireByIdAction } from "../../redux/actions/questionaire/questionaire.actions";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import Permissions from "../subAdmin/Permissions";

// import Logo from "../../assets/svg/logo.svg"

const ViewQuestionaire = ({ getQById, questionByIdData }) => {
  const history = useHistory();
  const getIdFromParams = () => {
    const { location } = history;
    const { pathname } = location;
    let name = pathname;
    let nameArr = name.split("/");
    let questionaireId = nameArr[nameArr.length - 1];
    getQById(questionaireId);
  };
  useEffect(() => {
    getIdFromParams();
  }, []);

  const classes = MyCustomStyle();
  const handleBack = () => {
    history.push("/mooner/details/questionaire");
  };
  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="view_categoryquestions" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Questionnaire"
              item="View"
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
              {/* <form className={classes.form} noValidate autoComplete="off"> */}
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
                      value={
                        questionByIdData && questionByIdData.parent_category
                      }
                      className={classes.disableTextStyle}
                      label="staus"
                      disabled={true}
                      displayEmpty
                    >
                      <MenuItem
                        value={
                          questionByIdData && questionByIdData.parent_category
                        }
                        className={classes.dropdownMenuStyle}
                      >
                        {questionByIdData &&
                          questionByIdData.parent_category_name}
                      </MenuItem>
                    </Select>
                  </FormControl>
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
                        questionByIdData &&
                        questionByIdData.parent_category !=
                          questionByIdData.sub_category &&
                        questionByIdData.sub_category
                      }
                      label="subCategories"
                      disabled={true}
                      className={classes.disableTextStyle}
                      displayEmpty
                    >
                      <MenuItem
                        value={
                          questionByIdData &&
                          questionByIdData.parent_category !=
                            questionByIdData.sub_category &&
                          questionByIdData.sub_category
                        }
                        className={classes.dropdownMenuStyle}
                      >
                        {questionByIdData &&
                          questionByIdData.parent_category !=
                            questionByIdData.sub_category &&
                          questionByIdData.sub_category_name}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {questionByIdData && questionByIdData.sub_category_child && (
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
                          questionByIdData &&
                          questionByIdData.sub_category_child
                        }
                        label="subCategories"
                        disabled={true}
                        className={classes.disableTextStyle}
                        displayEmpty
                      >
                        <MenuItem
                          value={
                            questionByIdData &&
                            questionByIdData.sub_category_child
                          }
                          className={classes.dropdownMenuStyle}
                        >
                          {questionByIdData && questionByIdData.sub_child_name}
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
                      value={questionByIdData && questionByIdData.question_for}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="subCategories"
                      className={classes.disableTextStyle}
                      disabled={true}
                      displayEmpty
                    >
                      <MenuItem
                        value={
                          questionByIdData && questionByIdData.question_for
                        }
                        className={classes.dropdownMenuStyle}
                      >
                        {questionByIdData && questionByIdData.question_for}
                      </MenuItem>
                    </Select>
                  </FormControl>
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
                    Position
                  </Typography>
                  <TextField
                    value={questionByIdData && questionByIdData?.sorting_key}
                    id="outlined-basic"
                    placeholder="Position"
                    variant="outlined"
                    className={[
                      classes.disableField,
                      classes.disableRemoveOutline,
                    ]}
                    disabled={true}
                  />
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
                      value={questionByIdData && questionByIdData.question_type}
                    >
                      <FormControlLabel
                        value="text"
                        disabled={true}
                        control={<Radio />}
                        label="Text"
                      />
                      <FormControlLabel
                        value="radio"
                        disabled={true}
                        control={<Radio />}
                        label="Input"
                      />
                      <FormControlLabel
                        value="image"
                        disabled={true}
                        control={<Radio />}
                        label="Image"
                      />
                      <FormControlLabel
                        value="file"
                        disabled={true}
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

              {(questionByIdData &&
                questionByIdData.question_type === "text") ||
              questionByIdData.question_type === "file" ||
              questionByIdData.question_type === "image" ||
              questionByIdData.question_type === "address" ? (
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
                      value={
                        questionByIdData ? questionByIdData.question_text : ""
                      }
                      aria-label="minimum height"
                      rowsMin={8}
                      placeholder="questions"
                      className={classes.blockTextArea}
                      disabled={true}
                    />
                  </Grid>
                </Grid>
              ) : (
                ""
              )}
              {questionByIdData && questionByIdData.question_type === "radio" && (
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
                        value={
                          questionByIdData &&
                          questionByIdData.question_type === "radio"
                            ? questionByIdData.question_text
                            : ""
                        }
                        aria-label="minimum height"
                        rowsMin={5}
                        placeholder="questions"
                        className={classes.blockTextArea}
                        disabled={true}
                      />
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
                        value={questionByIdData && questionByIdData.r_text_one}
                        id="outlined-basic"
                        placeholder="Yes/No"
                        variant="outlined"
                        className={[
                          classes.disableField,
                          classes.disableRemoveOutline,
                        ]}
                        disabled={true}
                      />
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
                        value={questionByIdData && questionByIdData.r_text_two}
                        id="outlined-basic"
                        placeholder="Yes/No"
                        variant="outlined"
                        className={[
                          classes.disableField,
                          classes.disableRemoveOutline,
                        ]}
                        disabled={true}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    className={classes.mainContainer}
                    style={{ marginTop: "20px" }}
                  >
                    {questionByIdData && questionByIdData.r_text_three && (
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
                          Radio 3 Text
                        </Typography>
                        <TextField
                          value={
                            questionByIdData && questionByIdData.r_text_three
                          }
                          id="outlined-basic"
                          placeholder="Yes/No"
                          variant="outlined"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
                    )}
                    {questionByIdData && questionByIdData.r_text_four && (
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
                          Radio 4 Text
                        </Typography>
                        <TextField
                          value={
                            questionByIdData && questionByIdData.r_text_four
                          }
                          id="outlined-basic"
                          placeholder="Yes/No"
                          variant="outlined"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
                    )}
                  </Grid>
                  <Grid
                    container
                    className={classes.mainContainer}
                    style={{ marginTop: "20px" }}
                  >
                    {questionByIdData && questionByIdData.r_text_five && (
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
                          Radio 5 Text
                        </Typography>
                        <TextField
                          value={
                            questionByIdData && questionByIdData.r_text_five
                          }
                          id="outlined-basic"
                          placeholder="Yes/No"
                          variant="outlined"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
                    )}
                    {questionByIdData && questionByIdData.r_text_six && (
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
                          Radio 6 Text
                        </Typography>
                        <TextField
                          value={
                            questionByIdData && questionByIdData.r_text_six
                          }
                          id="outlined-basic"
                          placeholder="Yes/No"
                          variant="outlined"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
                    )}
                  </Grid>
                </>
              )}

              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                onClick={handleBack}
              >
                Back
              </Button>
              {/* </form> */}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={2}>
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

const mapStateToProps = ({ questionaire }) => {
  return {
    questionByIdData: questionaire.QById,
  };
};
export default connect(mapStateToProps, {
  getQById: getQuestionAireByIdAction,
})(ViewQuestionaire);

// export default ViewQuestionaire;
