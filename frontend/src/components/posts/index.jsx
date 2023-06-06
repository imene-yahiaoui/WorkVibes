import "./style.css";
import OptionPost from "../optionPost";

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
}) {
  const cover = "../images/user.png";

  return (
    <div className="post postCadre">
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
        <OptionPost descriptionPost={descriptionPost} sameUser={sameUser} />
      </div>

      <div
        className="post_photo postPhoto"
        style={{ display: imageUrl ? "block" : "none" }}
      >
        <img src={imageUrl} alt="post" />
      </div>
    </div>
  );
}

export default Posts;
