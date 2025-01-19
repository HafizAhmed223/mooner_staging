import {
    UPDATE_PASSWORD,
    CHANGE_PASSWORD_LOADING,
    REMOVE_CHANGE_PASSWORD_LOADING
} from "./ChangePassword.types";

import { setLoading, clearErrors, setErrors } from '../../../utils/global.actions';
import history from "../../../utils/history";
import { updatePassword } from "../../../services/changePassword.service"

export const UpdatePassword = (formData, id,) => async (dispatch) => {
    try{
        dispatch(clearErrors())
        dispatch(setLoading(CHANGE_PASSWORD_LOADING))
        const  {data}  = await updatePassword(formData, id);
        if (data.status === false){
            if(data && data.Response && data.Response)
            dispatch(setErrors( data && data.Response && data.Response));
            return;
        }
        if(data.status === true){
            dispatch({
                type: UPDATE_PASSWORD,
                payload: data
            })
            history.push({ pathname: '/mooner/details/change_password' })
        }
    }
    catch(error){
        dispatch(setLoading(REMOVE_CHANGE_PASSWORD_LOADING))
        dispatch(setErrors(error.message))
    }
}