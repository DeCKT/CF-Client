const axios = require("axios");

const backendPath = "https://cf-server-xyq1.onrender.com/search";

export const result = {
  get: async function (type, id) {
    let result = axios
      .get(`${backendPath}/${type}/${id}`)
      .then((response) => response.data);
    return await result;
  },
};

export default result;
