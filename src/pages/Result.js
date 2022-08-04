import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import result from "../requests/result";
import Loading from "./Loading";
import AddToCluster from "../components/AddToCluster";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

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
  }, [params, oldParams, pageResult]);

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

        {params.type === "tv" || params.type === "movie" ? (
          <div className="action-button-container">
            <AddToCluster
              type={params.type}
              film={pageResult}
              userEmail={props.userEmail}
            />
          </div>
        ) : null}
      </div>

      {pageResult.poster_path ? (
        <img alt="" src={imgBaseUrl + "w400" + pageResult.poster_path} />
      ) : pageResult.profile_path ? (
        <img alt="" src={imgBaseUrl + "w400" + pageResult.profile_path} />
      ) : null}
    </div>
  );
}

export default Result;
