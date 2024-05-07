import React from "react";
import "./style.css";
import OptionComment from "../optionComment";
import { NavLink } from "react-router-dom";
function CommentSection({
  imageUser,
  publicationDate,
  firstname,
  lastname,
  sameUser,
  idcomment,
  idPost,
  commentPost,
  id,
}) {
  const cover = "../images/user.png";
  return (
    <div className="commentCadre">
      <section className="sectionPost sectionComment">
        <figure className="postContiner postComment">
          <img
            className="photoUserComment"
            alt="profile"
            src={imageUser || cover}
          />
          <figcaption className="informationComment">
            <NavLink to={`/Profile/${id}`} key={id}>
              <div className="fullNameComment">
                <b>
                  {firstname} {lastname}
                </b>
              </div>
            </NavLink>
            <p>Posted on {publicationDate}</p>
          </figcaption>
        </figure>
        <div className="option_post">
          <OptionComment
            commentPost={commentPost}
            sameUser={sameUser}
            idcomment={idcomment}
          />
        </div>
      </section>
    </div>
  );
}

export default CommentSection;
