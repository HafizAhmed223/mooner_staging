import { CREATE_ADMIN_NOTIFICATION, GET_ALL_ADMIN_NOTIFICATION, GET_ALL_ADMIN_NOTIFICATION_COUNT } from "../../actions/adminNotification/adminNotification.type";


const INITIAL_STATE = {
	data: [],
	count: "",
	next: "",
	previous: "",
	loading: false,
};

const adminNotificationReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_ALL_ADMIN_NOTIFICATION:
			return { ...state, data: action.payload };
		case GET_ALL_ADMIN_NOTIFICATION_COUNT:
			return { ...state, count: action.payload };
		case CREATE_ADMIN_NOTIFICATION:
			return {
				...state, data: state.data.concat(action.payload)
			}
		default:
			return state;
	}
};
export default adminNotificationReducer;
