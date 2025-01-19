
import {
    ADD_PRIVICY_POLICY,
    GET_POLICY_CONTENT,
    EDIT_PRIVICY_POLICY_CONTENT,

    ADD_TERMS_CONDITIONS,
    GET_TERMS_CONDITIONS,
    EDIT_TERMS_CONDITIONS,

    ADD_ABOUT_US,
    GET__ABOUT_US,
    EDIT_ABOUT_US_CONTENT,

} from '../../actions/PrivicyPolicy/privicyPolicy.types';

const INITIAL_STATE = {
    privicyData: "",
    termsData: '',
    aboutusData: '',
    loading: true,
}

const privicyReducer = (state = INITIAL_STATE, action,) => {

    switch (action.type) {
        case GET_POLICY_CONTENT:
            return {
                ...state,
                privicyData: action.payload.data,
                loading: false,
            }
        case EDIT_PRIVICY_POLICY_CONTENT:
            return {
                ...state,
                privicyData: action.payload.data,
                loading: false,
            }

        case GET_TERMS_CONDITIONS:
            return {
                ...state,
                termsData: action.payload.data,
                loading: false,
            }
        case EDIT_TERMS_CONDITIONS:
            return {
                ...state,
                termsData: action.payload.data,
                loading: false,
            }

        case GET__ABOUT_US:
            return {
                ...state,
                aboutusData: action.payload.data,
                loading: false,
            }
        case EDIT_ABOUT_US_CONTENT:
            return {
                ...state,
                aboutusData: action.payload.data,
                loading: false,
            }
        default:
            return state
    }
}
export default privicyReducer