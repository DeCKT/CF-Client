import React from "react";
import axios from "axios";

import moment from "moment";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const backendHost = "https://cf-server-xyq1.onrender.com";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

class ComingSoon extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      shows: [],
      loaded: false,
    };
  }

  getMovies = async () => {
    return axios.get(`${backendHost}/movies/upcoming`).then((resp) => {
      return resp.data.results;
    });
  };

  getShows = async () => {
    return axios.get(`${backendHost}/tv/upcoming`).then((resp) => {
      return resp.data.results;
    });
  };

  async componentDidMount() {
    let movies = await this.getMovies();
    let shows = await this.getShows();

    this.setState({
      movies: movies,
      shows: shows,
      loaded: true,
    });
  }

  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }

    return (
      <div className="coming-soon">
        <ul className="coming-soon-container">
          {this.state.movies.map((movie) => {
            return (
              <li className="coming-soon-film" key={movie.id}>
                <Link to={`/result/movie/${movie.id}`}>
                  <div className="coming-soon-film-info">
                    <h3>{movie.title}</h3>
                    <span>
                      {moment(movie.release_date).format("MMMM Do YYYY")}
                    </span>
                  </div>
                  <img
                    alt=""
                    className="coming-soon-image"
                    src={
                      movie.poster_path
                        ? imgBaseUrl + "w200" + movie.poster_path
                        : "/no-img.svg"
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.src = "/no-img.svg";
                    }}
                  />
                </Link>
              </li>
            );
          })}
          {this.state.shows.map((show) => {
            return (
              <li className="coming-soon-film" key={show.id}>
                <Link to={`/result/tv/${show.id}`}>
                  <div className="coming-soon-film-info">
                    <h3>{show.name}</h3>
                    <span>
                      {moment(show.first_air_date).format("MMMM Do YYYY")}
                    </span>
                  </div>
                  <img
                    alt=""
                    className="coming-soon-image"
                    src={
                      show.poster_path
                        ? imgBaseUrl + "w200" + show.poster_path
                        : "/no-img.svg"
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.src = "/no-img.svg";
                    }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ComingSoon;
