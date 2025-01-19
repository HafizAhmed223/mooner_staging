import {
  getAllUsers,
  deleteUserService,
  updateUserStatus,
  updateUserProfile,
  filterUser,
  updateSubAdminProfile,
} from "../../../services/users.services";
import {
  GET_ALL_USERS,
  UPDATE_USER_STATUS,
  USERS_LOADING,
  REMOVE_USERS_LOADING,
  UPDATE_USER_PROFILE,
  GET_USER_DETAIL,
  DELETE_USER,
  SEARCH_USER,
} from "./users.types";

import {
  clearSnackbar,
  setSnackbar,
  showLoader,
  hideLoader,
} from "../../../utils/global.actions";
import history from "../../../utils/history";

export const getAllUsersAction = (pageNumber) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getAllUsers(pageNumber);
    dispatch({
      type: GET_ALL_USERS,
      payload: data,
    });
  } catch (error) {
    console.log("errorusers", error);
    dispatch(hideLoader(REMOVE_USERS_LOADING));
    dispatch(
      setSnackbar(
        error.message?.includes("undefined") ? "Network Error!" : error.message,
        "error"
      )
    );
  }
};
export const getUserDeatil = () => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getAllUsers();
    dispatch({
      type: GET_ALL_USERS,
      payload: data.data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message));
  }
};

export const updateUserStatusAction = (formData, id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await updateUserStatus(formData, id);

    dispatch({
      type: UPDATE_USER_STATUS,
      payload: data,
    });
    history.push({ pathname: "/mooner/details/user_management" });
    dispatch(setSnackbar("status changed successfully", "success"));
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const updateUserProfileAction = (profileData) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = profileData?.add_list
      ? await updateSubAdminProfile(profileData)
      : await updateUserProfile(profileData);
    //("data", data);
    if (data.status === false) {
      if (data && data.message && data.message.username)
        dispatch(
          setSnackbar(data && data.message && data.message.username, "error")
        );
    }
    if (data.status === false) {
      dispatch(
        setSnackbar(
          data && typeof data.message != "object"
            ? data.message
            : data && data.message && data.message.error,
          "error"
        )
      );
    }
    if (data.status === true) {
      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: data,
      });
      if (!profileData?.username) {
        history.push({ pathname: "/mooner/details/user_management" });
      } else {
        history.push({ pathname: "/mooner/details/sub_admins" });
      }
      dispatch(setSnackbar("Profile Updated Successfully", "success"));
    }
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await deleteUserService(id);
    if (data.status) {
      dispatch({
        type: DELETE_USER,
        payload: id,
      });
      dispatch(hideLoader());
      dispatch(setSnackbar(data.Message, "success"));
    }
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message));
  }
};

export const filterUserAction = (page, searchString) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await filterUser(page, searchString);
    //("user filter data", data);
    dispatch({
      type: SEARCH_USER,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    // dispatch(setSnackbar(error.message, "error"))
  }
};
