import API from "../api";

const apiEndpoint = "/ticket_management/";

export const getReportService = async (date, endDate,categoryId,ticketCatagoryId) =>
  await API.post(apiEndpoint + `get_report/`,{date:date,to:endDate,category_id:categoryId,ticket_category:ticketCatagoryId});
