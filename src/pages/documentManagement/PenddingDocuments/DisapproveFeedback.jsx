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
  TextareaAutosize,
} from "@material-ui/core";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import Topbar from "../../topbar";
import { useHistory, useParams } from "react-router-dom";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";
import BannerImage from "../../../assets/svg/bannerimg.svg";
import { updateDocumentAction } from "../../../redux/actions/document/document.action";
import { getAllCategoriesAction } from "../../../redux/actions/category/category.action";

const validationSchema = Yup.object().shape({
  doc_name: Yup.string().required("* Field is required"),
  reasson: Yup.string().required("* Field is required"),
  doc_type: Yup.string().required("* Field is required"),
  kyc_for: Yup.string().required("* Field is required"),
  // expiration_date: Yup.string().required("* Field is required"),
  // category: Yup.string().required("* Field is required")
});

const DissaproveFeedBack = ({
  getAllCategoriesAction,
  updateDocumentAction,
  disapproveDetail,
  categoryData,
  document_id,
}) => {
  // useEffect(() => {
  //   getAllCategoriesAction();
  // }, []);

  // useEffect(() => {
  //   getCatagories();
  // }, [categoryData]);

  // const [catagoriesList, setCatagoriesList] = useState([]);

  // const getCatagories = () => {
  //   let items =categoryData.filter(Allcategories=> Allcategories.behaviour === "Default").map((res, i) => {
  //     return { value: res.id, label: res.name };
  //   });
  //   setCatagoriesList(items && items.length > 0 ? items : "");
  // };

  const handleSubmit = (values) => {
    console.log(values, "kyc value")
    const payload = {
      disapproval_reason: values.reasson,
      // parent_category: values.category,
    };
    const id = document_id.id;
    const disapprove = "reasson";
    updateDocumentAction(payload, id, disapprove);
  };

  const classes = MyCustomStyle();
  const history = useHistory();

  const handleChangeBack = () => {
    history.push({
      pathname: "/mooner/details/document_management",
    });
  };
  //("document_id", document_id);
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" Document Management "
              item=" Disapprove Feedback "
              bckLink="/mooner/details/pending_document"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Disapprove Feedback
          </Typography>
          <Grid container spacing={2} className={classes.mainContainer}>
            <Grid xs={12}>
              {/* <form className={classes.form} noValidate autoComplete="off"> */}
              <Formik
                enableReinitialize={true}
                initialValues={{
                  doc_name:
                    disapproveDetail && disapproveDetail.doc_label
                      ? disapproveDetail.doc_label
                      : "",
                  doc_type:
                    disapproveDetail && disapproveDetail.doc_question_type
                      ? disapproveDetail.doc_question_type
                      : "",
                  kyc_for:
                    disapproveDetail && disapproveDetail.doc_for
                      ? disapproveDetail.doc_for
                      : "",
                  // expiration_date:
                  //   disapproveDetail && disapproveDetail.expiration_date
                  //     ? disapproveDetail.expiration_date
                  //     : "",
                  reasson: "",
                  // category: disapproveDetail && disapproveDetail.category_id ? disapproveDetail.category_id : ''
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
                      Container
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
                          disabled
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
                            disabled
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
                        {/* //   <Typography className={classes.label} gutterBottom>
                  //       Category
                  //   </Typography>
                  //   <FormControl
                  //     variant="outlined"
                  //     className={[classes.field, classes.removeOutline]}
                  //   >
                  //     <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                  //     <Select
                  //        onChange={handleChange}
                  //        onBlur={handleBlur}
                  //        value={values.category}
                  //        name="category"
                  //        labelId="demo-simple-select-outlined-label"
                  //        id="demo-simple-select-outlined"
                  //        label="category"
                  //        displayEmpty
                  //       className={classes.textStyle}
                  //       MenuProps={{
                  //         anchorOrigin: {
                  //           vertical: "bottom",
                  //           horizontal: "left"
                  //         },
                  //         transformOrigin: {
                  //           vertical: "top",
                  //           horizontal: "left"
                  //         },
                  //         getContentAnchorEl: null
                  //       }}
                  //     >
                  //      {
                  //       catagoriesList && catagoriesList.map((res, index) => (
                  //       <MenuItem
                  //         key={index}
                  //         className={classes.dropdownMenuStyle}
                  //         value={res.value}
                  //       >
                  //         {res.label}
                  //       </MenuItem>
                  //     ))}
                  //     </Select>
                  //   </FormControl>
                  //   {errors.category && touched.category ? (
                  //    <div className="error-text">{errors.category}</div>
                  // ) : null} */}
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
                          <div className="error-text">
                            {errors.expiration_date}
                          </div>
                        ) : null}
                      </Grid> */}
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
                            disabled
                            value={values.kyc_for}
                            name="kyc_for"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="kyc_for"
                            // displayEmpty
                            className={classes.textStyle}
                            defaultValue={"SS"}
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
                          Reason of Disapproval
                        </Typography>
                        <TextareaAutosize
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.reasson}
                          name="reasson"
                          aria-label="minimum height"
                          rowsMin={8}
                          placeholder="reassons"
                          className={classes.textArea}
                        />
                        {errors.reasson && touched.reasson ? (
                          <div className="error-text">{errors.reasson}</div>
                        ) : null}
                      </Grid>
                    </Grid>

                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                      onClick={handleChangeBack}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      Send
                    </Button>
                  </Form>
                )}
              </Formik>
              {/* </form> */}
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = ({ document, category }) => {
  return {
    disapproveDetail: document.disapproveDetail.document_data,
    document_id: document.disapproveDetail.data,
    // categoryData: category.data,
  };
};

export default connect(mapStateToProps, {
  getAllCategoriesAction,
  updateDocumentAction,
})(DissaproveFeedBack);
