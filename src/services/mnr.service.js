import API from "../api";

const apiEndpoint = "/payments/";

export const getSendToken = async (pageNumber) =>
  await API.get(apiEndpoint + `send_tokens/?page=${pageNumber}`);
export const earnedToken = async (pageNumber) =>
  await API.get(apiEndpoint + `admin_token_history/?page=${pageNumber}`);
export const filterPaymentHistory = async (pageNumber, searchString) =>
  await API.get(
    apiEndpoint +
      `search_admin_token_history/?page=${pageNumber}&search=${searchString}`
  );
export const filterSendToken = async (pageNumber, searchString) =>
  await API.get(
    apiEndpoint +
      `search_send_tokens/?search=${searchString}&page=${pageNumber}`
  );
