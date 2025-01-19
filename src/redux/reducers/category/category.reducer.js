import {
  CATEGORY_LOADING,
  REMOVE_CATEGORY_LOADING,
  GET_ALL_CATEGORIES,
  CREATE_CATEGORIES,
  UPLOAD_IMAGE,
  REMOVE_CATEGORY,
  GET_CATEGORIES_BY_ID,
  GET_SUBCATEGORY_CHILD,
  GET_CATEGORY,
  REGISTER_USER_AGAINEST_CATEGORY,
  PARENT_CATERGORY_FILTER,
  FILTER_CATEGORY_REGISTERED_USER,
  CATEGORY_ACTIVE,
} from "../../actions/category/category.types";

const INITIAL_STATE = {
  registerUsers: [],
  data: [],
  questionCatagory: "",
  questionSubCategoryChild: "",
  particularCategory: {},
  categoryActive:false,
  loading: false,
  count: "",
  total: "",
  next: "",
  previous: "",
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        data: action.payload,
        questionCatagory: "",
        questionSubCategoryChild: "",
        loading: false,
      };
    case CREATE_CATEGORIES:
      return { ...state, data: action.payload, loading: false };
    case GET_CATEGORY:
      return {
        ...state,
        particularCategory: action.payload[0],
        loading: false,
      };
    case GET_CATEGORIES_BY_ID:
      return { ...state, questionCatagory: action.payload, loading: false };
    case GET_SUBCATEGORY_CHILD:
      return {
        ...state,
        questionSubCategoryChild: action.payload,
        loading: false,
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload[0].id) return action.payload[0];
          return item;
        }),
        loading: false,
      };
    case CATEGORY_LOADING:
      return { ...state, loading: true };
    case REMOVE_CATEGORY_LOADING:
      return { ...state, loading: false };
    case REMOVE_CATEGORY:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
        loading: false,
      };
    case REGISTER_USER_AGAINEST_CATEGORY:
      return {
        ...state,
        registerUsers: action.payload.data.results,
        total:
          action &&
          action.payload &&
          action.payload.data &&
          action.payload.data.count,
        next:
          action &&
          action.payload &&
          action.payload.data &&
          action.payload.data.next,
        previous:
          action &&
          action.payload &&
          action.payload.data &&
          action.payload.data.previous,
        loading: false,
      };
    case PARENT_CATERGORY_FILTER:
      return {
        ...state,
        data: action.payload.data.results,
        count: action.payload.data.count,
        next: action.payload.data.next,
        previous: action.payload.data.previous,
        loading: false,
      };
    case FILTER_CATEGORY_REGISTERED_USER:
      return {
        ...state,
        registerUsers: action.payload.data.results,
        count: action.payload.data.count,
        next: action.payload.data.next,
        previous: action.payload.data.previous,
        loading: false,
      };
      case CATEGORY_ACTIVE:
      return {
        ...state,
        categoryActive: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default categoryReducer;
