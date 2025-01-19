import API from "../api";

const apiEndpoint = "/user_management/";

export const getAllUsers = async (pageNumber) =>
  await API.get(apiEndpoint + `admin_user_list/?page=${pageNumber}`);

export const updateUserStatus = async (data, id) =>
  await API.put("/service_provider/" + `admin_edit_sp/${id}/`, data);

export const updateUserProfile = async (profileData) =>
  await API.put(
    "/service_provider/" + `admin_edit_sp_profile/${profileData.id}/`,
    profileData
  );
export const updateSubAdminProfile = async (profileData) =>
  await API.put(
    apiEndpoint + "edit_subadmin_profile/" + profileData.id + "/",
    profileData
  );
export const deleteUserService = async (id) =>
  await API.get(apiEndpoint + `delete_user/${id}`);

export const filterUser = async (page, searchData) =>
  await API.get("account/" + `usersearch/?page=${page}&search=${searchData}`);
