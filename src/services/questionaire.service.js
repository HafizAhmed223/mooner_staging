import API from "../api";

const apiEndpoint = "/category_management/";

export const getAllQuestionaire = async (pageNumber) => await API.get(apiEndpoint + `questions/?page=${pageNumber}`)

export const addQuestion = async (data) =>
  await API.post(apiEndpoint + "questions/", data);
export const deleteQuestion = async (id) =>
  await API.delete(apiEndpoint + `updateQuestions/${id}`);
export const getQuestionBuId = async (id) =>
  await API.get(apiEndpoint + `updateQuestions/${id}`);

export const updateQuestion = async (data, id) =>
  await API.put(apiEndpoint + `updateQuestions/${id}`, data);

  export const filterQuestionaires = async (page, searchData) =>
  await API.get(apiEndpoint + `search_questions/?page=${page}&search=${searchData}`);
