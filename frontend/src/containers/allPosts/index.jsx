import "./style.css";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";
import Posts from "../../components/posts";
import { useEffect, useState } from "react";

function AllPosts() {
  const infos = useSelector(login);
  const id = infos?.payload?.user?.user?.user?._id || null;

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/post", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data.reverse());
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      const userIds = Array.from(new Set(posts.map((post) => post.userId)));

      const fetchUser = async (userId) => {
        try {
          const userResponse = await fetch(
            `http://localhost:3000/api/auth/${userId}`
          );
          if (!userResponse.ok) {
            throw new Error(`Failed to fetch user ${userId}`);
          }
          const user = await userResponse.json();
          return [userId, user];
        } catch (error) {
          console.error(error);
          return [userId, null];
        }
      };

      const usersData = await Promise.all(userIds.map(fetchUser));
      setUsers(Object.fromEntries(usersData));
    };

    fetchPosts();
    fetchUsers();
  }, [posts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
      {posts.map((post) => (
        <Posts
          key={post._id}
          id={users[post.userId]?._id}
          imageUser={users[post.userId]?.imageUrl}
          firstname={users[post.userId]?.firstname}
          lastname={users[post.userId]?.lastname}
          publicationDate={post.publicationDate}
          imageUrl={post.imageUrl}
          descriptionPost={post.description}
          sameUser={id === post.userId}
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

export default AllPosts;
