export const BASE_URL = "https://api.mooner.com.sg";

export const DateOption = {
  JAN: "01",
  FEB: "02",
  MAR: "03",
  APR: "04",
  MAY: "05",
  JUN: "06",
  JUL: "07",
  AUG: "08",
  SEP: "09",
  OCT: "10",
  NOV: "11",
  DEC: "12",
};


export const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getWeekDate = (date) =>
  new Date(date.year, date.month, date.day + 6);
export const getPreviousWeekDate = (date) =>
  new Date(date.year, date.month, date.day - 6);

export const getMonthDate = (date) => new Date(date.year, date.month + 1);
export const getTotalDaysOfMonth = (date) =>
  new Date(date.year, date.month + 1, 0).getDate();
