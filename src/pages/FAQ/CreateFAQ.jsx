import React, { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  makeStyles,
  TextareaAutosize,
  Tooltip,
} from "@material-ui/core";
import { connect } from "react-redux";
import { createfaqAction } from "../../redux/actions/faq/faq.actions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Topbar from "../topbar";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import Permissions from "../subAdmin/Permissions";
import Link from "../../assets/svg/link.svg";
import MultiImagesUpload from "../../common/multiFiles/MultiImagesUpload";
import { setSnackbar } from "../../utils/global.actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import { baseURL } from "../../api";

const validationScheme = Yup.object({
  question: Yup.string()
    .max(2500, "characters must be less than 2500")
    .required("*Question is required"),
  answer: Yup.string()
    .max(2500, "characters must be less than 2500")
    .required("*Answer is required"),
  // faqs_image: Yup.mixed().required("*Image is required"),
});
const CrateFAQ = ({ createfaqAction }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const checkFiles = (files) => {
    const all_images = [];
    files?.map((image) => {
      all_images.push(image?.file);
      //("first", image?.file);
    });
    //("all_images", all_images);
    setImages(all_images);
  };
  //("images", images);

  //SUBMIT
  const handleSubmit = async (values) => {
    setLoading(true);
    // if (images.length == 0) {
    //   //("in");
    //   dispatch(setSnackbar("Image is required", "error"));
    //   return;
    // }
    let imgUrlsForFAQS = [];
    for (let i = 0; i < images.length; i++) {
      let uploadImages = new FormData();
      uploadImages.append("file_for", "faq_images/");
      uploadImages.append("file", images[i]);
      try {
        const res = await axios.post(`${baseURL}upload_file/`, uploadImages);
        //("res", res);
        if (res?.data?.status) {
          imgUrlsForFAQS.push({ faqs_image: res?.data?.url });
        }
      } catch (error) {
        //("error", error);
      }
    }

    const formData = {
      question: values.question,
      answer: values.answer,
      faqs_image: imgUrlsForFAQS,
    };

    await createfaqAction(formData);
    setLoading(false);
  };
  const classes = MyCustomStyle();
  const [faqImgName, setFaqImgName] = useState("");
  const defaultImages = [
    // "https://mooner-staging-media.s3.amazonaws.com/banners_image/profile5.png",
    // "https://mooner-staging-media.s3.amazonaws.com/banners_image/PictureNft.png",
  ];
  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="add_faqs" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar module="FAQs" item="Add" bckLink="/mooner/details/fqa" />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Add FAQs
          </Typography>

          <Formik
            initialValues={{
              question: "",
              answer: "",
              faqs_image: null,
            }}
            validationSchema={validationScheme}
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
                  <Grid xs={12}>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          Question
                        </Typography>
                        <TextareaAutosize
                          name="question"
                          aria-label="minimum height"
                          rowsMin={6}
                          placeholder="type"
                          className={classes.textArea}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          values={values.question}
                        />

                        {errors.question && touched.question ? (
                          <div
                            style={{
                              color: "red",
                            }}
                          >
                            {errors.question}
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>

                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          Answer
                        </Typography>
                        <TextareaAutosize
                          name="answer"
                          aria-label="minimum height"
                          rowsMin={7}
                          placeholder="type"
                          className={classes.textArea}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          values={values.answer}
                        />
                        {errors.answer && touched.answer ? (
                          <div
                            style={{
                              color: "red",
                            }}
                          >
                            {errors.answer}
                          </div>
                        ) : null}
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
                      >
                        <MultiImagesUpload
                          name="faqs_image"
                          maxSize={2}
                          // accept="image/png"
                          defaultImages={defaultImages}
                          maxFiles={3}
                          onChange={checkFiles}
                        />

                        <br />
                        {/* {errors.faqs_image && touched.faqs_image ? (
                          <div className="error-text">{errors.faqs_image}</div>
                        ) : null} */}
                      </Grid>
                    </Grid>

                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      {loading ? "Loading" : "Save"}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
  };
};
export default connect(mapStateToProps, { createfaqAction })(CrateFAQ);
