import "./style.css";
import { useParams } from "react-router-dom";
import Posts from "../../components/posts";
import { useEffect, useState } from "react";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { _id } = useParams();
  const userInfo = useSelector(login);
  const userId = userInfo?.payload.user?.user?.user._id || null;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/${_id}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Handle error if user data retrieval fails
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [_id]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/post", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const postData = await response.json();
          setPosts(postData.reverse());
        } else {
          // Handle error if fetching user posts fails
          console.error("Failed to fetch user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, [userId]); // Fetch posts when userId changes

  return (
    <div className="home">
      {user && (
        <div className="profile">
          <div className="profile_continer">
            {user.imageUrl ? (
              <img className="profileUser" alt="profile" src={user.imageUrl} />
            ) : (
              <img
                className="profileUser"
                alt="profile"
                src="../images/user.png"
              />
            )}
            <div className="profileContainerUser">
              <div className="profileUser_name">
                <b>{user.firstname}</b>
                <b>{user.lastname}</b>
              </div>
              <div className="account_info">
                {user.job && <p>{user.job}</p>}
                {user.bio && (
                  <div>
                    <label>Bio: </label>
                    <p className="account_info_p">{user.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {posts
        .filter((post) => post.userId === _id)
        .map((post) => (
          <Posts
            key={post._id}
            id={user?._id}
            imageUser={user?.imageUrl || ""}
            firstname={user?.firstname || ""}
            lastname={user?.lastname || ""}
            publicationDate={post.publicationDate}
            imageUrl={post.imageUrl}
            descriptionPost={post.description}
            sameUser={userId === post.userId ? true : false}
            idPost={post._id}
            countlike={post.likes.length}
            countDislike={post.dislikes.length}
            likeUser={post.likes}
            dislikeUser={post.dislikes}
          />
        ))}
    </div>
  );
}

export default Profile;
