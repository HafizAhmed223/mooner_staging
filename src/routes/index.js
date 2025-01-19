import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router";
import WrappedRoutes from "./wrapper.router";
import history from "../utils/history";
import Signin from "../pages/auth/Signin";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import ScrollToTop from "../common/ScrollToTop";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MainRouter = ({ errors = {} }) => {
  useEffect(() => {
    setOpen(Object.keys(errors).length !== 0);
  }, [errors]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  return (
    <Router history={history}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={errors.severity}>
          {/* {errors.message === "Email Or Password is wrong"
            ? errors.message
            : "Something went wrong"} */}
          {errors.message ? errors.message : null}
        </Alert>
      </Snackbar>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route path="/" component={WrappedRoutes} />
      </Switch>
    </Router>
  );
};
const mapStateToProps = ({ errors }) => {
  return { errors };
};
export default connect(mapStateToProps)(MainRouter);
