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
import { useHistory, useParams,useLocation } from "react-router-dom";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";
import BannerImage from "../../../assets/svg/bannerimg.svg";
import {
  updateDocumentAction,
  getPendingDoceByIdAction,
} from "../../../redux/actions/document/document.action";
import { getAllCategoriesAction } from "../../../redux/actions/category/category.action";
import { base_url_auto } from "../../../utils/global";
import Permissions from "../../subAdmin/Permissions";

const validationSchema = Yup.object().shape({
  doc_name: Yup.string().required("* Field is required"),
  doc_type: Yup.string().required("* Field is required"),
  // expiration_date: Yup.string().required("* Field is required"),
  // category: Yup.string().required("* Field is required"),
  // kyc_for: Yup.string().required("* Field is required")
});

const EditPendingDoc = ({
  getAllCategoriesAction,
  getPendingDoceByIdAction,
  pendingDocData,
  images,
  categoryData,
  updateDocumentAction,
}) => {
  const { id } = useParams();
  useEffect(() => {
    getPendingDoceByIdAction(id);
  }, []);
  console.log(pendingDocData, '-------1111')
  // useEffect(() => {
  //   getAllCategoriesAction();
  // }, []);

  // useEffect(() => {
  //   getCatagories();
  // }, [categoryData]);

  const classes = MyCustomStyle();
  const history = useHistory();

  const [catagoriesList, setCatagoriesList] = useState([]);

  // const getCatagories = () => {
  //   let items =categoryData.filter(Allcategories=> Allcategories.behaviour === "Default").map((res, i) => {
  //     return { value: res.id, label: res.name };
  //   });
  //   setCatagoriesList(items && items.length > 0 ? items : "");
  // };

  const handleSubmit = (values) => {
    if (values && values.disapprove === false) {
      const payload = {
        id: id,
        status: "Approve",
        expiration_date: values.expiration_date,
        doc_label: values.doc_name,
        doc_question_type: values.doc_type,
        document_for: values.kyc_for,
        disapproval_reason: values.disapproval_reason,
        // parent_category: parseInt(values.category),
        image_urls: images,
        
      };
      const disapprove = false;
      updateDocumentAction(payload, id, disapprove);
    }
    if (values && values.disapprove === true) {
      const payload = {
        id: id,
        status: "Disapprove",
        expiration_date: values.expiration_date,
        doc_label: values.doc_name,
        doc_question_type: values.doc_type,
        document_for: values.kyc_for,
        // parent_category: parseInt(values.category),
        image_urls: images,
      };
      const disapprove = true;
      updateDocumentAction(payload, id, disapprove);
    }
  };

  const handleFeedBackPage = () => {
    history.push({
      pathname: "/mooner/feed_back",
    });
  };

  const location = useLocation();
  const routeName = location.pathname;


  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="change_document" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" Pending Document "
              item=" Edit"
              bckLink="/mooner/details/pending_document"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Document Details
          </Typography>
          {pendingDocData &&
            pendingDocData.doc_question_type === "Image" &&
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
          {pendingDocData &&
            pendingDocData.doc_question_type === "File" &&
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
                    pendingDocData && pendingDocData.label
                      ? pendingDocData.label
                      : "",
                  doc_type:
                    pendingDocData && pendingDocData.doc_question_type
                      ? pendingDocData.doc_question_type
                      : "",
                  disapproval_reason:
                    pendingDocData && pendingDocData.disapproval_reason
                        ? pendingDocData.disapproval_reason
                        : "",
                  // expiration_date: pendingDocData && pendingDocData.expiration_date ? pendingDocData.expiration_date :  '',
                  // category: pendingDocData && pendingDocData.category_id ? pendingDocData.category_id : '',
                  // kyc_for: pendingDocData && pendingDocData.document_for ? pendingDocData.document_for : '',
                  disapprove: false,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  setFieldValue,
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
                          disabled
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
                            disabled
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
                      {/* <Grid
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
                     <div className="error-text">{errors.expiration_date}</div>
                  ) : null}
                </Grid>
                 */}
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
                      {/* <Grid
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
                            horizontal: "left"
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left"
                          },
                          getContentAnchorEl: null
                        }}
                      >
                        <MenuItem className={classes.dropdownMenuStyle} value={"SS"}>
                          SS
                        </MenuItem>
                        <MenuItem className={classes.dropdownMenuStyle} value={"SP"}>
                          SP
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {errors.kyc_for && touched.kyc_for ? (
                     <div className="error-text">{errors.kyc_for}</div>
                  ) : null}
                </Grid>
               */}
                    </Grid>
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
                          Reason
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.disapproval_reason}
                          name="disapproval_reason"
                          id="outlined-basic"
                          variant="outlined"
                          placeholder=""
                          className={[classes.field, classes.removeOutline]}
                          disabled={false}
                        />
                      </Grid>
                  </Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={pendingDocData.status === 'Disapprove'}
                      size="large"
                      className={classes.blueBtn}
                      onClick={() => {
                        setFieldValue("disapprove", true);
                        handleSubmit();
                      }}
                    >
                      Disapprove
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={pendingDocData.status === 'Approve'}
                      size="large"
                      className={classes.button}
                      onClick={() => {
                        setFieldValue("disapprove", false);
                        handleSubmit();
                      }}
                    >
                      Approve
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
    pendingDocData:
      document.pendingDocData &&
      document.pendingDocData.data &&
      document.pendingDocData.data[0],
    images:
      document.pendingDocData &&
      document.pendingDocData.data &&
      document.pendingDocData.data[0] &&
      document.pendingDocData.data[0].answer,
    categoryData: category.data,
  };
};

export default connect(mapStateToProps, {
  getAllCategoriesAction,
  getPendingDoceByIdAction,
  updateDocumentAction,
})(EditPendingDoc);
