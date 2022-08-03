import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import Login from "./Login";

import Search from "./search/Search";

import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
  const [searchOpen, setSearchOpen] = useState(false);

  const { isAuthenticated } = useAuth0();

  const closeSearchResults = () => {
    setSearchOpen(false);
  };

  return (
    <nav>
      <ul className="navbar-container">
        <li className="navbar-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/coming-soon">Coming Soon</NavLink>
        </li>
        {/* <li className="navbar-item">
          <NavLink to="/suggested">Suggested</NavLink>
        </li> */}
        <li className="navbar-item">
          <NavLink to="/my-clusters">My Clusters</NavLink>
        </li>
        <li className="navbar-item right-align">
          <div
            className="search-button"
            onClick={() => {
              setSearchOpen(!searchOpen);
            }}
          >
            {searchOpen ? "Close" : "Search"}
          </div>
        </li>
        <li className="navbar-item">
          {isAuthenticated ? (
            <NavLink to="/profile">Account</NavLink>
          ) : (
            <Login />
          )}
        </li>
      </ul>
      {searchOpen ? <Search closerFunction={closeSearchResults} /> : null}
    </nav>
  );
}

export default NavBar;
