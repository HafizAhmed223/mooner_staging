import { GET_FAQ, GET_FAQ_BY_ID } from "../../actions/faq/faq.types";
import { SHOW_LOADER, HIDE_LOADER } from "../../actions/common.action";
import { DELETE_FAQ , CREATE_FAQ, SEARCH_FAQ, UPDATE_FAQ} from "./../../actions/faq/faq.types";
const INITIAL_STATE = {
  data: [],
  faqbyId: "",
  count: "",
  next: "",
  previous: "",
  loading: false,
};
 
const faqReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    case GET_FAQ:
      return { ...state, data: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous
      };
      case SEARCH_FAQ:
        return { ...state, data: action.payload.data.results,
          count: action.payload.data.count,
          next: action.payload.data.next,
          previous: action.payload.data.resultsprevious
        };  
      case GET_FAQ_BY_ID:
        return { ...state, FAQById: action.payload, loading: false, }
    case DELETE_FAQ:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };

      case CREATE_FAQ:
        return {...state, data: state.data.concat(action.payload)
        }
        
        case UPDATE_FAQ:
          return {
            ...state,
            data: state.data.map((item) => {
              if (item._id === action.payload._id) return action.payload;
              return item;
            }),
          };
    default:
      return state;
  }
};
export default faqReducer;
