import "./style.css";
import OptionComment from "../optionComment";

function CommentSection({
  imageUser,
  publicationDate,
  imageUrl,
  commentPost,
  firstname,
  lastname,
  sameUser,
  idcomment,
  idPost,
}) {
  const cover = "../images/user.png";

  return (
    <div className="commentCadre">
      <section className="sectionPost sectionComment">
        <figure className="postContiner postComment">
          {imageUser ? (
            <img className="photoUserComment" alt="profile" src={imageUser} />
          ) : (
            <img className="photoUserComment" src={cover} alt="user" />
          )}

          <figcaption className="informationComment">
            <div className="fullNameComment">
             <b> {firstname }</b>
              <b> {lastname}  </b>
            </div>
            <p>posted on {publicationDate}</p>
          </figcaption>
        </figure>

        <div className="option_post">
          <OptionComment
            commentPost={commentPost}
            sameUser={sameUser}
            idPost={idPost}
            idcomment={idcomment}
          />
        </div>
      </section>
    </div>
  );
}

export default CommentSection;
