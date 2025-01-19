import { createpopup, deletePopup, getPopupById, getPopupList, updatePopup } from "../../../services/popup.service"
import { clearSnackbar, hideLoader, setSnackbar, showLoader } from "../../../utils/global.actions"
import { CREATE_POPUP, DELETE_POPUP, GET_POPUP_BY_ID, GET_POPUP_LIST, UPDATE_POPUP } from "./popup.types"
import history from "../../../utils/history";



// export const allPopupList = (id, pageNumber) => async (dispatch) => {
//   try {
//     dispatch(clearSnackbar())
//     dispatch(showLoader())
//     const data = await getPopupList()
//     console.log(data, "data")
//     dispatch({
//       type: GET_POPUP_LIST,
//       payload: data
//     })
//   } catch (error) {
//     dispatch(hideLoader())
//     dispatch(setSnackbar(error.message, "error"))
//   }
// }

export const getPopupAction = (pageNumber) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const { data } = await getPopupList(pageNumber);
    console.log(data, "actionnnnn")
    dispatch({
      type: GET_POPUP_LIST,
      payload: data,
    });
    dispatch(hideLoader());
  } catch (error) { }
};
export const createPopupAction = (data) => async (dispatch) => {
  console.log('data', data)
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const response = await createpopup(data);
    console.log(response)
    dispatch({
      type: CREATE_POPUP,
      payload: response.data,
    });
    dispatch(hideLoader());
    dispatch(setSnackbar("Popup created successfully", "success"));
    history.push("/mooner/details/popup");
  } catch (error) {
    dispatch(setSnackbar(error.message, "error"));
  }
};
export const updatePopupAction = (data, history, Id) => async (dispatch) => {

  console.log(data, "action data", Id)
  try {
    // dispatch(clearErrors());
    dispatch(showLoader());
    const response = await updatePopup(data, Id);

    dispatch({
      type: UPDATE_POPUP,
      payload: response.data,
    });
    dispatch(hideLoader());
    history.push("/mooner/details/popup");
    dispatch(setSnackbar("Popup updated successfully", "success"));
  } catch (error) {
    dispatch(setSnackbar(error.message, "error"));
  }
};
export const getPopupByIdAction = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await getPopupById(id);
    console.log(data, '---imagesobjh actiobn')
    if (data) {
      dispatch({
        type: GET_POPUP_BY_ID,
        payload: data.data,
      });
      dispatch(hideLoader());
    }
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const deletepPopupAction = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const response = await deletePopup(id);
    dispatch({
      type: DELETE_POPUP,
      payload: id,
    });
    dispatch(hideLoader());
    dispatch(setSnackbar("Deleted successfully", "success"));
  } catch (error) {
    dispatch(setSnackbar(error.message, "error"));
  }
};