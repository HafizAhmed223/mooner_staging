import {
  EARNING_LIST,
  EARNING_FILTER,
} from "../../actions/earnings/earning.types";

const INITIAL_STATE = {
  earningList: [],
  total: "",
  next: "",
  count: "",
  previous: "",
  loading: true,
};

const earningReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EARNING_LIST:
      return {
        ...state,
        earningList: action.payload.results,
        total: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
      };
    case EARNING_FILTER:
      return {
        ...state,
        earningList: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
      };
    default:
      return state;
  }
};
export default earningReducer;
