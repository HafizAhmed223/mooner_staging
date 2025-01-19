import React, { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  makeStyles,
  TextareaAutosize,
  Tooltip,
  Checkbox,
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
} from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { createfaqAction } from "../../redux/actions/faq/faq.actions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Topbar from "../topbar";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import Permissions from "../subAdmin/Permissions";
import Link from "../../assets/svg/link.svg";
import axios from "axios";
import { baseURL } from "../../api";
import { setSnackbar } from "../../utils/global.actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const validationScheme = Yup.object({
  banners_for: Yup.string().required("*This field is required"),
  banners_image: Yup.mixed().required("*This field is required"),
  promos_url: Yup.string().url("Enter a valid url"),
});
const AddBanner = ({ createfaqAction, loading }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [checked, setChecked] = useState(true);

  const handleCheckbox = (event) => {
    setChecked(
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const handleSubmit = async (values) => {
    //("values", values);
    const formData = new FormData();
    formData.append("banners_for", values.banners_for);
    formData.append("promos_url", values.promos_url);

    formData.append("banners_image", values.banners_image);
    formData.append("is_active", checked);
    
    const res = await axios.post(
      `${baseURL}privacy/banners/`,
      formData,
      config
    );
    //("resp", res?.data);
    if (res?.data?.status) {
      setTimeout(() => {
        dispatch(setSnackbar(res?.data?.message, "success"));
      }, 300);
      history.push({ pathname: "/mooner/details/banner" });
    } else {
      dispatch(setSnackbar(res?.data?.message, "error"));
    }
  };
  const classes = MyCustomStyle();
  const [faqImgName, setFaqImgName] = useState("");
  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="add_banners" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Banners"
              item="Add"
              bckLink="/mooner/details/banner"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Add Banner
          </Typography>

          <Formik
            initialValues={{
              banners_for: "",
              banners_image: null,
              promos_url: "",
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
                          <span style={{ color: "gray" }}>(optional)</span>
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
                          />
                        </FormControl>

                        {errors.promos_url && touched.promos_url ? (
                          <div className="error-text">{errors.promos_url}</div>
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
                        <div className={classes.imageWrapper}>
                          <Typography className={classes.label} gutterBottom>
                            Upload Image
                          </Typography>
                          <div className={classes.inputImage}>
                            <Tooltip title={faqImgName} arrow>
                              <Typography className={classes.imageName}>
                                {faqImgName && faqImgName?.slice(0, 10)}
                              </Typography>
                            </Tooltip>
                            <label htmlFor="avatarUpload">
                              <img src={Link} className={classes.linkImage} />
                            </label>
                            {/* <label htmlFor="avatarUpload">
                              <img src={Link} className={classes.linkImage} />
                            </label> */}
                            <input
                              type="file"
                              onChange={(e) => {
                                setFieldValue(
                                  "banners_image",
                                  e.target.files[0]
                                );
                                setFaqImgName(e.target.files[0]?.name);
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
                        label="Active"
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
const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
  };
};
export default connect(mapStateToProps, { createfaqAction })(AddBanner);
