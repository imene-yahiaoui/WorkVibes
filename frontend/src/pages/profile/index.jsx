import "./style.css";
import { useParams } from "react-router-dom";
import React, { useState } from "react";

function Profile() {
  const [user, setUser] = useState([]);

  const { _id } = useParams();

  const fetchProjects = async () => {
    let requete = await fetch(`http://localhost:3000/api/auth/${_id}`, {
      method: "GET",
    });

    if (requete.status === 200) {
      const response = await requete.json();
      setUser(response);
    }
  };
  fetchProjects();
  return (
    <div className="profile">
      <div className="profile_continer">
        <img className="profileUser" alt="profile" src={user.imageUrl} />

        <div className="profileContainerUser">
          <div className="profileUser_name">
            <b>{user.firstname}</b>
            <b>{user.lastname}</b>
          </div>
          <div className="account_info">
            {user.job === "undefined" ? "" : <p>{user.job}</p>}
            <label>Bio : </label>
            {user.bio === "undefined" ? (
              ""
            ) : (
              <p className="account_info_p"> {user.bio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
