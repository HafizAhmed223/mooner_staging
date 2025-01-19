import {
  GET_ALL_USERS,
  USERS_LOADING,
  REMOVE_USERS_LOADING,
  DELETE_USER,
  SEARCH_USER,
} from "../../actions/users/users.types";

const INITIAL_STATE = {
  data: [],
  count: "",
  next: "",
  previous: "",
  loading: true,
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        data: action.payload.data.results,
        count: action.payload.data.count,
        next: action.payload.data.next,
        previous: action.payload.data.previous,
        loading: false,
      };
    case SEARCH_USER:
      return {
        ...state,
        data: action.payload.data.results,
        count: action.payload.count,
        next: action.payload.data.next,
        previous: action.payload.data.previous,
        loading: false,
      };
    case USERS_LOADING:
      return { ...state, loading: true };
    case REMOVE_USERS_LOADING:
      return { ...state, loading: false };
    case DELETE_USER:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
};
export default usersReducer;
