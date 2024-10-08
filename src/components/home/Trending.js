import axios from "axios";
import React from "react";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

const backendHost = "https://clusterfilm-server.vercel.app";

class Trending extends React.Component {
  constructor() {
    super();
    this.state = {
      trending: "",
    };
  }

  async componentDidMount() {
    let trendingResults = await axios
      .get(`${backendHost}/trending/`)
      .then((resp) => {
        return resp.data.results;
      });

    let reducedTrending = trendingResults.slice(0, 1).map((trending) => {
      return {
        id: trending.id,
        name: trending.name,
        backdrop_path: trending.backdrop_path,
      };
    });

    this.setState({
      trending: reducedTrending[0],
    });
  }

  render() {
    return (
      <div id="trending">
        <div className="trending-image-container">
          <img
            alt=""
            className="trending-image"
            src={imgBaseUrl + "w1280" + this.state.trending.backdrop_path}
            onError={({ currentTarget }) => {
              currentTarget.src = "/no-img.svg";
            }}
          />
        </div>
        <h1 className="trending-title">{this.state.trending.name}</h1>
      </div>
    );
  }
}

export default Trending;
