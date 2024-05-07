import React, { useEffect, useState } from "react";
import User from "../../components/user";
import { NavLink } from "react-router-dom";
import "./style.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/users", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();

          // Filtrer les utilisateurs avec une imageUrl définie
          const usersWithPhoto = data.filter((user) => user.imageUrl);
          setUsers(usersWithPhoto);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(users);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.firstname || "")
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase()) ||
      (user.lastname || "").toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const cover = "../images/user.png";

  return (
    <div className="container_userList">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="userList">
        {filteredUsers.map((user) => (
          <NavLink to={`/Profile/${user._id}`} key={user._id}>
            <User
              imageUrl={user.imageUrl || cover}
              firstName={user.firstname}
              lastName={user.lastname}
              job={user.job}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default UserList;
