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
  CircularProgress,
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import Topbar from "../topbar";
import { useHistory, useParams } from "react-router-dom";
import { MyCustomStyle } from "../../assets/styles/MyStyles";
import BannerImage from "../../assets/svg/bannerimg.svg";
import {
  getTokenRateAction,
  setTokenRateAction,
} from "../../redux/actions/mln/mln.actions";

// const validationSchema = Yup.object().shape({
//   token_rate: Yup.string().required("* Field is required"),
// });

const SetTokenRate = ({
  getTokenRateAction,
  setTokenRateAction,
  token_rate,
}) => {
  const classes = MyCustomStyle();

  useEffect(() => {
    getTokenRateAction();
  }, []);

  //("token_rate", token_rate);
  const handleSubmit = (values) => {
    const payload = {
      set_rate: values.token_rate,
      id: 1,
    };
    setTokenRateAction(payload);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="MLN"
              item=" Set Token "
              bckLink="/mooner/details/mln"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Set Token
          </Typography>
          <Grid container spacing={2} className={classes.mainContainer}>
            <Grid xs={12}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  token_rate: token_rate ? token_rate.rate : "",
                }}
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                }) => (
                  <Form onSubmit={handleSubmit} autoComplete="off">
                    {token_rate ? (
                      <Grid
                        container
                        spacing={2}
                        className={classes.mainContainer}
                      >
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
                            Per Token Rate ($)
                          </Typography>
                          <TextField
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={token_rate}
                            name="token_rate"
                            id="outlined-basic"
                            variant="outlined"
                            placeholder="Doc Name"
                            className={[classes.field, classes.removeOutline]}
                            InputProps={{ inputProps: { min: 1 } }}
                          />
                          {/* {errors.token_rate && touched.token_rate ? (
                          <div className="error-text">{errors.token_rate}</div>
                        ) : null} */}
                        </Grid>
                      </Grid>
                    ) : (
                      <CircularProgress />
                    )}

                    {/* <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      Save
                    </Button> */}
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = ({ mln }) => {
  //("mln", mln);

  return {
    token_rate:
      mln.token_rate &&
      mln.token_rate.message &&
      mln.token_rate.message.lastPrice,
  };
};

export default connect(mapStateToProps, {
  getTokenRateAction,
  setTokenRateAction,
})(SetTokenRate);
