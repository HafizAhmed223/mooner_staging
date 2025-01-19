import {
    PENDING_REFUND_DISPUTE_LIST,
    GET_PENDING_REFUND_DISPUTE,
    EDIT_PENDING_REFUND_DISPUTE,
    DELETE_PENDING_REFUND_DISPUTE,
    DISPUTE_HISTORY_LIST,

    APROVED_REFUND_DISPUTE_LIST,
    GET_APROVED_REFUND_DISPUTE,
    EDIT_APROVED_REFUND_DISPUTE,
    DELETE_APROVED_REFUND_DISPUTE,

    
    REJECTED_REFUND_DISPUTE_LIST,
    GET_REJECTED_REFUND_DISPUTE,
    EDIT_REJECTED_REFUND_DISPUTE,
    DELETE_REJECTED_REFUND_DISPUTE

} from "../../actions/disputeManagement/dispute.types";

const INITIAL_STATE = {
    pendingDisputeData: '',
    historyList: [],
    pendingDisputeList: [],
    aproveDisputeList: [],
    rejectedDisputeList: [],
    count: "",
    total: '',
    next: '',
    previous: '',
    loading: false,
}

const disputeManagement = (state = INITIAL_STATE, action,) => {

    switch (action.type) {
        case PENDING_REFUND_DISPUTE_LIST:
            return {
                ...state,
                pendingDisputeList: action.payload.results,
                total: action && action.payload && action.payload.count,
                next: action && action.payload && action.payload.next,
                previous: action && action.payload && action.payload.previous,
                loading: false,
            }
            case DISPUTE_HISTORY_LIST:
                return {
                    ...state,
                    historyList: action.payload.data,
                    loading: false,
                }
        case DELETE_PENDING_REFUND_DISPUTE:
            return { ...state, pendingDisputeList: state.pendingDisputeList.filter(item => item.id !== action.payload), loading: false, }
        case GET_PENDING_REFUND_DISPUTE:
            return {
                ...state,
                pendingDisputeData: action.payload && action.payload.data,
                loading: false,
            }

        case APROVED_REFUND_DISPUTE_LIST:
            return {
                ...state,
                aproveDisputeList: action.payload.results,
                total: action && action.payload && action.payload.count,
                next: action && action.payload && action.payload.next,
                previous: action && action.payload && action.payload.previous,
                loading: false,
            }

            case DELETE_APROVED_REFUND_DISPUTE:
                return { ...state, aproveDisputeList: state.aproveDisputeList.filter(item => item.id !== action.payload), loading: false, }

            case REJECTED_REFUND_DISPUTE_LIST:
                return {
                    ...state,
                    rejectedDisputeList: action.payload.results,
                    total: action && action.payload && action.payload.count,
                    next: action && action.payload && action.payload.next,
                    previous: action && action.payload && action.payload.previous,
                    loading: false,
                }
            case DELETE_REJECTED_REFUND_DISPUTE:
                return { ...state, rejectedDisputeList: state.rejectedDisputeList.filter(item => item.id !== action.payload), loading: false, }

        default:
            return state
    }
}
export default disputeManagement;
