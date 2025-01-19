import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  TextField,
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
import Topbar from "../../topbar";
import { useHistory, useParams } from "react-router-dom";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";
import BannerImage from "../../../assets/svg/bannerimg.svg";
import {
  getDocbyIdAction,
  editApprovedDocAction,
} from "../../../redux/actions/document/document.action";
import { getAllCategoriesAction } from "../../../redux/actions/category/category.action";
import { base_url_auto } from "../../../utils/global";

const validationSchema = Yup.object().shape({
  doc_name: Yup.string().required("* Field is required"),
  doc_type: Yup.string().required("* Field is required"),
  expiration_date: Yup.string().required("* Field is required"),
  // category: Yup.string().required("* Field is required"),
  kyc_for: Yup.string().required("* Field is required"),
});

const EditDocument = ({
  getDocbyIdAction,
  categoryData,
  aprovedById,
  images,
  getAllCategoriesAction,
  editApprovedDocAction,
}) => {
  const { id } = useParams();
  useEffect(() => {
    getAllCategoriesAction();
  }, []);

  useEffect(() => {
    getCatagories();
  }, [categoryData]);

  useEffect(() => {
    getDocbyIdAction(id);
  }, []);

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

  const handleSubmit = (values) => {
    // let formData = new FormData();
    // formData.append("id", id);
    // formData.append("status", aprovedById && aprovedById.status);
    // formData.append("expiration_date", values.expiration_date);
    // formData.append("doc_label", values.doc_name);
    // formData.append("parent_category", parseInt(values.category));
    // formData.append("image_urls", images);
    const payload = {
      id: id,
      status: aprovedById && aprovedById.status,
      expiration_date: values.expiration_date,
      doc_label: values.doc_name,
      parent_category: parseInt(values.category),
      image_urls: images,
    };

    editApprovedDocAction(payload, id);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" Documents Details "
              item=" Edit "
              bckLink="/mooner/details/document_management"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Document Details
          </Typography>
          {aprovedById &&
            aprovedById.doc_question_type === "Image" &&
            images &&
            images.map((res, i) => {
              return (
                <Grid container spacing={2} className={classes.bannerContainer}>
                  <Grid items xs={12} sm={6} md={6} lg={6} xl={5}>
                    <img
                      src={`${base_url_auto}${res}`}
                      className={classes.bannerAvatar}
                    />
                  </Grid>
                </Grid>
              );
            })}
          {aprovedById &&
            aprovedById.doc_question_type === "File" &&
            images &&
            images.map((res, i) => {
              return (
                <Grid container spacing={2} className={classes.mainContainer}>
                  <Grid
                    items
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    className={classes.mainRow}
                  >
                    <a href={`${base_url_auto}${res}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                      >
                        Download File
                      </Button>
                    </a>
                  </Grid>
                </Grid>
              );
            })}
          <Grid container spacing={2} className={classes.mainContainer}>
            <Grid xs={12}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  doc_name:
                    aprovedById && aprovedById.label ? aprovedById.label : "",
                  doc_type:
                    aprovedById && aprovedById.doc_question_type
                      ? aprovedById.doc_question_type
                      : "",
                  expiration_date:
                    aprovedById && aprovedById.expiration_date
                      ? aprovedById.expiration_date
                      : "",
                  // category: aprovedById && aprovedById.category_id ? aprovedById.category_id : '',
                  kyc_for:
                    aprovedById && aprovedById.document_for
                      ? aprovedById.document_for
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
                          Doc Name
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.doc_name}
                          name="doc_name"
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="Doc Name"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.doc_name && touched.doc_name ? (
                          <div className="error-text">{errors.doc_name}</div>
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
                          Question Type
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.doc_type}
                            name="doc_type"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="doc_type"
                            displayEmpty
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
                              value={"Image"}
                            >
                              Image
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"File"}
                            >
                              File
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {errors.doc_type && touched.doc_type ? (
                          <div className="error-text">{errors.doc_type}</div>
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
                          Expiration Date
                        </Typography>
                        <TextField
                          type="date"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.expiration_date}
                          name="expiration_date"
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="DD/MM/YYYY"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.expiration_date && touched.expiration_date ? (
                          <div className="error-text">
                            {errors.expiration_date}
                          </div>
                        ) : null}
                      </Grid>
                      {/* <Grid
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
                       className={classes.textStyle}
                       MenuProps={{
                         anchorOrigin: {
                           vertical: "bottom",
                           horizontal: "left"
                         },
                         transformOrigin: {
                           vertical: "top",
                           horizontal: "left"
                         },
                         getContentAnchorEl: null
                       }}
                     >
                      {
                       catagoriesList && catagoriesList.map((res, index) => (
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
              */}
                      <Grid
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          KYC For
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.kyc_for}
                            name="kyc_for"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="kyc_for"
                            displayEmpty
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
                              value={"SS"}
                            >
                              SS
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"SP"}
                            >
                              SP
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {errors.kyc_for && touched.kyc_for ? (
                          <div className="error-text">{errors.kyc_for}</div>
                        ) : null}
                      </Grid>
                    </Grid>

                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                      onClick={handleSubmit}
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

const mapStateToProps = ({ document, category }) => {
  return {
    aprovedById:
      document.aprovedById &&
      document.aprovedById.data &&
      document.aprovedById.data[0],
    images:
      document.aprovedById &&
      document.aprovedById.data &&
      document.aprovedById.data[0] &&
      document.aprovedById.data[0].answer,
    categoryData: category.data,
  };
};

export default connect(mapStateToProps, {
  getDocbyIdAction,
  editApprovedDocAction,
  getAllCategoriesAction,
})(EditDocument);
