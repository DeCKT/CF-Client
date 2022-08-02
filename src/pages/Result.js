import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import result from "../requests/result";
import Loading from "./Loading";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

const backendHost = "https://clusterfilm.herokuapp.com";

function openClusterAdder() {
  let modal = document.querySelector("#new-cluster-modal");
  modal.classList.remove("modal-closed");
  modal.classList.add("modal-open");
}

function closeClusterAdder() {
  let modal = document.querySelector("#new-cluster-modal");
  modal.classList.add("modal-closed");
  modal.classList.remove("modal-open");
}

function toggleAdder() {
  let adderContainer = document.querySelector("#cluster-adder-container");
  if (adderContainer.classList.contains("adder-open")) {
    adderContainer.classList.remove("adder-open");
    adderContainer.classList.add("adder-closed");
  } else if (adderContainer.classList.contains("adder-closed")) {
    adderContainer.classList.remove("adder-closed");
    adderContainer.classList.add("adder-open");
  }
}

const addCluster = async (email, title, film) => {
  let newCluster = axios.post(`${backendHost}/cluster/new`, {
    email: email,
    title: title,
  });
  let clusterId = (await newCluster).data.insertedId;
  axios.put(`${backendHost}/cluster/${clusterId}/add/${film.id}`, film);
};

const addFilmToCluster = async (film, clusterId) => {
  console.log(`Film: `);
  console.log(film);
  console.log(`Cluster: ${clusterId}`);
  axios.put(`${backendHost}/cluster/${clusterId}/add/${film.id}`, film);
};

function Result(props) {
  const params = useParams();

  const [pageResult, setPageResult] = useState();
  const [oldParams, setOldParams] = useState(params.result_id);

  useEffect(() => {
    const getResult = async (type, id) => {
      setPageResult(await result.get(type, id));
    };

    const paramsUpdated = (params) => {
      if (params.result_id !== oldParams) {
        return true;
      }
    };

    if (paramsUpdated(params)) {
      setPageResult();
    }

    if (!pageResult) {
      setOldParams(params.result_id);
      getResult(params.type, params.result_id);
    }
  });

  if (!pageResult) {
    return <Loading />;
  }

  return (
    <div id="result">
      <div className="result-info">
        <h1>{pageResult.title || pageResult.name}</h1>

        {pageResult.release_date ? (
          <div>{moment(pageResult.release_date).format("MMMM Do, YYYY")}</div>
        ) : pageResult.birthday ? (
          <div>
            {moment(pageResult.birthday).format("MMMM Do, YYYY")} -{" "}
            {pageResult.deathday
              ? moment(pageResult.deathday).format("MMMM Do, YYYY")
              : "Living"}
          </div>
        ) : null}

        {pageResult.runtime ? (
          <div>
            {Math.floor(pageResult.runtime / 60) +
              "hr " +
              (pageResult.runtime % 60) +
              "mins"}
          </div>
        ) : null}

        {pageResult.genres ? (
          <ul className="genres-container">
            {pageResult.genres.map((genre) => {
              return (
                <li className="genre-name" key={genre.id}>
                  {genre.name}
                </li>
              );
            })}
          </ul>
        ) : null}

        {pageResult.overview ? (
          <p className="result-overview">{pageResult.overview}</p>
        ) : null}

        {pageResult.type == "tv" || pageResult.type == "movie" ? (
          <div className="add-to-container">
            <button
              className="add-to-button action-button"
              onClick={() => {
                toggleAdder();
              }}
            >
              Add to Cluster
            </button>
            <div id="cluster-adder-container" className="adder-closed">
              <ul>
                {props.userClusters.map((cluster) => {
                  return (
                    <li
                      key={cluster.title}
                      onClick={() => {
                        addFilmToCluster(
                          {
                            id: pageResult.id,
                            poster: pageResult.poster_path,
                            type: params.type,
                            title: pageResult.title || pageResult.name,
                          },
                          cluster._id
                        );
                        toggleAdder();
                      }}
                    >
                      {cluster.title}
                    </li>
                  );
                })}
                <li
                  onClick={() => {
                    openClusterAdder();
                  }}
                >
                  New cluster
                </li>
              </ul>
            </div>
            <div id="new-cluster-modal" className="modal-closed">
              <div>
                Title: <input id="new-cluster-title" type="text" />
              </div>
              <div>
                <button
                  onClick={() => {
                    addCluster(
                      props.userEmail,
                      document.querySelector("#new-cluster-title").value,
                      {
                        id: pageResult.id,
                        poster: pageResult.poster_path,
                        type: params.type,
                        title: pageResult.title || pageResult.name,
                      }
                    );
                    closeClusterAdder();
                    toggleAdder();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {pageResult.poster_path ? (
        <img src={imgBaseUrl + "w400" + pageResult.poster_path} />
      ) : pageResult.profile_path ? (
        <img src={imgBaseUrl + "w400" + pageResult.profile_path} />
      ) : null}
    </div>
  );
}

export default Result;
