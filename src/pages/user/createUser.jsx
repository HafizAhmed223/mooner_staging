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
  Box,
  Chip,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import Topbar from "../topbar";
import UserCountCard from "../../common/usersCuntcard";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { MyCustomStyle } from "../../assets/styles/MyStyles";

import { getUserDetail } from "../../redux/actions/booking/booking.action";
import { updateUserProfileAction } from "../../redux/actions/users/users.actions";
import Permissions from "../subAdmin/Permissions";
import axios from "axios";
import { baseURL } from "../../api";

const statusOptions = {
  true: "Active",
  false: "Inactive",
};

const userTypeOptions = {
  Super_Admin: "Super_Admin",
  Sub_Admin: "Sub_Admin",
};
const UserDetails = ({
  getUserDetail,
  updateUserProfileAction,
  userData,
  match,
}) => {
  const { id } = match.params;
  const classes = MyCustomStyle();
  useEffect(() => {
    getUserDetail(id);
  }, []);

  const location = useLocation();
  const fromSubAdminsPage = location?.state?.prevPath?.includes("sub_admins");

  const SpValidationschema = Yup.object().shape({
    // username: Yup.string().required("* Fielld is required"),
    email: Yup.string().email().required("* Field is required"),
    phone:
      !fromSubAdminsPage &&
      Yup.string()
        .min(9, "cell phone must be between 9 to 15 characters")
        .max(15, "mobile phone must be between 9 to 15 characters")
        .required("* Field is required"),
    firstname:
      !fromSubAdminsPage && Yup.string().required("* Field is required"),
    lastname:
      !fromSubAdminsPage && Yup.string().required("* Field is required"),
    status: Yup.string().required("* Field is required"),
  });
  const { group_list } = userData;

  const handleSubmit = (values) => {
    //("add_list", addList, removeList);
    const initialEmail =
      userData && userData?.user_details && userData?.user_details[0]?.email;
    const payload = {
      id: id,
      ...(values?.email != initialEmail && { email: values.email }),
      is_active: values.status === "Active" ? true : false,
      ...(fromSubAdminsPage && { username: values.username }),
      profile: {
        cell_phone: values.phone,
      },

      ...(!fromSubAdminsPage && { first_name: values.firstname }),

      ...(!fromSubAdminsPage && { last_name: values.lastname }),
      ...(fromSubAdminsPage && { user_type: values.user_type }),
      ...(fromSubAdminsPage && { add_list: addList }),
      ...(fromSubAdminsPage && { remove_list: removeList }),
    };
    //("payload", payload);
    updateUserProfileAction(payload);
  };
  //("userData", userData);

  /// Multi Select

  const [removeList, setRemoveList] = useState([]);

  const handleRemoveList = (event) => {
    const {
      target: { value },
    } = event;
    setRemoveList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  // Roles Group
  const [groups, setGroups] = useState([]);
  const [addList, setAddList] = useState([]);
  const handleAddList = (event) => {
    const {
      target: { value },
    } = event;
    console.log("value", value);
    setAddList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  //("addListNames", addList, removeList);
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const getGroups = async () => {
    try {
      const res = await axios.get(
        `${baseURL}user_management/dropdown_groups/`,
        config
      );
      setGroups(res?.data?.data);
      const defaultArr = [];
      for (let i = 0; i < group_list?.length; i++) {
        for (let j = 0; j < res?.data?.data?.length; j++) {
          if (group_list[i].id == res?.data?.data[j].id) {
            defaultArr.push(res?.data?.data[j]);
          }
        }
      }
      console.log("defaultArr", defaultArr);
      setAddList(defaultArr);
    } catch (error) {
      //("error", error);
    }
  };
  useEffect(() => {
    getGroups();
  }, [group_list]);
  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="change_user" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Edit"
              item="User Details"
              bckLink={
                !fromSubAdminsPage
                  ? "/mooner/details/user_management"
                  : "/mooner/details/sub_admins"
              }
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              username:
                userData &&
                userData.user_details &&
                userData.user_details[0] &&
                userData.user_details[0].username
                  ? userData.user_details[0].username
                  : "",
              email:
                userData &&
                userData.user_details &&
                userData.user_details[0] &&
                userData.user_details[0].email
                  ? userData.user_details[0].email
                  : "",
              phone:
                userData &&
                userData.user_details &&
                userData.user_details[0] &&
                userData.user_details[0].phone
                  ? userData.user_details[0].phone
                  : "",
              firstname:
                userData &&
                userData.user_details &&
                userData.user_details[0] &&
                userData.user_details[0].first_name
                  ? userData.user_details[0].first_name
                  : "",
              lastname:
                userData &&
                userData.user_details &&
                userData.user_details[0] &&
                userData.user_details[0].last_name
                  ? userData.user_details[0].last_name
                  : "",
              reference_id:
                userData &&
                userData.user_details &&
                userData.user_details[0] &&
                userData.user_details[0].reference_id
                  ? userData.user_details[0].reference_id
                  : "",
              status:
                userData && userData.user_details && userData.user_details[0]
                  ? statusOptions[userData.user_details[0].status]
                  : "",
              user_type:
                userData && userData.user_details && userData.user_details[0]
                  ? userTypeOptions[userData.user_details[0].user_type]
                  : "",
              add: [{ id: 19, name: "Accountant" }],
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
                <Typography className={classes.Title} gutterBottom>
                  Edit User
                </Typography>
                <Grid container className={classes.mainContainer}>
                  <Grid item xs={12} sm={12} md={8} lg={9} xl={10}>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          {fromSubAdminsPage ? "Name" : "Username"}
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={
                            fromSubAdminsPage
                              ? values?.firstname
                              : values.username
                          }
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
                        lg={4}
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

                      {!fromSubAdminsPage && (
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={4}
                          lg={4}
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
                      )}
                    </Grid>

                    {!fromSubAdminsPage && (
                      <Grid container className={classes.mainContainer}>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={4}
                          lg={4}
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
                          lg={4}
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
                          lg={4}
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
                    )}
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
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
                    </Grid>

                    {/* User Type */}
                    {fromSubAdminsPage && (
                      <Grid container className={classes.mainContainer}>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          lg={3}
                          className={classes.mainRow}
                        >
                          <Typography className={classes.label} gutterBottom>
                            User Type
                          </Typography>
                          <FormControl
                            variant="outlined"
                            className={[classes.field, classes.removeOutline]}
                          >
                            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                            <Select
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.user_type}
                              name={`user_type`}
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              label="group"
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
                                value={"Super_Admin"}
                              >
                                {"Super Admin"}
                              </MenuItem>
                              <MenuItem
                                className={classes.dropdownMenuStyle}
                                value={"Sub_Admin"}
                              >
                                {"Sub Admin"}
                              </MenuItem>
                            </Select>
                          </FormControl>
                          {errors.user_type && touched.user_type ? (
                            <div className="error-text">{errors.user_type}</div>
                          ) : null}
                        </Grid>
                      </Grid>
                    )}

                    {/* User Type */}

                    <Grid container className={classes.mainContainer}>
                      {fromSubAdminsPage && values?.user_type == "Sub_Admin" && (
                        <Grid
                          item
                          xs={6}
                          // sm={4}
                          // md={4}
                          // xl={3}
                          className={classes.mainRow}
                        >
                          <Typography className={classes.label} gutterBottom>
                            Remove
                          </Typography>
                          <FormControl
                            variant="outlined"
                            className={[classes.field, classes.removeOutline]}
                          >
                            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                            <Select
                              onChange={handleRemoveList}
                              onBlur={handleBlur}
                              value={removeList}
                              multiple
                              name="user_type"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              label="User Type"
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
                              renderValue={(selected) => (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                  }}
                                >
                                  {selected.map((value) => (
                                    <Chip key={value?.id} label={value?.name} />
                                  ))}
                                </Box>
                              )}
                            >
                              {group_list?.length > 0 &&
                                group_list?.map((group) => (
                                  <MenuItem value={group}>
                                    {group?.name}
                                  </MenuItem>
                                ))}
                            </Select>
                            {/* {errors.status && touched.status ? (
                              <div
                                className="error-text"
                                style={{ marginTop: "10px" }}
                              >
                                {errors.status}
                              </div>
                            ) : null} */}
                          </FormControl>
                        </Grid>
                      )}
                    </Grid>

                    <Grid container className={classes.mainContainer}>
                      {fromSubAdminsPage && values?.user_type == "Sub_Admin" && (
                        <Grid
                          item
                          xs={6}
                          // sm={4}
                          // md={4}
                          // xl={3}
                          className={classes.mainRow}
                        >
                          <Typography className={classes.label} gutterBottom>
                            Add
                          </Typography>
                          <FormControl
                            variant="outlined"
                            className={[classes.field, classes.removeOutline]}
                          >
                            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                            <Select
                              onChange={handleAddList}
                              onBlur={handleBlur}
                              value={addList}
                              multiple
                              name="add"
                              labelId="demo-simple-select-outlined-label"
                              // id="add"
                              // displayEmpty
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
                              renderValue={(selected) => (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                  }}
                                >
                                  {selected.map(
                                    (value) => (
                                      <Chip
                                        key={value?.id}
                                        label={value?.name}
                                      />
                                    )
                                    // //("selected", value)
                                  )}
                                </Box>
                              )}
                            >
                              {groups?.length > 0 &&
                                groups?.map((group) => (
                                  <MenuItem key={group?.id} value={group}>
                                    {group?.name}
                                  </MenuItem>
                                ))}
                            </Select>
                            {/* {errors.status && touched.status ? (
                              <div
                                className="error-text"
                                style={{ marginTop: "10px" }}
                              >
                                {errors.status}
                              </div>
                            ) : null} */}
                          </FormControl>
                        </Grid>
                      )}
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      Edit User
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={7} md={4} lg={3} xl={2}>
                    <UserCountCard />
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

const mapStateToProps = ({ booking }) => {
  return {
    userData: booking.userData,
  };
};
export default connect(mapStateToProps, {
  getUserDetail,
  updateUserProfileAction,
})(UserDetails);
