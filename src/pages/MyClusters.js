import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const backendHost = "https://clusterfilm.herokuapp.com";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

class MyClusters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async getFilm(type, id) {
    return await axios.get(`${backendHost}/search/${type}/${id}`);
  }

  async componentDidMount() {}

  render() {
    return (
      <div id="my-clusters">
        <ul className="my-clusters-container">
          {this.props.userClusters ? (
            this.props.userClusters.map((cluster) => {
              return (
                <li className="my-cluster-container" key={cluster.title}>
                  <div className="my-cluster-info">
                    <h2>{cluster.title}</h2>
                    <span>{cluster.films.length} items</span>
                  </div>

                  <Link
                    to={`/cluster/${cluster._id}`}
                    className="my-cluster-film-container-link"
                  >
                    <ul className="my-cluster-film-container">
                      {cluster.films.slice(0, 6).map((film) => {
                        return (
                          <li className="my-cluster-film" key={film.id}>
                            <img src={imgBaseUrl + "w200" + film.poster}></img>
                          </li>
                        );
                      })}
                    </ul>
                  </Link>
                </li>
              );
            })
          ) : (
            <li>Login and create Clusters to view</li>
          )}
        </ul>
      </div>
    );
  }
}

// <Link to={"/result/" + film.type + "/" + film.id}>

export default MyClusters;
