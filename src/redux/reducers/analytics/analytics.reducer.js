import {
	GET_CUSTOM_ANALYTICS, POST_BOOKING_CUSTOM_ANALYTICS
} from "../../actions/analytics/analytics.types";

const INITIAL_STATE = {
	data: [],
	status: false,
	loading: false,

};

const analyticsReducer = (state = INITIAL_STATE, action) => {
	// console.log("action.payload analytics",action?.payload)
	switch (action.type) {
		case GET_CUSTOM_ANALYTICS:
			return {
				...state,
				data: action?.payload
			};
		case POST_BOOKING_CUSTOM_ANALYTICS:
			return {
				...state,
				data: action?.payload
			};
		default:
			return state;
	}
};
export default analyticsReducer;
