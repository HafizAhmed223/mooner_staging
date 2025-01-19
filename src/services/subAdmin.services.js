import API from "../api";

const apiEndpoint = "/paste_end_point_here/";

export const getAllSubAdminlist = async (pageNumber) => await API.get(apiEndpoint + `putendpoint here/?page=${pageNumber}`)

export const getSubAdminById = async (id) =>
  await API.get(apiEndpoint + `paste end point here/${id}/`);