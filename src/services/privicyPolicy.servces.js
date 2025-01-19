import API from "../api";

const apiEndpoint = "/privacy/";

export const addPrivicyPolicyContent = async (data) =>
    await API.post(apiEndpoint + "privacy_policy/", data);

export const getPrivicyPolicyContent = async (id) =>
    await API.get(apiEndpoint + `privacy_policy/${id}`);

export const updatePrivicyPolicy = async (data, id) =>
    await API.put(apiEndpoint + `privacy_policy/${id}/`, data);

////////////////////////////// TERMS AND CONDITIONS SERVICES ////////////////////////

export const getTermsConditionsContent = async (id) =>
    await API.get(apiEndpoint + `terms_and_condition/${id}`);

export const updateTermsConditions = async (data, id) =>
    await API.put(apiEndpoint + `terms_and_condition/${id}/`, data);

////////////////////////////// ABOUT US SERVICES ////////////////////////

export const getAboutContent = async (id) =>
    await API.get(apiEndpoint + `about_content/${id}`);

export const updateAboutContent = async (data, id) =>
    await API.put(apiEndpoint + `about_content/${id}/`, data);