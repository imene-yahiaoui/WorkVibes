import React, { useEffect, useState } from "react";
import User from "../../components/user";
import "./style.css";
function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requete = await fetch("http://localhost:3000/api/auth/users", {
          method: "GET",
        });
        if (requete.ok) {
          const response = await requete.json();
          setUsers(response);
          console.log("icciiiiiiiii", response);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.firstname.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

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
          <User
            imageUrl={user.imageUrl}
            firstName={user.firstname}
            lastName={user.lastname}
            job={user.job}
            key={user._id}
          />
        ))}
      </div>
    </div>
  );
}

export default UserList;
