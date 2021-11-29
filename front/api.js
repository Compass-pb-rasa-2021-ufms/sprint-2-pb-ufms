const axios = require("axios");

const api = axios.create({
  baseURL: "http://ip-api.com/json/",
});

module.exports = api;