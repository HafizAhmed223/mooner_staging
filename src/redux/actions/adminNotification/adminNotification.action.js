import { createAdminNotificationService, getAdminNotificationService } from "../../../services/adminNotification.service";
import { clearSnackbar, hideLoader, setSnackbar, showLoader } from "../../../utils/global.actions";
import { CREATE_ADMIN_NOTIFICATION, GET_ALL_ADMIN_NOTIFICATION, GET_ALL_ADMIN_NOTIFICATION_COUNT } from "./adminNotification.type";
import history from "../../../utils/history";




export const getAllAdminNotification = (pageNumber) => async (dispatch) => {
    try {
        dispatch(clearSnackbar());
        dispatch(showLoader());
        const { data } = await getAdminNotificationService(pageNumber);
        console.log(data, 'ppppppppppppp')
        dispatch({
            type: GET_ALL_ADMIN_NOTIFICATION,
            // payload: [data.data],
            payload: data.results,
        });
        dispatch({
            type: GET_ALL_ADMIN_NOTIFICATION_COUNT,
            // payload: [data.data],
            payload: data.count,
        });
        dispatch(hideLoader());
    } catch (error) {
        dispatch(hideLoader());
        dispatch(setSnackbar(error.message, "error"));
    }
};
export const createAdminNotificationAction = (data) => async (dispatch) => {
    try {
        dispatch(clearSnackbar());
        dispatch(showLoader());
        const response = await createAdminNotificationService(data);
        dispatch({
            type: CREATE_ADMIN_NOTIFICATION,
            payload: response.data,
        });
        dispatch(hideLoader());
        dispatch(setSnackbar("Admin Notification created successfully", "success"));
        history.push("/mooner/details/sticky_notice");
    } catch (error) {
        dispatch(setSnackbar(error.message, "error"));
    }
};