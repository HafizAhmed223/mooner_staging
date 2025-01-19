import {
  filterTicket,
  filterUserTickets,
  getCustomAnalyticsService,
  postBookingCustomAnalyticsService,
  postCancelBookingObject
} from "../../../services/ticket.service";
import {
  GET_CUSTOM_ANALYTICS, POST_BOOKING_CUSTOM_ANALYTICS
} from "./analytics.types";
import {
  clearSnackbar,
  setSnackbar,
  showLoader,
  hideLoader,
} from "../../../utils/global.actions";
import history from "../../../utils/history";

export const getCustomAnalytics = (date, endDate, categoryId,search) => async (dispatch) => {
  // console.log("_____tapa tapconsola",date, endDate, categoryId)
  // console.log({categoryId})
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getCustomAnalyticsService(date, endDate, categoryId, search);
    dispatch({
      type: GET_CUSTOM_ANALYTICS,
      payload: data?.data,
    });
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};
// export const filterUserSearchAction = (page, searchString) => async (dispatch) => {
//     console.log(page)
//     try {
//       dispatch(clearSnackbar());
//       dispatch(showLoader());
//       const { data } = await filterTicket(page, searchString);
//       //("user filter data", data);
//       console.log(data,"action ananlytics")
//       dispatch({
//         type: SEARCH_USER,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch(hideLoader());
//       // dispatch(setSnackbar(error.message, "error"))
//     }
// };
export const filterUserSearchAction = (page, searchString) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await filterTicket(page, searchString);
    //("user filter data", data);
    console.log(data, "action ananlytics")
    dispatch({
      type: SEARCH_USER,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    // dispatch(setSnackbar(error.message, "error"))
  }
}
export const postBookingObject=(categoryId,categoryType,page) => async (dispatch) =>{
  try {
    const {data}=await postBookingCustomAnalyticsService(categoryId,categoryType,page)
    console.log(data,"action response")
    dispatch({
      type: POST_BOOKING_CUSTOM_ANALYTICS,
      payload: data?.data,
    });
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
}
