import {
    POST_COMMON_CATEGORY_KYC,
    GET_COMMON_CATEGORY_KYC_LIST,
    GET_COMMON_CATEGORY_KYC,
    EDIT_COMMON_CATEGORY_KYC,
    DELETE_COMMON_CATEGORY_KYC,

    CATEGORY_SPECFIC_KYC_LIST,
    POST_SPECIFIC_CATEGORY_KYC,
    GET_SPECIFIC_CATEGORY_KYC,
    EDIT_SPECIFIC_CATEGORY_KYC,
    DELETE_SPECIFIC_CATEGORY_KYC,
    COMMOM_QUESTIONS,

    KYC_ANSWERS_LIST,
    GET_KYC_ANSWERS,
    EDIT_KYC_ANSWERS,
    DELETE_KYC_ANSWERS
} from "../../actions/categoryKyc/categoryKyc.types";

const INITIAL_STATE = {
    commonKyc: '',
    specficKyc: '',
    kycAnswer: '',
    commonQuestions: [],
    commonKycList: [],
    categorySpecificKycList: [],
    kycAnswersList: [],
    count: "",
    doclist: [],
    total: '',
    next: '',
    previous: '',
    loading: false,
}

const categoryKyc = (state = INITIAL_STATE, action,) => {

    switch (action.type) {
        case POST_COMMON_CATEGORY_KYC:
            return {
                ...state,
            }
        case GET_COMMON_CATEGORY_KYC_LIST:
            return {
                ...state,
                commonKycList: action.payload.results,
                total: action && action.payload && action.payload.count,
                next: action && action.payload && action.payload.next,
                previous: action && action.payload && action.payload.previous,
                loading: false,
            }
        case COMMOM_QUESTIONS:
            return {
                ...state,
                commonQuestions: action.payload.results,
                loading: false,
            }
        case GET_COMMON_CATEGORY_KYC:
            return {
                ...state,
                commonKyc: action.payload && action.payload.data,
                loading: false,
            }
        case DELETE_COMMON_CATEGORY_KYC:
            return { ...state, commonKycList: state.commonKycList.filter(item => item.id !== action.payload), loading: false, }

        case CATEGORY_SPECFIC_KYC_LIST:
            return {
                ...state,
                categorySpecificKycList: action.payload.results,
                total: action && action.payload && action.payload.count,
                next: action && action.payload && action.payload.next,
                previous: action && action.payload && action.payload.previous,
                loading: false,
            }
        case DELETE_SPECIFIC_CATEGORY_KYC:
            return { ...state, categorySpecificKycList: state.categorySpecificKycList.filter(item => item.id !== action.payload), loading: false, }

        case GET_SPECIFIC_CATEGORY_KYC:
            return {
                ...state,
                specficKyc: action.payload && action.payload.data,
                loading: false,
            }
        case KYC_ANSWERS_LIST:
            return {
                ...state,
                kycAnswersList: action.payload.results,
                total: action && action.payload && action.payload.count,
                next: action && action.payload && action.payload.next,
                previous: action && action.payload && action.payload.previous,
                loading: false,
            }
        case DELETE_KYC_ANSWERS:
            return { ...state, kycAnswersList: state.kycAnswersList.filter(item => item.id !== action.payload), loading: false, }
        
        case GET_KYC_ANSWERS:
            return {
                ...state,
                kycAnswer: action.payload,
                loading: false,
            }

        default:
            return state
    }
}
export default categoryKyc;
