import React, { useState, useEffect } from "react";
import {
  Switch,
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
import {
  createSubCategory,
  updateCategory,
  getParticularSubCategory,
} from "../../redux/actions/subCategory/subcategory.action";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import Permissions from "../subAdmin/Permissions";

const EditSubCategory = ({ subCategoryData, updateCategory, match }) => {
  const classes = MyCustomStyle();
  const [submitIcon, setSubmitIcon] = useState(false);
  const [submitImage, setSubmitImage] = useState(false);
  const { id } = match.params;
  useEffect(() => {
    getParticularSubCategory(id);
  }, []);
  const subCategorySchema = Yup.object().shape({
    name: Yup.string().required("* Name is required"),
    behaviour: Yup.string().required("* Behaviour is required"),
    cat_icon: Yup.mixed().optional("* Sub Category icon is required"),
    category_image: Yup.mixed().optional("* Sub Category Image is required"),
  });
  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append("name", values.name);
    if (submitIcon) {
      formData.append("cat_icon", values.cat_icon);
    }
    if (submitImage) {
      formData.append("category_image", values.category_image);
    }

    formData.append("category_heading_text", values.category_heading_text);
    formData.append("category_heading_text2", values.category_heading_text2);
    formData.append("behaviour", values.behaviour);
    const statusData = {
      category_id: subCategoryData.id,
      status: values?.active,
    };
    updateCategory(formData, subCategoryData.id, statusData);
  };
  // //("subCategory Data", subCategoryData);
  return (
    <>
      <Permissions page="change_category" />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar module="Sub Category" item="Edit Sub Category" />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title}>Edit Sub Category</Typography>
          <Grid container className={classes.mainContainer}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={10}>
              <Formik
                initialValues={{
                  name: subCategoryData.name ? subCategoryData.name : "",
                  cat_icon: "",
                  category_heading_text: subCategoryData.category_heading_text
                    ? subCategoryData.category_heading_text
                    : "",
                  category_heading_text2: subCategoryData.category_heading_text2
                    ? subCategoryData.category_heading_text2
                    : "",
                  category_image: "",
                  behaviour: subCategoryData.behaviour
                    ? subCategoryData.behaviour
                    : "",
                  active: subCategoryData?.cat_is_active || false,
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
                  <Form onSubmit={handleSubmit}>
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
                                setSubmitImage(true);
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
                        // className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Status
                        </Typography>
                        <Switch
                          name="active"
                          defaultChecked={values.active}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Typography className={classes.secondTitle}>
                      Parent Category
                    </Typography>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
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
                                setSubmitIcon(true);
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
                      Save
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
const mapStateToProps = (state, ownProps) => {
  return {
    subCategoryData: state.subCategory.particularSubCatgegory,
  };
};
export default connect(mapStateToProps, {
  createSubCategory,
  updateCategory,
  getParticularSubCategory,
})(EditSubCategory);
