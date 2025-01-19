import {
  getAllCancelListService,
  getCancelListServiceById,
} from "../../../services/cancellation.services";

import {
  GET_CANCELLATION_LIST,
  GET_CANCELLATION_LIST_BY_ID,
  GET_CANCELLATION_FILTER,
} from "./cancellation.types";

import {
  clearErrors,
  setErrors,
  showLoader,
  hideLoader,
} from "../../../utils/global.actions";
//   import history from "../../../utils/history";

export const getCancelListAction = (page, searchString) => async (dispatch) => {
  //("action")
  try {
    dispatch(clearErrors());
    dispatch(showLoader());
    const { data } = await getAllCancelListService(page, searchString);
    //("DATA",data);

    dispatch({
      type: GET_CANCELLATION_LIST,
      payload: data,
    });
    dispatch(hideLoader());
  } catch (error) {
    dispatch(showLoader());
    dispatch(setErrors(error.message));
  }
};

export const getCancelFilterAction =
  (page, searchString) => async (dispatch) => {
    //("action")
    try {
      dispatch(clearErrors());
      dispatch(showLoader());
      const { data } = await getAllCancelListService(page, searchString);
      // debugger;
      dispatch({
        type: GET_CANCELLATION_FILTER,
        payload: data,
      });
      dispatch(hideLoader());
    } catch (error) {
      dispatch(showLoader());
      dispatch(setErrors(error.message));
    }
  };

export const getCancelListActionById = (id) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(showLoader());
    const { data } = await getCancelListServiceById(id);
    dispatch({
      type: GET_CANCELLATION_LIST_BY_ID,
      payload: data,
    });
    dispatch(hideLoader());
  } catch (error) {
    dispatch(showLoader());
    dispatch(setErrors(error.message));
  }
};
