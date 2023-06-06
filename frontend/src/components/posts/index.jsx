import "./style.css";
import { Dropdown } from "react-bootstrap";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";

import { useState } from "react";

function Posts({
  imageUser,
  publicationDate,
  imageUrl,
  deleteImg,
  description,
  firstname,
  lastname,
  sameUser,
}) {
  const cover = "../images/user.png";
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
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
      <div className="postEdit">
        <p> {description}</p>

        <Dropdown style={{ display: sameUser ? "block" : "none" }}>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <FiMoreHorizontal />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onSelect={() => handleOptionSelect("Edit")}>
              <BsFillTrash3Fill /> Edit
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => handleOptionSelect("Delete")}>
              <BsPencilFill /> Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
