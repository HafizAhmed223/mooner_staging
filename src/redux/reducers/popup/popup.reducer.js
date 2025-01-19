import { HIDE_LOADER, SHOW_LOADER } from "../../actions/common.action";
import { CREATE_POPUP, DELETE_POPUP, GET_POPUP_BY_ID, GET_POPUP_LIST, UPDATE_POPUP } from "../../actions/popups/popup.types"



const INITIAL_STATE = {
    data: [],
    count: "",
    next: "",
    previous: "",
    loading: false,

}

const popupReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true };
        case HIDE_LOADER:
            return { ...state, loading: false };
        case DELETE_POPUP:
            return {
                ...state,
                data: state.data.filter((item) => item.id !== action.payload),
            };
        case GET_POPUP_LIST:
            return {
                ...state,
                data: action?.payload.results,
                count: action.payload.count,
                next: action.payload.next,
                previous: action.payload.previous
            }
        case CREATE_POPUP:
            return {
                ...state, data: state.data.concat(action.payload)
            }
        case GET_POPUP_BY_ID:
            return { ...state, PopupById: action.payload, loading: false, }
        case UPDATE_POPUP:
            return {
                ...state,
                data: state.data.map((item) => {
                    if (item._id === action.payload._id) return action.payload;
                    return item;
                }),
            };
        default:
            return state;
    }
}

export default popupReducer;