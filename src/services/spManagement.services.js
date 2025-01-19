import API from "../api";

const apiEndpoint = "/service_provider/";

export const getAllSPlist = async (pageNumber) =>
  await API.get(apiEndpoint + `admin_sp_list/?page=${pageNumber}`);

export const getServiceProviderById = async (id) =>
  await API.get(apiEndpoint + `admin_sp_management_view/${id}/`);

export const updateServiceProvider = async (data, id) =>
  await API.put(apiEndpoint + `admin_edit_sp/${id}/`, data);

export const getServiceProviderActiveBookings = async (id, pageNumber) =>
  await API.get(
    apiEndpoint + `admin_sp_active_bookings/${id}/?page=${pageNumber}`
  );

export const getServiceProviderCompletedBookings = async (id, pageNumber) =>
  await API.get(
    apiEndpoint + `admin_sp_completed_bookings/${id}/?page=${pageNumber}`
  );

export const deleteServiceProvider = async (id) =>
  await API.delete(apiEndpoint + `admin_edit_sp/${id}/`);

export const updateServiceProviderProfile = async (profileData) =>
  await API.put(
    apiEndpoint + `admin_edit_sp_profile/${profileData.id}/`,
    profileData
  );

export const filterServiceProvider = async (page, searchData) =>
  await API.get(
    apiEndpoint + `admin_sp_search/?page=${page}&search=${searchData}`
  );

export const spDocument = async (id, pageNumber) =>
  await API.get(apiEndpoint + `admin_sp_kyc/${id}/?page=${pageNumber}`);

export const spEarnings = async (id, page) =>
  await API.get(`booking/sp_bookings/${id}/?page=${page}`);

export const allWalletDetails = async (id, page) =>
  await API.get(apiEndpoint + `wallethistory/${id}/?page=${page}`);
