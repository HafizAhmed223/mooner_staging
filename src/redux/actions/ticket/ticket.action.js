import {
  getTicketsService,
  getTicketService,
  deleteTicketService,
  updateTicketService,
  filterTicket,
} from "../../../services/ticket.service";
import {
  GET_ALL_TICKETS,
  GET_TICKET,
  DELETE_TICKET,
  SEARCH_TICKET,
} from "./ticket.types";
import {
  clearSnackbar,
  setSnackbar,
  showLoader,
  hideLoader,
} from "../../../utils/global.actions";
import history from "../../../utils/history";

export const getAllTickets =
  (pagenumber, date, endDate) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader());
      const { data } = await getTicketsService(pagenumber, date, endDate);
      dispatch({
        type: GET_ALL_TICKETS,
        payload: data.data,
      });
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(setSnackbar(error.message, "error"));
    }
  };
export const getTicket = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getTicketService(id);
    dispatch({
      type: GET_TICKET,
      payload: data.data,
    });
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const updateTicket = (fromData, id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const res = await updateTicketService(fromData, id);
    //("updated ticket response", res);
    if (res.status) {
      dispatch(hideLoader());
      history.push("/mooner/details/ticket_management");
      dispatch(setSnackbar(res.data.message, "success"));
    }
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};
export const deleteTicket = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const res = await deleteTicketService(id);

    if (res.status === 204) {
      dispatch({
        type: DELETE_TICKET,
        payload: id,
      });
      dispatch(setSnackbar("Ticket successfully deleted", "success"));
    }
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const filterTicketAction = (page, searchString) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await filterTicket(page, searchString);
    dispatch({
      type: SEARCH_TICKET,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    // dispatch(setSnackbar(error.message, "error"))
  }
};
