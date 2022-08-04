const axios = require("axios");

const backendPath = "https://clusterfilm.herokuapp.com/movies";

export const movies = {
  upcoming: async function () {
    let movies = axios
      .get(`${backendPath}/upcoming`)
      .then((response) => response.data.results);
    return await movies;
  },
  genres: async function () {
    let genres = axios
      .get(`${backendPath}/genres`)
      .then((response) => response.data.genres);
    return await genres;
  },
  cast: async function (movieId) {
    let cast = axios
      .get(`${backendPath}/cast/${movieId}`)
      .then((response) => response.data.cast);
    return await cast;
  },
};

export default movies;
