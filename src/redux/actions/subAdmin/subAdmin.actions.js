import {
    SUB_ADMIN_LOADING,
    REMOVE_SUB_ADMIN_LOADING,
    GET_ALL_SUB_ADMIN_lIST,
    GET_SUB_ADMIN_BY_ID,

} from "./subAdmin.types";

import { 
    getAllSubAdminlist, 
    getSubAdminById,
} 
from '../../../services/subAdmin.services'

import { setLoading, clearErrors, setErrors } from '../../../utils/global.actions';
import history from "../../../utils/history";