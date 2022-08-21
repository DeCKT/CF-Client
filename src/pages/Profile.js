import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "../components/Logout";

function Profile() {
  const { user } = useAuth0();
  return (
    <div id="profile">
      <div className="profile-image">
        <img
          alt=""
          className="profile-picture"
          src={user.picture}
          onError={({ currentTarget }) => {
            currentTarget.src = "/no-img.svg";
          }}
        />
      </div>
      <div className="profile-details">
        <h1>{user.name}</h1>
        <span>{user.email}</span>
        <div className="logout-container">
          <Logout />
        </div>
      </div>
    </div>
  );
}
export default Profile;
