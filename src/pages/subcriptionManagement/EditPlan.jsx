import React from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useHistory, useParams } from "react-router-dom";
import { MyCustomStyle } from "../../assets/styles/MyStyles";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
    marginTop: mainTheme.spacing(6),
    marginBottom: mainTheme.spacing(5),
  },
  title: {
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#000000",
    opacity: "0.5",
    marginLeft: mainTheme.spacing(2),
    marginRight: "7px",
    fontWeight: "700",
    cursor: "pointer",
  },
  title2: {
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    color: "#000000",
    marginLeft: "7px",
    fontWeight: "700",
  },
  categoryHeading: {
    marginBottom: mainTheme.spacing(5),
    display: "flex",
  },
}));

const EditSubscriptionPlan = () => {
  const internalStyle = useStyles();
  const classes = MyCustomStyle();
  const history = useHistory();
  const { From } = useParams();

  const handleNavigation = () => {
    history.push({
      pathname: "/mooner/details/subscription_management",
    });
  };

  return (
    <>
      <div className={internalStyle.root}>
        <Grid item className={internalStyle.categoryHeading}>
          <Typography
            className={internalStyle.title}
            onClick={handleNavigation}
          >
            {" "}
            Subscription{" "}
          </Typography>
          <ArrowRightIcon />
          <Typography className={internalStyle.title2}> {From} </Typography>
        </Grid>
      </div>
      <Grid container className={classes.mainContainer}>
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
            Category Limit
          </Typography>
          <FormControl
            variant="outlined"
            className={[classes.field, classes.removeOutline]}
          >
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <Select
              //   onChange={handleChange}
              //   onBlur={handleBlur}
              //   value={values.status}
              //   name="status"
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="status"
              displayEmpty
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
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
            </Select>
          </FormControl>
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
            Days
          </Typography>
          <FormControl
            variant="outlined"
            className={[classes.field, classes.removeOutline]}
          >
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <Select
              //   onChange={handleChange}
              //   onBlur={handleBlur}
              //   value={values.status}
              //   name="status"
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="status"
              displayEmpty
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
              <MenuItem value={"mon"}>mon, Tue, Wed, ....</MenuItem>
              <MenuItem value={"tue"}>mon, Tue, Wed, ....</MenuItem>
              <MenuItem value={"wed"}>mon, Tue, Wed, ....</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className={classes.mainContainer}>
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
            Time Slot
          </Typography>
          <FormControl
            variant="outlined"
            className={[classes.field, classes.removeOutline]}
          >
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <Select
              //   onChange={handleChange}
              //   onBlur={handleBlur}
              //   value={values.status}
              //   name="status"
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="status"
              displayEmpty
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
              <MenuItem value={"04"}>04:00 pm - 06:00 pm</MenuItem>
              <MenuItem value={"06"}>04:00 pm - 06:00 pm</MenuItem>
              <MenuItem value={"03"}>04:00 pm - 06:00 pm</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className={classes.button}
        onClick={handleNavigation}
      >
        Back
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        size="large"
        className={classes.button}
      >
        Save
      </Button>
    </>
  );
};
export default EditSubscriptionPlan;
