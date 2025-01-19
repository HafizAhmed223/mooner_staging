import React, { useState } from "react";
import {
  Grid,
  Container,
  makeStyles,
  TextField,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import Link from "../../assets/svg/link.svg";
import Categorycard from "../Category/Categorycard";
import Topbar from "../topbar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSubCategory } from "../../redux/actions/subCategory/subcategory.action";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import Permissions from "../subAdmin/Permissions";

const Addsubcategory = ({
  categoryData,
  createSubCategory,
  match,
  loading,
}) => {
  const classes = MyCustomStyle();
  const history = useHistory();
  const { id } = match.params;
  const subCategorySchema = Yup.object().shape({
    name: Yup.string().required("* Name is required"),
    behaviour: Yup.string().required("* Behaviour is required"),
    cat_icon: Yup.mixed().required("* Category icon is required"),
    category_image: Yup.mixed().required("* Category Image is required"),
    category_image: Yup.mixed().required("* Category Image is required"),
  });
  const handleCancel = () => {
    history.push({
      pathname: "/mooner/details/categories/",
    });
  };
  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("cat_icon", values.cat_icon);
    formData.append("tn_parent", id);
    formData.append("category_image", values.category_image);
    formData.append("behaviour", values.behaviour);
    createSubCategory(formData);
  };
  return (
    <>
      <Permissions page="add_category" />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Category"
              item="Sub Category"
              bckLink="/mooner/details/categories"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title}>Create Sub Category</Typography>
          <Grid container className={classes.mainContainer}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={10}>
              <Formik
                initialValues={{
                  name: "",
                  cat_icon: null,
                  tn_parent: "",
                  category_image: null,
                  behaviour: "",
                }}
                validationSchema={subCategorySchema}
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
                      <Grid item xs={12} sm={6} md={6} lg={5} xl={4}>
                        <Typography className={classes.label} gutterBottom>
                          Name
                        </Typography>
                        <TextField
                          id="outlined-basic"
                          placeholder="Enter Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="name"
                          value={values.name}
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
                        sm={6}
                        md={6}
                        lg={5}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <div className={classes.imageWrapper}>
                          <Typography className={classes.label} gutterBottom>
                            Category Image
                          </Typography>
                          <div className={classes.inputImage}>
                            <Typography className={classes.imageName}>
                              <image123 className="svg">
                                {" "}
                                {values.category_image
                                  ? values.category_image.name
                                  : "Category Image"}
                              </image123>
                            </Typography>
                            <label htmlFor="avatarUpload">
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

                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={5}
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
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={5}
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
                            <label htmlFor="avatarUploadIcon">
                              <img src={Link} className={classes.linkImage} />
                            </label>
                            <input
                              type="file"
                              onChange={(e) => {
                                setFieldValue("cat_icon", e.target.files[0]);
                              }}
                              onBlur={handleBlur}
                              name="cat_icon"
                              accept="image/jpeg, image/png"
                              id="avatarUploadIcon"
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
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      Create
                    </Button>
                  </Form>
                )}
              </Formik>
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={2}>
              <Categorycard />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};
const mapStateToProps = ({ category, subCategory }) => {
  return {
    categoryData: category.data,
    loading: subCategory.data,
  };
};

export default connect(mapStateToProps, { createSubCategory })(Addsubcategory);
