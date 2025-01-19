import {
  POST_COMMON_CATEGORY_KYC,
  GET_COMMON_CATEGORY_KYC_LIST,
  GET_COMMON_CATEGORY_KYC,
  EDIT_COMMON_CATEGORY_KYC,
  DELETE_COMMON_CATEGORY_KYC,
  CATEGORY_SPECFIC_KYC_LIST,
  COMMOM_QUESTIONS,
  POST_SPECIFIC_CATEGORY_KYC,
  GET_SPECIFIC_CATEGORY_KYC,
  EDIT_SPECIFIC_CATEGORY_KYC,
  DELETE_SPECIFIC_CATEGORY_KYC,
  KYC_ANSWERS_LIST,
  GET_KYC_ANSWERS,
  EDIT_KYC_ANSWERS,
  DELETE_KYC_ANSWERS,
} from "./categoryKyc.types";

import {
  createCommonKycService,
  commonKycService,
  deleteCommonKycServicen,
  commonKyByIdcService,
  updateCommonKycService,
  categorySpecficKycService,
  deleteSpecficKycServicen,
  commonKycserviceFor,
  createCategorySpecficKycservice,
  categorySpecficByIdcService,
  updateSpecificKycService,
  KycAnswersService,
  deletecKycAnsServicen,
  kycAnswerService,
  updateKycAnswerService,
  disapproved_kycCategorySpecficKycService,
  approved_kycCategorySpecficKycService,
} from "../../../services/categoryKyc.service";

import {
  clearSnackbar,
  setSnackbar,
  showLoader,
  hideLoader,
} from "../../../utils/global.actions";
import history from "../../../utils/history";

export const createCommonCategoryKyc =
  (common_kyc_data) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader());
      const { data } = await createCommonKycService(common_kyc_data);
      dispatch({
        type: POST_COMMON_CATEGORY_KYC,
        payload: data,
      });
      dispatch(setSnackbar("Common Kyc created successfully", "success"));
      history.push({ pathname: "/mooner/details/common_category_kyc" });
      dispatch(setSnackbar("Common Kyc created successfully", "success"));
    } catch (error) {
      dispatch(hideLoader());
      dispatch(setSnackbar(error.message, "error"));
    }
  };

export const getAllCommonKycList = (pageNumber) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await commonKycService(pageNumber);
    dispatch({
      type: GET_COMMON_CATEGORY_KYC_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const deleteCommonKycAction = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await deleteCommonKycServicen(id);
    dispatch({
      type: DELETE_COMMON_CATEGORY_KYC,
      payload: id,
    });
    dispatch(setSnackbar(data.message, "success"));
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const getCommonKycById = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await commonKyByIdcService(id);
    dispatch({
      type: GET_COMMON_CATEGORY_KYC,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const updateCommonKycAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await updateCommonKycService(payload, id);
    dispatch({
      type: EDIT_COMMON_CATEGORY_KYC,
      payload: data,
    });

    dispatch(setSnackbar(data.message, "success"));
    history.push({ pathname: "/mooner/details/common_category_kyc" });
    dispatch(setSnackbar(data.message, "success"));
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar("Internal Server Error", "error"));
  }
};

//////////////////////////////////////

//    CATEGORY SPECFIC KYC ACTIONS //

//////////////////////////////////////

export const categorySpecficKycList = (pageNumber) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await categorySpecficKycService(pageNumber);
    dispatch({
      type: CATEGORY_SPECFIC_KYC_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};
export const approved_kycCategorySpecficKycList =
  (pageNumber) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader());
      const { data } = await approved_kycCategorySpecficKycService(pageNumber);
      dispatch({
        type: KYC_ANSWERS_LIST,
        payload: data,
      });
    } catch (error) {
      dispatch(hideLoader());
      dispatch(setSnackbar(error.message, "error"));
    }
  };
export const disapproved_kycCategorySpecficKycList =
  (pageNumber) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader());
      const { data } = await disapproved_kycCategorySpecficKycService(
        pageNumber
      );
      dispatch({
        type: KYC_ANSWERS_LIST,
        payload: data,
      });
    } catch (error) {
      dispatch(hideLoader());
      dispatch(setSnackbar(error.message, "error"));
    }
  };

export const deleteSpecficKycAction = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await deleteSpecficKycServicen(id);
    dispatch({
      type: DELETE_SPECIFIC_CATEGORY_KYC,
      payload: id,
    });
    dispatch(setSnackbar(data.message, "success"));
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const getAllCommonKycFor = () => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await commonKycserviceFor();
    dispatch({
      type: COMMOM_QUESTIONS,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const createCategorSpecficyKyc =
  (common_kyc_data) => async (dispatch) => {
    try {
      dispatch(clearSnackbar());
      dispatch(showLoader());
      const { data } = await createCategorySpecficKycservice(common_kyc_data);
      dispatch({
        type: POST_SPECIFIC_CATEGORY_KYC,
        payload: data,
      });
      dispatch(
        setSnackbar("Category Specfic Kyc created successfully", "success")
      );
      history.push({ pathname: "/mooner/details/category_specfic_kyc" });
      dispatch(
        setSnackbar("Category Specfic Kyc created successfully", "success")
      );
    } catch (error) {
      dispatch(hideLoader());
      dispatch(setSnackbar(error.message, "error"));
    }
  };

export const getCategorySpecficKycById = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await categorySpecficByIdcService(id);
    dispatch({
      type: GET_SPECIFIC_CATEGORY_KYC,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const updateSpecificKycAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await updateSpecificKycService(payload, id);
    dispatch({
      type: EDIT_SPECIFIC_CATEGORY_KYC,
      payload: data,
    });
    dispatch(setSnackbar(data.message, "success"));
    history.push({ pathname: "/mooner/details/category_specfic_kyc" });
    dispatch(
      setSnackbar(
        "category specific document has been updated successfully",
        "success"
      )
    );
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar("Internal Server Error", "error"));
  }
};

//////////////////////////////////////

//    CATEGORY KYC ANSWERS ACTIONS //

//////////////////////////////////////

export const KycAnswersesList = (pageNumber) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await KycAnswersService(pageNumber);
    dispatch({
      type: KYC_ANSWERS_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const deleteKycAnswersAction = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await deletecKycAnsServicen(id);
    dispatch({
      type: DELETE_KYC_ANSWERS,
      payload: id,
    });
    dispatch(setSnackbar(data.message, "success"));
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const getKycAnswerById = (id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await kycAnswerService(id);
    dispatch({
      type: GET_KYC_ANSWERS,
      payload: data && data.data,
    });
    //("data", data.data);
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar(error.message, "error"));
  }
};

export const updateKycAnswerAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(clearSnackbar());
    dispatch(showLoader());
    const { data } = await updateKycAnswerService(payload, id);
    dispatch({
      type: EDIT_KYC_ANSWERS,
      payload: data,
    });
    dispatch(setSnackbar(data.message, "success"));
    history.push({ pathname: "/mooner/details/kyc_answers" });
    dispatch(
      setSnackbar("category KYC document updated successfully", "success")
    );
  } catch (error) {
    dispatch(hideLoader());
    dispatch(setSnackbar("Internal Server Error", "error"));
  }
};
