import "./style.css";
import OptionPost from "../optionPost";
import CommentsList from "../../containers/CommentsList";

function Posts({
  imageUser,
  publicationDate,
  imageUrl,
  deleteImg,
  description,
  firstname,
  lastname,
  sameUser,
  descriptionPost,
  idPost,
  countlike,
  countDislike,
  likeUser,
  dislikeUser
}) {
  const cover = "../images/user.png";
  return (
    <div className="post postCadre">
      <section className="sectionPost">
        <figure className="postContiner">
          {imageUser ? (
            <img className="photoUser" alt="profile" src={imageUser} />
          ) : (
            <img className="photoUser" src={cover} alt="user" />
          )}

          <figcaption>
            <b className="fullName">
              {firstname}
              {} {lastname}{" "}
            </b>
            posted on {publicationDate}
          </figcaption>
        </figure>

        <div className="option_post">
          <OptionPost
            descriptionPost={descriptionPost}
            sameUser={sameUser}
            idPost={idPost}
          />
        </div>

        <div
          className="post_photo postPhoto"
          style={{ display: imageUrl ? "block" : "none" }}
        >
          <img src={imageUrl} alt="post" />
        </div>
      </section>

      <CommentsList idCommentList={idPost} countlike={countlike} countDislike={countDislike} likeUser={likeUser} dislikeUser={dislikeUser} />
    </div>
  );
}

export default Posts;
