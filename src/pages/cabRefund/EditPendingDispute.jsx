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
  TextareaAutosize,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import Topbar from "../topbar";
import { useHistory, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { MyCustomStyle } from "../../assets/styles/MyStyles";

import {
  getSinglePendingDispute,
  RejectAction,
  ApproveAction,
} from "../../redux/actions/disputeManagement/dispute.actions";
import ImageModal from "../../common/imageModal/ImageModal";
import { MessageRight } from "../../common/MessageCustom";
import { Box } from "@material-ui/core/Box";
import moment from "moment";
import { base_url_auto, base_url_file_auto } from "../../utils/global";
import Permissions from "../subAdmin/Permissions";
import { baseURL } from "../../api";
import axios from "axios";
import { setSnackbar } from "../../utils/global.actions";

const validationSchema = Yup.object().shape({
  admin_comments: Yup.string().required("* Field is required"),
  won_by: Yup.string().required("* Field is required"),
});

const EditPendingDisputes = ({}) => {
  const classes = MyCustomStyle();
  const history = useHistory();
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [error, setError] = useState(false);
  const [getcharacter, setGetcharacter] = useState("");
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const handleSubmit = async (values) => {
    //("values", values);
    const payload = {
      admin_comments: values.admin_comments,
      dispute_status: "Approved",
      won_by: values.won_by,
    };
    console.log("payload", payload);
    const res = await axios.put(
      `${baseURL}dispute_management/cab_admin_update_dispute/${id}/`,
      payload,
      config
    );
    console.log("response resolve", res);
    if (res?.data?.status) {
      history.push("/mooner/details/pending_cab_disputes");
      setTimeout(() => {
        dispatch(setSnackbar(res?.data?.message));
      }, 100);
    }
  };
  const handleRejected = async (values) => {
    const payload = {
      admin_comments: values?.admin_comments,
    };
    console.log("values", payload);
    const res = await axios.put(
      `${baseURL}dispute_management/cab_admin_update_dispute/${id}/`,
      payload,
      config
    );
    if (res?.data?.status) {
      history.push("/mooner/details/pending_cab_disputes");
      setTimeout(() => {
        dispatch(setSnackbar(res?.data?.message));
      }, 100);
    }
  };

  let spDocuments = [];
  let ssDocuments = [];
  if (data && data.dispute_in_dispute_files) {
    spDocuments = data.dispute_in_dispute_files.filter(
      (res, i) => res.uploaded_by === "SP"
    );
    ssDocuments = data.dispute_in_dispute_files.filter(
      (res, i) => res.uploaded_by !== "SP"
    );
  }
  // const handleApprove = () => {
  //   const payload = {
  //     budget: data && data.booking && data.booking,
  //     dispute_status: "Approved",
  //   };
  //   ApproveAction(payload, id);
  // };
  const [historyShow, setHistoryShow] = useState(false);
  const setTim = (date, hours) => {
    const dat = new Date(date);
    dat.setTime(dat.getTime() + hours * 60 * 60 * 1000);
    //("date", dat);
    const x = moment(dat).format("MMMM Do YYYY, h:mm a");
    //("x", x);
    return x;
  };

  const getRecord = async () => {
    const res = await axios.get(
      `${baseURL}dispute_management/cab_disputes/${id}`,
      config
    );
    console.log("response edit cab", res);
    setData(res?.data?.data);
  };

  useEffect(() => {
    getRecord();
  }, []);
  return (
    <>
      <Permissions page="change_dispute" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          budget: data && data.budget ? data.budget : "",
          cab_booking: data && data.cab_booking ? data.cab_booking : "",
          dispute_status:
            data && data.dispute_status ? data.dispute_status : "",
          sp_name: data && data.sp_name ? data.sp_name : "",
          ss_created_at:
            data && data.ss_created_at ? data.ss_created_at.slice(0, 10) : "",
          ss_name: data && data.ss_name ? data.ss_name : "",
          disputed_by: data && data.disputed_by ? data.disputed_by : "",
          ss_description:
            data && data.ss_description ? data.ss_description : "",
          sp_description:
            data && data.sp_description ? data.sp_description : "",
          won_by: data && data.won_by ? data.won_by : "",
          booking_detail:
            data && data.booking_detail ? data.booking_detail : "",
          booking_time:
            data && data.booking_detail
              ? data.booking_time.slice(0, 10) +
                "  " +
                data.booking_time.slice(11, 16)
              : "",
          dispute_id: data?.id || "",
          admin_comments: "",
          ss_created_at: data?.ss_created_at || "",
          service_id: data?.service_id || "",
          job_id: data && data?.job_id ? data?.job_id : "",
        }}
        validationSchema={validationSchema}
        // validate={(values) => validationSchema(formType, values)}
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
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Container maxWidth="xl">
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <Topbar
                    module="Pending Dispute"
                    item="Edit"
                    bckLink="/mooner/details/pending_disputes"
                  />
                </Grid>
              </Grid>
              <div className={classes.root}>
                <Typography className={classes.Title} gutterBottom>
                  Pending Dispute
                </Typography>
                <Grid container spacing={2} className={classes.mainContainer}>
                  <Grid xs={12}>
                    <Grid
                      container
                      spacing={2}
                      className={classes.mainContainer}
                    >
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
                          SS Name
                        </Typography>
                        <TextField
                          type="text"
                          name="sp_name"
                          id="outlined-basic"
                          value={values?.ss_name}
                          variant="outlined"
                          // onChange={handleChange}
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
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
                          SP Name
                        </Typography>
                        <TextField
                          type="text"
                          name="ss_name"
                          id="outlined-basic"
                          value={values.sp_name}
                          variant="outlined"
                          // onChange={handleChange}
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
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
                        md={4}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Cab Booking
                        </Typography>
                        <TextField
                          type="text"
                          name="cab_booking"
                          id="outlined-basic"
                          value={values.cab_booking}
                          variant="outlined"
                          // onChange={handleChange}
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
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
                          Disputed By
                        </Typography>
                        <TextField
                          type="text"
                          name="disputed_by"
                          id="outlined-basic"
                          value={values.disputed_by}
                          variant="outlined"
                          // onChange={handleChange}
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                        />
                      </Grid>
                      <Grid
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      ></Grid>
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
                        md={4}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          Budget
                        </Typography>
                        <TextField
                          type="text"
                          name="budget"
                          id="outlined-basic"
                          value={values.budget}
                          variant="outlined"
                          // onChange={handleChange}
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          Dispute Created
                        </Typography>

                        <TextField
                          type="text"
                          name="ss_created_at"
                          id="outlined-basic"
                          value={moment(moment(values?.ss_created_at))
                            .add(0, "hours")
                            .format("YYYY-MM-DD[T]HH:mm")
                            .replace("T", " ")}
                          variant="outlined"
                          // onChange={handleChange}
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                        />
                      </Grid>
                      {/* <Grid
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
                          Booking Detail
                        </Typography>
                        <TextField
                          type="text"
                          name="booking_detail"
                          id="outlined-basic"
                          value={values.booking_detail}
                          variant="outlined"
                          // onChange={handleChange}
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                        />
                      </Grid> */}
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
                        md={4}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          Booking Time
                        </Typography>
                        <TextField
                          type="text"
                          name="booking_time"
                          id="outlined-basic"
                          value={moment
                            .utc(values?.booking_time)
                            .format("MMMM Do YYYY, h:mm:ss a")}
                          variant="outlined"
                          // onChange={handleChange}
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
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
                          <br />
                          Won by
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.won_by}
                            name="won_by"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="won_by"
                            // disabled={true}
                            // displayEmpty
                            className={classes.changeColorYellow}
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
                              // style={{ color: "yellow" }}
                              value={"SS"}
                            >
                              SS
                            </MenuItem>
                            <MenuItem
                              // style={{ color: "yellow" }}
                              value={"SP"}
                            >
                              SP
                            </MenuItem>
                          </Select>
                          {errors && errors.won_by && touched.won_by ? (
                            <div className="error-text">{errors.won_by}</div>
                          ) : null}
                        </FormControl>
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
                        md={4}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          Status
                        </Typography>

                        <TextField
                          type="text"
                          name="dispute_status"
                          id="outlined-basic"
                          value={values.dispute_status}
                          variant="outlined"
                          // onChange={handleChange}
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
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
                          <br />
                          Dispute ID
                        </Typography>

                        <TextField
                          type="text"
                          name="dispute_id"
                          id="outlined-basic"
                          value={values.dispute_id}
                          variant="outlined"
                          // onChange={handleChange}
                          disabled={true}
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      className={classes.mainContainer}
                    >
                      <Grid
                        items
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        style={{ marginBottom: "10px" }}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Document Details from SP
                        </Typography>
                      </Grid>
                      {spDocuments.length > 0 ? (
                        spDocuments.map((res, i) => {
                          return (
                            // <Grid
                            //   container
                            //   spacing={2}
                            //   className={classes.bannerContainer}
                            // >
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
                            >
                              <ImageModal
                                styleJx={{
                                  width: "100%",
                                  height: "100%",
                                  cursor: "pointer",
                                }}
                                path={`${base_url_auto}${res.file_url}`}
                              />
                            </Grid>
                            // </Grid>
                          );
                        })
                      ) : (
                        <Grid items xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography className={classes.label} gutterBottom>
                            No evidence found
                          </Typography>
                        </Grid>
                      )}
                      <Grid
                        items
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        style={{ marginBottom: "10px" }}
                      >
                        <Typography
                          className={classes.label}
                          gutterBottom
                          style={{ marginTop: "40px" }}
                        >
                          Document Details from SS
                        </Typography>
                      </Grid>

                      {ssDocuments.length > 0 ? (
                        ssDocuments.map((res, i) => {
                          return (
                            // <Grid
                            //   container
                            //   spacing={2}
                            //   className={classes.bannerContainer}
                            // >
                            <Grid
                              itemsxs={4}
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
                            >
                              <ImageModal
                                styleJx={{
                                  width: "100%",
                                  height: "100%",
                                  cursor: "pointer",
                                }}
                                path={`${base_url_auto}${res.file_url}`}
                              />
                            </Grid>
                            // </Grid>
                          );
                        })
                      ) : (
                        <Grid items xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography className={classes.label} gutterBottom>
                            No evidence found
                          </Typography>
                        </Grid>
                      )}
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
                        md={8}
                        lg={8}
                        xl={8}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          SS Description
                        </Typography>
                        <TextareaAutosize
                          name="ss_description"
                          aria-label="minimum height"
                          rowsMin={8}
                          value={values.ss_description}
                          className={classes.blockTextArea}
                          disabled={true}
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
                        md={8}
                        lg={8}
                        xl={8}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          SP Description
                        </Typography>
                        <TextareaAutosize
                          name="sp_description"
                          aria-label="minimum height"
                          rowsMin={8}
                          value={values.sp_description}
                          className={classes.blockTextArea}
                          disabled={true}
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
                        md={8}
                        lg={8}
                        xl={8}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          Admin history
                        </Typography>
                        <Typography
                          className={classes.blockTextArea}
                          gutterBottom
                          style={{
                            background: "#f0f3f8",
                          }}
                        >
                          {data?.admin_comments
                            ?.slice(
                              0,
                              !historyShow ? 2 : data?.admin_comments?.length
                            )
                            ?.map((item, i) => {
                              return (
                                <MessageRight
                                  key={i}
                                  message={item?.admin_comments}
                                  timestamp={moment(moment(item?.updated_at))
                                    .add(0, "hours")
                                    .format("YYYY-MM-DD[T]HH:mm")
                                    .replace("T", " ")}
                                  avatarDisp={true}
                                />
                              );
                            })}

                          {!historyShow && data?.admin_comments?.length > 2 && (
                            <Button
                              style={{ float: "right", marginRight: "10px" }}
                              onClick={() => setHistoryShow(true)}
                            >
                              <ExpandMoreIcon />
                            </Button>
                          )}
                          {historyShow && data?.admin_comments?.length > 2 && (
                            <Button
                              style={{ float: "right", marginRight: "10px" }}
                              onClick={() => setHistoryShow(false)}
                            >
                              <ExpandLessIcon />
                            </Button>
                          )}
                          {data?.admin_comments?.length === 0 &&
                            "comments not found"}
                        </Typography>

                        {/* <TextareaAutosize
													name="sp_description"
													aria-label="minimum height"
													rowsMin={8}
													value={values.sp_description}
													className={classes.blockTextArea}
													disabled={true}
												/> */}
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
                        md={8}
                        lg={8}
                        xl={8}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          Admin comment
                        </Typography>
                        <TextareaAutosize
                          name="admin_comments"
                          aria-label="minimum height"
                          rowsMin={8}
                          className={classes.textArea}
                          // onChange={(e) => {
                          //   handleComment(e);
                          // }}
                          onChange={(e) => {
                            setFieldValue("admin_comments", e.target.value);
                            setGetcharacter(e.target.value);
                          }}
                        />
                        {errors &&
                        errors.admin_comments &&
                        touched.admin_comments ? (
                          <div className="error-text">
                            {errors.admin_comments}
                          </div>
                        ) : null}
                        {/* <div>
                          {error === true && getcharacter.length === 0 ? (
                            <span className="error-text">
                              * Field is required
                            </span>
                          ) : (
                            ""
                          )}
                        </div> */}
                      </Grid>
                    </Grid>

                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.button}
                      onClick={() => handleRejected(values)}
                    >
                      Update
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={handleSubmit}
                      className={classes.button}
                    >
                      Resolve
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditPendingDisputes;
