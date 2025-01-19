import React, { useState } from "react";
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
import Link from "../../assets/svg/link.svg";
import Categorycard from "./Categorycard";
import Topbar from "../topbar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { createCategory } from "../../redux/actions/category/category.action";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import Permissions from "../subAdmin/Permissions";

const Addnewcategory = ({ createCategory, loading }) => {
  const classes = MyCustomStyle();
  const createCategorySchema = Yup.object().shape({
    name: Yup.string()
      .max(24, "* you can enter maximum 24 characters including space")
      .required("* Name is required"),
    behaviour: Yup.string().required("* behaviour is required"),
    cat_icon: Yup.mixed().required("* Category icon is required"),
    category_heading_text: Yup.string()
      .max(250)
      .required("* First heading is required"),
    category_heading_text2: Yup.string()
      .max(250)
      .required("* Second heading is required"),
    category_image: Yup.mixed().required("* Category Image is required"),
  });
  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("cat_icon", values.cat_icon);
    formData.append("category_heading_text", values.category_heading_text);
    formData.append("category_heading_text2", values.category_heading_text2);
    formData.append("category_image", values.category_image);
    formData.append("behaviour", values.behaviour);
    createCategory(formData);
  };
  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="add_category" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Category"
              item="Food"
              bckLink="/mooner/details/categories"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title}>Create Category</Typography>
          <Grid container className={classes.mainContainer}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={10}>
              <Formik
                initialValues={{
                  name: "",
                  cat_icon: null,
                  category_heading_text: "",
                  category_heading_text2: "",
                  category_image: null,
                  behaviour: "",
                }}
                validationSchema={createCategorySchema}
                onSubmit={handleSubmit}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                }) => (
                  <Form onSubmit={handleSubmit} autoComplete="off">
                    <Grid container className={classes.mainContainer}>
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
                          Category name
                        </Typography>
                        <TextField
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="name"
                          value={values.name}
                          id="outlined-basic"
                          placeholder="Food"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.name && touched.name ? (
                          <div className="error-text">{errors.name}</div>
                        ) : null}
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
                        <div className={classes.imageWrapper}>
                          <Typography className={classes.label} gutterBottom>
                            Category Icon
                          </Typography>
                          <div className={classes.inputImage}>
                            <Typography className={classes.imageName}>
                              {values.cat_icon
                                ? values.cat_icon.name
                                : "Category Icon"}
                            </Typography>
                            <label htmlFor="avatarUpload">
                              <img src={Link} className={classes.linkImage} />
                            </label>
                            {/* <label htmlFor="avatarUpload">
                              <img src={Link} className={classes.linkImage} />
                            </label> */}
                            <input
                              type="file"
                              onChange={(e) => {
                                setFieldValue("cat_icon", e.target.files[0]);
                              }}
                              onBlur={handleBlur}
                              name="cat_icon"
                              accept="image/jpeg, image/png"
                              name="avatarUpload"
                              id="avatarUpload"
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                        <br />
                        {errors.cat_icon && touched.cat_icon ? (
                          <div className="error-text">{errors.cat_icon}</div>
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
                        md={4}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Behaviour
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            name="behaviour"
                            value={values.behaviour}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                              value={"Menu"}
                            >
                              Menu
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"Default"}
                            >
                              Default
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {errors.behaviour && touched.behaviour ? (
                          <div className="error-text">{errors.behaviour}</div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid>
                      <Typography className={classes.secondTitle}>
                        App Sub Page Content
                      </Typography>
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
                          First Heading
                        </Typography>
                        <TextField
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.category_heading_text}
                          name="category_heading_text"
                          id="outlined-basic"
                          placeholder="Get your Car Wash by"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.category_heading_text &&
                        touched.category_heading_text ? (
                          <div className="error-text">
                            {errors.category_heading_text}
                          </div>
                        ) : null}
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
                          Second Heading
                        </Typography>
                        <TextField
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.category_heading_text2}
                          name="category_heading_text2"
                          id="outlined-basic"
                          placeholder="Our Experts"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.category_heading_text2 &&
                        touched.category_heading_text2 ? (
                          <div className="error-text">
                            {errors.category_heading_text2}
                          </div>
                        ) : null}
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
                        <div className={classes.imageWrapper}>
                          <Typography className={classes.label}>
                            Category Image
                          </Typography>
                          <div className={classes.inputImage}>
                            <Typography className={classes.imageName}>
                              {values.category_image
                                ? values.category_image.name
                                : "Category Image"}
                            </Typography>
                            <label htmlFor="imageUpload">
                              <img src={Link} className={classes.linkImage} />
                            </label>
                            <input
                              type="file"
                              onChange={(e) => {
                                setFieldValue(
                                  "category_image",
                                  e.target.files[0]
                                );
                              }}
                              onBlur={handleBlur}
                              name="category_image"
                              accept="image/jpeg, image/png"
                              name="imageUpload"
                              id="imageUpload"
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                        <br />
                        {errors.category_image && touched.category_image ? (
                          <div className="error-text">
                            {errors.category_image}
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      {loading ? "Loading " : "Save"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Grid>
            <Grid xs={12} sm={12} md={4} lg={3} xl={2}>
              <Categorycard />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};
const mapStateToProps = ({ category }) => {
  return {
    loading: category.loading,
  };
};
export default connect(mapStateToProps, { createCategory })(Addnewcategory);
