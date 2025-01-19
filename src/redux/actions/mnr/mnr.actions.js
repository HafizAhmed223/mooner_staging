import {
  SEND_TOKEN_LIST,
  RECEIVED_USD_LIST,
  PAYMENT_TOKEN_HISTORY_SEARCH,
  SEND_TOKEN_FILTER,
} from "./mnr.types";

import {
  getSendToken,
  earnedToken,
  filterPaymentHistory,
  filterSendToken,
} from "../../../services/mnr.service";

import {
  clearSnackbar,
  setSnackbar,
  showLoader,
  hideLoader,
} from "../../../utils/global.actions";

export const sendTokenAction = (pageNumber) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getSendToken(pageNumber);
    dispatch({
      type: SEND_TOKEN_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const earnedTokenAction = (pageNumber) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await earnedToken(pageNumber);
    dispatch({
      type: RECEIVED_USD_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const paymentHistoryFilter =
  (pageNumber, searchString) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader());
      const { data } = await filterPaymentHistory(pageNumber, searchString);
      dispatch({
        type: PAYMENT_TOKEN_HISTORY_SEARCH,
        payload: data,
      });
    } catch (error) {
      dispatch(hideLoader());
    }
  };

export const sendTokenFilter =
  (pageNumber, searchString) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader());
      const { data } = await filterSendToken(pageNumber, searchString);
      dispatch({
        type: SEND_TOKEN_FILTER,
        payload: data,
      });
    } catch (error) {
      dispatch(hideLoader());
    }
  };
