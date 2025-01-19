import {
    GET_CANCELLATION_LIST,
    GET_CANCELLATION_LIST_BY_ID,
    GET_CANCELLATION_FILTER
  } from "../../actions/cancelationManagement/cancellation.types";
  
  const INITIAL_STATE = {
    allCancelList: [],
    cancelById: {},
    count:"",
    next: '',
    previous: '',
    loading: false,
  };
  
  const CancellationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_CANCELLATION_LIST:
        return { 
          ...state, 
          allCancelList: action.payload.results,
          count:  action.payload.count,
          next: action && action.payload  && action.payload.next,
          previous: action && action.payload && action.payload.previous,
          loading: false 
        };
        case GET_CANCELLATION_FILTER:
          return { 
            ...state, 
            allCancelList: action.payload.results,
            count: action && action.payload && action.payload.count, 
            next: action && action.payload  && action.payload.next,
            previous: action && action.payload && action.payload.previous,
            loading: false };

        case GET_CANCELLATION_LIST_BY_ID:
          return { 
              ...state,
              cancelById: action.payload.data,
          }
      default:
        return state;
    }
  };
  export default CancellationReducer;
  