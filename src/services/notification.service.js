import API from "../api";

const apiEndpoint = "/notification/";

export const getAllNotificationService = async () =>
	await API.get(apiEndpoint + `all_notification/`);

export const updateNotificationService = async (data) =>
	await API.put(apiEndpoint + `update_notification/${data.id}/`, data);

export const adminDeviceRegisterService = (data) =>
	API.post(apiEndpoint + "admin_device_register/", data);
