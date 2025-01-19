import API from "../api";

const apiEndpoint = "/document_management/";

export const getApprovedService = async (pagenumber) =>
  await API.get(apiEndpoint + `get_approved_answers/?page=${pagenumber}`);
export const getAllPendingDocument = async (pageNumber) => await API.get(apiEndpoint + `get_pending_answers/?page=${pageNumber}`)

export const deletePendingDoc = async (id) =>
  await API.delete(apiEndpoint + `update_kyc_admin/${id}/`);

  export const getPendingDocumentById = async (id) =>
  await API.get(apiEndpoint + `update_kyc_admin/${id}/`);

  export const updateDocument = async (data, id) =>
  await API.put(apiEndpoint + `update_kyc_admin/${id}/`, data);

export const getDocbyId = async (id) =>
  await API.get(apiEndpoint + `update_kyc_admin/${id}/`);

export const editApprovedDoc = async (doc, id) =>
  await API.put(apiEndpoint + `update_kyc_admin/${id}/`, doc);

export const kycQuestion = async (doc, id) =>
  await API.post(apiEndpoint + `get_document/`, doc);

export const kycQuestionsList = async (pagenumber) =>
  await API.get(apiEndpoint + `get_document/?${pagenumber}`);


export const deleteKycQuestion = async (id) =>
  await API.delete(apiEndpoint + `edit_document/${id}/`);