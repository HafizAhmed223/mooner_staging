import {
  getfaq,
  deletefaq,
  createfaq,
  filterFaq,
  updatefaq,
  getfaqById,
} from "./../../../services/faq.service";
import {
  GET_FAQ,
  SEARCH_FAQ,
  DELETE_FAQ,
  CREATE_FAQ,
  UPDATE_FAQ,
  GET_FAQ_BY_ID,
} from "./faq.types";
import { SHOW_LOADER, HIDE_LOADER } from "../common.action";
import { setLoading, clearErrors, setErrors } from "../../../utils/errors";
import {
  clearSnackbar,
  setSnackbar,
  showLoader,
  hideLoader,
} from "../../../utils/global.actions";
import history from "../../../utils/history";
export const getfaqAction = (pageNumber) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const { data } = await getfaq(pageNumber);
    dispatch({
      type: GET_FAQ,
      payload: data.data,
    });
    dispatch(hideLoader());
  } catch (error) {}
};

export const deletefaqAction = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const response = await deletefaq(id);
    dispatch({
      type: DELETE_FAQ,
      payload: id,
    });
    dispatch(hideLoader());
    dispatch(setSnackbar("Deleted successfully", "success"));
  } catch (error) {
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const createfaqAction = (data) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const response = await createfaq(data);
    dispatch({
      type: CREATE_FAQ,
      payload: response.data,
    });
    dispatch(hideLoader());
    dispatch(setSnackbar("FAQ created successfully", "success"));
    history.push("/mooner/details/fqa");
  } catch (error) {
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const updatefaqAction = (data, history, Id) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(showLoader());
    const response = await updatefaq(data, Id);
    dispatch({
      type: UPDATE_FAQ,
      payload: response.data,
    });
    dispatch(hideLoader());
    history.push("/mooner/details/fqa");
    dispatch(setSnackbar("FAQ updated successfully", "success"));
  } catch (error) {
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const getfaqByIdAction = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getfaqById(id);
    if (data) {
      dispatch({
        type: GET_FAQ_BY_ID,
        payload: data.data,
      });
      dispatch(hideLoader());
    }
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const filterFaqAction = (page, searchString) => async (dispatch) => {
  //("searchString", searchString);
  //("page", page);
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await filterFaq(page, searchString);
    dispatch({
      type: SEARCH_FAQ,
      payload: data,
    });
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    // dispatch(setSnackbar(error.message, "error"))
  }
};
