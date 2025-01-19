import React, { useState, useEffect } from "react";
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
  makeStyles,
  TextareaAutosize,
  Box,
} from "@material-ui/core";

import Topbar from "../topbar";
import { useHistory } from "react-router-dom";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import { connect } from "react-redux";
import {
  getTicket,
  updateTicket,
} from "../../redux/actions/ticket/ticket.action";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  base_url_auto,
  base_url_file_auto,
  base_url_file_staging,
} from "./../../utils/global";
import Permissions from "../subAdmin/Permissions";

const EditTicket = ({
  match,
  ticketData,
  getTicket,
  updateTicket,
  loading,
}) => {
  const { id } = match.params;
  const classes = MyCustomStyle();
  const [dept, setDept] = useState("");

  useEffect(() => {
    getTicket(id);
  }, []);
  //("ticket data", ticketData);
  const editTicketSchema = Yup.object().shape({
    comments: Yup.string().required("* comment is required"),
    // message: Yup.mixed().optional("* message icon is required"),
    // category: Yup.mixed().optional("* category icon is required"),
    status: Yup.mixed().optional("* status icon is required"),
  });
  const handleSubmit = (values) => {
    updateTicket(values, id);
  };
  const handleChangeDept = (event) => {
    setDept(event.target.value);
  };
  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="change_tickets" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" Ticket Management "
              item=" Edit Ticket "
              bckLink="/mooner/details/ticket_management"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Ticket Details
          </Typography>
          <Grid Container spacing={2} className={classes.mainContainer}>
            <Grid xs={12} md={8}>
              {/* <form className={classes.form} noValidate autoComplete="off"> */}
              <Formik
                enableReinitialize
                initialValues={{
                  comments: ticketData.comments ? ticketData.comments : "",
                  status: ticketData.status ? ticketData.status : "",
                  category: ticketData.category ? ticketData.category : "",
                  message: ticketData.message ? ticketData.message : "",
                  department: ticketData.department
                    ? ticketData.department
                    : "",
                }}
                validationSchema={editTicketSchema}
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
                    <Grid
                      Container
                      spacing={2}
                      className={classes.mainContainer}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Category
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="category"
                            value={values.category}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="subCategories"
                            className={classes.disableTextStyle}
                            disabled={true}
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
                              value={"General"}
                            >
                              General
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"Bugs Reporting"}
                            >
                              Bugs Reporting
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"Accounts"}
                            >
                              Accounts
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {errors.category && touched.category ? (
                          <div className="error-text">{errors.category}</div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid
                      Container
                      spacing={2}
                      className={classes.mainContainer}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={4}
                        xl={4}
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
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="status"
                            value={values.status}
                            label="staus"
                            className={
                              (values.status === "Active" &&
                                classes.changeColor) ||
                              (values.status === "Closed" &&
                                classes.changeColorRed) ||
                              (values.status === "Pending" &&
                                classes.changeColorYellow)
                            }
                          >
                            <MenuItem
                              style={{ color: "green" }}
                              value={"Active"}
                            >
                              Active
                            </MenuItem>
                            <MenuItem
                              style={{ color: "#B1991C" }}
                              value={"Pending"}
                            >
                              Pending
                            </MenuItem>
                            <MenuItem style={{ color: "red" }} value={"Closed"}>
                              Closed
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {errors.status && touched.status ? (
                          <div className="error-text">{errors.status}</div>
                        ) : null}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Department
                        </Typography>
                        <FormControl
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                        >
                          <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                          <Select
                            onChange={handleChange}
                            value={values.department}
                            name="department"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="department"
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
                              value={"Technical"}
                            >
                              Technical
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"Customer Service"}
                            >
                              Customer Service
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"Dispute Management"}
                            >
                              Dispute Management
                            </MenuItem>
                            <MenuItem
                              className={classes.dropdownMenuStyle}
                              value={"Accounts"}
                            >
                              Accounts
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid
                      Container
                      spacing={2}
                      className={classes.mainContainer}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={8}
                        xl={8}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Message
                        </Typography>
                        <TextareaAutosize
                          name="message"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.message}
                          aria-label="minimum height"
                          rowsMin={8}
                          placeholder="comment"
                          className={classes.blockTextArea}
                          disabled={true}
                        />
                        {errors.message && touched.message ? (
                          <div className="error-text">{errors.message}</div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid
                      Container
                      spacing={2}
                      className={classes.mainContainer}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={8}
                        xl={8}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Comment
                        </Typography>
                        <TextareaAutosize
                          name="comments"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.comments}
                          aria-label="minimum height"
                          rowsMin={8}
                          placeholder="comment"
                          className={classes.textArea}
                        />
                        {errors.comments && touched.comments ? (
                          <div className="error-text">{errors.comments}</div>
                        ) : null}
                      </Grid>
                    </Grid>

                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                      // onClick={handleChangeBack}
                    >
                      {loading ? "Loading" : "Update"}
                    </Button>
                  </Form>
                )}
              </Formik>

              {/* </form> */}
            </Grid>
            <Grid xs={12} md={4}>
              <Box
                style={{
                  border: "1px solid gray",
                  paddingTop: "25px",
                  borderRadius: "10px",
                }}
              >
                <Grid container spacing={2} className={classes.mainContainer}>
                  {ticketData?.profile && (
                    <Grid items xs={12} sm={6} md={6} lg={6} xl={5}>
                      <img
                        src={`${base_url_file_auto}${ticketData?.profile}`}
                        className={classes.bannerAvatar}
                        alt={` user image`}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12} sm={12} md={9} className={classes.mainRow}>
                    <Typography className={classes.label} gutterBottom>
                      Name
                    </Typography>
                    <TextField
                      type="text"
                      name="nameUser"
                      id="outlined-basic"
                      value={ticketData?.name}
                      variant="outlined"
                      // onChange={handleChange}
                      disabled={true}
                      className={[
                        classes.disableField,
                        classes.disableRemoveOutline,
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={9} className={classes.mainRow}>
                    <Typography className={classes.label} gutterBottom>
                      Email
                    </Typography>
                    <TextField
                      type="text"
                      name="nameEmail"
                      id="outlined-basic"
                      value={ticketData?.email}
                      variant="outlined"
                      // onChange={handleChange}
                      disabled={true}
                      className={[
                        classes.disableField,
                        classes.disableRemoveOutline,
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={9} className={classes.mainRow}>
                    <Typography className={classes.label} gutterBottom>
                      CellPhone
                    </Typography>
                    <TextField
                      type="text"
                      name="cell_phone"
                      id="outlined-basic"
                      value={ticketData?.cell_phone}
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
              </Box>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};
const mapStateToProps = ({ ticket, loader }) => {
  return {
    ticketData: ticket.dataById,
    loading: loader.loading,
  };
};
export default connect(mapStateToProps, { getTicket, updateTicket })(
  EditTicket
);
