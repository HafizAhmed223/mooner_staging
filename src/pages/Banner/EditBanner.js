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
  FormControl,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
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
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { baseURL } from "../../api";
import { setSnackbar } from "../../utils/global.actions";

const validationScheme = Yup.object({
  banners_for: Yup.string().required("*This field is required"),
  banners_image: Yup.mixed(),
  promos_url: Yup.string().url("Enter a valid url"),
});

const EditBanner = () => {
  let location = useLocation();
  const {
    state: {
      selectedBanner: { banners_image, banners_for, promos_url, id },
    },
  } = location;
  //("promos_url", promos_url);
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(true);

  const handleCheckbox = (event) => {
    setChecked(
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("banners_for", values?.banners_for);

    values.banners_image &&
      formData.append("banners_image", values.banners_image);
    formData.append("promos_url", values.promos_url);
    formData.append("is_active", checked);
    const res = await axios.patch(
      `${baseURL}privacy/banners/${id}/`,
      formData,
      config
    );
    //("resp", res?.data?.message);
    if (res?.data?.status) {
      setTimeout(() => {
        dispatch(setSnackbar(res?.data?.message, "success"));
      }, 300);
      history.push({ pathname: "/mooner/details/banner" });
    } else {
      dispatch(setSnackbar(res?.data?.message, "error"));
    }
    //("values", values);
  };

  const classes = MyCustomStyle();
  const history = useHistory();
  const [bannerImage, setBannerImage] = useState("");

  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="change_banners" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Banners"
              item="Edit"
              bckLink="/mooner/details/banner"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Edit Banner
          </Typography>
          <Formik
            initialValues={{
              banners_for: banners_for,
              banners_image: null,
              promos_url: promos_url ? promos_url : "",
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
              <Form>
                <Grid container className={classes.mainContainer}>
                  <Grid xs={12}>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Banner for
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            name="banners_for"
                            value={values.banners_for}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="subCategories"
                            className={classes.textStyle}
                            onChange={handleChange}
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
                              value={"SP"}
                            >
                              SP
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"SS"}
                            >
                              SS
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {errors.banners_for && touched.banners_for ? (
                          <div className="error-text">{errors.banners_for}</div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Promos url
                          {/* <span style={{ color: "gray" }}>(optional)</span> */}
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                          name="promos_url"
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <TextField
                            name="promos_url"
                            variant="outlined"
                            onChange={handleChange}
                            defaultValue={promos_url}
                          />
                        </FormControl>

                        {errors.promos_url && touched.promos_url ? (
                          <div className="error-text">{errors.promos_url}</div>
                        ) : null}
                      </Grid>
                    </Grid>

                    {/* IMAGES */}
                    <Grid
                      container
                      spacing={2}
                      className={classes.mainContainer}
                      style={{ marginBottom: "20px" }}
                    >
                      <Grid
                        items
                        xs={4}
                        sm={4}
                        md={2}
                        lg={2}
                        xl={2}
                        style={{
                          marginRight: "33px",
                          maxWidth: "100px",
                          maxHeight: "100px",
                          marginBottom: "20px",
                        }}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          Image
                        </Typography>
                        <ImageModal
                          styleJx={{
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                          }}
                          path={banners_image}
                        />
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
                        style={{ marginTop: "30px" }}
                        className={classes.mainRow}
                      >
                        <div className={classes.imageWrapper}>
                          <Typography className={classes.label} gutterBottom>
                            Change Image
                          </Typography>
                          <div className={classes.inputImage}>
                            <Tooltip title={bannerImage} arrow>
                              <Typography className={classes.imageName}>
                                {bannerImage && bannerImage?.slice(0, 10)}
                              </Typography>
                            </Tooltip>
                            <label htmlFor="avatarUpload">
                              <img src={Link} className={classes.linkImage} />
                            </label>

                            <input
                              type="file"
                              onChange={(e) => {
                                //("file", e.target.files[0]);
                                setFieldValue(
                                  "banners_image",
                                  e.target.files[0]
                                );
                                setBannerImage(e.target.files[0]?.name);
                              }}
                              onBlur={handleBlur}
                              name="banners_image"
                              accept="image/jpeg, image/png"
                              id="avatarUpload"
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                        <br />
                        {errors.banners_image && touched.banners_image ? (
                          <div className="error-text">
                            {errors.banners_image}
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>

                    {/* End Images */}

                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <div style={{display:'flex'}}>
                        <Typography className={classes.label} gutterBottom>Active
                        </Typography>
                        <Checkbox
                          checked={checked}
                          onChange={handleCheckbox}
                            inputProps={{ "aria-label": " checkbox" }}
                            className={classes.checkbox}
                          />
                          </div>
                      </Grid>
                    </Grid>

                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      {"Save"}
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

export default EditBanner;
