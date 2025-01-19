import React from "react";
import {
  Grid,
  Container,
  makeStyles,
  Typography,
  Card,
  CardContent,
  Button,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Logo from "../../assets/images/moonerNewLogo.png";
import ForgotImage from "../../assets/svg/forgot.svg";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import MyTextField from "../../components/Form/MyTextField";
import { forgotPassword } from "../../services/auth.service";
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
      height: "90%",
      width: "85%",
    },
    [mainTheme.breakpoints.only("md")]: {
      height: "80%",
      width: "80%",
    },
  },
  card: {
    width: "70%",
    height: "70%",
    marginTop: mainTheme.spacing(2.5),
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
    marginTop: mainTheme.spacing(9),
    [mainTheme.breakpoints.down("xs")]: {
      fontSize: "24px",
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
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Forgot = () => {
  const classes = useStyles();

  const forgotPasswordScheme = Yup.object({
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
  });
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <div className={classes.root}>
        <Grid item xs={12}>
          <img src={Logo} className={classes.logo} />
        </Grid>
        <Grid container spacing={3} className={classes.singinConatiner}>
          <Grid item xs={6} className={classes.left}>
            <img src={ForgotImage} className={classes.characters} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card className={classes.card}>
              <Typography
                variant="h1"
                gutterBottom
                className={classes.cardHeading}
              >
                Forgot Password
              </Typography>
              <CardContent>
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={forgotPasswordScheme}
                  onSubmit={async (values, { setErrors }) => {
                    try {
                      const payload = {
                        email: values.email,
                        request_for: "staging",
                      };
                      const { data } = await forgotPassword(payload);
                      if (data.status) {
                        setOpen(true);
                      } else {
                        setErrors({ email: data.Response });
                      }
                    } catch (error) {
                      // //(error);
                      setErrors({ email: "Email not found" });
                    }
                  }}
                >
                  {({ handleSubmit, values }) => (
                    <Form className={classes.form} autoComplete="off">
                      <MyTextField
                        formikKey="email"
                        variant="outlined"
                        placeholder="Enter your email address"
                        className={`${classes.field} ${classes.removeOutline}`}
                      />
                      <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      >
                        <Alert onClose={handleClose} severity="success">
                          {`An email is sent to ${values.email}`}
                        </Alert>
                      </Snackbar>

                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.button}
                        onClick={handleSubmit}
                      >
                        Send Email
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

export default Forgot;
