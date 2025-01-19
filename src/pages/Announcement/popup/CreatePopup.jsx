import React, { useState } from "react";
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

import Topbar from "../../topbar";
import { useHistory } from "react-router-dom";
import { MyCustomStyle } from "../MyStyles";
import PlusIcon from "../../../assets/svg/close.svg";
import { Form, Formik } from "formik";
import MultiImagesUpload from "../../../common/multiFiles/MultiImagesUpload";
import { baseURL } from "../../../api";
import { createPopupAction } from "../../../redux/actions/popups/popup.action";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { base_url_staging } from "../../../utils/global";

const CreatePopup = ({ createPopupAction }) => {
  const classes = MyCustomStyle();
  const dispatch = useDispatch()
  const history = useHistory();
  const [area, setArea] = useState("");
  const [acknowlege, setAcknowlege] = useState("");
  const [notification, setNotiication] = useState("");
  const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(false);

  const [loader, setLoader] = useState(false);

  const handleChangeArea = (event) => {
    setArea(event.target.value);
  };
  const handleChangeAcknowlege = (event) => {
    setAcknowlege(event.target.value);
  };

  const handleChangeNotificationGroup = (event) => {
    setNotiication(event.target.value);
  };

  const handleBack = () => {
    history.push({
      pathname: "/mooner/details/announcemet",
    });
  };

  const checkFiles = (files) => {
    const all_images = [];
    files?.map((image) => {
      all_images.push(image?.file);
      //("first", image?.file);
    });
    //("all_images", all_images);
    setImages(all_images);
  };
  const defaultImages = [
    // "https://mooner-staging-media.s3.amazonaws.com/banners_image/profile5.png",
    // "https://mooner-staging-media.s3.amazonaws.com/banners_image/PictureNft.png",
  ];
  const onSubmit = async (values) => {
    let imgUrlsForPOPUPS = [];
    setLoader(true)
    // debugger
    for (let i = 0; i < images.length; i++) {
      let uploadImages = new FormData();
      uploadImages.append("file_for", "pop_up_image/");
      uploadImages.append("file", images[i]);
      try {
        const res = await axios.post(`${baseURL}upload_file/`, uploadImages);
        console.log(res, "api response should come");
        if (res?.data?.status) {
          imgUrlsForPOPUPS.push({ pop_up_image: res?.data?.url });
        }
      } catch (error) {
        console.log("error", error);
      }
    }

    const objectConvertTotring = imgUrlsForPOPUPS.map((item) => {
      setLoader(false)
      return `${base_url_staging}${item.pop_up_image.replace(/\s/g, '')}`
    })
    const formData = {
      message_title: values.message_title,
      message_body: values.message_body,
      pop_up_image: objectConvertTotring,
    };
    console.log("formData", formData);

    await createPopupAction(formData);
    setLoader(false)
    console.log("after",);
  };
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Announcment Management"
              item="Create Popup"
              bckLink="/mooner/details/announcemet"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Popup Details
          </Typography>
          <Formik
            initialValues={{
              message_title: "",
              message_body: "",
              pop_up_image: null,
            }}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, handleChange, values }) => (
              <Form onSubmit={handleSubmit}>
                <Grid xs={10}>
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
                        Title
                      </Typography>
                      <TextField
                        name="message_title"
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Title"
                        value={values.title}
                        onChange={handleChange}
                        className={[classes.field, classes.removeOutline]}
                      />
                    </Grid>
                  </Grid>
                  <Grid Container spacing={2} className={classes.mainContainer}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={8}
                      lg={8}
                      xl={8}
                      className={classes.mainRow}
                    >
                      <Typography className={classes.label} gutterBottom>
                        <br />
                        Content
                      </Typography>
                      <TextareaAutosize
                        name="message_body"
                        aria-label="minimum height"
                        rowsMin={8}
                        placeholder="Content"
                        value={values.content}
                        onChange={handleChange}
                        className={classes.textArea}
                      />
                    </Grid>
                  </Grid>
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
                      <MultiImagesUpload
                        name="pop_up_image"
                        maxSize={2}
                        defaultImages={defaultImages}
                        maxFiles={3}
                        value={values.image}
                        onChange={checkFiles}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    disabled={loader}
                  >
                    Save
                  </Button>
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
  console.log("mapStateToProps", state)

  return {
    loading: state.loader.loading,
  };
};


export default connect(mapStateToProps, { createPopupAction })(CreatePopup);

// export default CreatePopup;
