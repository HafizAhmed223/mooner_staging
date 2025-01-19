import { CLEAR_ERRORS, SET_ERRORS } from "../redux/actions/errors/errors.type";
import { SHOW_LOADER, HIDE_LOADER } from "../redux/actions/loader/loader.types";
export const clearSnackbar = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const setSnackbar = (message, severity) => {
  //("snack",message)
  return {
    type: SET_ERRORS,
    payload: {
      message: message,
      severity,
    },
  };
};
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const setErrors = (message, severity = "error") => {
  return {
    type: SET_ERRORS,
    payload: {
      message,
      severity,
    },
  };
};

export const setLoading = (type) => {
  return {
    type,
  };
};

export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};
