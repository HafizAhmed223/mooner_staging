import {  
    getRattings,
    deleteRatting,
    getRattingById,
    updateRatting
} from '../../../services/ratting.service'
import { 
    GET_RATTING_LIST,
    GET_RATTING_BY_ID,
    UPDATE_RATTING,
    DELETE_RATTING,
} from './ratting.types';
import { clearSnackbar, setSnackbar, showLoader, hideLoader } from "../../../utils/global.actions";
import history from "../../../utils/history";

export const allRattingReviews = (id, pageNumber) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await getRattings(id,pageNumber);
        dispatch({
            type: GET_RATTING_LIST,
            payload: data
        })
    } catch (error) {

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))

    }
} 

export const getRattingByIdAction = (id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await getRattingById(id);
        dispatch({
            type: GET_RATTING_BY_ID,
            payload: data
        })
    } catch (error) {

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))

    }
}

export const updateRattingAction = (rattingdata, id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await updateRatting(rattingdata, id);
        if(data.status === true){
            dispatch({
                type: UPDATE_RATTING,
                payload: data
            })
            history.push({ pathname: '/mooner/details/sp_management' })
            dispatch(setSnackbar(data.message, "success"));
        }
    } catch (error) {

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))

    }
}

export const deleteRattingAction = (id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await deleteRatting(id);
        dispatch({
            type:DELETE_RATTING,
            payload:id
        });
        dispatch(setSnackbar("Deleted successfully", "success"))
    } catch (error) {

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message, "error"))

    }
}