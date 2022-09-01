import React from "react";

import movies from "../../requests/movies";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Loading from "../../pages/Loading";
import AddToCluster from "../AddToCluster";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

class UpcomingMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      selectedIndex: 0,
      adderOpen: false,
    };
  }

  cycleNext = () => {
    if (this.state.selectedIndex === 4) {
      this.setState({
        selectedIndex: 0,
      });
    } else {
      this.setState({
        selectedIndex: this.state.selectedIndex + 1,
      });
    }
  };

  cyclePrev = () => {
    if (this.state.selectedIndex === 0) {
      this.setState({
        selectedIndex: 4,
      });
    } else {
      this.setState({
        selectedIndex: this.state.selectedIndex - 1,
      });
    }
  };

  openClusterAdder = () => {
    let modal = document.querySelector("#new-cluster-modal");
    modal.classList.remove("modal-closed");
    modal.classList.add("modal-open");
  };

  closeClusterAdder = () => {
    let modal = document.querySelector("#new-cluster-modal");
    modal.classList.add("modal-closed");
    modal.classList.remove("modal-open");
  };

  async componentDidMount() {
    let upcoming = await movies.upcoming();

    let cast = await Promise.all(
      upcoming.map((movie) => {
        return movies.cast(movie.id);
      })
    );

    let allGenres = await movies.genres();

    let genres = upcoming.map((movie) => {
      return movie.genre_ids.map((genre) => {
        return allGenres.find((item) => {
          return item.id === genre;
        });
      });
    });

    let i = 0;
    let movieInfoArray = upcoming.map((movie) => {
      movie.cast = cast[i];
      movie.genres = genres[i];
      i++;
      return movie;
    });

    this.setState({
      upcoming: movieInfoArray,
    });
  }

  render() {
    if (!this.state.upcoming) {
      return <Loading />;
    }
    return (
      <div id="upcoming">
        <div className="upcoming-menu">
          <div className="menu-cycle">
            <button onClick={() => this.cyclePrev()}>
              <IoIosArrowBack />
            </button>
            <button onClick={() => this.cycleNext()}>
              <IoIosArrowForward />
            </button>
          </div>
          <div className="menu-selector">
            {this.state.upcoming.slice(0, 5).map((movie, index) => {
              return (
                <div
                  key={movie.id}
                  className={
                    "movie-selector " +
                    (this.state.selectedIndex === index ? "selected" : "")
                  }
                  onClick={() => {
                    this.setState({ selectedIndex: index });
                  }}
                ></div>
              );
            })}
          </div>
        </div>
        <ul className="upcoming-movie-container">
          {this.state.upcoming
            .slice(this.state.selectedIndex, this.state.selectedIndex + 1)
            .map((movie) => {
              return (
                <li className="upcoming-container" key={movie.id}>
                  <div className="upcoming-img-container">
                    <img
                      alt=""
                      className="upcoming-img"
                      src={imgBaseUrl + "w300" + movie.poster_path}
                      onError={({ currentTarget }) => {
                        currentTarget.src = "/no-img.svg";
                      }}
                    />
                  </div>
                  <div className="upcoming-info-container">
                    <div className="upcoming-info">
                      <h1>{movie.title}</h1>
                      <ul className="genres-container">
                        {movie.genres.map((genre) => {
                          return (
                            <li className="genre-name" key={genre.id}>
                              {genre.name}
                            </li>
                          );
                        })}
                      </ul>
                      <ul className="actors-container">
                        {movie.cast.slice(0, 6).map((actor) => {
                          return (
                            <li className="actor-container" key={actor.id}>
                              <div className="actor-img-container">
                                <img
                                  alt=""
                                  className="actor-img"
                                  src={imgBaseUrl + "w200" + actor.profile_path}
                                  onError={({ currentTarget }) => {
                                    currentTarget.src = "/no-img.svg";
                                  }}
                                />
                              </div>
                              <span>{actor.name}</span>
                            </li>
                          );
                        })}
                      </ul>
                      <p>{movie.overview}</p>
                      <div className="action-button-container">
                        <Link
                          to={`result/movie/${movie.id}`}
                          className="details-button action-button"
                        >
                          Details
                        </Link>

                        {this.props.userEmail ? (
                          <AddToCluster
                            type="movie"
                            film={movie}
                            userEmail={this.props.userEmail}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default UpcomingMovies;
