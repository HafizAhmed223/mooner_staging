import React, { useState } from "react";
import {
  Grid,
  Container,
  makeStyles,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@material-ui/core";

import Topbar from "../topbar";

// import Logo from "../../assets/svg/logo.svg"

const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F0F3F8",
    height: "auto",
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
    marginBottom: mainTheme.spacing(6),
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
  textStyle: {
    "& .MuiInputBase-input": {
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
      color: "#20253B",
      opacity: "0.8",
    },
  },
  dropdownMenuStyle: {
    fontSize: "14px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    color: "#20253B",
    opacity: "0.8",
  },
  label: {
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    marginTop: mainTheme.spacing(1),
    marginLeft: mainTheme.spacing(),
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
  },
  button: {
    width: "17%",
    height: "60px",
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    marginLeft: mainTheme.spacing(5),
    marginTop: mainTheme.spacing(9),
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
  changeColorYellow: {
    "& .MuiInputBase-input": {
      color: "#F2994A",
      fontSize: "14px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
    },
  },
}));

const ChangeAppoitmentStatus = () => {
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
            <Topbar module="Appoitment" item="Update" />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Appoitment
          </Typography>
          <Grid Container spacing={2} className={classes.mainContainer}>
            <Grid xs={12}>
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
                    placeholder="1548"
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
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
                        (status === "completed" && classes.changeColor) ||
                        (status === "cancelled" && classes.changeColorRed) ||
                        (status === "underprocess" && classes.changeColorYellow)
                      }
                    >
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        style={{ color: "green" }}
                        value={"completed"}
                      >
                        Completed
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        style={{ color: "#F2994A" }}
                        value={"underprocess"}
                      >
                        Underprocess
                      </MenuItem>
                      <MenuItem
                        className={classes.dropdownMenuStyle}
                        style={{ color: "red" }}
                        value={"cancelled"}
                      >
                        Cancelled
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
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default ChangeAppoitmentStatus;
