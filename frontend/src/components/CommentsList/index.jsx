import "./style.css";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";
import CommentSection from "../commentSection";
import { useEffect, useState } from "react";

function CommentsList({ idCommentList }) {
  const infos = useSelector(login);

  const id = infos?.payload.user?.user?.user._id;

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    let token = localStorage.getItem("token");

    const fetchPosts = async () => {
      try {
        const requete = await fetch(` http://localhost:3000/api/comment`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (requete.ok) {
          const response = await requete.json();
 console.log( response[2].comment)
          setPosts(response); // Met à jour les posts

          // Récupère les informations de l'utilisateur pour chaque post
          for (const post of response) {
            const userId = post.userId;

            if (!users[userId]) {
              const userResponse = await fetch(
                `http://localhost:3000/api/auth/${userId}`,
                {
                  method: "GET",
                }
              );

              if (userResponse.ok) {
                const user = await userResponse.json();
                setUsers((prevUsers) => ({ ...prevUsers, [userId]: user })); // Met à jour les informations utilisateur
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [users, posts]);

  //filtre  id for post === id for post id in comment fetch
  return (
    <div className="commentList">
      {posts
        .filter((post) => post.postId === idCommentList)
        .map((post) => (
          <CommentSection
            key={post._id}
            imageUser={users[post.userId]?.imageUrl}
            firstname={users[post.userId]?.firstname}
            lastname={users[post.userId]?.lastname}
            publicationDate={post.publicationDate}
            commentPost={post.comment}
            sameUser={id === post.userId ? "true" : ""}
            idcomment={post._id}
          />
        ))}
    </div>
  );
}

export default CommentsList;
