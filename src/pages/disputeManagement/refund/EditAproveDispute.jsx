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

import * as Yup from "yup";
import { Formik, Form } from "formik";

import Topbar from "../../topbar";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";

import {
  getSinglePendingDispute,
  RejectAction,
  ApproveAction,
} from "../../../redux/actions/disputeManagement/dispute.actions";

const validationSchema = Yup.object().shape({});

const EditAproveDispute = ({
  getSinglePendingDispute,
  RejectAction,
  ApproveAction,
  pendingData,
}) => {
  const classes = MyCustomStyle();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getSinglePendingDispute(id);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handledisapprove = () => {
    const payload = {
      booking_id:
        pendingData && pendingData.booking_id && pendingData.booking_id,
      dispute_status: "Rejected",
    };
    RejectAction(payload, id);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          booking_id:
            pendingData && pendingData.booking_id ? pendingData.booking_id : "",
          category_name:
            pendingData && pendingData.category ? pendingData.category : "",
          dispute_status:
            pendingData && pendingData.dispute_status
              ? pendingData.dispute_status
              : "",
          sp_name:
            pendingData && pendingData.provider ? pendingData.provider : "",
          ss_created_at:
            pendingData && pendingData.ss_created_at
              ? pendingData.ss_created_at.slice(0, 10)
              : "",
          ss_name: pendingData && pendingData.seeker ? pendingData.seeker : "",
          reason: pendingData && pendingData.reason ? pendingData.reason : "",
        }}
        validationSchema={validationSchema}
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
            <Container maxWidth="xl">
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <Topbar
                    module="Approve Dispute"
                    item="Edit"
                    bckLink="/mooner/details/aproved_disputes"
                  />
                </Grid>
              </Grid>
              <div className={classes.root}>
                <Typography className={classes.Title} gutterBottom>
                  Approved Dispute
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
                          value={values.ss_name}
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
                          Category Name
                        </Typography>
                        <TextField
                          type="text"
                          name="category_name"
                          id="outlined-basic"
                          value={values.category_name}
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
                            value={values.dispute_status}
                            name="status"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="status"
                            disabled={true}
                            displayEmpty
                            className={
                              values.dispute_status === "Approved" &&
                              classes.disableChangeColor
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
                              style={{ color: "yellow" }}
                              value={"Approved"}
                            >
                              Approved
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
                          Booking Date
                        </Typography>
                        <TextField
                          type="text"
                          name="booking_id"
                          id="outlined-basic"
                          value={values.booking_id}
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
                          SS created at
                        </Typography>
                        <TextField
                          type="date"
                          name="ss_created_at"
                          id="outlined-basic"
                          value={values.ss_created_at}
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
                        md={8}
                        lg={8}
                        xl={8}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          <br />
                          Reason
                        </Typography>
                        <TextareaAutosize
                          name="reason"
                          aria-label="minimum height"
                          rowsMin={8}
                          value={values.reason}
                          className={classes.blockTextArea}
                          disabled={true}
                        />
                      </Grid>
                    </Grid>

                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.button}
                      onClick={handledisapprove}
                    >
                      Reject
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

const mapStateToProps = ({ dispute }) => {
  return {
    pendingData: dispute.pendingDisputeData,
  };
};
export default connect(mapStateToProps, {
  getSinglePendingDispute,
  RejectAction,
  ApproveAction,
})(EditAproveDispute);
