import React from "react";
import { Link } from "react-router-dom";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

class Clusters extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    if (!this.props.userClusters) {
      return null;
    }

    return (
      <div id="clusters">
        <ul className="clusters-container">
          {this.props.userClusters.map((cluster) => {
            return (
              <li className="cluster-container" key={cluster._id}>
                <div className="cluster-info-container">
                  <ul className="cluster-info">
                    <li className="cluster-info-name">
                      <h2>{cluster.title}</h2>
                    </li>
                    <li className="cluster-info-creator">
                      by <div>{cluster.creator}</div>
                    </li>
                    <li>{cluster.films.length} films</li>
                  </ul>
                  <ul className="cluster-buttons">
                    <li>
                      <Link
                        to={`/cluster/${cluster._id}`}
                        className="action-button"
                      >
                        View
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/cluster/${cluster._id}/edit`}
                        className="action-button edit-button"
                        href=""
                      >
                        Edit
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="cluster-film-images">
                  <ul className="cluster-film-image-container">
                    {cluster.films.map((film) => {
                      return (
                        <li key={film.id} className="cluster-film-image">
                          <img
                            alt=""
                            src={imgBaseUrl + "w300" + film.poster_path}
                            onError={({ currentTarget }) => {
                              currentTarget.src = "/no-img.svg";
                            }}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Clusters;
