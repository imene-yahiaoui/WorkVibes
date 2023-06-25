import "./style.css";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";
import Posts from "../../components/posts";
import { useEffect, useState } from "react";

function AllPosts() {
  const infos = useSelector(login);

  const id = infos?.payload.user?.user?.user._id;

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});

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

    const fetchUsers = async () => {
      const userIds = Array.from(new Set(posts.map((post) => post.userId)));

      const fetchUser = async (userId) => {
        const userResponse = await fetch(
          `http://localhost:3000/api/auth/${userId}`,
          {
            method: "GET",
          }
        );

        if (userResponse.ok) {
          const user = await userResponse.json();
          return [userId, user];
        }
      };

      const users = await Promise.all(userIds.map(fetchUser));
      setUsers(Object.fromEntries(users));
    };

    fetchPosts();
    fetchUsers();
  }, [posts]);

  return (
    <div className="home">
      {posts.map((post) => (
        <Posts
          key={post._id}
          imageUser={users[post.userId]?.imageUrl}
          firstname={users[post.userId]?.firstname}
          lastname={users[post.userId]?.lastname}
          publicationDate={post.publicationDate}
          imageUrl={post.imageUrl}
          descriptionPost={post.description}
          sameUser={id === post.userId ? "true" : ""}
          idPost={post._id}
          countlike={post.likes.length}
          countDislike={post.dislikes.length}
        />
      ))}
    </div>
  );
}

export default AllPosts;
