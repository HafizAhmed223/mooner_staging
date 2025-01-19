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
import { MyCustomStyle } from "../../../assets/styles/MyStyles";
import PlusIcon from "../../../assets/svg/close.svg";

const AddItems = () => {
  const classes = MyCustomStyle();
  const history = useHistory();
  const [area, setArea] = useState("");

  const handleChangeArea = (event) => {
    setArea(event.target.value);
  };

  const handleBack = () => {
    history.push({
      //   pathname: '/mooner/details/announcemet'
    });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Merchandise Store"
              item="Inventory"
              bckLink="/mooner/details/merchandise_store"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Store Details
          </Typography>
          <Grid container spacing={2} className={classes.mainContainer}>
            <Grid xs={12}>
              <Grid container spacing={2} className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Item name
                  </Typography>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="item name"
                    className={[classes.field, classes.removeOutline]}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Quantity
                  </Typography>
                  <TextField
                    type="number"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="1"
                    className={[classes.field, classes.removeOutline]}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={3}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    <br />
                    Category
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                      onChange={handleChangeArea}
                      valu={area}
                      name="category"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="subCategories"
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
                        value={"global"}
                      >
                        Moving
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"regional"}
                      >
                        Clothing
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        value={"local"}
                      >
                        Haircut
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={3}
                  className={classes.mainRow}
                >
                  <div className={classes.imageWrapper}>
                    <Typography className={classes.label}>Image</Typography>
                    <div className={classes.inputImage}>
                      <Typography className={classes.imageName}>
                        Image
                      </Typography>
                      <label htmlFor="avatarUpload">
                        <img src={PlusIcon} className={classes.linkImage} />
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
              <Grid container spacing={2} className={classes.mainContainer}>
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
                    Requirement Status
                  </Typography>
                  <TextareaAutosize
                    name=""
                    aria-label="minimum height"
                    rowsMin={8}
                    placeholder="requirement status"
                    className={classes.textArea}
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
                Purchase
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
              >
                Purchase from App Store
              </Button>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default AddItems;
