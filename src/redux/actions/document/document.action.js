import {

    getApprovedService,
    getAllPendingDocument,
    deletePendingDoc,
    getPendingDocumentById,
    updateDocument,
    getDocbyId,
    editApprovedDoc,
    kycQuestion,
    kycQuestionsList,
    deleteKycQuestion
  } from "../../../services/document.service";
  import {
    GET_APPROVED_DOCUMENTS,
    GET_PENDING_DOC_lIST,
    DELETE_PENDING_DOC,
    GET_PENDING_DOC_BY_ID,
    DELETE_APPROVED_DOC,
    APPROVE_DOCUMENT,
    GET_DOC_BY_ID,
    EDIT_APPROVED_DOC,
    CREATE_KYC_QUESTION,
    KYC_QUESTION_LIST,
    DELETE_KYC_QUESTION
  } from "./document.types";
  import { clearSnackbar, setSnackbar, showLoader, hideLoader } from "../../../utils/global.actions";
  import history from "../../../utils/history";
  
  export const getApprovedDocuments = (pagenumber) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader());
      const { data } = await getApprovedService(pagenumber);
      dispatch({
        type: GET_APPROVED_DOCUMENTS,
        payload: data.data,
      });
      dispatch(hideLoader())
    } catch (error) {
      dispatch(hideLoader());
      dispatch(setSnackbar(error.message, "error"));
    }
  };

export const getAllPendingDoc = (pageNumber) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await getAllPendingDocument(pageNumber);
        dispatch({
            type: GET_PENDING_DOC_lIST,
            payload: data
        })
    } catch (error) {
        dispatch(hideLoader())
        dispatch(setSnackbar(error.message,"error"))

    }
}

export const getPendingDoceByIdAction = (id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const  {data}  = await getPendingDocumentById(id);
        dispatch({
            type: GET_PENDING_DOC_BY_ID,
            payload: data
        })        
    } catch (error) {
        dispatch(hideLoader())
        dispatch(setSnackbar(error.message,"error"))
    }
}

export const deletePendingDocAction = (id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const  data  = await deletePendingDoc(id);
        if(data.status === 204){
            dispatch({
                type: DELETE_PENDING_DOC,
                payload:id
            })
            dispatch(setSnackbar("Document successfully deleted", "success"));
            dispatch(hideLoader())
        }
    } catch (error) {
        dispatch(hideLoader())
        dispatch(setSnackbar(error.message,"error"))

    }
}

export const deleteApprovedAction = (id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const  data  = await deletePendingDoc(id);
        if(data.status === 204){
            dispatch({
                type: DELETE_APPROVED_DOC,
                payload:id
            })
            
            dispatch(setSnackbar("Document successfully deleted", "success"));
            dispatch(hideLoader())
        }
    } catch (error) {

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message,"error"))

    }
}

export const updateDocumentAction = (formData, id, disapprove) => async (dispatch) => {
    try{
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const  {data}  = await updateDocument(formData, id);
        dispatch({
            type: APPROVE_DOCUMENT,
            payload: data
        })
        if(disapprove === true) {
            history.push({ pathname: '/mooner/feed_back'})
            dispatch(setSnackbar("Document has been  disapproved", "success"));
        }
        if(disapprove === false) {
            history.push({ pathname: '/mooner/details/document_management' });
            dispatch(setSnackbar("Document Aproved successfully", "success"));
        }
        
        if(disapprove === "reasson") {
            if(data.status === true){
                history.push({ pathname: '/mooner/details/document_management' });
                dispatch(setSnackbar("Feedback has been send", "success"));
            }
            else{
                dispatch(setSnackbar(data.message, "error"));
            }
        }
        
        
        
    }
    catch(error){

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message,"error"))
    }
}

export const getDocbyIdAction = (id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const  {data}  = await getDocbyId(id);
        dispatch({
            type: GET_DOC_BY_ID,
            payload: data
        })
    } catch (error) {
        dispatch(hideLoader())
        dispatch(setSnackbar(error.message,"error"))
    }
}


export const editApprovedDocAction = (doc_data, id,) => async (dispatch) => {
    try{
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const  {data}  = await editApprovedDoc(doc_data, id);
        dispatch({
            type: EDIT_APPROVED_DOC,
            payload: data
        })
        history.push({ pathname: '/mooner/details/document_management' });
        dispatch(setSnackbar(data.message, "success"));
        
    }
    catch(error){

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message,"error"))
    }
}

export const createKycQuestionAction = (kyc_data) => async (dispatch) => {
    try{
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const  {data}  = await kycQuestion(kyc_data);
        dispatch({
            type: CREATE_KYC_QUESTION,
            payload: data
        })
        history.push({ pathname: '/mooner/details/kyc_question_list' });
        dispatch(setSnackbar(data.message, "success"));
    }
    catch(error){

        dispatch(hideLoader())
        dispatch(setSnackbar(error.message,"error"))
    }
}

export const kycQuestionListAction = (pageNumber) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const { data } = await kycQuestionsList(pageNumber);
        dispatch({
            type: KYC_QUESTION_LIST,
            payload: data
        })
    } catch (error) {
        dispatch(hideLoader())
        dispatch(setSnackbar(error.message,"error"))

    }
}

export const deleteKycQuestionAction = (id) => async (dispatch) => {
    try {
        dispatch(clearSnackbar())
        dispatch(showLoader())
        const  data  = await deleteKycQuestion(id);
        if(data.status === 204){
            dispatch({
                type: DELETE_KYC_QUESTION,
                payload:id
            })
            dispatch(setSnackbar("Document successfully deleted", "success"));
            dispatch(hideLoader())
        }
    } catch (error) {
        dispatch(hideLoader())
        dispatch(setSnackbar(error.message,"error"))

    }
}