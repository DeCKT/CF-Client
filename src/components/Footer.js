import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">
        <a href="https://github.com/DeCKT/CF-Client" style={{ color: "#fff" }}>
          GitHub Repo
        </a>
        <div>Developed by Daniel Eckton - 2022</div>
        <div className="data-provider">
          <span>Data provided by </span>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.themoviedb.org/"
          >
            <img alt="" className="footer-db-img" src="/tmdb-icon.svg" />
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
