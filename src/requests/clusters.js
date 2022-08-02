const axios = require("axios");

const backendHost = "https://clusterfilm.herokuapp.com" + "/cluster";

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
    console.log(`Inserted new Cluster with id ${inserted}`);
    return inserted;
  },
  add: async function (clusterId, film) {
    let addFilm = axios.put(`${backendHost}/${clusterId}/add/${film.id}`, film);
    let inserted = await addFilm;
    console.log(inserted);
  },
  remove: async function (clusterId, filmId) {
    let removed = axios.put(`${backendHost}/${clusterId}/remove/${filmId}`);
    console.log(await removed);
  },
  delete: async function (clusterId) {
    let deleted = axios.delete(`${backendHost}/${clusterId}`);
    console.log(await deleted);
  },
};
