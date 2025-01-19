import { SET_ERRORS, CLEAR_ERRORS } from "../../actions/errors/errors.type";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
