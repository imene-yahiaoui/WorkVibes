import "./style.css";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";
import CommentSection from "../../components/commentSection";
import { useEffect, useState } from "react";
import CommentsNumber from "../../components/commentsNumber";
import { Collapse } from "react-collapse";
import Comment from "../../components/comment";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Like from "../../components/like";

function CommentsList({ idCommentList, countlike, countDislike,likeUser,dislikeUser }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [commentsOfNumber, setCommentsOfNumber] = useState(0);
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const infos = useSelector(login);
  const id = infos?.payload?.user?.user?.user?._id || null;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/comment", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await response.json();
        setPosts(data);

        // Fetch user information for each comment
        const userIds = Array.from(new Set(data.map((post) => post.userId)));
        const fetchUser = async (userId) => {
          const userResponse = await fetch(
            `http://localhost:3000/api/auth/${userId}`
          );
          if (!userResponse.ok) {
            throw new Error(`Failed to fetch user ${userId}`);
          }
          const user = await userResponse.json();
          return [userId, user];
        };
        const usersData = await Promise.all(userIds.map(fetchUser));
        setUsers(Object.fromEntries(usersData));
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();

  }, [posts]);

  useEffect(() => {
    const number = posts.filter((post) => post.postId === idCommentList).length;
    setCommentsOfNumber(number);
  }, [posts, idCommentList]);

  const filteredComments = posts.filter(
    (post) => post.postId === idCommentList
  );

  const handleCollapseToggle = () => {
    setIsCollapseOpen(!isCollapseOpen);
  };

  return (
    <div className="commentList">
      <div className="comment-stats">
        <Like
          userId={id}
          id={idCommentList}
          countlike={countlike}
          countDislike={countDislike}
         likeUser={likeUser}
         dislikeUser={dislikeUser}
        />
        <CommentsNumber number={commentsOfNumber} />
      </div>

      {commentsOfNumber ? (
        <div>
          <button className="CollapseToggle" onClick={handleCollapseToggle}>
            {isCollapseOpen ? (
              <FiChevronUp style={{ color: "#dda8b3", fontSize: "35px" }} />
            ) : (
              <FiChevronDown style={{ color: "#dda8b3", fontSize: "35px" }} />
            )}
          </button>

          <Collapse isOpened={isCollapseOpen}>
            <div className="Collapse">
              {filteredComments.map((post) => (
                <CommentSection
                  key={post._id}
                  imageUser={users[post.userId]?.imageUrl}
                  firstname={users[post.userId]?.firstname}
                  lastname={users[post.userId]?.lastname}
                  publicationDate={post.publicationDate}
                  commentPost={post.comment}
                  sameUser={id === post.userId}
                  idcomment={post._id}
                />
              ))}
            </div>
          </Collapse>
        </div>
      ) : null}

      <Comment idComment={idCommentList} />
    </div>
  );
}

export default CommentsList;
