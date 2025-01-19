import {
    UPDATE_PASSWORD,
    CHANGE_PASSWORD_LOADING,
    REMOVE_CHANGE_PASSWORD_LOADING
} from "../../actions/changePassword/ChangePassword.types";

const INITIAL_STATE = {
    data: '',
}

const ChangePassswordReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case UPDATE_PASSWORD:
            return { ...state }
    default:
        return state
    }
}
export default ChangePassswordReducer