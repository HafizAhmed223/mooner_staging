import {
	getAllNotificationService,
	updateNotificationService,
	adminDeviceRegisterService,
} from "../../../services/notification.service";
import { GET_NOTIFICATION } from "./notification.types";
import {
	clearSnackbar,
	setSnackbar,
	showLoader,
	hideLoader,
} from "../../../utils/global.actions";

export const getAllNotification = () => async (dispatch) => {
	try {
		dispatch(clearSnackbar());
		dispatch(showLoader());
		const { data } = await getAllNotificationService();
		dispatch({
			type: GET_NOTIFICATION,
			// payload: [data.data],
			payload: data.data,
		});
		dispatch(hideLoader());
	} catch (error) {
		dispatch(hideLoader());
		dispatch(setSnackbar(error.message, "error"));
	}
};
export const updateNotification = (value) => async (dispatch) => {
	try {
		dispatch(clearSnackbar());
		dispatch(showLoader());
		const { data } = await updateNotificationService(value);
		dispatch(hideLoader());
	} catch (error) {
		dispatch(hideLoader());
		dispatch(setSnackbar(error.message, "error"));
	}
};
export const adminDeviceRegister = (value) => async (dispatch) => {
	try {
		dispatch(clearSnackbar());
		dispatch(showLoader());
		const { data } = await adminDeviceRegisterService(value);
		dispatch(hideLoader());
	} catch (error) {
		dispatch(hideLoader());
		dispatch(setSnackbar(error.message, "error"));
	}
};
