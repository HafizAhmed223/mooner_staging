import { getReportService } from "../../../services/report.service";
import { getUsersDetailReport } from "../../../services/auth.service";
import { GET_REPORT } from "./report.types";
import {
  clearSnackbar,
  setSnackbar,
  showLoader,
  hideLoader,
} from "../../../utils/global.actions";

export const getReport = (date, endDate,categoryId,ticketCatagoryId) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getReportService(date, endDate,categoryId,ticketCatagoryId);
    //("report response", data.data);
    dispatch({
      type: GET_REPORT,
      // payload: [data.data],
      payload: data.data,
    });
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const getUserDetailReportAction = () => async (dispatch) => {
  try {
    
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getUsersDetailReport();
    console.log("userDetailReportData",data.data)
    dispatch({
      type: GET_REPORT,
      payload: data.data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message));
  }
};

export const handleListLoader = () => async (dispatch) => {
  try {
    dispatch(showLoader());
    setInterval(function () {dispatch(hideLoader());}, 1000);
    
  } catch (error) {
    // dispatch(hideLoader());
    
  }
};
