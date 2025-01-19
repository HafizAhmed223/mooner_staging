import API, { baseURL } from "../api";

const apiEndpoint = "/mln/";

export const getMMlnList = async (pageNumber) =>
  await API.get(apiEndpoint + `list_mln_users/?page=${pageNumber}`);

export const getMlnUser = async (id) =>
  await API.get(apiEndpoint + `list_referal_users/${id}/`);

export const MlnUserWioutReferals = async (id) =>
  await API.get(apiEndpoint + `get_user_details/${id}/`);

export const referralsUser = async (id) =>
  await API.get(apiEndpoint + `get_referral_user_details/${id}/`);

export const getProfitMargin = async (id) =>
  await API.get(apiEndpoint + `set_level_profit/${id}/`);

export const setProfitMargin = async (data) =>
  await API.put(apiEndpoint + `set_level_profit/${data.id}/`, data);

// ........Fee Margin Services..................//
export const getFeeMargin = async (id) =>
  await API.get(`booking/AdminConvenienceFee/${id}/`);

export const setFeeMargin = async (data) =>
  await API.put(`booking/AdminConvenienceFee/${data.id}/`, data);

export const getTokenRate = async () =>
  await API.get(`${baseURL}payments/mnr_price/`);

export const setTokenRate = async (data) =>
  await API.put(`/payments/update_token_price/${data.id}/`, data);
export const filterMln = async (pageNumber, searchString) =>
  await API.get(
    apiEndpoint +
      `search_list_mln_users/?page=${pageNumber}&search=${searchString}`
  );

// Token Rate Service
// export const getTokenPrice = async (id) =>
// await API.get(apiEndpoint + `list_referal_users/${id}/`);
