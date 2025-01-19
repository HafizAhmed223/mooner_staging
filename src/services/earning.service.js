import API from "../api";

export const getEarningList = async (pageNumber) =>
  await API.get(`/booking/AdminTransactionList/?page=${pageNumber}`);

export const filterEarning = async (pageNumber, searchString) =>
  await API.get(
    `/booking/SearchAdminTransactionList/?search=${searchString}&page=${pageNumber}`
  );
