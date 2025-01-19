import API from "../api";

const apiEndpoint = "account";

export const getCabBookingService = async (formData, page) =>
  await API.get(`mooner_cab/admin_list/${formData}/?page=${page}`);

// import API from "../api";
// const API_URL = 'https://example.com/mooner_cab/admin_list/53/';

// export const getCabBookingService = async () => {
//   try {
//     const response = await fetch(API_URL);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };