
import { 
    GET_RATTING_LIST,
    GET_RATTING_BY_ID,
    UPDATE_RATTING,
    DELETE_RATTING
} from '../../actions/ratting/ratting.types';

const INITIAL_STATE = {
    rattingList: [],
    rattingById: '',
    total: '',
    next: '',
    previous: '',
    loading: true,

}

const RattingReducer = (state = INITIAL_STATE, action,) => {

    switch (action.type) {
        case GET_RATTING_LIST:
            return { ...state, 
                rattingList: action.payload.data.results,
                total: action.payload.count,
                next: action.payload.next,
                previous: action.payload.previous,
                loading: false, 
            }
        case GET_RATTING_BY_ID:
            return { ...state, rattingById: action.payload, loading: false, }
        
        case DELETE_RATTING:
            return { ...state, rattingList: state.rattingList.filter(item=> item.id!==action.payload), loading: false, }

        default:
            return state
    }
}
export default RattingReducer;