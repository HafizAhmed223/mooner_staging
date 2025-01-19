import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Typography,
  makeStyles,
  Grid,
  Container,
  Card,
  CardContent,
  Checkbox,
  Button,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { loginUserAction } from "../../redux/actions/auth/auth.action";
import Logo from "../../assets/images/moonerNewLogo.png";
import Characters from "../../assets/svg/characters.svg";
import MyTextField from "../../components/Form/MyTextField";

// const mainTheme = createMuiTheme(themeOptions);
const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    marginTop: mainTheme.spacing(5),
    marginLeft: mainTheme.spacing(5),
    width: "70px",
    marginBottom: mainTheme.spacing(2.5),
  },
  left: {
    textAlign: "center",
    [mainTheme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  characters: {
    Height: "90%",
    width: "90%",
    [mainTheme.breakpoints.only("lg")]: {
      height: "80%",
      width: "80%",
    },
    [mainTheme.breakpoints.only("md")]: {
      height: "80%",
      width: "80%",
    },
  },
  card: {
    width: "70%",
    height: "80%",
    marginTop: mainTheme.spacing(2),
    // padding: mainTheme.spacing(3)
    textAlign: "center",
    boxShadow: "1px 11px 55px rgba(0, 0, 0, 0.15)",
    padding: mainTheme.spacing(2),
    [mainTheme.breakpoints.only("lg")]: {
      width: "80%",
      height: "90%",
    },
    [mainTheme.breakpoints.only("md")]: {
      width: "90%",
      height: "100%",
    },
    [mainTheme.breakpoints.only("sm")]: {
      width: "95%",
      height: "100%",
    },
    [mainTheme.breakpoints.down("xs")]: {
      width: "90%",
      height: "100%",
    },
  },
  cardHeading: {
    fontSize: "40px",
    marginTop: mainTheme.spacing(5),
    [mainTheme.breakpoints.down("xs")]: {
      fontSize: "27px",
    },
  },
  form: {
    "& > *": {
      marginTop: mainTheme.spacing(2),
    },
  },
  singinConatiner: {
    marginTop: mainTheme.spacing(2),
  },
  field: {
    width: "80%",
    borderRadius: "24px",
    backgroundColor: "#EDEDED",
    marginBottom: mainTheme.spacing(1),
    fontSize: "14px",
    [mainTheme.breakpoints.down("xs")]: {
      width: "100%",
    },
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
  rememberMe: {
    fontSize: "12px",
    lineHeight: "19px",
    [mainTheme.breakpoints.down("xs")]: {
      marginLeft: mainTheme.spacing(2),
    },
  },
  forgetPass: {
    fontSize: "12px",
    lineHeight: "19px",
    color: "red",
  },
  checkbox: {
    marginTop: mainTheme.spacing(-1.3),
  },
  button: {
    width: "80%",
    height: "60px",
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(5),
    // marginBottom: mainTheme.spacing(5),
  },
  links: {
    textDecoration: "none",
  },
  hideOnXs: {
    [mainTheme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const Signin = ({ loginUser, loading }) => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("* Email must be a valid email")
      .required("* Email is required"),
    password: Yup.string().required("* Password is required"),
  });

  return (
    <Container maxWidth="xl">
      <div className={classes.root}>
        <Grid item xs={12}>
          <img src={Logo} className={classes.logo} />
        </Grid>
        <Grid container spacing={3} className={classes.singinConatiner}>
          <Grid item xs={6} className={classes.left}>
            <img src={Characters} className={classes.characters} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card className={classes.card}>
              <Typography
                variant="h1"
                gutterBottom
                className={classes.cardHeading}
              >
                Sign In
              </Typography>
              <CardContent>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={loginSchema}
                  onSubmit={(values) => {
                    loginUser(values);
                  }}
                >
                  {({ handleSubmit }) => (
                    <Form className={classes.form} autoComplete="off">
                      <MyTextField
                        formikKey="email"
                        variant="outlined"
                        placeholder="Enter your email address"
                        className={`${classes.field} ${classes.removeOutline}`}
                      />
                      <MyTextField
                        formikKey="password"
                        type="password"
                        placeholder="Enter your password"
                        variant="outlined"
                        className={`${classes.field} ${classes.removeOutline}`}
                      />

                      <Grid
                        container
                        spacing={0}
                        className={classes.singinConatiner}
                      >
                        <Grid xs={1} className={classes.hideOnXs}></Grid>
                        <Grid xs={1}>
                          <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ "aria-label": " checkbox" }}
                            className={classes.checkbox}
                          />
                        </Grid>
                        <Grid xs={4} sm={2}>
                          <Typography
                            variant="p"
                            className={classes.rememberMe}
                          >
                            Remember Me
                          </Typography>
                        </Grid>
                        <Grid xs={2} sm={3}></Grid>
                        <Grid xs={5} sm={5} xl={5}>
                          <NavLink to="/auth/forget" className={classes.links}>
                            <Typography
                              variant="p"
                              className={classes.forgetPass}
                            >
                              Forgot Password?
                            </Typography>
                          </NavLink>
                        </Grid>
                      </Grid>

                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.button}
                        type="submit"
                      >
                        {loading ? "Loading " : "Sign In"}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
const mapStateToProps = ({ auth }) => {
  return {
    loading: auth.isAuthLoading,
  };
};
export default connect(mapStateToProps, { loginUser: loginUserAction })(Signin);
