import { CLEAR_ERRORS, SET_ERRORS } from "../redux/actions/errors/errors.type";
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
export const setErrors = (error) => {
  return {
    type: SET_ERRORS,
    payload: error,
  };
};
export const setLoading = (type) => {
  return {
    type,
  };
};