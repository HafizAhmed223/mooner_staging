import { getAllQuestionaire, addQuestion, getQuestionBuId, updateQuestion, deleteQuestion, filterQuestionaires } from '../../../services/questionaire.service'
import { 
    GET_ALL_QUESTIONAIRE,
    GET_QUESTION_BY_ID,
    DELETE_QUESTION, 
    ADD_QUESTION, 
    UPDATE_QUESTION,
    QUESTIONAIRE_LOADING, 
    REMOVE_QUESTIONAIRE_LOADING,
    SEARCH_QUESTIONS,
} from './questionaire.types';
import { clearSnackbar, setSnackbar, showLoader, hideLoader } from "../../../utils/global.actions";
import history from "../../../utils/history";

export const getAllQuestionaireAction = (pageNumber) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await getAllQuestionaire(pageNumber);
        dispatch({
            type: GET_ALL_QUESTIONAIRE,
            payload: data
        })
    } catch (error) {

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))

    }
} 


export const createQuestionAireAction = (questions, history) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await addQuestion(questions);
        dispatch({
            type: ADD_QUESTION,
            payload: data
        })
        dispatch(setSnackbar("Questionaire has successfully created", "success"));
        history.push({ pathname: '/mooner/details/questionaire' })
        dispatch(setSnackbar("Questionnaire created successfully", "success"))
    } catch (error) {

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))

    }
}

export const deleteQuestionAireAction = (id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await deleteQuestion(id);
        dispatch({
            type:DELETE_QUESTION,
            payload:id
        });
        dispatch(setSnackbar("Questionaire deleted successfully", "success"))
    } catch (error) {

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))

    }
}


export const getQuestionAireByIdAction = (id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await getQuestionBuId(id);
        if (data) {
            getAllQuestionaireAction();
            dispatch({
                type: GET_QUESTION_BY_ID,
                payload: data
            })
        }
    } catch (error) {

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))

    }
}

export const updateeQuestionAireAction = (formData, id, history) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await updateQuestion(formData, id);
        dispatch({
            type: UPDATE_QUESTION,
            payload: data
        })
        history.push({ pathname: '/mooner/details/questionaire' })
        dispatch(setSnackbar("questionaire updated successfully", "success"));
    } catch (error) {

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))

    }
}

export const searchQuestionairesAction = (page ,searchString) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader(QUESTIONAIRE_LOADING))
        const { data } = await filterQuestionaires(page, searchString);
        dispatch({
            type: SEARCH_QUESTIONS,
            payload: data
        })
        
    } catch (error) {
        dispatch(hideLoader(REMOVE_QUESTIONAIRE_LOADING))
        // dispatch(setSnackbar(error.message, "error"))
    }
}