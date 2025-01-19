import React from "react";
import {
  Grid,
  Container,
  makeStyles,
  Typography,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import Logo from "../../assets/images/moonerNewLogo.png";
import ResetImage from "../../assets/svg/resetPass.svg";
import MyTextField from "../../components/Form/MyTextField";

import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

import * as Yup from "yup";
import { resetPassword } from "../../services/auth.service";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    [mainTheme.breakpoints.only("md")]: {
      height: "80%",
      width: "80%",
    },
  },
  card: {
    width: "70%",
    height: "90%",
    marginTop: mainTheme.spacing(2.5),
    // padding: mainTheme.spacing(3)
    textAlign: "center",
    boxShadow: "1px 11px 55px rgba(0, 0, 0, 0.15)",
    padding: mainTheme.spacing(2),
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
    marginTop: mainTheme.spacing(9),
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
    marginTop: mainTheme.spacing(6),
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
  rememberMe: {
    fontSize: "12px",
    lineHeight: "19px",
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
}));

const ResetPassword = () => {
  const history = useHistory();
  const classes = useStyles();
  let { user_id, forgotToken } = useParams();

  const resetPasswordScheme = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .test(
        "isValidPass",
        "Password should be at least uppercase character",
        (value, context) => {
          const hasUpperCase = /[A-Z]/.test(value);
          let validConditions = 0;
          const numberOfMustBeValidConditions = 1;
          const conditions = [hasUpperCase];
          conditions.forEach((condition) =>
            condition ? validConditions++ : null
          );
          if (validConditions >= numberOfMustBeValidConditions) {
            return true;
          }
          return false;
        }
      ),
    confirmPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <Container maxWidth="xl">
      <div className={classes.root}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={(event, resson) => {
            if (resson === "clickaway") {
            }
            setOpen(false);
          }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={(event, resson) => {
              if (resson === "clickaway") {
              }
              setOpen(false);
            }}
            severity="success"
          >
            Password updated successfully
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={3000}
          onClose={(event, resson) => {
            if (resson === "clickaway") {
            }
            setError(false);
          }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={(event, resson) => {
              if (resson === "clickaway") {
              }
              setError(false);
            }}
            severity="error"
          >
            {errorMessage}
          </Alert>
        </Snackbar>

        <Grid item xs={12}>
          <img src={Logo} className={classes.logo} />
        </Grid>
        <Grid container spacing={3} className={classes.singinConatiner}>
          <Grid item xs={6} className={classes.left}>
            <img src={ResetImage} className={classes.characters} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card className={classes.card}>
              <Typography
                variant="h1"
                gutterBottom
                className={classes.cardHeading}
              >
                Reset Password
              </Typography>
              <CardContent>
                <Formik
                  initialValues={{ password: "", confirmPassword: "" }}
                  validationSchema={resetPasswordScheme}
                  onSubmit={async (values) => {
                    const response = await resetPassword(user_id, forgotToken, {
                      new_password: values.password,
                      confirm_password: values.confirmPassword,
                    });
                    //(response);
                    if (
                      response &&
                      response.data &&
                      response.data.status &&
                      response.data.Response ===
                        "Password updated successfully!"
                    ) {
                      setOpen(true);
                      setError(false);
                    } else {
                      setErrorMessage(response.data.Response);
                      setError(true);
                      setOpen(false);
                    }

                    // const handleClose = (event, reason) => {
                    //   if (reason === "clickaway") {
                    //     return;
                    //   }

                    //   setOpen(false);
                    // };
                    // history.push({
                    //   pathname: "/auth/signin",
                    // });
                  }}
                >
                  {({ handleSubmit }) => (
                    <Form
                      className={classes.form}
                      noValidate
                      autoComplete="off"
                    >
                      <MyTextField
                        formikKey="password"
                        variant="outlined"
                        placeholder="Enter new password"
                        className={`${classes.field} ${classes.removeOutline}`}
                        type="password"
                      />
                      <MyTextField
                        formikKey="confirmPassword"
                        variant="outlined"
                        placeholder="Confirm Password"
                        className={`${classes.field} ${classes.removeOutline}`}
                        type="password"
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.button}
                        onClick={handleSubmit}
                      >
                        Reset Password
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

export default ResetPassword;
