import API from "../api";

const apiEndpoint = "/notification/";

export const getAdminNotificationService = async (pageNumber) =>
    await API.get(apiEndpoint + `admin_notification/?page=${pageNumber}`);
export const createAdminNotificationService = (data) => API.post(apiEndpoint + "admin_notification/", data);