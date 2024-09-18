const axios = require("axios");

const backendHost = "https://clusterfilm-server.vercel.app/tv";

export const tv = {
  credits: async function (id) {
    let credits = axios
      .get(`${backendPath}/${id}/credits`)
      .then((response) => response.data.cast);
    return await credits;
  },
};

export default tv;
