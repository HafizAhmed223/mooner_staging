import API from "../api";

const apiEndpoint = "/category_kyc/";

export const createCommonKycService = async (kyc) =>
	await API.post(apiEndpoint + `category_kyc/`, kyc);

export const commonKycService = async (pagenumber) =>
	await API.get(apiEndpoint + `kyc_common_list/?page=${pagenumber}`);

export const deleteCommonKycServicen = async (id) =>
	await API.delete(apiEndpoint + `category_kyc/${id}/`);

export const commonKyByIdcService = async (id) =>
	await API.get(apiEndpoint + `category_kyc/${id}/`);

export const updateCommonKycService = async (data, id) =>
	await API.put(apiEndpoint + `category_kyc/${id}/`, data);

/////////////////////////////////////////////////////////////
//
//     <----------category specfic kyc services---------->
//
/////////////////////////////////////////////////////////////

export const categorySpecficKycService = async (pageNumber) =>
	await API.get(apiEndpoint + `category_kyc/?page=${pageNumber}`);

export const approved_kycCategorySpecficKycService = async (pageNumber) =>
	await API.get(apiEndpoint + `approved_kyc?page=${pageNumber}`);

export const disapproved_kycCategorySpecficKycService = async (pageNumber) =>
	await API.get(apiEndpoint + `disapproved_kyc?page=${pageNumber}`);

export const deleteSpecficKycServicen = async (id) =>
	await API.delete(apiEndpoint + `category_kyc/${id}/`);

export const commonKycserviceFor = async () =>
	await API.get(apiEndpoint + `kyc_common_list/`);

export const createCategorySpecficKycservice = async (kyc) =>
	await API.post(apiEndpoint + `category_kyc/`, kyc);

export const categorySpecficByIdcService = async (id) =>
	await API.get(apiEndpoint + `category_kyc/${id}/`);

export const updateSpecificKycService = async (data, id) =>
	await API.put(apiEndpoint + `category_kyc/${id}/`, data);

/////////////////////////////////////////////////////////////
//
//     <----------category kyc Answerses ---------->
//
/////////////////////////////////////////////////////////////

export const KycAnswersService = async (pageNumber) =>
	await API.get(apiEndpoint + `category_kyc_answer/?page=${pageNumber}`);

export const deletecKycAnsServicen = async (id) =>
	await API.delete(apiEndpoint + `category_kyc_answer/${id}/`);

export const kycAnswerService = async (id) =>
	await API.get(apiEndpoint + `category_kyc_answer/${id}/`);

export const updateKycAnswerService = async (data, id) =>
	await API.put(apiEndpoint + `admin_update_kyc_answers/${id}/`, data);
