import {
  GET_USER_DETAIL,
  GET_USER_BOOKING,
  GET_PAYMENTS_LIST,
  GET_TIP_LIST,
} from "../../actions/booking/booking.types";
import { GET_CAB_BOOKING, GET_CAB_BOOKING_DETAIL } from "../../actions/cabbooking/cabbooking.type";

const INITIAL_STATE = {
  userData: [],
  cabBooking: [],
  next: "",
  count: "",
  previous: "",
  allPayments: [],
  tips: [],
};

const cabBookingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CAB_BOOKING_DETAIL:
      return { ...state, userData: action.payload };
    case GET_CAB_BOOKING:
      // console.log("rrrr",action.payload.results)
      return {
        ...state,
        cabBooking: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
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
export default cabBookingReducer;
