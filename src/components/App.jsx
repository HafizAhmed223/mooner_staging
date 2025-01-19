import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import Store from "../redux/store";
import {
  setCurrentUser,
  logoutUserAction,
} from "../redux/actions/auth/auth.action";
import MainRouter from "../routes";
import { themeOptions } from "../utils/theme";
import FireBase from "./FireBase";

const mainTheme = createMuiTheme(themeOptions);
if (localStorage.authToken) {
  const { authToken } = localStorage;
  const decoded = jwt_decode(authToken);

  const { exp } = decoded;

  if (Date.now() + 2 * 60 * 60 * 1000 <= exp * 1000 && authToken) {
    Store.dispatch(setCurrentUser(authToken));
  } else {
    Store.dispatch(logoutUserAction());
  }
}
const App = () => {
  return (
    <>
      <Provider store={Store}>
        <ThemeProvider theme={mainTheme}>
          <FireBase />
          <MainRouter />
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
