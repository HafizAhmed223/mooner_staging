import API from "../api";

const apiEndpoint = "/notification/";

// export const getPopupList = async (id, pageNumber) => {
//     return await API.get(apiEndpoint + `pop_ups//`)
// }
export const getPopupList = async (pageNumber) =>
    API.get(apiEndpoint + `pop_ups/?page=${pageNumber}`);
export const createpopup = (data) => API.post(apiEndpoint + "pop_ups/", data);
export const getPopupById = async (id) => await API.get(`notification/pop_ups/${id}`);
export const updatePopup = (data, Id) =>
    API.put(apiEndpoint + `pop_ups/${Id}/`, data);
export const deletePopup = (id) => API.delete(apiEndpoint + "pop_ups/" + id);