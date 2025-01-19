import {
  MLN_LIST,
  GET_MLN_BY_ID,
  GET_MLN_WITHOUT_REFERALS_BY_ID,
  GET_MLN_REFERALS_BY_ID,
  GET_PROFIT_MARGIN,
  GET_FEE_MARGIN,
  GET_TOKEN_RATE,
  SET_TOKEN_RATE,
  MLN_FILTER,
} from "../../actions/mln/mln.types";

const INITIAL_STATE = {
  token_rate: "",
  mlnList: [],
  singleUserMln: [],
  referals: [],
  singleuser: "",
  singleMlnuser: "",
  profitMargin: "",
  feeMargin: "",
  total: "",
  next: "",
  previous: "",
  mlnById: "",
  loading: true,
  count: "",
};

const mlnReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MLN_LIST:
      return {
        ...state,
        mlnList: action.payload.data.results,
        total: action.payload.data.count,
        next: action.payload.data.next,
        previous: action.payload.data.previous,
        loading: false,
      };
    case GET_MLN_BY_ID:
      return {
        ...state,
        singleUserMln: action.payload.user_details,
        referals: action.payload.referral_users,
        referral_users_parent: action.payload.referral_users_parent,
        loading: false,
      };

    case GET_MLN_WITHOUT_REFERALS_BY_ID:
      return { ...state, singleuser: action.payload.data[0], loading: false };

    case GET_MLN_REFERALS_BY_ID:
      return { ...state, singleMlnuser: action.payload, loading: false };

    case GET_PROFIT_MARGIN:
      return { ...state, profitMargin: action.payload, loading: false };

    case GET_FEE_MARGIN:
      return { ...state, feeMargin: action.payload, loading: false };
    case GET_TOKEN_RATE:
      return { ...state, token_rate: action.payload };
    case MLN_FILTER:
      return {
        ...state,
        mlnList: action.payload.data.results,
        count: action.payload.data.count,
        next: action.payload.data.next,
        previous: action.payload.data.previous,
        loading: false,
      };
    default:
      return state;
  }
};
export default mlnReducer;
