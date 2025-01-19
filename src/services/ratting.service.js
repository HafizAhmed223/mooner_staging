import API from "../api";

const apiEndpoint = "/booking/";

export const getRattings = async (id, pageNumber) => 
    await API.get(apiEndpoint + `rating_list/${id}/?page=${pageNumber}`)

export const deleteRatting = async (id) =>
  await API.delete(apiEndpoint + `edit_rating/${id}`);

export const getRattingById = async (id) =>
  await API.get(apiEndpoint + `edit_rating/${id}`);

export const updateRatting = async (data, id) =>
  await API.put(apiEndpoint + `edit_rating/${id}/`, data);
