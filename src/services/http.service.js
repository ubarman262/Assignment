const axios = require("axios").default;

const baseURL = "http://localhost:3001";

export async function getBudgetData() {
  const response = await axios
    .get(`${baseURL}/budgets`)
    .then((data) => data)
    .catch((e) => console.log(e.message));
  return response.data;
}

export async function addBudgetData(body) {
  const response = await axios
    .post(`${baseURL}/budgets`, body)
    .then((data) => data)
    .catch((e) => console.log(e.message));
  return response.data;
}

export async function deleteBudgetData(id) {
  const response = await axios
    .delete(`${baseURL}/budgets/${id}`)
    .then((data) => data)
    .catch((e) => console.log(e.message));
  return response.data;
}

export async function getSpecificFormData(id) {
  const response = await axios
    .get(`${baseURL}/budgets/${id}`)
    .then((data) => data)
    .catch((e) => console.log(e.message));
  return response.data;
}

export async function editBudgetById(id, body) {
  const response = await axios
    .put(`${baseURL}/budgets/${id}`, body)
    .then((data) => data)
    .catch((e) => console.log(e.message));
  return response.data;
}
