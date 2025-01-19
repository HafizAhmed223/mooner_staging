import React, { useState } from "react";
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

import Topbar from "../../topbar";
import {useHistory} from 'react-router-dom';
import CommonCard from "../../../common/CommonCard";
import { MyCustomStyle } from "../MyStyles";
import PlusIcon from '../../../assets/svg/close.svg';

const ViewPopup = () => {
  const classes = MyCustomStyle();
  const history = useHistory();
  const [area, setArea] = useState("");
  const [acknowlege, setAcknowlege] = useState("");
  const [notification, setNotiication] = useState("");

  const handleChangeArea = (event) => {
    setArea(event.target.value);
  };
  const handleChangeAcknowlege = (event) => {
    setAcknowlege(event.target.value);
  };

  const handleChangeNotificationGroup = (event) => {
    setNotiication(event.target.value);
  }

  const handleBack = () => {
      history.push({
          pathname: '/mooner/details/announcemet'
      })
  }

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar module="Announcment Management" item="View Popup" bckLink="/mooner/details/announcemet" />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Popup Details
          </Typography>
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
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Id
                  </Typography>
                  <TextField
                    type="number"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="id"
                    className={[classes.disableField, classes.disableRemoveOutline]}
                    disabled={true}
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
                    Heading
                  </Typography>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="heading"
                    className={[classes.disableField, classes.disableRemoveOutline]}
                    disabled={true}
                  />
                </Grid>
              </Grid>
              <Grid Container spacing={2} className={classes.mainContainer}>
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
                        <br/>
                        Area
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.disableField, classes.disableRemoveOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <Select
                        onChange={handleChangeArea}
                        valu={area}
                        name="userType"
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="subCategories"
                        className={classes.disableTextStyle}
                        disabled={true}
                      >
                        <MenuItem className={classes.dropdownMenuStyle} value={"global"}>
                          Global
                        </MenuItem>
                        <MenuItem className={classes.dropdownMenuStyle} value={"regional"}>
                          Regionel
                        </MenuItem>
                        <MenuItem className={classes.dropdownMenuStyle} value={"local"}>
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
                        <br/>
                        Acknowlege
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
                        className={classes.disableTextStyle}
                        disabled={true}
                      >
                        <MenuItem className={classes.dropdownMenuStyle} value={"always"}>
                          Always
                        </MenuItem>
                        <MenuItem className={classes.dropdownMenuStyle} value={"once"}>
                          Once
                        </MenuItem>
                        <MenuItem className={classes.dropdownMenuStyle} value={"once"}>
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
              </Grid>
              <Grid Container spacing={2} className={classes.mainContainer}>
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
                        <br/>
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
                        className={classes.disableTextStyle}
                        disabled={true}
                      >
                        <MenuItem className={classes.dropdownMenuStyle} value={"internal"}>
                          Internal 
                        </MenuItem>
                        <MenuItem className={classes.dropdownMenuStyle} value={"ss"}>
                          Sercice Seeker
                        </MenuItem>
                        <MenuItem className={classes.dropdownMenuStyle} value={"sp"}>
                          Service Provider
                        </MenuItem>
                        <MenuItem className={classes.dropdownMenuStyle} value={"all"}>
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
                    <div className={classes.imageWrapper}>
                        <Typography className={classes.label}>
                            Image
                        </Typography>
                        <div className={classes.inputImageDisable}>
                        <Typography className={classes.imageName}>
                            Image
                        </Typography>
                        <label >
                            <img src={PlusIcon} className={classes.linkImageBlocked} />
                        </label>
                        <input
                            type="file"
                            onChange={(e) => {
                            setFieldValue("category_image", e.target.files[0]);
                            }}
                            accept="image/*"
                            name="avatarUpload"
                            id="avatarUpload"
                            style={{ display: "none" }}
                        />
                        </div>
                    </div>
                </Grid>
              </Grid>
                <Grid Container spacing={2} className={classes.mainContainer}>
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
                            <br/>
                            Content
                        </Typography>
                        <TextareaAutosize
                            name="Content"
                            aria-label="minimum height"
                            rowsMin={8}
                            placeholder="Content"
                            className={classes.blockTextArea}
                            disabled={true}
                        />
                    </Grid>
                </Grid>

                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    onClick={handleBack}
                >
                    Back
                </Button>
              {/* </form> */}
            </Grid>
            <Grid xs={2}>
                <CommonCard
                    message="Create Sticky Note"
                    btnText= "Create"
                    link= "/mooner/create_popup"
                />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default ViewPopup;
