import API from "../api";

const apiEndpoint = "/booking/";

export const getUserDetailService = async (id) =>
  await API.get(apiEndpoint + "user_management_view/" + id + "/");
export const getUserBookingService = async (formData, page) =>
  await API.post(apiEndpoint + `get_booking_list/?page=${page}`, {
    user_id: formData,
  });
export const changeStatusService = async (formData, id) =>
  await API.put(
    apiEndpoint + "booking_change_order_status/" + id + "/",
    formData
  );
export const deleteBooklingService = async (id) =>
  await API.delete(apiEndpoint + "delete_booking/" + id + "/");

//Payments

export const getAllPaymentsService = async (id, page) =>
  await API.get(
    apiEndpoint + `user_payment_detail/?page=${page}&user_id=${id}`
  );

export const getTipsService = async (id, page) =>
  await API.get(apiEndpoint + `tip/?page=${page}`);
