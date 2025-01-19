import API from "../api";

const apiEndpoint = "/category_management/";

export const createSubCategoryService = async (formData) =>
  await API.post(apiEndpoint + "categories/", formData);
export const getAllSubCategoriesService = async (formDataCategory) =>
  await API.post(apiEndpoint + "get_childs/", formDataCategory);
export const changeImageService = async (formData, id) =>
  await API.put(apiEndpoint + "categories/" + id, formData);
export const updateCategoryService = async (formData, id) =>
  await API.put(apiEndpoint + "categories/" + id, formData);
export const deleteCategoryService = async (id) =>
  await API.post(apiEndpoint + "soft_del_category/", {
    category_id: id,
  });
export const getSubCategoryService = async (id) =>
  await API.get(apiEndpoint + "categories/" + id);
export const filtersubcategoryService = async (searchString, id) =>
  await API.get(
    apiEndpoint +
      `search_category_child/?search=${searchString}&parent_id=${id}`
  );
export const filterSubCatergoryUsersServices = async (id, searchString) =>
  await API.get(
    apiEndpoint + `search_category_users/${id}/?search=${searchString}`
  );
