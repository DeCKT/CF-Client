import React from "react";
import axios from "axios";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

class FollowingClusters extends React.Component {
  constructor() {
    super();
    this.state = {
      clusters: [
        {
          name: "Starwars Saga",
          creator: {
            name: "CF Team",
            id: "887",
          },
          films: [
            {
              name: "movie 1",
              id: "6457",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 1",
              id: "6457",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 1",
              id: "6457",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 1",
              id: "6457",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
          ],
          id: "6",
        },
        {
          name: "Best of Edgar Wright",
          creator: {
            name: "Mellwolf",
            id: "887",
          },
          films: [
            {
              name: "movie 1",
              id: "6457",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 1",
              id: "6457",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 1",
              id: "6457",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
            {
              name: "movie 1",
              id: "6457",
              image_path: "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg",
            },
          ],
          id: "6",
        },
      ],
    };
  }

  render() {
    return (
      <ul className="following-container">
        {this.state.clusters.map((cluster) => {
          return (
            <li>
              <h3>{cluster.name}</h3>
              <ul className="following-cluster-info">
                <li className="following-cluster-name">
                  {cluster.creator.name}
                </li>
                <li className="following-cluster-count">
                  {cluster.films.length} items
                </li>
              </ul>
              <ul className="following-film-container">
                {cluster.films.map((film) => {
                  return (
                    <li className="following-film-image">
                      <img alt="" src={imgBaseUrl + "w200" + film.image_path} />
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default FollowingClusters;
