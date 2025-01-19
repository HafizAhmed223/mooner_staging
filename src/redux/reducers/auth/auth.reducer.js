import {
  SET_CURRENT_USER,
  LOGOUT_USER,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  GET_ALL_STATS,
  GET_ALL_PERMISSIONS,
  PERMISSIONS,
} from "../../actions/auth/auth.types";

const initialState = {
  isAuthenticated: localStorage.getItem("authToken") ? true : false,
  user: {},
  stats: "",
  isAuthLoading: false,
  permissions: {},
  permissionsLoading: false,
  all_permissions: [],
  view_permissions: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: Object.keys(action.payload).length !== 0,
        isAuthLoading: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isAuthLoading: false,
      };
    case SET_AUTH_LOADING:
      return {
        ...state,
        isAuthLoading: true,
      };
    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        isAuthLoading: false,
      };
    case GET_ALL_STATS:
      return {
        ...state,
        stats: action.payload,
        isAuthLoading: false,
      };
    case GET_ALL_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload,
        // isAuthLoading: false,
      };
    case PERMISSIONS:
      //("action", action);
      return {
        ...state,
        all_permissions: action.payload.all_permissions,
        view_permissions: action.payload.view_permissions,
      };
    default:
      return state;
  }
};
export default authReducer;
