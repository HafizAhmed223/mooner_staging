import { connect } from "react-redux";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import AuthRouter from "./auth.router";
import DashboardRoutes from "./dashboard.router";
import PrivateRoute from "./private.route";
import PageNotFound from "../common/PageNotFound";
import ShareJob from "../pages/shareJobScreen/ShareJobByReceiver";
import { Stripe } from "../Stripe";
// import ShareJobFromSender from "../pages/shareJobScreen/ShareJobFromSender";
const RouterWapper = () => {
  return (
    <Switch>
      <Route path="/auth" component={AuthRouter} />
      <Route path="/stripe" component={Stripe} />
      <Route path={`/shareJobByReceiver/:id`} component={ShareJob} />
      {/* <Route path={`/shareJobFromSender`} component={ShareJobFromSender} /> */}
      <PrivateRoute path="/mooner" component={DashboardRoutes} />
      <Route path="*" exact={true} component={PageNotFound} />
    </Switch>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(RouterWapper);
