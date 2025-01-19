
import { 
    GET_ALL_QUESTIONAIRE, 
    GET_QUESTION_BY_ID, 
    ADD_QUESTION, 
    UPDATE_QUESTION,
    DELETE_QUESTION,
    SEARCH_QUESTIONS,
    QUESTIONAIRE_LOADING, REMOVE_QUESTIONAIRE_LOADING } from '../../actions/questionaire/questionaire.types';

const INITIAL_STATE = {
    questionaireList: [],
    total: '',
    next: '',
    previous: '',
    QById: "",
    data: '',
    deleted: '',
    updatedData: '',
    loading: true,

}

const questionaireReducer = (state = INITIAL_STATE, action,) => {

    switch (action.type) {
        case GET_ALL_QUESTIONAIRE:
            return { ...state, 
                questionaireList: action.payload.results,
                total: action.payload.count,
                next: action.payload.next,
                previous: action.payload.previous,
                loading: false, 
            }
        case GET_QUESTION_BY_ID:
            return { ...state, QById: action.payload, loading: false, }
        case ADD_QUESTION:
            return { ...state, data: action.payload, loading: false, }
        case UPDATE_QUESTION:
            return { ...state, updatedData: action.payload, loading: false, }
        case SEARCH_QUESTIONS:
            return{...state,
                questionaireList: action.payload.data.results,
                total: action.payload.data.count,
                next: action.payload.data.next,
                previous: action.payload.data.previous,
                loading: false,
            }
        case DELETE_QUESTION:
            return { ...state, questionaireList: state.questionaireList.filter(item=> item.id!==action.payload), loading: false, }
        case QUESTIONAIRE_LOADING:
            return { ...state, loading: true }
        case REMOVE_QUESTIONAIRE_LOADING:
            return { ...state, loading: false }
        default:
            return state
    }
}
export default questionaireReducer