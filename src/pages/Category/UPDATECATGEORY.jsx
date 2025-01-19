import React, { useState, useEffect } from "react";
import {
  Grid,
  Switch,
  Container,
  makeStyles,
  TextField,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  createMuiTheme,
} from "@material-ui/core";
import Link from "../../assets/svg/link.svg";
import Categorycard from "./Categorycard";
import Topbar from "../topbar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import {
  updateCategory,
  getParticularCategory,
  categoryActiveAction,
} from "../../redux/actions/category/category.action";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import { useDispatch } from "react-redux";
import Permissions from "../subAdmin/Permissions";

const UPDATECATGEORY = ({
  categoryData,
  updateCategory,
  loading,
  getParticularCategory,
  match,
}) => {
  const [categoryIcon, setCategoryIcon] = useState(true);
  const [categoryImage, setCategoryImage] = useState(true);
  const [submitIcon, setSubmitIcon] = useState(false);
  const [submitImage, setSubmitImage] = useState(false);

  const classes = MyCustomStyle();
  const dispatch = useDispatch();
  //("categoryData", categoryData);
  const createCategorySchema = Yup.object().shape({
    name: Yup.string()
      .max(24, "* you can enter maximum 24 characters including space")
      .required("* Name is required"),
    cat_icon: Yup.mixed().optional("* Category icon is required"),
    category_heading_text: Yup.string().required("* First heading is required"),
    category_heading_text2: Yup.string().required(
      "* Second heading is required"
    ),
    category_image: Yup.mixed().optional("* Category Image is required"),
    behaviour: Yup.string().required("* behaviour is required"),
  });
  const { id } = match.params;
  useEffect(() => {
    getParticularCategory(id);
  }, []);
  const handleSubmit = (values) => {
    //("values", values);
    let formData = new FormData();
    formData.append("name", values.name);
    if (submitIcon) {
      formData.append("cat_icon", values.cat_icon);
    } else if (submitImage) {
      formData.append("category_image", values.category_image);
    }

    formData.append("category_heading_text", values.category_heading_text);
    formData.append("category_heading_text2", values.category_heading_text2);
    formData.append("behaviour", values.behaviour);

    const statusData = {
      category_id: categoryData.id,
      status: values?.active,
    };
    updateCategory(formData, categoryData.id, statusData);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="change_category" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Category"
              item={categoryData.name}
              bckLink="/mooner/details/categories"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title}>Edit Category</Typography>
          <Grid container className={classes.mainContainer}>
            <Grid xs={12} sm={12} md={12} lg={9} xl={10}>
              <Formik
                initialValues={{
                  name: categoryData.name ? categoryData.name : "",
                  cat_icon: "",
                  category_heading_text: categoryData.category_heading_text
                    ? categoryData.category_heading_text
                    : "",
                  category_heading_text2: categoryData.category_heading_text2
                    ? categoryData.category_heading_text2
                    : "",
                  category_image: "",
                  behaviour: categoryData.behaviour
                    ? categoryData.behaviour
                    : "",
                  active: categoryData?.cat_is_active || false,
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
                      <Grid item xs={12} sm={12} className={classes.mainRow}>
                        <div className={classes.imageWrapper}>
                          <Typography className={classes.label}>
                            Category Icon
                          </Typography>
                          <div className={classes.inputImage}>
                            <Typography className={classes.imageName}>
                              {categoryIcon && categoryData
                                ? categoryData?.category_icon?.substr(21)
                                : values.cat_icon.name}
                            </Typography>
                            <label htmlFor="avatarUpload">
                              <img src={Link} className={classes.linkImage} />
                            </label>
                            <input
                              type="file"
                              onChange={(e) => {
                                setCategoryIcon(false);
                                setSubmitIcon(true);
                                setFieldValue("cat_icon", e.target.files[0]);
                              }}
                              onBlur={handleBlur}
                              name="cat_icon"
                              accept="image/jpeg, image/png"
                              // name="avatarUpload"
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
                          {errors.behaviour && touched.behaviour ? (
                            <div
                              className="error-text"
                              style={{ marginTop: "10px" }}
                            >
                              {errors.behaviour}
                            </div>
                          ) : null}
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
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
                      <Grid item xs={12} sm={12} className={classes.mainRow}>
                        <div className={classes.imageWrapper}>
                          <Typography className={classes.label} gutterBottom>
                            Category Image
                          </Typography>
                          <div className={classes.inputImage}>
                            <Typography className={classes.imageName}>
                              {categoryImage && categoryData
                                ? categoryData?.cat_image?.substr(22)
                                : values.category_image.name}
                            </Typography>
                            <label htmlFor="imageUpload">
                              <img src={Link} className={classes.linkImage} />
                            </label>
                            <input
                              type="file"
                              onChange={(e) => {
                                setCategoryImage(false);
                                setSubmitImage(true);
                                setFieldValue(
                                  "category_image",
                                  e.target.files[0]
                                );
                              }}
                              onBlur={handleBlur}
                              name="category_image"
                              accept="image/jpeg, image/png"
                              // name="imageUpload"
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
                      {loading ? "Loading " : "Update"}
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
const mapStateToProps = (state) => {
  return {
    categoryData: state.category.particularCategory,
    loading: state.category.loading,
  };
};
export default connect(mapStateToProps, {
  updateCategory,
  getParticularCategory,
})(UPDATECATGEORY);
