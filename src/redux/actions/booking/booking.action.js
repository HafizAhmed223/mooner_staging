import {
  getUserDetailService,
  getUserBookingService,
  changeStatusService,
  deleteBooklingService,
  getAllPaymentsService,
  getTipsService,
} from "../../../services/booking.service";
import {
  GET_USER_DETAIL,
  GET_USER_BOOKING,
  GET_PAYMENTS_LIST,
  GET_TIP_LIST,
} from "./booking.types";
import {
  clearErrors,
  setErrors,
  showLoader,
  hideLoader,
} from "../../../utils/global.actions";
import history from "../../../utils/history";

export const getUserDetail = (id) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(showLoader());
    const { data } = await getUserDetailService(id);
    dispatch({
      type: GET_USER_DETAIL,
      payload: data,
    });
    dispatch(hideLoader());
    // localStorage.setItem("id",id)
  } catch (error) {
    dispatch(showLoader());
    dispatch(setErrors(error.message));
  }
};
export const getUserBookingList = (formData, page) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(showLoader());
    const { data } = await getUserBookingService(formData, page);
    // console.log(data,"action data")
    dispatch({
      type: GET_USER_BOOKING,
      payload: data,
    });
    dispatch(hideLoader());
  } catch (error) {
    dispatch(showLoader());
    dispatch(setErrors(error.message));
  }
};

export const changeStatus = (formData, id) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(showLoader());
    const { data } = await changeStatusService(formData, id);
    dispatch(hideLoader());
    history.push("/mooner/details/user_management");
  } catch (error) {
    dispatch(showLoader());
    dispatch(setErrors(error.message));
  }
};
export const deleteBooking = (id) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(showLoader());
    const { data } = await deleteBooklingService(id);
    dispatch(hideLoader());
    history.push("/mooner/details/user_management");
  } catch (error) {
    dispatch(showLoader());
    dispatch(setErrors(error.message));
  }
};

//Payments
export const getPayments = (id, page) => async (dispatch) => {
  //("page", page);
  try {
    dispatch(clearErrors());
    dispatch(showLoader());
    const { data } = await getAllPaymentsService(id, page);
    //("paymentdata", data);
    dispatch({
      type: GET_PAYMENTS_LIST,
      payload: data,
    });
    dispatch(hideLoader());
    // localStorage.setItem("id",id)
    return data;
  } catch (error) {
    dispatch(showLoader());
    dispatch(setErrors(error.message));
  }
};

export const getTipListAction = (id, page) => async (dispatch) => {
  //("page", page);
  try {
    dispatch(clearErrors());
    dispatch(showLoader());
    const { data } = await getTipsService(id, page);
    //("tipdata", data);
    dispatch({
      type: GET_TIP_LIST,
      payload: data,
    });
    dispatch(hideLoader());
    // localStorage.setItem("id",id)
    return data;
  } catch (error) {
    dispatch(showLoader());
    dispatch(setErrors(error.message));
  }
};
