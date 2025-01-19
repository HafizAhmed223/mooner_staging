import {
    GET_REPORT
} from "../../actions/reports/report.types";

const INITIAL_STATE = {
    data: [],
    count: "",
}

const reportReducer = (state = INITIAL_STATE, action,) => {

    switch (action.type) {
        case GET_REPORT:
            return { ...state, data: action.payload, }
        default:
            return state
    }
}
export default reportReducer;
