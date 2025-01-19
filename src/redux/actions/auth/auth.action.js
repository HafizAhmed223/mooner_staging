import history from "../../../utils/history";
import {
  login,
  getCurrentUser,
  getstats,
  getAllPermissionsService,
} from "../../../services/auth.service";
import {
  setAuthTokenToEachRequest,
  saveAuthToken,
  removeAuthToken,
} from "../../../utils/auth.token";
// import { setLoading, clearErrors, setSnackbar, setErrors } from "../../../utils/global.actions";
import {
  clearSnackbar,
  setSnackbar,
  showLoader,
  hideLoader,
} from "../../../utils/global.actions";
import {
  SET_CURRENT_USER,
  LOGOUT_USER,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  GET_ALL_STATS,
  GET_ALL_PERMISSIONS,
  PERMISSIONS,
} from "./auth.types";

export const setCurrentUser = (token) => {
  return async (dispatch) => {
    try {
      setUser(dispatch, token, false);
    } catch (error) {
      dispatch(setSnackbar(error.response.data.message, "error"));
      dispatch(hideLoader());
    }
  };
};

export const logoutUserAction = () => {
  return (dispatch) => {
    removeAuthToken();
    setAuthTokenToEachRequest(false);
    dispatch({
      type: LOGOUT_USER,
    });
  };
};

export const loginUserAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      dispatch(clearSnackbar());
      const res = await login(data);
      if (res.data.status) {
        //("reslogin", res.data);
        const all_permissions = res?.data?.data?.user?.permissions;
        localStorage.setItem(
          "all_permissions",
          JSON.stringify(all_permissions)
        );
        let page = "";

        for (const perm of all_permissions) {
          if (perm?.codename?.includes("view_user")) {
            page = perm?.codename;
            //("condition", "first");
            break;
          } else if (perm?.codename?.includes("view")) {
            page = perm?.codename;
            //("condition", "second");
            break;
          } else if (perm?.codename?.includes("change_userprofile")) {
            page = "change_userprofile";
          }
        }
        if (page == "" && res?.data?.data?.role == "Sub_Admin") {
          dispatch(setSnackbar("User has no permissions", "error"));
        } else {
          localStorage.setItem("role", res?.data?.data?.role);

          const { access } = res?.data?.data;
          setUser(dispatch, access, true, page, res?.data?.data?.role);
        }
      } else {
        dispatch(setSnackbar(res?.data?.Response, "error"));
        dispatch(hideLoader());
      }
    } catch (error) {
      dispatch(
        setSnackbar(
          error.message === "Request failed with status code 500"
            ? "Internal Server Error"
            : error.message,
          "error"
        )
      );
      dispatch(hideLoader());
    }
  };
};

export const setUser = async (dispatch, token, redirect, page, role) => {
  if (token) {
    saveAuthToken(token);
    setAuthTokenToEachRequest(token);
  }

  try {
    const res = await getCurrentUser();

    dispatch({
      type: SET_CURRENT_USER,
      payload: res.data.user,
    });

    let pageAfterLogin = page;
    //("pageinredux", page);
    if (redirect) {
      if (role == "Sub_Admin") {
        switch (page) {
          case "view_user":
            pageAfterLogin = "user_management";
            break;
          case "view_admintransactionlist":
            pageAfterLogin = "earning";
            break;
          case "view_dispute":
            pageAfterLogin = "dispute_management";
            break;
          case "view_spservices":
            pageAfterLogin = "sp_management";
            break;
          case "view_categorykyc":
            pageAfterLogin = "category_kyc";
            break;
          case "view_category":
            pageAfterLogin = "categories";
            break;
          case "view_categoryquestions":
            pageAfterLogin = "questionaire";
            break;
          case "view_document":
            pageAfterLogin = "document_management";
            break;
          case "view_faqs":
            pageAfterLogin = "fqa";
            break;
          case "view_referral":
            pageAfterLogin = "mln";
            break;
          case "view_privacypolicy":
            pageAfterLogin = "mooner_management";
            break;
          case "view_tickets":
            pageAfterLogin = "ticket_management";
            break;
          case "view_role":
            pageAfterLogin = "sub_admins";
            break;
          case "view_banners":
            pageAfterLogin = "banners";
            break;
          case "change_userprofile":
            pageAfterLogin = "change_password";
            break;
        }
        history.push(`/mooner/details/${pageAfterLogin}`);
      } else {
        history.push(`/mooner/details/user_management`);
      }
    }
  } catch (error) {
    dispatch(setSnackbar(error.message, "error"));
    dispatch(hideLoader());
  }
};

export const getAllStats = (date) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getstats(date);
    if (data.status === false) {
      dispatch(setSnackbar(data.message, "error"));
      dispatch({
        type: GET_ALL_STATS,
        payload: "",
      });
      return;
    }
    dispatch({
      type: GET_ALL_STATS,
      payload: data,
    });
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

// Permissions

export const getAllPermissions = (data) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getAllPermissionsService();
    // //("permissions", data);
    if (data.status === false) {
      dispatch(setSnackbar(data.message, "error"));
      dispatch({
        type: GET_ALL_PERMISSIONS,
        payload: "",
      });
      return;
    }
    dispatch({
      type: GET_ALL_PERMISSIONS,
      payload: data,
    });
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};
