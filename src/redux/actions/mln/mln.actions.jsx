import {
  MLN_LIST,
  GET_MLN_BY_ID,
  GET_MLN_WITHOUT_REFERALS_BY_ID,
  GET_MLN_REFERALS_BY_ID,
  GET_PROFIT_MARGIN,
  SET_PROFIT_MARGIN,
  GET_FEE_MARGIN,
  SET_FEE_MARGIN,
  GET_TOKEN_RATE,
  SET_TOKEN_RATE,
  MLN_FILTER,
} from "./mln.types";

import {
  getMMlnList,
  getMlnUser,
  MlnUserWioutReferals,
  referralsUser,
  getProfitMargin,
  setProfitMargin,
  getFeeMargin,
  setFeeMargin,
  getTokenRate,
  setTokenRate,
  filterMln,
} from "../../../services/mln.service";
import history from "../../../utils/history";
import {
  clearSnackbar,
  setSnackbar,
  showLoader,
  hideLoader,
} from "../../../utils/global.actions";

export const getMlnListAction = (pageNumber) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getMMlnList(pageNumber);
    console.log(data,"mnl data")
    dispatch({
      type: MLN_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const getSingleMlnUserAction = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getMlnUser(id);
    //("datainaction", data);
    if (data) {
      dispatch({
        type: GET_MLN_BY_ID,
        payload: data,
      });
    }
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const UserWithOutReferalsAction = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await MlnUserWioutReferals(id);
    if (data) {
      dispatch({
        type: GET_MLN_WITHOUT_REFERALS_BY_ID,
        payload: data,
      });
    }
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const referralsUserAction = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await referralsUser(id);
    if (data) {
      dispatch({
        type: GET_MLN_REFERALS_BY_ID,
        payload: data,
      });
    }
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const getProfitMarginAction = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getProfitMargin(id);
    if (data) {
      dispatch({
        type: GET_PROFIT_MARGIN,
        payload: data,
      });
    }
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const getFeeMarginAction = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getFeeMargin(id);
    if (data) {
      dispatch({
        type: GET_FEE_MARGIN,
        payload: data,
      });
    }
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const setProfitMarginAction = (mlndata) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await setProfitMargin(mlndata);
    if (data) {
      dispatch({
        type: SET_PROFIT_MARGIN,
        payload: data,
      });
    }
    history.push("/mooner/details/mln");
    dispatch(setSnackbar(data.message, "success"));
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const setFeeMarginAction = (mlndata) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await setFeeMargin(mlndata);
    if (data) {
      dispatch({
        type: SET_FEE_MARGIN,
        payload: data,
      });
    }
    history.push("/mooner/details/mln");
    dispatch(setSnackbar(data.message, "success"));
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const getTokenRateAction = () => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getTokenRate();
    if (data) {
      dispatch({
        type: GET_TOKEN_RATE,
        payload: data,
      });
    }
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const setTokenRateAction = (tokenData) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await setTokenRate(tokenData);
    if (data) {
      dispatch({
        type: SET_TOKEN_RATE,
        payload: data,
      });
    }
    history.push("/mooner/details/mln");
    dispatch(setSnackbar(data.message, "success"));
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};
export const mlnFilter = (pageNumber, searchString) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await filterMln(pageNumber, searchString);
    dispatch({
      type: MLN_FILTER,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
  }
};
