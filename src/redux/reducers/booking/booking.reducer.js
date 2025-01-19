import {
  GET_USER_DETAIL,
  GET_USER_BOOKING,
  GET_PAYMENTS_LIST,
  GET_TIP_LIST,
} from "../../actions/booking/booking.types";

const INITIAL_STATE = {
  userData: [],
  booking: [],
  next: "",
  count: "",
  previous: "",
  allPayments: [],
  tips: [],
};

const bookingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_DETAIL:
      return { ...state, userData: action.payload };
    case GET_USER_BOOKING:
      return {
        ...state,
        booking: action.payload.data.results,
        count: action.payload.data.count,
        next: action.payload.data.next,
        previous: action.payload.data.previous,
      };
    case GET_PAYMENTS_LIST:
      //("action", action.payload);
      return {
        ...state,
        allPayments: action.payload,
      };
    case GET_TIP_LIST:
      //("action", action.payload);
      return {
        ...state,
        tips: action.payload,
      };
    default:
      return state;
  }
};
export default bookingReducer;
