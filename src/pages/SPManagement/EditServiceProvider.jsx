import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  makeStyles,
  TextField,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

import * as Yup from "yup";
import Topbar from "../topbar";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { MyCustomStyle } from "../../assets/styles/MyStyles";
import {
  getSpeByIdAction,
  updateServiceProviderProfileAction,
} from "../../redux/actions/spManagement/spmanagement.actions";
import Permissions from "../subAdmin/Permissions";

const SpValidationschema = Yup.object().shape({
  //   username: Yup.string().required("* Fielld is required"),
  email: Yup.string().email().required("* Field is required"),
  phone: Yup.string()
    .min(9, "cell phone must be between 9 to 15 characters")
    .max(15, "mobile phone must be between 9 to 15 characters")
    .required("* Field is required"),
  firstname: Yup.string().required("* Field is required"),
  lastname: Yup.string().required("* Field is required"),
  status: Yup.string().required("* Field is required"),
});

const statusOptions = {
  true: "Active",
  false: "Inactive",
};

const EditServiceProvider = ({
  getSpeByIdAction,
  updateServiceProviderProfileAction,
  spByidData,
}) => {
  useEffect(() => {
    getIdFromParams();
  }, []);
  const [spId, setSpid] = useState();

  const classes = MyCustomStyle();

  const history = useHistory();
  const getIdFromParams = () => {
    const { location } = history;
    const { pathname } = location;
    let name = pathname;
    let nameArr = name.split("/");
    let id = nameArr[nameArr.length - 1];
    setSpid(id);
    getSpeByIdAction(id);
  };

  const handleNumberFields = (e) => {
    if (
      (e.keyCode < 48 || e.keyCode > 57) &&
      e.keyCode != 8 &&
      e.keyCode != 38 &&
      e.keyCode != 40
    ) {
      return e.preventDefault();
    }
  };
  const handleSubmit = (values) => {
    const payload = {
      id: spId,
      // username: values.username,
      profile: {
        cell_phone: values.phone,
      },
      email: values.email,
      first_name: values.firstname,
      last_name: values.lastname,
      is_active: values.status === "Active" ? true : false,
    };
    updateServiceProviderProfileAction(payload);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Permissions page={"change_user"} />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="SP Management"
              item="SP Profile"
              bckLink="/mooner/details/sp_management"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            SP Details
          </Typography>
          <Grid container spacing={2} className={classes.mainContainer}>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  username:
                    spByidData && spByidData[0] ? spByidData[0].username : "",
                  email: spByidData && spByidData[0] ? spByidData[0].email : "",
                  phone:
                    spByidData && spByidData[0] ? spByidData[0].cell_phone : "",
                  firstname:
                    spByidData && spByidData[0] ? spByidData[0].first_name : "",
                  lastname:
                    spByidData && spByidData[0] ? spByidData[0].last_name : "",
                  reference_id:
                    spByidData && spByidData[0]
                      ? spByidData[0].reference_id
                      : "",
                  status:
                    spByidData && spByidData[0]
                      ? statusOptions[spByidData[0].status]
                      : "",
                  user_level:
                    spByidData && spByidData[0] ? spByidData[0].level : "",
                  earning:
                    spByidData && spByidData[0] ? spByidData[0].earning : "",
                }}
                validationSchema={SpValidationschema}
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
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={3}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Username
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          name="username"
                          id="outlined-basic"
                          placeholder="user name"
                          variant="outlined"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                        {errors.username && touched.username ? (
                          <div className="error-text">{errors.username}</div>
                        ) : null}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={3}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Email
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          name="email"
                          id="outlined-basic"
                          placeholder="email"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.email && touched.email ? (
                          <div className="error-text">{errors.email}</div>
                        ) : null}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={3}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Phone
                        </Typography>
                        <TextField
                          type="tel"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          name="phone"
                          id="outlined-basic"
                          placeholder="phone"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                          // onKeyDown={ e => handleNumberFields(e) }
                          // InputProps={{ inputProps: { min: 1} }}
                        />
                        {errors.phone && touched.phone ? (
                          <div className="error-text">{errors.phone}</div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={3}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          First Name
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstname}
                          name="firstname"
                          id="outlined-basic"
                          placeholder="first name"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.firstname && touched.firstname ? (
                          <div className="error-text">{errors.firstname}</div>
                        ) : null}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={3}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Last Name
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastname}
                          name="lastname"
                          id="outlined-basic"
                          placeholder="last name"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        />
                        {errors.lastname && touched.lastname ? (
                          <div className="error-text">{errors.lastname}</div>
                        ) : null}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={3}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Reference Id
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.reference_id}
                          name="reference_id"
                          id="outlined-basic"
                          placeholder="reference id"
                          variant="outlined"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={3}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Status
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.status}
                            name="status"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="status"
                            displayEmpty
                            className={
                              values.status === "Active"
                                ? classes.changeColor
                                : classes.changeColorRed
                            }
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
                              style={{ color: "green" }}
                              value={"Active"}
                            >
                              Active
                            </MenuItem>
                            <MenuItem
                              style={{ color: "red" }}
                              value={"Inactive"}
                            >
                              Inactive
                            </MenuItem>
                          </Select>
                          {errors.status && touched.status ? (
                            <div
                              className="error-text"
                              style={{ marginTop: "10px" }}
                            >
                              {errors.status}
                            </div>
                          ) : null}
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={3}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Level
                        </Typography>
                        <TextField
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.user_level}
                          name="user_level"
                          id="outlined-basic"
                          placeholder="user level"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                          onKeyDown={(e) => handleNumberFields(e)}
                          // InputProps={{ inputProps: { min: 1} }}
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
                        sm={4}
                        md={4}
                        lg={3}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Earning
                        </Typography>
                        <TextField
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.earning}
                          name="earning"
                          id="outlined-basic"
                          placeholder="earning"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                          onKeyDown={(e) => handleNumberFields(e)}
                          // InputProps={{ inputProps: { min: 1} }}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      Save
                    </Button>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = ({ spManagement }) => {
  return {
    spByidData: spManagement.spById,
  };
};
export default connect(mapStateToProps, {
  getSpeByIdAction,
  updateServiceProviderProfileAction,
})(EditServiceProvider);
