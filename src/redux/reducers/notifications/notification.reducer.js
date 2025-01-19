import { GET_NOTIFICATION } from "../../actions/notifications/notification.types";

const INITIAL_STATE = {
	data: {},
};

const notificationReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_NOTIFICATION:
			return { ...state, data: action.payload };
		default:
			return state;
	}
};
export default notificationReducer;
