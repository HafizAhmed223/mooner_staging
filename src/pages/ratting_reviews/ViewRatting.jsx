import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  TextField,
  TextareaAutosize,
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
import Topbar from "../topbar";
import { useHistory, useParams } from "react-router-dom";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import BannerImage from "../../assets/svg/bannerimg.svg";
import { getAllCategoriesAction } from "../../redux/actions/category/category.action";
import { getRattingByIdAction } from "../../redux/actions/ratting/ratting.actions";

const validationSchema = Yup.object().shape({});

const EditDocument = ({
  categoryData,
  rattingById,
  getRattingByIdAction,
  getAllCategoriesAction,
}) => {
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    getAllCategoriesAction();
  }, []);

  useEffect(() => {
    getRattingByIdAction(id);
  }, []);

  useEffect(() => {
    getCatagories();
  }, [categoryData]);

  const [catagoriesList, setCatagoriesList] = useState([]);

  const getCatagories = () => {
    let items = categoryData
      .filter((Allcategories) => Allcategories.behaviour === "Default")
      .map((res, i) => {
        return { value: res.id, label: res.name };
      });
    setCatagoriesList(items && items.length > 0 ? items : "");
  };

  const classes = MyCustomStyle();

  const handleSubmit = (values) => {};

  const handleBack = () => {
    history.push("/mooner/details/sp_management");
  };

  //("rattingById", rattingById);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" SP Management "
              item=" Edit "
              bckLink="/mooner/details/sp_management"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Rating & Reviews
          </Typography>
          <Grid container spacing={2} className={classes.mainContainer}>
            <Grid xs={12}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name:
                    rattingById && rattingById[0] && rattingById[0].ratedby
                      ? rattingById[0].ratedby
                      : "",
                  category:
                    rattingById && rattingById[0] && rattingById[0].category_id
                      ? rattingById[0].category_id
                      : "",
                  seeker_id:
                    rattingById && rattingById[0] && rattingById[0].seeker_id
                      ? rattingById[0].seeker_id
                      : "",
                  stars:
                    rattingById && rattingById[0] && rattingById[0].star
                      ? rattingById[0].star
                      : "",
                  feedback:
                    rattingById && rattingById[0] && rattingById[0].feedback
                      ? rattingById[0].feedback
                      : "",
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
                          Name
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          name="name"
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="Doc Name"
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                        />
                        {errors.name && touched.name ? (
                          <div className="error-text">{errors.name}</div>
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
                          Category
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.category}
                            name="category"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="category"
                            displayEmpty
                            className={classes.disableTextStyle}
                            disabled={true}
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
                        {errors.category && touched.category ? (
                          <div className="error-text">{errors.category}</div>
                        ) : null}
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
                        sm={6}
                        md={6}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          seeker_id
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.seeker_id}
                          name="seeker_id"
                          id="outlined-basic"
                          variant="outlined"
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                        />
                        {errors.seeker_id && touched.seeker_id ? (
                          <div className="error-text">{errors.seeker_id}</div>
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
                          Stars
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.stars}
                            name="stars"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="stars"
                            displayEmpty
                            className={classes.disableTextStyle}
                            disabled={true}
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
                              value={"1"}
                            >
                              1
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"2"}
                            >
                              2
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"3"}
                            >
                              3
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"4"}
                            >
                              4
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"5"}
                            >
                              5
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {errors.stars && touched.stars ? (
                          <div className="error-text">{errors.stars}</div>
                        ) : null}
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
                        md={12}
                        lg={8}
                        xl={6}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Feedback Texk
                        </Typography>
                        <TextareaAutosize
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.feedback}
                          name="feedback"
                          aria-label="minimum height"
                          rowsMin={8}
                          placeholder="feedback text"
                          className={classes.blockTextArea}
                          disabled={true}
                        />
                        {errors.feedback && touched.feedback ? (
                          <div className="error-text">{errors.feedback}</div>
                        ) : null}
                      </Grid>
                    </Grid>

                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                      onClick={handleBack}
                    >
                      Back
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

const mapStateToProps = ({ ratting, category }) => {
  return {
    categoryData: category.data,
    rattingById: ratting.rattingById.data,
  };
};

export default connect(mapStateToProps, {
  getAllCategoriesAction,
  getRattingByIdAction,
})(EditDocument);
