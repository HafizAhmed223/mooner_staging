import React, { useState } from "react";
import {
  Grid,
  Container,
  makeStyles,
  TextareaAutosize,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

import Topbar from "../topbar";

import CommonCard from "../../common/CommonCard";

import Link from "../../assets/svg/link.svg";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F0F3F8",
    height: "auto",
    [mainTheme.breakpoints.only("xl")]:{
      height: '100vh',
    }
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "100%",
    marginLeft: mainTheme.spacing(5),
  },
  Title: {
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    marginTop: mainTheme.spacing(5),
    marginBottom: mainTheme.spacing(4),
    marginLeft: mainTheme.spacing(10),
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
  },
  form: {
    "& > *": {
      marginTop: mainTheme.spacing(2),
      flez: 1,
    },
  },
  field: {
    width: "80%",
    borderRadius: "24px",
    height: "64px",
    backgroundColor: "#fff",
    marginBottom: mainTheme.spacing(2),
    fontSize: "14px",
  },
  removeOutline: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        border: 0,
      },
      "&:hover fieldset": {
        border: 0,
      },
      "& fieldset": {
        border: 0,
      },
    },
  },
  inputImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    borderRadius: "24px",
    backgroundColor: "#fff",
  },
  imageName: {
    padding: "20px",
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    color: "#20253B",
    opacity: 0.8,
  },
  linkImage: {
    padding: "20px",
    cursor: "pointer",
  },
  textArea: {
    outline: "none",
    borderStyle: "none",
    width: "90%",
    padding: "10px",
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    color: "#20253B",
    opacity: "0.8",
    borderRadius: "24px",
  },
  textStyle: {
    "& .MuiInputBase-input": {
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
      color: "#20253B",
      opacity: "0.8",
    },
  },

  label: {
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    marginTop: mainTheme.spacing(1),
    marginBottom: mainTheme.spacing(2),
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
  },
  button: {
    width: "22%",
    height: "60px",
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    marginLeft: mainTheme.spacing(5),
    marginTop: mainTheme.spacing(5),
    marginBottom: mainTheme.spacing(5),
  },
  mainRow: {
    width: "100%",
  },
  changeColor: {
    "& .MuiInputBase-input": {
      color: "green",
      fontSize: "14px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
    },
  },
  changeColorRed: {
    "& .MuiInputBase-input": {
      color: "red",
      fontSize: "14px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
    },
  },
  dropdownMenuStyle: {
    fontSize: "14px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    color: "#20253B",
    opacity: "0.8",
  },
}));

const CreateNotification = () => {
  const classes = useStyles();
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar module="Notification" item="Create" />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Create Notification
          </Typography>
          <Grid Container spacing={2} className={classes.mainContainer}>
            <Grid xs={12} sm={8} md={8} lg={10} xl={10}>
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
                    User Type
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
                      label="status"
                      className={
                        status === "active"
                          ? classes.changeColor
                          : classes.changeColorRed
                      }
                    >
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        style={{ color: "green" }}
                        value={"active"}
                      >
                        Active
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        style={{ color: "red" }}
                        value={"inactive"}
                      >
                        Inactive
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
                    Notification Image
                  </Typography>
                  <div className={classes.imageWrapper}>
                    <div className={classes.inputImage}>
                      <Typography className={classes.imageName}>
                        image.jpg
                      </Typography>
                      <img
                        src={Link}
                        htmlFor="avatarUpload"
                        className={classes.linkImage}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        name="avatarUpload"
                        id="avatarUpload"
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
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
                <Grid item lg={8} className={classes.mainRow}>
                  <Typography className={classes.label} gutterBottom>
                    Notification Text
                  </Typography>
                  <TextareaAutosize
                    aria-label="minimum height"
                    rowsMin={8}
                    placeholder="questions"
                    className={classes.textArea}
                  />
                </Grid>
                <Grid item lg={4}></Grid>
              </Grid>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
              >
                Creage Notification
              </Button>
              {/* </form> */}
            </Grid>
            <Grid xs={12} sm={4} md={4} lg={2} xl={2}>
              <CommonCard />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default CreateNotification;
