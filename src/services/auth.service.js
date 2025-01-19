import API from "../api";

const apiEndpoint = "/account/";
const apiEndpoint2 = "/user_management/";

export const login = async (login) =>
  await API.post(apiEndpoint + "admin_login/", login);

export const forgotPassword = async (data) =>
  await API.post(apiEndpoint + "admin_forgot_password/", data);

export const resetPassword = async (user_id, token, data) =>
  await API.post(
    apiEndpoint + "admin_reset_password/" + user_id + "/" + token + "/",
    data
  );

export const getCurrentUser = async () =>
  await API.get(apiEndpoint + "admin_profile/");

export const getstats = async (data) =>
  await API.post(apiEndpoint + "overall_states/", data);

export const getAllPermissionsService = async (data) =>
  await API.get(apiEndpoint2 + "all_permissions/");

export const getUsersDetailReport = async () =>
  await API.post(apiEndpoint+ `user_details_report/`);
