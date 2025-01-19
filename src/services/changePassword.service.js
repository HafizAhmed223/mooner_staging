import API from "../api";

const apiEndpoint = "/user_management/";

export const updatePassword = async (data, id) =>
  await API.put(apiEndpoint + `edit_change_password_user/${id}/`, data);
