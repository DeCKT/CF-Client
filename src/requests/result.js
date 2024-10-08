const axios = require("axios");

const backendHost = "https://clusterfilm-server.vercel.app/search";

export const result = {
  get: async function (type, id) {
    let result = axios
      .get(`${backendPath}/${type}/${id}`)
      .then((response) => response.data);
    return await result;
  },
};

export default result;
