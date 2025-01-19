import {
	GET_ALL_TICKETS,
	GET_TICKET,
	DELETE_TICKET,
	SEARCH_TICKET,
} from "../../actions/ticket/ticket.types";

const INITIAL_STATE = {
	data: [],
	dataById: {},
	count: "",
	next: "",
	previous: "",
	loading: false,
};

const ticketReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_ALL_TICKETS:
			return {
				...state,
				data: action.payload.results,
				count: action.payload.count,
				next:
					action &&
					action.payload &&
					action.payload.data &&
					action.payload.data.next,
				previous:
					action &&
					action.payload &&
					action.payload.data &&
					action.payload.data.previous,
			};
		case SEARCH_TICKET:
			return {
				...state,
				data:
					action &&
					action.payload &&
					action.payload.data &&
					action.payload.data.results,
				count:
					action &&
					action.payload &&
					action.payload.data &&
					action.payload.data.count,
				next:
					action &&
					action.payload &&
					action.payload.data &&
					action.payload.data.next,
				previous:
					action &&
					action.payload &&
					action.payload.data &&
					action.payload.data.previous,
				loading: false,
			};
		case GET_TICKET:
			return { ...state, dataById: action.payload };
		case DELETE_TICKET:
			return {
				...state,
				data: state.data.filter((item) => item.id !== action.payload),
			};
		default:
			return state;
	}
};
export default ticketReducer;
