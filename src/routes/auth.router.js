import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PageNotFound from "../common/PageNotFound";
import Forgot from "../pages/auth/Forgot";
import ResetPassword from "../pages/auth/ResetPassword";
import Signin from "../pages/auth/Signin";
import RedirectToApp from "../pages/RedirectToApp";

const AuthRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/signin`} component={Signin} />
      <Route path={`${path}/forget`} component={Forgot} />
      <Route path={`${path}/to_app`} component={RedirectToApp} />
      <Route
        path={`${path}/reset/:user_id?/:forgotToken?/`}
        component={ResetPassword}
      />

      <Route path="*" exact={true} component={PageNotFound} />

      {/* < Route path="/NotFound" component={NotFound} />
            < Route path="/right_penal" component={RightPenal} />
            < Route path="/user_details" component={UserDetails} />
            <Route path="/topbar" component={Topbar} />
            <Route path="/card" component={UserCountCard} />
            <Route path="/table_base" component={TableBase} /> */}
    </Switch>
  );
};

export default AuthRoutes;
