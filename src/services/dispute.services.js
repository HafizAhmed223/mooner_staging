import API from "../api";

const apiEndpoint = "/dispute_management/";

export const pendingListService = async (pagenumber) =>
  await API.get(apiEndpoint + `admin_unresolved_disputes/?page=${pagenumber}`);

export const deletePendingDisputeService = async (id) =>
  await API.delete(apiEndpoint + `dispute/${id}/`);

export const getSinglePendingDisputeService = async (id) =>
  await API.get(apiEndpoint + `dispute/${id}/`);

export const rejectService = async (data, id) =>
  await API.put(apiEndpoint + `admin_update_dispute/${id}/`, data);

export const approveService = async (data, id) =>
  await API.put(apiEndpoint + `admin_update_dispute/${id}/`, data);

export const historyListService = async (payload) =>
  await API.post(apiEndpoint + `dispute_history/`, payload);

////////////////////////////////////////////////////////
//
//  APPROVED DISPUTES SERVICES
//
/////////////////////////////////////////////////////////

export const aprovedListService = async (pagenumber) =>
  await API.get(apiEndpoint + `admin_resolved_disputes/?page=${pagenumber}`);

export const deleteAprovedDisputeService = async (id) =>
  await API.delete(apiEndpoint + `dispute/${id}/`);

////////////////////////////////////////////////////////
//
//  REJECTED DISPUTES SERVICES
//
/////////////////////////////////////////////////////////

export const rejectedListService = async (pagenumber) =>
  await API.get(apiEndpoint + `admin_rejected_disputes/?page=${pagenumber}`);

export const deleteRejectedDisputeService = async (id) =>
  await API.delete(apiEndpoint + `dispute/${id}/`);
