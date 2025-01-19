import { EARNING_LIST, EARNING_FILTER } from "./earning.types";

import {
  getEarningList,
  filterEarning,
} from "../../../services/earning.service";
import history from "../../../utils/history";
import {
  clearSnackbar,
  setSnackbar,
  showLoader,
  hideLoader,
} from "../../../utils/global.actions";

export const getEarningListAction = (pageNumber) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getEarningList(pageNumber);
    console.log(data,"earning action data")
    dispatch({
      type: EARNING_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const earningFilter = (pageNumber, searchString) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await filterEarning(pageNumber, searchString);
    dispatch({
      type: EARNING_FILTER,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
  }
};
