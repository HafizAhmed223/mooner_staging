import API from "../api";

const apiEndpoint = "/ticket_management/";

export const getTicketsService = async (pagenumber, date, endDate) =>
  await API.get(
    apiEndpoint + `get_ticket/?page=${pagenumber}&date=${date? date:''}&to=${endDate?endDate:''}`
  );
export const getTicketService = async (id) =>
  await API.get(apiEndpoint + `edit_ticket/${id}/`);
export const deleteTicketService = async (id) =>
  await API.delete(apiEndpoint + `edit_ticket/${id}/`);
export const updateTicketService = async (formData, id) =>
  await API.put(apiEndpoint + `edit_ticket/${id}/`, formData);

export const filterTicket = async (page, searchData) =>
  await API.get(
    apiEndpoint + `search_ticket/?page=${page}&search=${searchData}`
  );


export const getCustomAnalyticsService = async (date = "", endDate = "", categoryId = [], search = "") =>
  await API.post(apiEndpoint + `custom_analytics/`, {
    ...(search != "" && search != null && { search }),
    ...(date != "" && date != null && { from: date }),
    ...(endDate != "" && endDate != null && { to: endDate }),
    ...(categoryId?.length != 0 && categoryId != null && { category_id:categoryId }),

  });

export const postBookingCustomAnalyticsService = async (categoryId,categoryType,page=1) =>
  await API.post(apiEndpoint + `custom_filter/?page=${page}`, {
    category_id: categoryId,
    request_for: categoryType,
  });


