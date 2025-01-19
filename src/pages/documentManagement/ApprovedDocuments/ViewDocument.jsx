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

import { connect } from "react-redux";
import Topbar from "../../topbar";
import { useHistory, useParams } from "react-router-dom";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";
import { getDocbyIdAction } from "../../../redux/actions/document/document.action";
import { getAllCategoriesAction } from "../../../redux/actions/category/category.action";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import ImageModal from "../../../common/imageModal/ImageModal";
import { base_url_auto } from "../../../utils/global";
import Permissions from "../../subAdmin/Permissions";

// import { IMAGE_BASE_URL } from "../../../api/constants";

const validationSchema = Yup.object().shape({});

const ViewDocument = ({
  getDocbyIdAction,
  categoryData,
  aprovedById,
  images,
  getAllCategoriesAction,
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
  //("document", aprovedById);

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
  const history = useHistory();

  const handleSubmit = (event) => {};

  const handlechangeBack = () => {
    history.push({
      pathname: "/mooner/details/document_management",
    });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="view_document" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" Documents Details "
              item=" View "
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
                <>
                  <Grid
                    container
                    spacing={2}
                    className={classes.bannerContainer}
                  >
                    <Grid items xs={12} sm={6} md={6} lg={6} xl={5}>
                      <ImageModal
                        classes={classes.bannerAvatar}
                        path={`${base_url_auto}${res}`}
                      />
                    </Grid>
                  </Grid>
                </>
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
          <Grid Container spacing={2} className={classes.mainContainer}>
            <Grid xs={10}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  doc_name:
                    aprovedById && aprovedById.label ? aprovedById.label : "",
                  kyc_for:
                    aprovedById && aprovedById.document_for
                      ? aprovedById.document_for
                      : "",
                  // expiration_date: aprovedById && aprovedById.expiration_date ? aprovedById.expiration_date :  '',
                  doc_type:
                    aprovedById && aprovedById.doc_question_type
                      ? aprovedById.doc_question_type
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
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
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
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
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
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      {/* <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    xl={4}
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
                          className={[classes.disableField, classes.disableRemoveOutline]}
                          disabled={true}
                      />
                  </Grid>
                   */}
                      <Grid
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        {/* <Typography className={classes.label} gutterBottom>
                      Category
                    </Typography> */}
                        <Typography className={classes.label} gutterBottom>
                          Question Type
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
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
                          {/* <Select
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
                       */}
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      ></Grid>
                    </Grid>

                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                      onClick={handlechangeBack}
                    >
                      Back
                    </Button>
                  </Form>
                )}
              </Formik>
            </Grid>
            <Grid xs={2}></Grid>
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
  getAllCategoriesAction,
})(ViewDocument);
