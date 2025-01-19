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
} from "@material-ui/core";

import * as Yup from "yup";
import Topbar from "../topbar";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { MyCustomStyle } from "../../assets/styles/MyStyles";
import PlusIcon from "../../assets/svg/close.svg";
import PermissionProvider from "./PermissionProvider";
import { getAllPermissions } from "../../redux/actions/auth/auth.action";
import axios from "axios";
import { baseURL } from "../../api";
import { setSnackbar } from "../../utils/global.actions";
import { useDispatch } from "react-redux";
import Permissions from "./Permissions";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const phoneRegExp = /^[\+\d]?(?:[\d-.\s()]*)$/;

const SpValidationschema = Yup.object().shape({
  //   username: Yup.string().required("* Fielld is required"),
});

const RemovePermissions = () => {
  const classes = MyCustomStyle();

  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const history = useHistory();
  const params = useParams();
  const id = params?.id;
  const [subAdminPermissions, setSubAdminPermissions] = useState([]);

  const getGrantedPermissions = async () => {
    try {
      const res = await axios.get(
        `${baseURL}user_management/user_permission/${id}/`,
        config
      );

      if (!res?.data?.status) {
        setTimeout(() => {
          dispatch(setSnackbar(res?.data?.Response, "error"));
        }, 300);
      } else {
        const response = res?.data?.data;
        const dataArray = Object.entries(response);
        console.log("resp", dataArray);

        setSubAdminPermissions(dataArray);
      }
    } catch (error) {
      //("error", error);
    }
  };
  useEffect(() => {
    getGrantedPermissions();
  }, [id]);
  const handleSubmit = async (values) => {
    //("values", values);
    //("unique", permission);
    if (permission?.length > 0) {
      try {
        const res = await axios.post(
          `${baseURL}user_management/remove_permission/${id}/`,
          { permissions: permission },
          config
        );
        //("resp", res);
        if (!res?.data?.status) {
          setTimeout(() => {
            dispatch(setSnackbar(res?.data?.Response, "error"));
          }, 300);
        } else {
          setTimeout(() => {
            dispatch(setSnackbar(res?.data?.Response, "success"));
          }, 300);
          history.push({
            pathname: "/mooner/create_role",
          });
        }
      } catch (error) {
        //("error", error);
      }
    } else {
      setTimeout(() => {
        dispatch(setSnackbar("Please select permissions to remove", "error"));
      }, 300);
    }
  };
  useEffect(() => {
    getAllPermissions();
  }, []);
  const [permission, setPermission] = useState([]);

  return (
    <>
      <Container maxWidth="xl">
        {/* <Permissions page={"add_role"} /> */}
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Roles"
              item="Remove Permissions"
              bckLink="/mooner/create_role"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Remove Permissions
          </Typography>
          <Grid container spacing={2} className={classes.mainContainer}>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  username: "",
                  cell_phone: "",
                  // permissions: [],
                  email: "",
                  password: "",
                  roles: "",
                  // avatarUpload: null,
                }}
                validationSchema={SpValidationschema}
                onSubmit={handleSubmit}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                }) => (
                  <Form onSubmit={handleSubmit} autoComplete="off">
                    <Grid container className={classes.mainContainer}></Grid>
                    {/* <Grid container alignItems="center" justifyContent="center"> */}
                    {subAdminPermissions &&
                      subAdminPermissions?.map((item) => (
                        // //("itemsub", item)
                        <Box className={classes.mainContainer}>
                          <PermissionProvider
                            page={item[0]}
                            options={item[1]}
                            changeHandler={handleChange}
                            setFieldValue={setFieldValue}
                            permission={permission}
                            setPermission={setPermission}
                          />
                        </Box>
                      ))}
                    {/* </Grid> */}

                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      Remove
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

export default RemovePermissions;
