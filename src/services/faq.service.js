import API from "../api";

const apiEndpoint = "/mooner_faqs/";

export const getfaq = async (pageNumber) =>
  API.get(apiEndpoint + `faqs/?page=${pageNumber}`);
export const deletefaq = (id) => API.delete(apiEndpoint + "faqs/" + id);
export const createfaq = (data) => API.post(apiEndpoint + "faqs/", data);
export const updatefaq = (data, Id) =>
  API.put(apiEndpoint + `faqs/${Id}`, data);
export const getfaqById = async (id) => await API.get(`mooner_faqs/faqs/${id}`);
export const filterFaq = async (page, searchData) =>
  API.get(apiEndpoint + `search_faqs/?page=${page}&search=${searchData}`);
