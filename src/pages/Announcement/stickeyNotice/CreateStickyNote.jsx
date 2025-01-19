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
import { Form, Formik } from "formik";
import { createAdminNotificationAction } from "../../../redux/actions/adminNotification/adminNotification.action";
import { connect } from "react-redux";

const AddStickyNotice = ({ createAdminNotificationAction }) => {
  const classes = MyCustomStyle();
  const history = useHistory();
  const [area, setArea] = useState("");
  const [acknowlege, setAcknowlege] = useState("");
  const [notification, setNotiication] = useState("");

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

  const handleSubmit = async (values) => {
    // console.log(values)
    setLoader(true)
    try {
      let response = await createAdminNotificationAction(values)
      console.log(response, "api response")
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Announcment Management"
              item="Create Notification"
              bckLink="/mooner/details/announcemet"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Notification Details
          </Typography>
          <Formik
            initialValues={{
              message_title: "",
              message_body: "",
              user_type: ""
            }}
            onSubmit={handleSubmit}
          >{({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Grid Container spacing={2} className={classes.mainContainer}>
                <Grid xs={10}>
                  <Grid container className={classes.mainContainer}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <Typography className={classes.label} gutterBottom>
                        Title
                      </Typography>
                      <TextField
                        name="message_title"
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Title"
                        value={values.message_title}
                        onChange={handleChange}
                        className={[classes.field, classes.removeOutline]}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.mainContainer}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <Typography className={classes.label} gutterBottom>
                        User Type
                      </Typography>
                      {/* <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.user_type}
                        onChange={handleChange}
                      >


                      </Select> */}
                      <TextField
                        name="user_type"
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Type"
                        select
                        value={values.user_type}
                        onChange={handleChange}
                        className={[classes.field, classes.removeOutline]}
                      >
                        <MenuItem value={"SS"}>SS</MenuItem>
                        <MenuItem value={"SP"}>SP</MenuItem>
                        <MenuItem value={"Both"}>Both</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.mainContainer}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <Typography className={classes.label} gutterBottom>
                        Body
                      </Typography>
                      {/* <TextareaAutosize
                        name="message_body"
                        aria-label="minimum height"
                        rowsMin={6}
                        placeholder="body"
                        className={classes.textArea}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values.question}
                      /> */}
                      <TextField
                        name="message_body"
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Body"
                        value={values.message_body}
                        onChange={handleChange}
                        className={[classes.field, classes.removeOutline]}
                      />
                    </Grid>
                  </Grid>
                  {/* <form className={classes.form} noValidate autoComplete="off"> */}
                  {/* <Grid Container spacing={2} className={classes.mainContainer}>
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
                    Date
                  </Typography>
                  <TextField
                    type="date"
                    id="outlined-basic"
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
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
                    Time
                  </Typography>
                  <TextField
                    type="time"
                    id="outlined-basic"
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  />
                </Grid>
              </Grid> */}
                  {/* <Grid Container spacing={2} className={classes.mainContainer}>
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
                    <br />
                    Area
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                      onChange={handleChangeArea}
                      valu={area}
                      name="userType"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="subCategories"
                      className={classes.textStyle}
                    >
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"global"}
                      >
                        Global
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"regional"}
                      >
                        Regional
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"local"}
                      >
                        Local
                      </MenuItem>
                    </Select>
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
                >
                  <Typography className={classes.label} gutterBottom>
                    <br />
                    Acknowledge
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                      onChange={handleChangeAcknowlege}
                      value={acknowlege}
                      name="acknowlage"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="subCategories"
                      className={classes.textStyle}
                    >
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"always"}
                      >
                        Always
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"once"}
                      >
                        Once
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"once"}
                      >
                        None
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                ></Grid>
              </Grid> */}
                  {/* <Grid Container spacing={2} className={classes.mainContainer}>
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
                    <br />
                    Notification Group
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                      onChange={handleChangeNotificationGroup}
                      value={notification}
                      name="acknowlage"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="subCategories"
                      className={classes.textStyle}
                    >
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"internal"}
                      >
                        Internal
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"ss"}
                      >
                        Service Seeker
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"sp"}
                      >
                        Service Provider
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"all"}
                      >
                        All
                      </MenuItem>
                    </Select>
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
                >
                  <Typography className={classes.label} gutterBottom>
                    <br />
                    Heading
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    placeholder="Heading"
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  />
                </Grid>
              </Grid> */}
                  {/* <Grid Container spacing={2} className={classes.mainContainer}>
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
                    name="Content"
                    aria-label="minimum height"
                    rowsMin={8}
                    placeholder="Content"
                    className={classes.textArea}
                  />
                </Grid>
              </Grid> */}

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
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    type="submit"
                    disabled={loader}
                  >
                    Create
                  </Button>
                  {/* </form> */}
                </Grid>
                <Grid xs={2}></Grid>
              </Grid>
            </Form>
          )}</Formik>

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
export default connect(mapStateToProps, { createAdminNotificationAction })(AddStickyNotice);

