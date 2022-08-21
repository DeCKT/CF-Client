const axios = require("axios");

const backendHost = "https://clusterfilm.herokuapp.com/cluster";

export const cluster = {
  find: async function (email) {
    let userClusters = axios.get(`${backendHost}/user/${email}`);
    let fetched = (await userClusters).data;
    return fetched;
  },
  new: async function (email, title) {
    let newCluster = axios.post(`${backendHost}/new`, {
      email: email,
      title: title,
    });
    let inserted = (await newCluster).data.insertedId;
    return inserted;
  },
  add: async function (clusterId, film) {
    let addFilm = axios.patch(
      `${backendHost}/${clusterId}/add/${film.id}`,
      film
    );
    await addFilm;
  },
  remove: async function (clusterId, filmId) {
    let removed = axios.patch(`${backendHost}/${clusterId}/remove/${filmId}`);
    await removed;
  },
  delete: async function (clusterId) {
    let deleted = axios.delete(`${backendHost}/${clusterId}`);
    await deleted;
  },
};
