import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  makeStyles,
  TextareaAutosize,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  updatefaqAction,
  getfaqByIdAction,
} from "../../redux/actions/faq/faq.actions";
import Link from "../../assets/svg/link.svg";

import Topbar from "../topbar";
import { useHistory, useParams } from "react-router-dom";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import CommonCard from "../../common/CommonCard";
import Permissions from "../subAdmin/Permissions";
import ImageModal from "../../common/imageModal/ImageModal";
import MultiImagesUpload from "../../common/multiFiles/MultiImagesUpload";
import { baseURL } from "../../api";
import axios from "axios";

const validationScheme = Yup.object({
  question: Yup.string().required("*Question is required"),
  answer: Yup.string().required("*Answer is required"),
});

const EditFAQs = ({
  updatefaqAction,
  getfaqByIdAction,
  faqByIdData,
  loading,
}) => {
  const [reRender, setReRender] = useState(false);
  useEffect(() => {
    getIdFromParams();
  }, [reRender]);

  const [id, setid] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const getIdFromParams = () => {
    const { location } = history;
    const { pathname } = location;
    let name = pathname;
    let nameArr = name.split("/");
    let fid = nameArr[nameArr.length - 1];
    setid(fid);
    getfaqByIdAction(fid);
  };
  const params = useParams();
  const Id = params?.id;
  const [images, setImages] = useState([]);
  const onChangeFiles = (files) => {
    console.log(files, "----------------files")

    const all_images = [];
    files?.map((image) => {
      all_images.push(image?.file);
    });
    setImages(all_images);
  };

  //SUBMIT
  const handleSubmit = async (values) => {
    setEditLoading(true);
    let imgUrlsForFAQS = [];
    console.log("images", images);
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
      sorting_key: values?.sorting_key,
      question: values.question,
      answer: values.answer,
      faqs_image: imgUrlsForFAQS,
    };

    // formData.append("sorting_key", values?.sorting_key);
    // formData.append("question", values.question);
    // formData.append("answer", values.answer);
    // values?.faqs_image && formData.append("faqs_image", values.faqs_image);

    await updatefaqAction(formData, history, Id);
    setEditLoading(false);
  };

  const classes = MyCustomStyle();
  const history = useHistory();
  const [faqImgName, setFaqImgName] = useState("");
  console.log("faqByIdData", faqByIdData);
  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="change_faqs" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar module="FAQs" item="Edit" bckLink="/mooner/details/fqa" />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Edit FAQs
          </Typography>

          <Formik
            enableReinitialize={true}
            initialValues={{
              question:
                faqByIdData && faqByIdData.question ? faqByIdData.question : "",
              answer:
                faqByIdData && faqByIdData.answer ? faqByIdData.answer : "",
              sorting_key:
                faqByIdData && faqByIdData.sorting_key
                  ? faqByIdData.sorting_key
                  : "",
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
                          value={values.question}
                        />
                      </Grid>
                    </Grid>

                    {errors.question && touched.question ? (
                      <div
                        style={{
                          color: "red",
                        }}
                      >
                        {errors.question}
                      </div>
                    ) : null}

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
                          value={values.answer}
                        />
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
                        md={6}
                        lg={6}
                        xl={6}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          Position
                        </Typography>

                        <TextField
                          value={values?.sorting_key}
                          id="outlined-basic"
                          placeholder="Position"
                          variant="outlined"
                          name="sorting_key"
                          onChange={handleChange}
                          className={[classes.field, classes.removeOutline]}
                        />
                      </Grid>
                    </Grid>

                    <Grid container className={classes.mainContainer}>
                      <MultiImagesUpload
                        name="edit_faqs_image"
                        maxSize={2}
                        // accept="image/png"
                        defaultImages={faqByIdData?.faqs_image || []}
                        maxFiles={3}
                        onChange={onChangeFiles}
                        setReRender={setReRender}
                        reRender={reRender}
                        component="edit"
                      />
                    </Grid>
                    {errors.answer && touched.answer ? (
                      <div
                        style={{
                          color: "red",
                        }}
                      >
                        {errors.answer}
                      </div>
                    ) : null}
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      {editLoading ? "Loading" : "Update"}
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
const mapStateToProps = ({ faq, loader }) => {
  return {
    faqByIdData: faq.FAQById,
    loading: loader.loading,
  };

};
export default connect(mapStateToProps, { updatefaqAction, getfaqByIdAction })(
  EditFAQs
);
