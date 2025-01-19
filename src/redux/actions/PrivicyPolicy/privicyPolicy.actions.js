import {
    getPrivicyPolicyContent,
    addPrivicyPolicyContent,
    updatePrivicyPolicy,

    getTermsConditionsContent,
    updateTermsConditions,

    getAboutContent,
    updateAboutContent

} from '../../../services/privicyPolicy.servces'
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

} from './privicyPolicy.types';
import { clearSnackbar, setSnackbar, showLoader, hideLoader } from "../../../utils/global.actions";
import history from "../../../utils/history";

export const AddPrivicyPolicyContent = (questions, history) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await addPrivicyPolicyContent(questions);
        dispatch({
            type: ADD_PRIVICY_POLICY,
            payload: data
        })
        dispatch(setSnackbar("Content added successfully", "success"));
        history.push({ pathname: '/mooner/details/mooner_management' })
        dispatch(setSnackbar("Content added successfully", "success"))
    } catch (error) {

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))

    }
}


export const GetPrivicyPolicyContentAction = (id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await getPrivicyPolicyContent(id);
        dispatch({
            type: GET_POLICY_CONTENT,
            payload: data
        })
    } catch (error) {
        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))

    }
}

export const UpdatePrivicyPolicyAction = (payload, id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await updatePrivicyPolicy(payload, id);
        dispatch({
            type: EDIT_PRIVICY_POLICY_CONTENT,
            payload: data
        })
        dispatch(setSnackbar(data.message, "success"));
        history.push({ pathname: '/mooner/details/mooner_management' })
        dispatch(setSnackbar(data.message, "success"));
    } catch (error) {

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))

    }
}


//////////////////////// Terms And Conditions Actions ////////////////////////////////

export const getTermsConditionAction = (id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await getTermsConditionsContent(id);
        dispatch({
            type: GET_TERMS_CONDITIONS,
            payload: data
        })
    } catch (error) {
        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))

    }
}

export const UpdateTermsConditionsAction = (payload, id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await updateTermsConditions(payload, id);
        dispatch({
            type: EDIT_TERMS_CONDITIONS,
            payload: data
        })
        dispatch(setSnackbar(data.message, "success"));
        history.push({ pathname: '/mooner/details/mooner_management' });
        dispatch(setSnackbar(data.message, "success"));
    } catch (error) {
        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))
    }
}

//////////////////////////// ABOUT US ACTIONS ///////////////////////////////////////



export const getAboutUsAction = (id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await getAboutContent(id);
        dispatch({
            type: GET__ABOUT_US,
            payload: data
        })
    } catch (error) {
        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))

    }
}

export const UpdateAboutUsAction = (payload, id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await updateAboutContent(payload, id);
        dispatch({
            type: EDIT_ABOUT_US_CONTENT,
            payload: data
        });
        dispatch(setSnackbar(data.message, "success"));
        history.push({ pathname: '/mooner/details/mooner_management' })
        dispatch(setSnackbar(data.message, "success"));
    } catch (error) {
        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))
    }
}