import {
  SUB_CATEGORY_LOADING,
  REMOVE_SUB_CATEGORY_LOADING,
  GET_ALL_SUB_CATEGORIES,
  CREATE_SUB_CATEGORIES,
  UPLOAD_IMAGE,
  REMOVE_SUB_CATEGORY,
  GET_SUB_CATEGORY,
  FILTER_SUBCATEGORY_CHILD,
  FILTER_SUBCATEGORY_USER,
} from "../../actions/subCategory/subcategory.types";

const INITIAL_STATE = {
  data: [],
  particularSubCatgegory: {},
  loading: false,
  count: "",
  total: "",
  next: "",
  previous: "",
};

const subCategoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_SUB_CATEGORIES:
      return { ...state, data: action.payload, loading: false };
    case GET_SUB_CATEGORY:
      return {
        ...state,
        particularSubCatgegory: action.payload[0],
        loading: false,
      };
    case CREATE_SUB_CATEGORIES:
      return { ...state, data: action.payload, loading: false };
    case UPLOAD_IMAGE:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload[0].id) return action.payload[0];
          return item;
        }),
        loading: false,
      };
    case SUB_CATEGORY_LOADING:
      return { ...state, loading: true };
    case REMOVE_SUB_CATEGORY_LOADING:
      return { ...state, loading: false };
    case REMOVE_SUB_CATEGORY:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
        loading: false,
      };
    case FILTER_SUBCATEGORY_CHILD:
      return {
        ...state,
        data: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
      };
    case FILTER_SUBCATEGORY_USER:
      return {
        ...state,
        data: action.payload.data.results,
        count: action.payload.data.count,
        next: action.payload.data.next,
        previous: action.payload.data.previous,
        loading: false,
      };
    default:
      return state;
  }
};
export default subCategoryReducer;
