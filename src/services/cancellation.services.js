import API from '../api';

const apiEndpoint = '/cancellation_management/';

export const getAllCancelListService = async (page,searchData) => { 
  const data = await API.get(`payments/refund_booking/?cancellation_page=${page}&search=${searchData}`);
  return data;
}

export const getCancelListServiceById = async (id) =>
  await API.get(`payments/refund_booking/${id}/`);
