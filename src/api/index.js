import axios from "axios";
// staging URL//
// export const baseURL = process.env.REACT_APP_BASE_URL;
export const baseURL = "https://api.mooner.com.sg/";
// console.log("-----------", process.env.REACT_APP_BASE_URL);
console.log("-----------", baseURL);
// export const baseURL = "http://1432-72-255-1-184.ngrok.io/";
// export const baseURL = "https://api.dev.mooner.com.sg/";
// export const baseURL = "http://1432-72-255-1-184.ngrok.io/";
// PRODUCTION URL // Master...//
// export const baseURL = "https://api.moonerapp.com/";
const API = axios.create({
  baseURL: baseURL,
});

export default API;
