import API from "../api";

const apiEndpoint = "/category_management/";

export const getAllCategories = async () =>
	await API.get(apiEndpoint + "categories/");

export const getCategoryById = async (formData) =>
	await API.post(apiEndpoint + "get_childs/", formData);
export const getSubcategoryChild = async (formData) =>
	await API.post(apiEndpoint + "get_childs/", formData);
export const createCategoryService = async (formData) =>
	await API.post(apiEndpoint + "categories/", formData);
export const updateCategoryService = async (formData, id) =>
	await API.put(apiEndpoint + "categories/" + id, formData);
export const changeImageService = async (formData, id) =>
	await API.put(apiEndpoint + "categories/" + id, formData);
export const deleteCategoryService = async (id) =>
	await API.post(apiEndpoint + "soft_del_category/", {
		category_id: id,
	});
export const getCategoryService = async (id) =>
	await API.get(apiEndpoint + "categories/" + id);

export const getRegisterUser = async (id, pageNumber) =>
	await API.get(
		apiEndpoint + `category_registered_users/${id}/?page=${pageNumber}`
	);

export const catergoryFilterService = async (searchString) =>
	await API.get(apiEndpoint + `search_categories/?search=${searchString}`);

export const catergoryregistererduserFilterService = async (searchString, id) =>
	await API.get(
		apiEndpoint + `search_category_users/${id}/?search=${searchString}`
	);

export const categoryActive = async (formData) =>
	await API.post(`category_management/inactive_category/`, formData);
