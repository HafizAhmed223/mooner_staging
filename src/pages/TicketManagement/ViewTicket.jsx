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
import { MyCustomStyle } from "../Announcement/MyStyles";
import { connect } from "react-redux";
import { getTicket } from "../../redux/actions/ticket/ticket.action";
import { base_url_auto, base_url_file_auto } from "./../../utils/global";
import Permissions from "../subAdmin/Permissions";
const myStyle = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F0F3F8",
    height: "auto",
    [mainTheme.breakpoints.only("xl")]: {
      height: "100vh",
    },
    [mainTheme.breakpoints.only("lg")]: {
      height: "100vh",
    },
  },
}));

const ViewTicket = ({ match, getTicket, ticketData }) => {
  const { id } = match.params;
  const classes = MyCustomStyle();
  const history = useHistory();
  useEffect(() => {
    getTicket(id);
  }, []);

  //("ticketData", ticketData);
  const handleChangeBack = () => {
    history.push({
      pathname: "/mooner/details/ticket_management",
    });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Permissions page="view_tickets" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module=" Ticket Management "
              item=" View Ticket "
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
              <Grid Container spacing={2} className={classes.mainContainer}>
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
                    {ticketData && (
                      <Select
                        value="view"
                        name="userType"
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="subCategories"
                        className={classes.disableTextStyle}
                        disabled={true}
                        displayEmpty
                      >
                        <MenuItem
                          className={classes.dropdownMenuStyle}
                          value="view"
                        >
                          {ticketData.category}
                        </MenuItem>
                      </Select>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid Container spacing={2} className={classes.mainContainer}>
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
                    {ticketData && (
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value="view"
                        label="staus"
                        disabled={true}
                      >
                        <MenuItem value="view">{ticketData.status}</MenuItem>
                      </Select>
                    )}
                  </FormControl>
                </Grid>
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
                    Department
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    {ticketData && (
                      <Select
                        value="view"
                        name="userType"
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="subCategories"
                        className={classes.disableTextStyle}
                        disabled={true}
                      >
                        <MenuItem value="view">
                          {ticketData.department}
                        </MenuItem>
                      </Select>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid Container spacing={2} className={classes.mainContainer}>
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
                    name="Content"
                    aria-label="minimum height"
                    rowsMin={8}
                    placeholder="comment"
                    className={classes.blockTextArea}
                    disabled={true}
                    value={ticketData && ticketData.message}
                  />
                </Grid>
              </Grid>
              <Grid Container spacing={2} className={classes.mainContainer}>
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
                    name="Content"
                    aria-label="minimum height"
                    rowsMin={8}
                    placeholder="comment"
                    className={classes.blockTextArea}
                    disabled={true}
                    value={ticketData && ticketData.comments}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                onClick={handleChangeBack}
              >
                Back
              </Button>
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
                <Grid
                  container
                  spacing={2}
                  className={classes.mainContainer}
                  sx={{ marginLeft: "0px !important" }}
                >
                  {ticketData?.profile && (
                    <Grid items xs={12} md={9}>
                      <img
                        src={`${base_url_file_auto}${ticketData?.profile}`}
                        className={classes.bannerAvatarD}
                        alt={` user image`}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12} md={9} className={classes.mainRow}>
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
                      fullWidth
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

export default connect(mapStateToProps, { getTicket })(ViewTicket);
