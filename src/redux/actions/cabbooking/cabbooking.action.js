import { getCabBookingService } from "../../../services/cabbooking.service";
import { setErrors, showLoader } from "../../../utils/global.actions";
import { GET_CAB_BOOKING, GET_CAB_BOOKING_DETAIL } from "./cabbooking.type";

export const getCabBookingDetail = (formData, page) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(showLoader());
    const { data } = await getCabBookingService(formData, page);
    dispatch({
      type: GET_CAB_BOOKING_DETAIL,
      payload: data,
    });
    dispatch(hideLoader());
  } catch (error) {
    dispatch(showLoader());
    dispatch(setErrors(error.message));
  }
};
export const getCabBookingList = (formData, page) => async (dispatch) => {
  // console.log({formData},{page})
  try {
    // dispatch(clearErrors());
    // dispatch(showLoader());
    // console.log("shooo")
    const { data } = await getCabBookingService(formData, page);
    // console.log(data,"id from actions")
    dispatch({
      type: GET_CAB_BOOKING,
      payload: data,
    });
    // dispatch(hideLoader());
  } catch (error) {
    dispatch(showLoader());
    dispatch(setErrors(error.message));
  }
};
