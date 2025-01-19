import {
  getAllSPlist,
  getServiceProviderById,
  updateServiceProvider,
  getServiceProviderActiveBookings,
  getServiceProviderCompletedBookings,
  deleteServiceProvider,
  updateServiceProviderProfile,
  filterServiceProvider,
  spDocument,
  spEarnings,
  allWalletDetails,
} from "../../../services/spManagement.services";

import {
  SP_LOADING,
  GET_ALL_SP_lIST,
  REMOVE_SP_LOADING,
  SERVICE_PROVIDE_RATING,
  SEARCH_SERVICE_PROVIDER,
  DELETE_SERVICE_PROVIDER,
  UPDATE_SERVICE_PROVIDER_STATUS,
  GET_SERVICE_PROVIDER_BY_ID,
  UPDATE_SERVICE_PROVIDER_PROFILE,
  SERVICE_PROVIDER_ACTIVE_BOOKINGS,
  SERVICE_PROVIDER_COMPLETED_BOOKINGS,
  GET_ALL_SP_DOC,
  SP_EARNINGS,
  WALLET_DETAILS,
} from "./spmanagement.types";
import { setLoading, clearErrors, setErrors } from "../../../utils/errors";
import {
  clearSnackbar,
  setSnackbar,
  showLoader,
  hideLoader,
} from "../../../utils/global.actions";
import history from "../../../utils/history";
import { SortTwoTone } from "@material-ui/icons";

export const getAllServiceProvider = (pageNumber) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader(SP_LOADING));
    const { data } = await getAllSPlist(pageNumber);
    dispatch({
      type: GET_ALL_SP_lIST,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader(REMOVE_SP_LOADING));
    dispatch(
      setSnackbar(
        error.message?.includes("undefined") ? "Network Error!" : error.message,
        "error"
      )
    );
  }
};

export const getSpeByIdAction = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader(SP_LOADING));
    const { data } = await getServiceProviderById(id);
    //("datacheck", data);
    if (data) {
      dispatch({
        type: GET_SERVICE_PROVIDER_BY_ID,
        payload: data,
      });
    }
  } catch (error) {
    dispatch(hideLoader(REMOVE_SP_LOADING));
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const updateSPAction = (formData, id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader(SP_LOADING));
    const { data } = await updateServiceProvider(formData, id);

    dispatch({
      type: UPDATE_SERVICE_PROVIDER_STATUS,
      payload: data,
    });
    history.push({ pathname: "/mooner/details/sp_management" });
    dispatch(setSnackbar("status changed successfully", "success"));
  } catch (error) {
    dispatch(hideLoader(REMOVE_SP_LOADING));
    dispatch(setSnackbar(error.message, "error"));
  }
};

// UPDATE SERVICE PROVIDER PROFILE ACTION............

export const updateServiceProviderProfileAction =
  (profileData) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader(SP_LOADING));
      const { data } = await updateServiceProviderProfile(profileData);

      if (data.status === false) {
        if (data && data.message && data.message.username)
          dispatch(
            setSnackbar(data && data.message && data.message.username, "error")
          );
      }
      if (data.status === false) {
        if (data && data.message && data.message.error) {
          dispatch(
            setSnackbar(data && data.message && data.message.error, "error")
          );
        }
      }
      if (data.status === true) {
        dispatch({
          type: UPDATE_SERVICE_PROVIDER_PROFILE,
          payload: data,
        });
        history.push({ pathname: "/mooner/details/sp_management" });
        dispatch(setSnackbar("Profile Updated Successfully", "success"));
      }
    } catch (error) {
      dispatch(hideLoader(REMOVE_SP_LOADING));
      dispatch(setSnackbar(error.message, "error"));
    }
  };

// END OF UPDATE SERVICE PROVIDER PROFILE ACTION

export const geSpActiveBookingtAction =
  (id, pageNumber) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader(SP_LOADING));
      const { data } = await getServiceProviderActiveBookings(id, pageNumber);
      if (data) {
        dispatch({
          type: SERVICE_PROVIDER_ACTIVE_BOOKINGS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch(hideLoader(REMOVE_SP_LOADING));
      dispatch(setSnackbar(error.message, "error"));
    }
  };

export const geSpCompletedBookingtAction =
  (id, pageNumber) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader(SP_LOADING));
      const { data } = await getServiceProviderCompletedBookings(
        id,
        pageNumber
      );
      //("datain", data);
      if (data) {
        dispatch({
          type: SERVICE_PROVIDER_COMPLETED_BOOKINGS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch(hideLoader(REMOVE_SP_LOADING));
      dispatch(setSnackbar(error.message, "error"));
    }
  };

export const searchServiceProviderAction =
  (page, searchString) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader());
      const { data } = await filterServiceProvider(page, searchString);
      dispatch({
        type: SEARCH_SERVICE_PROVIDER,
        payload: data,
      });
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      // dispatch(setSnackbar(error.message, "error"))
    }
  };

export const deleteSPAction = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await deleteServiceProvider(id);
    dispatch({
      type: DELETE_SERVICE_PROVIDER,
      payload: id,
    });
    dispatch(setSnackbar("Deleted successfully", "success"));
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const spDocumentAction = (id, pageNumber) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await spDocument(id, pageNumber);
    if (data) {
      dispatch({
        type: GET_ALL_SP_DOC,
        payload: data,
      });
    }
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const spEarningAction = (id, page) => async (dispatch) => {
  try {
    const res = await spEarnings(id, page);
    //("res?.data", res?.data);
    // return res?.data;
    if (res?.data) {
      dispatch({
        type: SP_EARNINGS,
        payload: res?.data,
      });
    }
  } catch (error) {
    // dispatch(hideLoader(REMOVE_SP_LOADING))
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const allWalletDetailsAction = (id, page) => async (dispatch) => {
  try {
    const res = await allWalletDetails(id, page);
    //("res?.data", res?.data);
    if (res?.data) {
      dispatch({
        type: WALLET_DETAILS,
        payload: res?.data,
      });
    }
  } catch (error) {
    // dispatch(hideLoader(REMOVE_SP_LOADING))
    dispatch(setSnackbar(error.message, "error"));
  }
};
