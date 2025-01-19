import React, { useEffect, useState } from "react";
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
  TextareaAutosize,
} from "@material-ui/core";
import axios from "axios";

import Topbar from "../../topbar";
import { useHistory, useParams } from 'react-router-dom';
import { MyCustomStyle } from "../MyStyles";
import PlusIcon from '../../../assets/svg/close.svg';
import CommonCard from "../../../common/CommonCard";
import { getPopupByIdAction, updatePopupAction } from "../../../redux/actions/popups/popup.action";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MultiImagesUpload from "../../../common/multiFiles/MultiImagesUpload";
import { baseURL } from "../../../api";
import { base_url_staging } from "../../../utils/global";


const validationScheme = Yup.object({
  message_title: Yup.string().required("M*essage Title is required"),
  message_body: Yup.string().required("*Message Body is required"),
});
const EditPopup = ({ getPopupByIdAction, updatePopupAction, popupByIdData, loading }) => {
  // console.log(id, "coming from list")
  const [id, setid] = useState(null);
  const [reRender, setReRender] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  console.log(popupByIdData, "single object by id-----")

  const classes = MyCustomStyle();
  const history = useHistory();
  // console.log("history", history)
  const [area, setArea] = useState("");
  const [acknowlege, setAcknowlege] = useState("");
  const [notification, setNotiication] = useState("");
  const [defaultImages, setDefaultImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);

  // const handleChangeArea = (event) => {
  //   setArea(event.target.value);
  // };
  // const handleChangeAcknowlege = (event) => {
  //   setAcknowlege(event.target.value);
  // };

  // const handleChangeNotificationGroup = (event) => {
  //   setNotiication(event.target.value);
  // }

  // const handleBack = () => {
  //   history.push({
  //     pathname: '/mooner/details/announcemet'
  //   })
  // }
  useEffect(() => {
    // console.log(popupByIdData, 'popupByIdData?.pop_up_image')
    // console.log(popupByIdData, "haseeb-------")
    // console.log(popupByIdData?.pop_up_image, "haseeb-------")
    setImages(popupByIdData?.pop_up_image)
    // console.log(images, "images")
    let defaultImages = popupByIdData?.pop_up_image.map((item, index) => {
      const parts = item?.split("com/");
      const currentIndex = index * 2 + 1;

      return {
        id: currentIndex,
        faq_id: currentIndex,
        faqs_image: parts.length > 1 ? parts[1] : "",
      };
    });
    setDefaultImages(defaultImages)
  }, [popupByIdData?.pop_up_image])
  useEffect(() => {
    getIdFromParams()
  }, [reRender])
  const [images, setImages] = useState([]);
  const [defaultimg, setDefaultImg] = useState([])

  const getIdFromParams = () => {
    const { location } = history;
    const { pathname } = location;
    let name = pathname;
    let nameArr = name.split("/");
    let fid = nameArr[nameArr.length - 1];
    setid(fid);
    let a = getPopupByIdAction(fid);
    console.log(a, "----------hasee")
    // getPopupByIdAction(fid);
    // console.log(fid, "--------")
    setImages(popupByIdData?.pop_up_image)
    // console.log(popupByIdData, "images111111")
    // console.log(images, "images111111")

  };
  const params = useParams();
  // console.log("params", params)
  const Id = params?.id;
  const onChangeFiles = (files, pre) => {

    if (pre == false) {

      const all_images = [];
      files?.map((image) => {
        // console.log(image, "file image")
        all_images.push(image?.file);
      });
      setImages(all_images);
    }
    else {
      
      // const old_all_images = removeImages;
      // files?.map((image, ind) => {
      //   if (image?.src?.split('https://mooner-staging-files.s3-us-west-2.amazonaws.com/').length > 1) {
      //     old_all_images.push({ id: Number(ind + 1), faq_id: Number(ind + 1), faqs_image: image?.src.split('https://mooner-staging-files.s3-us-west-2.amazonaws.com/')[1] });
      //   }
      // });
      
      // setRemoveImages(old_all_images)

      let old_all_images =[];
      files?.map((image, ind) => {
        if (image?.src?.split('https://mooner-staging-files.s3-us-west-2.amazonaws.com/').length > 1) {
          old_all_images=defaultImages.filter((item) => item.faqs_image !== image?.src.split('https://mooner-staging-files.s3-us-west-2.amazonaws.com/')[1])
        }
      });
      // setRemoveImages(old_all_images)
      setDefaultImages(old_all_images)
      const all_images = [];
      files?.map((image) => {
        if (image?.file != undefined) {
          // console.log(image, "file image")
          all_images.push(image?.file);
        }
      });

      setImages(all_images);
    }

    // setDefaultImages(files)
  };
  const handleSubmit = async (values) => {
    // console.log(values, "formdvalues");
    setEditLoading(true);
    let imgUrlsForPopup = [];
    console.log(defaultImages)
    setImages(defaultImages)
    if (images) {
      await Promise.all(images.map(async (image) => {
        // if(image?.name){
        let uploadImages = new FormData();
        uploadImages.append("file_for", "pop_up_image/");
        uploadImages.append("file", image);

        try {
          const res = await axios.post(`${baseURL}upload_file/`, uploadImages);
          console.log("res", res);

          if (res?.data?.status) {
            imgUrlsForPopup.push({ pop_up_image: res?.data?.url });
          }
        } catch (error) {
          console.log("error", error);
        }
      // }
      }));
      
    }
    const objectConvertTotring = imgUrlsForPopup.map((item) => {
      return `${base_url_staging}${item.pop_up_image.replace(/\s/g, '')}`;
      // return `${base_url_staging}${item.pop_up_image.replace(/\s/g, '')}`

    });
    let defaultObjectConvertTotring=[];
    defaultImages.map((item) => {
      // console.log(removeImages.filter(res => res?.faqs_image == item?.faqs_image),"item")
      if (removeImages.filter(res => res?.faqs_image != item?.faqs_image).length == 0) {
        console.log(removeImages,"remove img")
      console.log(defaultImages,"defaultImages")
        defaultObjectConvertTotring.push(`${base_url_staging}${item.faqs_image}`)
      }
    })
    if(defaultImages.length==removeImages.length){
      defaultObjectConvertTotring=[];
    }

    
      console.log(defaultObjectConvertTotring,"defaultObjectConvertTotring")
    const formData = {
      message_title: values.message_title,
      message_body: values.message_body,
      is_active: values.status,
      pop_up_image: [...objectConvertTotring, ...defaultObjectConvertTotring]
    };
    const { location } = history;
    const { pathname } = location;
    let name = pathname;
    let nameArr = name.split("/");
    let fid = nameArr[nameArr.length - 1];

    // Rest of the code
    await updatePopupAction(formData, history, fid);
    setEditLoading(false);
  };



  // setImages(defaultImages)

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar module="Announcment Management" item="Edit Popup" bckLink="/mooner/details/announcemet" />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Edit Details
          </Typography>
          <Formik
            enableReinitialize={true}
            initialValues={{
              message_title:
                popupByIdData && popupByIdData.message_title ? popupByIdData.message_title : "",
              message_body:
                popupByIdData && popupByIdData.message_body ? popupByIdData.message_body : "",
              status:
                popupByIdData && popupByIdData.is_active ? popupByIdData.is_active : false,
              pop_up_image:
                popupByIdData && popupByIdData.pop_up_image ? popupByIdData.pop_up_image : ""
            }}
            onSubmit={handleSubmit}
            validationSchema={validationScheme}
          >{({
            handleChange,
            handleSubmit,
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
                        Title
                      </Typography>
                      <TextField
                        name="message_title"
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Title"
                        onBlur={handleBlur}
                        value={values.message_title}
                        onChange={handleChange}
                        className={[classes.field, classes.removeOutline]}
                      />
                    </Grid>
                  </Grid>
                  {errors.message_title && touched.message_title ? (
                    <div
                      style={{
                        color: "red",
                      }}
                    >
                      {errors.message_title}
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
                        Body
                      </Typography>

                      <TextareaAutosize
                        name="message_body"
                        id="outlined-basic"
                        aria-label="minimum height"
                        rowsMin={8}
                        placeholder="Body"
                        value={values.message_body}
                        onChange={handleChange}
                        className={classes.textArea}
                      />
                      {/* <TextField
                        name="message_body"
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Body"
                        onBlur={handleBlur}
                        value={values.message_body}
                        onChange={handleChange}
                        className={[classes.field, classes.removeOutline]}
                      /> */}
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
                        Status
                      </Typography>
                      {/* <TextField
                        name="message_body"
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Body"
                        onBlur={handleBlur}
                        value={values.message_body}
                        onChange={handleChange}
                        className={[classes.field, classes.removeOutline]}
                      /> */}

                      <TextField
                        name="status"
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Type"
                        select
                        value={values.status}
                        onChange={handleChange}
                        className={[classes.field, classes.removeOutline]}
                      >
                        <MenuItem value={true}>Active</MenuItem>
                        <MenuItem value={false}>InActive</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                  {errors.message_body && touched.message_body ? (
                    <div
                      style={{
                        color: "red",
                      }}
                    >
                      {errors.message_body}
                    </div>
                  ) : null}
                  <Grid container className={classes.mainContainer}>
                    {/* {popupByIdData?.pop_up_image?.map((image, index) => (
                      <img key={index} src={image} alt={`Image ${index}`} />
                    ))} */}

                    <MultiImagesUpload
                      name="pop_up_image"
                      maxSize={2}
                      defaultImages={defaultImages || []}
                      maxFiles={3}
                      // value={values.image}
                      onChange={onChangeFiles}
                      // setReRender={setReRender}
                      // reRender={reRender}
                      component="edit"
                    />
                    {/* <MultiImagesUpload
                      name="pop_up_image"
                      maxSize={2}
                      // accept="image/png"s
                      defaultImages={defaultImages}
                      maxFiles={3}
                      onChange={onChangeFiles}
                      setReRender={setReRender}
                      reRender={reRender}
                      component="edit"
                      value={values.image}
                    /> */}
                  </Grid>

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
          )}</Formik>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = ({ popup, loader }) => {
  return {
    popupByIdData: popup.PopupById,
    loading: loader.loading,
  };
};
export default connect(mapStateToProps, { updatePopupAction, getPopupByIdAction })(
  EditPopup
);

