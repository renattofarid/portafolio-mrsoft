import axios from "axios";

const BASE_URL = "https://develop.garzasoft.com/mrsoft-news/public";
const API_URL = "/api";
const SUCURSAL = 52;

const api = axios.create({
  baseURL: BASE_URL + API_URL,
  //   headers: {
  //     Authorization: SUCURSAL,
  //   },
});

export { SUCURSAL, api, BASE_URL };
