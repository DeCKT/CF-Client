import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";

const backendHost = "https://clusterfilm.herokuapp.com";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

const Cluster = () => {
  let { cluster_id } = useParams();
  let [cluster, setCluster] = useState();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCluster = async (id) => {
      await axios.get(`${backendHost}/cluster/${id}`).then((resp) => {
        setCluster(resp.data);
        setLoading(false);
      });
    };

    if (!cluster) {
      getCluster(cluster_id);
    }
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div id={"individual-cluster"}>
      <div className="individual-cluster-info">
        <h1>{cluster.title}</h1>
        <span>created by {cluster.creator}</span>
      </div>
      {/* <button>Edit</button> */}
      <div className="individual-cluster-film-scroller">
        <ul className="individual-cluster-film-container">
          {cluster.films.map((film) => {
            let resultType;
            if (film.type === "tv" || film.seasons) {
              resultType = "tv";
            } else if (film.type === "movie") {
              resultType = "movie";
            }
            return (
              <li>
                <Link
                  className="individual-cluster-image"
                  to={`/result/${resultType}/${film.id}`}
                >
                  <img
                    alt=""
                    src={imgBaseUrl + "w300" + film.poster_path}
                  ></img>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Cluster;
