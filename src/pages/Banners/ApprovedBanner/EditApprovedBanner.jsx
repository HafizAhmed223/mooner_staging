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
import { MyCustomStyle } from "../../Announcement/MyStyles";
import PlusIcon from "../../../assets/svg/close.svg";
import BannerImage from "../../../assets/svg/bannerimg.svg";
import CommonCard from "../../../common/CommonCard";

const EditApprovedBanner = () => {
  const classes = MyCustomStyle();
  const history = useHistory();
  const [category, setCategory] = useState("");
  const [subcategory, setSubategory] = useState("");
  const [status, setStatus] = useState("");
  const [subscription, setSubscription] = useState("");
  const [positon, setPosition] = useState("");

  const handleChangePosition = (event) => {
    setPosition(event.target.value);
  };
  const handleChangeSubscription = (event) => {
    setSubscription(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeSubcategory = (event) => {
    setSubategory(event.target.value);
  };
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeAcknowlege = (event) => {
    setAcknowlege(event.target.value);
  };

  const handleChangeNotificationGroup = (event) => {
    setNotiication(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleBack = () => {
    history.push({
      pathname: "/mooner/details/announcemet",
    });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Banner & Ad Management"
              item="Edit Approved Banner"
              bckLink="/mooner/details/aproved_banner"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Banner Details
          </Typography>
          <Grid Container spacing={2} className={classes.bannerContainer}>
            <Grid items xs={12} sm={6} md={6} lg={6} xl={5}>
              <img src={BannerImage} className={classes.bannerAvatar} />
            </Grid>
          </Grid>
          <Grid Container spacing={2} className={classes.mainContainer}>
            <Grid xs={10}>
              {/* <form className={classes.form} noValidate autoComplete="off"> */}
              <Grid Container spacing={2} className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Heading
                  </Typography>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Id"
                    placeholder="heading"
                    className={[classes.field, classes.removeOutline]}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={3}
                  className={classes.mainRow}
                ></Grid>
              </Grid>
              <Grid Container spacing={2} className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={3}
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
                      onChange={handleChangeCategory}
                      valu={category}
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
                        Food
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"regional"}
                      >
                        Driver
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"local"}
                      >
                        Hair Style
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Subcategory
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                      onChange={handleChangeSubcategory}
                      valu={subcategory}
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
                        Halal
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"regional"}
                      >
                        Fast Food
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"local"}
                      >
                        Vegetarian
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
                ></Grid>
              </Grid>
              <Grid Container spacing={2} className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Duration
                  </Typography>
                  <TextField
                    type="=bumber"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Id"
                    placeholder="Duration"
                    className={[classes.field, classes.removeOutline]}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
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
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={status}
                      onChange={handleChange}
                      label="staus"
                      className={
                        status === "active"
                          ? classes.changeColor
                          : classes.changeColorRed
                      }
                    >
                      <MenuItem style={{ color: "green" }} value={"active"}>
                        Active
                      </MenuItem>
                      <MenuItem style={{ color: "red" }} value={"Inactive"}>
                        InActive
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
                ></Grid>
              </Grid>
              <Grid Container spacing={2} className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Subscription
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                      onChange={handleChangeSubscription}
                      valu={subscription}
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
                        Premium
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"global"}
                      >
                        Gold
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"regional"}
                      >
                        Silver
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"local"}
                      >
                        Platinum
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Position
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                      onChange={handleChangePosition}
                      value={positon}
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
                        Top Right
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"regional"}
                      >
                        Top Left
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"local"}
                      >
                        Bottom Left
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"local"}
                      >
                        Bottom Right
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
                ></Grid>
              </Grid>
              <Grid Container spacing={2} className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={6}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    <br />
                    Discription
                  </Typography>
                  <TextareaAutosize
                    name="Content"
                    aria-label="minimum height"
                    rowsMin={8}
                    placeholder="Content"
                    className={classes.textArea}
                  />
                </Grid>
              </Grid>

              {/* <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    onClick={handleBack}
                >
                    Back
                </Button> */}
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
              >
                Save
              </Button>
              {/* </form> */}
            </Grid>
            <Grid xs={2}>
              <CommonCard
                message="Add Banner"
                btnText="Create"
                // link= "/mooner/create_banner"
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default EditApprovedBanner;
