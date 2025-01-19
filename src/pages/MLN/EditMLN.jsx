import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";

import * as Yup from "yup";
import Topbar from "../topbar";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { MyCustomStyle } from "../../assets/styles/MyStyles";

import { referralsUserAction } from "../../redux/actions/mln/mln.actions";
import { useParams, useHistory } from "react-router-dom";
import CommonCard from "../../common/CommonCard";

const SpValidationschema = Yup.object().shape({});

const EditMnl = ({ referralsUserAction, referalUserData }) => {
  const { id } = useParams();
  const history = useHistory();
  const classes = MyCustomStyle();
  useEffect(() => {
    referralsUserAction(id);
  }, []);

  const handleSubmit = (values) => {
    history.push("/mooner/details/mln");
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="MLN Payouts"
              item="Refferral User Details"
              bckLink="/mooner/details/mln"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              name:
                referalUserData && referalUserData.name
                  ? referalUserData.name
                  : "",
              email:
                referalUserData && referalUserData.email
                  ? referalUserData.email
                  : "",
              user_level: "",
              earning:
                referalUserData && referalUserData.earned_tokens
                  ? referalUserData.earned_tokens
                  : "",
              parent_id:
                referalUserData && referalUserData.parent_id
                  ? referalUserData.parent_id
                  : "",
              profit:
                referalUserData && referalUserData.profit
                  ? referalUserData.profit
                  : "",
            }}
            validationSchema={SpValidationschema}
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
                <Typography className={classes.Title} gutterBottom>
                  Refferral User Details
                </Typography>
                <Grid container className={classes.mainContainer}>
                  <Grid item xs={12} sm={12} md={8} lg={9} xl={10}>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Name
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          name="name"
                          id="outlined-basic"
                          placeholder="name"
                          variant="outlined"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Email
                        </Typography>
                        <TextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          name="email"
                          id="outlined-basic"
                          placeholder="email"
                          variant="outlined"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          User Level
                        </Typography>
                        <TextField
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.user_level}
                          name="user_level"
                          id="outlined-basic"
                          placeholder="user level"
                          variant="outlined"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Earning
                        </Typography>
                        <TextField
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.earning}
                          name="earning"
                          id="outlined-basic"
                          placeholder="earning"
                          variant="outlined"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Parent id
                        </Typography>
                        <TextField
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.parent_id}
                          name="parent_id"
                          id="outlined-basic"
                          placeholder="parent id"
                          variant="outlined"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={3}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Profit
                        </Typography>
                        <TextField
                          type="nubmer"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.profit}
                          name="profit"
                          id="outlined-basic"
                          placeholder="profit"
                          variant="outlined"
                          className={[
                            classes.disableField,
                            classes.disableRemoveOutline,
                          ]}
                          disabled={true}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={7} md={4} lg={3} xl={2}>
                    <CommonCard
                      message="Set Profit Margin"
                      btnText="Edit"
                      link=""
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = ({ mln }) => {
  return {
    referalUserData:
      mln &&
      mln.singleMlnuser &&
      mln.singleMlnuser.data &&
      mln.singleMlnuser.data[0],
  };
};
export default connect(mapStateToProps, {
  referralsUserAction,
})(EditMnl);
