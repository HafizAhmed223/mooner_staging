import {
  PENDING_REFUND_DISPUTE_LIST,
  GET_PENDING_REFUND_DISPUTE,
  EDIT_PENDING_REFUND_DISPUTE,
  DELETE_PENDING_REFUND_DISPUTE,
  REJECT_PENDING_REFUND_DISPUTE,
  APPROVE_PENDING_REFUND_DISPUTE,
  DISPUTE_HISTORY_LIST,
  APROVED_REFUND_DISPUTE_LIST,
  GET_APROVED_REFUND_DISPUTE,
  EDIT_APROVED_REFUND_DISPUTE,
  DELETE_APROVED_REFUND_DISPUTE,
  REJECTED_REFUND_DISPUTE_LIST,
  GET_REJECTED_REFUND_DISPUTE,
  EDIT_REJECTED_REFUND_DISPUTE,
  DELETE_REJECTED_REFUND_DISPUTE,
} from "./dispute.types";

import {
  pendingListService,
  deletePendingDisputeService,
  getSinglePendingDisputeService,
  rejectService,
  approveService,
  historyListService,
  aprovedListService,
  deleteAprovedDisputeService,
  rejectedListService,
  deleteRejectedDisputeService,
} from "../../../services/dispute.services";

import {
  clearSnackbar,
  setSnackbar,
  showLoader,
  hideLoader,
} from "../../../utils/global.actions";
import history from "../../../utils/history";

export const allpendingDisputeAction = (pageNumber) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await pendingListService(pageNumber);
    dispatch({
      type: PENDING_REFUND_DISPUTE_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const deletePendingDispute = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await deletePendingDisputeService(id);
    dispatch({
      type: DELETE_PENDING_REFUND_DISPUTE,
      payload: id,
    });
    dispatch(setSnackbar(data.message, "success"));
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const getSinglePendingDispute = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getSinglePendingDisputeService(id);
    dispatch({
      type: GET_PENDING_REFUND_DISPUTE,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const RejectAction = (payload, id) => async (dispatch) => {
  //("action of reject", payload);
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await rejectService(payload, id);
    dispatch({
      type: REJECT_PENDING_REFUND_DISPUTE,
      payload: data,
    });
    dispatch(setSnackbar(data.message, "success"));
    history.push({ pathname: "/mooner/details/pending_disputes" });
    dispatch(setSnackbar(data.message, "success"));
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar("Internal Server Error", "error"));
  }
};

export const ApproveAction = (payload, id) => async (dispatch) => {
  //("action of approve", payload);
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await approveService(payload, id);
    dispatch({
      type: APPROVE_PENDING_REFUND_DISPUTE,
      payload: data,
    });
    dispatch(setSnackbar(data.message, "success"));
    history.push({ pathname: "/mooner/details/pending_disputes" });
    dispatch(setSnackbar(data.message, "success"));
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar("Internal Server Error", "error"));
  }
};

export const disputeHistoryList = (payload) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await historyListService(payload);
    dispatch({
      type: DISPUTE_HISTORY_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

////////////////////////////////////////////////////////
//
//  APPROVED DISPUTES ACTIONS
//
/////////////////////////////////////////////////////////

export const allAprovedDisputeAction = (pageNumber) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await aprovedListService(pageNumber);
    dispatch({
      type: APROVED_REFUND_DISPUTE_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const deleteAprovedDispute = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await deleteAprovedDisputeService(id);
    dispatch({
      type: DELETE_APROVED_REFUND_DISPUTE,
      payload: id,
    });
    dispatch(setSnackbar(data.message, "success"));
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

////////////////////////////////////////////////////////
//
//  REJECTED DISPUTES ACTIONS
//
/////////////////////////////////////////////////////////

export const rejectedDisputeAction = (pageNumber) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await rejectedListService(pageNumber);
    dispatch({
      type: REJECTED_REFUND_DISPUTE_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const deleteRejectedDispute = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await deleteRejectedDisputeService(id);
    dispatch({
      type: DELETE_REJECTED_REFUND_DISPUTE,
      payload: id,
    });
    dispatch(setSnackbar(data.message, "success"));
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};
