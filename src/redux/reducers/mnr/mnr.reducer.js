import {
  SEND_TOKEN_LIST,
  RECEIVED_USD_LIST,
  PAYMENT_TOKEN_HISTORY_SEARCH,
  SEND_TOKEN_FILTER,
} from "../../actions/mnr/mnr.types";

const INITIAL_STATE = {
  sendTokenList: [],
  earnedToken: [],
  total: "",
  next: "",
  previous: "",
  mlnById: "",
  loading: true,
  count: "",
};

const mnrReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_TOKEN_LIST:
      return {
        ...state,
        sendTokenList: action.payload.data.results,
        total: action.payload.data.count,
        next: action.payload.data.next,
        previous: action.payload.data.previous,
        loading: false,
      };
    case RECEIVED_USD_LIST:
      return { ...state, earnedToken: action.payload.data, loading: false };
    case PAYMENT_TOKEN_HISTORY_SEARCH:
      return {
        ...state,
        earnedToken: action.payload.data.results,
        count: action.payload.data.count,
        next: action.payload.data.next,
        previous: action.payload.data.previous,
        loading: false,
      };
    case SEND_TOKEN_FILTER:
      return {
        ...state,
        sendTokenList: action.payload.data.results,
        count: action.payload.data.count,
        next: action.payload.data.next,
        previous: action.payload.data.previous,
        loading: false,
      };
    default:
      return state;
  }
};
export default mnrReducer;
