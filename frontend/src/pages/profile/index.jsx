import "./style.css";
import { useParams } from "react-router-dom";
import Posts from "../../components/posts";
import { useEffect, useState } from "react";
function Profile() {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const { _id } = useParams();

  const fetchProjects = async () => {
    let requete = await fetch(`http://localhost:3000/api/auth/${_id}`, {
      method: "GET",
    });

    if (requete.status === 200) {
      const response = await requete.json();
      setUser(response);
      console.log(response);
    }
  };
  fetchProjects();
  const cover = "../images/user.png";

  //recupere les posts de user

  useEffect(() => {
    let token = localStorage.getItem("token");

    const fetchPosts = async () => {
      try {
        const requete = await fetch("http://localhost:3000/api/post", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (requete.ok) {
          const response = await requete.json();
          setPosts(response.reverse()); // Met à jour les posts
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home">
      <div className="profile">
        <div className="profile_continer">
          {user.imageUrl ? (
            <img className="profileUser" alt="profile" src={user.imageUrl} />
          ) : (
            <img className="profileUser" alt="profile" src={cover} />
          )}
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

      {posts
        .filter((post) => post.userId === _id)
        .map((post) => (
          <Posts
            key={post._id}
            imageUser={user.imageUrl}
            firstname={user.firstname}
            lastname={user.lastname}
            publicationDate={post.publicationDate}
            imageUrl={post.imageUrl}
            description={post.description}
          />
        ))}
    </div>
  );
}

export default Profile;
