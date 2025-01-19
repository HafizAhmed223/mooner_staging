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
  Box,
} from "@material-ui/core";

import { connect } from "react-redux";
import Topbar from "../../topbar";
import { useHistory, useParams } from "react-router-dom";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";
import { getPendingDoceByIdAction } from "../../../redux/actions/document/document.action";
import { getAllCategoriesAction } from "../../../redux/actions/category/category.action";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { base_url_auto } from "../../../utils/global";
import Permissions from "../../subAdmin/Permissions";
import ImageModal from "../../../common/imageModal/ImageModal";

const validationSchema = Yup.object().shape({});

const ViewPenddingDocument = ({
  getPendingDoceByIdAction,
  categoryData,
  pendingDocData,
  images,
  getAllCategoriesAction,
}) => {
  const { id } = useParams();
  useEffect(() => {
    getAllCategoriesAction();
  }, []);
  console.log(categoryData, '==========')
  useEffect(() => {
    getCatagories();
  }, [categoryData]);

  useEffect(() => {
    getPendingDoceByIdAction(id);
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
  const history = useHistory();

  const handleSubmit = (event) => { };

  const handlechangeBack = () => {
    history.push({
      pathname: "/mooner/details/pending_document",
    });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="view_document" />
        <Grid container>
          <Grid item sm={12}>
            <Topbar
              module=" Pending Documents "
              item=" View "
              bckLink="/mooner/details/pending_document"
            />
          </Grid>
        </Grid>
        {/* <div className={classes.root}> */}
        <Typography className={classes.Title} gutterBottom>
          Document Details
        </Typography>
        <Box className={classes.mainContainer}>
          {pendingDocData &&
            pendingDocData.doc_question_type === "Image" &&
            images &&
            images.map((res, i) => {
              return (
                <Box sx={{ maxWidth: "100px", pr: "20px" }}>
                  {/* <img
                    src={`${base_url_auto}${res}`}
                    className={classes.bannerAvatar}
                  /> */}
                  <ImageModal
                    styleJx={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                    path={`${base_url_auto}${res}`}
                  />
                </Box>
              );
            })}
        </Box>

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
        <Grid container className={classes.mainContainer}>
          <Grid xs={12}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                doc_name:
                  pendingDocData && pendingDocData.label
                    ? pendingDocData.label
                    : "",
                kyc_for:
                  pendingDocData && pendingDocData.document_for
                    ? pendingDocData.document_for
                    : "",
                expiration_date:
                  pendingDocData && pendingDocData.expiration_date
                    ? pendingDocData.expiration_date
                    : "",
                doc_type:
                  pendingDocData && pendingDocData.doc_question_type
                    ? pendingDocData.doc_question_type
                    : "",
                
                disapproval_reason:
                  pendingDocData && pendingDocData.disapproval_reason
                    ? pendingDocData.disapproval_reason
                    : "",

                // category: pendingDocData && pendingDocData.category_id ? pendingDocData.category_id : '',
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
                  <Grid container spacing={2} className={classes.mainContainer}>
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
                      xs={12}
                      sm={12}
                      md={4}
                      lg={4}
                      xl={4}
                      className={classes.mainRow}
                    >
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
                    </Grid>
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
                    ></Grid>
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
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
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
        {/* </div> */}
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
  getPendingDoceByIdAction,
  getAllCategoriesAction,
})(ViewPenddingDocument);
