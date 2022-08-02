import React from "react";
import Clusters from "../components/home/Clusters";
import Trending from "../components/home/Trending";
import UpcomingMovies from "../components/home/UpcomingMovies";

class Home extends React.Component {
  render() {
    return (
      <>
        <UpcomingMovies
          userEmail={this.props.userEmail}
          userClusters={this.props.userClusters}
        />
        <Trending />
        <Clusters
          userEmail={this.props.userEmail}
          userClusters={this.props.userClusters}
        />
      </>
    );
  }
}

export default Home;
