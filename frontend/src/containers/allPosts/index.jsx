import "./style.css";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";
import Posts from "../../components/posts";
import { useEffect, useState } from "react";

function AllPosts() {
  const infos = useSelector(login);
  console.log(infos);
  const imageUser = infos?.payload.user?.user?.user.imageUrl;
  const [posts, setPosts] = useState([]);

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
          console.log(response);
          setPosts(response);
        }
      } catch (e) {
        console.log(e, "error");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home">
      {posts.map((post) => (
        <Posts
          key={post._id}
          imageUser={imageUser}
          publicationDate={post.publicationDate}
          imageUrl={post.imageUrl}
          description={post.description}
        />
      ))}
    </div>
  );
}

export default AllPosts;
