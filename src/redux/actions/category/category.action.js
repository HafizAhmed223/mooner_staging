import {
  getAllCategories,
  createCategoryService,
  deleteCategoryService,
  updateCategoryService,
  changeImageService,
  getCategoryById,
  getSubcategoryChild,
  getCategoryService,
  getRegisterUser,
  catergoryFilterService,
  catergoryregistererduserFilterService,
  categoryActive,
} from "../../../services/category.service";
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
} from "./category.types";

import {
  setLoading,
  showLoader,
  hideLoader,
  clearSnackbar,
  setSnackbar,
} from "../../../utils/global.actions";
import history from "../../../utils/history";

export const getAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch(setLoading(CATEGORY_LOADING));
    const { data } = await getAllCategories();
    dispatch({
      type: GET_ALL_CATEGORIES,
      payload: data.data,
    });
  } catch (error) {
    dispatch(setLoading(REMOVE_CATEGORY_LOADING));
    // dispatch(setSnackbar(error.message,"error"));
  }
};
export const getParticularCategory = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(setLoading(CATEGORY_LOADING));
    const { data } = await getCategoryService(id);
    dispatch({
      type: GET_CATEGORY,
      payload: data.data,
    });
  } catch (error) {
    dispatch(setLoading(REMOVE_CATEGORY_LOADING));
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const getCategoriesByIdAction = (formData) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(setLoading(CATEGORY_LOADING));
    const { data } = await getCategoryById(formData);
    dispatch({
      type: GET_CATEGORIES_BY_ID,
      payload: data.data,
    });
  } catch (error) {
    dispatch(setLoading(REMOVE_CATEGORY_LOADING));
    dispatch(setSnackbar(error.message, "error"));
  }
};
export const createCategory = (formData) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(setLoading(CATEGORY_LOADING));
    const { data } = await createCategoryService(formData);
    if (data.status) {
      dispatch({
        type: CREATE_CATEGORIES,
        payload: data.data,
      });
      history.push("/mooner/details/categories");
      dispatch(setSnackbar("Category Successfully Added!", "success"));
    } else {
      dispatch(setSnackbar(data.message, "error"));
      dispatch(setLoading(REMOVE_CATEGORY_LOADING));
    }
  } catch (error) {
    dispatch(setLoading(REMOVE_CATEGORY_LOADING));
    if (error && error.response && error.response.status === 400)
      return dispatch(
        setSnackbar(
          error.response.data.cat_icon || error.response.data.category_image,
          "error"
        )
      );
  }
};

export const changeImage = (formData, id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(setLoading(CATEGORY_LOADING));
    const { data } = await changeImageService(formData, id);
    dispatch({
      type: UPLOAD_IMAGE,
      payload: data.data,
    });
  } catch (error) {
    dispatch(setLoading(REMOVE_CATEGORY_LOADING));
    if (error.response.status === 400)
      return dispatch(
        setSnackbar(
          error.response.data.cat_icon || error.response.data.category_image,
          "error"
        )
      );
  }
};

export const updateCategory =
  (formData, id, statusData) => async (dispatch) => {
    try {
      //("update category");
      dispatch(clearSnackbar());
      dispatch(setLoading(CATEGORY_LOADING));
      const { data } = await updateCategoryService(formData, id);
      const res = await categoryActive(statusData);
      history.push("/mooner/details/categories");
      dispatch(setSnackbar("Category Updated Successfully!", "success"));
    } catch (error) {
      dispatch(setLoading(REMOVE_CATEGORY_LOADING));
      if (error.response.status === 400)
        return dispatch(
          setSnackbar(
            error.response.data.cat_icon || error.response.data.category_image,
            "error"
          )
        );
    }
  };
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(setLoading(CATEGORY_LOADING));
    const { data } = await deleteCategoryService(id);
    if (data.status) {
      dispatch({
        type: REMOVE_CATEGORY,
        payload: id,
      });
      history.push("/mooner/details/categories");
      dispatch(setSnackbar(data.message, "success"));
    }
  } catch (error) {
    dispatch(setLoading(REMOVE_CATEGORY_LOADING));
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const getSubcategoryChildAction = (formData) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(setLoading(CATEGORY_LOADING));
    const { data } = await getSubcategoryChild(formData);
    dispatch({
      type: GET_SUBCATEGORY_CHILD,
      payload: data.data,
    });
  } catch (error) {
    dispatch(setLoading(REMOVE_CATEGORY_LOADING));
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const getRegisterUserAgainestCategoryAction =
  (id, pageNumber) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader());
      const { data } = await getRegisterUser(id, pageNumber);
      if (data) {
        dispatch({
          type: REGISTER_USER_AGAINEST_CATEGORY,
          payload: data,
        });
      }
    } catch (error) {
      dispatch(hideLoader());
      dispatch(setSnackbar(error.message, "error"));
    }
  };
export const parentCatergoryFilterAction =
  (searchString) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader());
      const { data } = await catergoryFilterService(searchString);
      if (data) {
        dispatch({
          type: PARENT_CATERGORY_FILTER,
          payload: data,
        });
      }
    } catch (error) {
      dispatch(hideLoader());
      dispatch(setSnackbar(error.message, "error"));
    }
  };

export const filtercategoryregistereduser =
  (searchString, id) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader());
      const { data } = await catergoryregistererduserFilterService(
        id,
        searchString
      );
      if (data) {
        dispatch({
          type: FILTER_CATEGORY_REGISTERED_USER,
          payload: data,
        });
      }
    } catch (error) {
      dispatch(hideLoader());
      dispatch(setSnackbar(error.message, "error"));
    }
  };

export const categoryActiveAction = (formData) => async (dispatch) => {
  try {
    const res = await categoryActive(formData, formData.category_id);
    //("res", res?.data);
    if (res?.data?.status) {
      // dispatch(setSnackbar(res?.data?.message, "success"))
      dispatch({
        type: CATEGORY_ACTIVE,
        payload: formData,
      });
    }
  } catch (error) {
    // dispatch(setLoading(REMOVE_CATEGORY_LOADING));
    dispatch(setSnackbar(error.message, "error"));
  }
};
