import "./style.css";
import { FcGallery } from "react-icons/fc";
import { useState } from "react";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

function Post() {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const infos = useSelector(login);
  console.log(infos);
  const imageUser = infos?.payload.user?.user?.user.imageUrl;

  const handleFile = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));
  };

  function deleteImg() {
    setImageUrl("");
  }

  const sendPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    imageUrl
      ? formData.append("imageUrl", imageUrl)
      : formData.append("description", description);

    let token = localStorage.getItem("token");
    let result = await fetch(`http://localhost:3000/api/post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (result.status === 201) {
      alert("Les modifications ont été enregistrées avec succès");
      setDescription("");
    }
  };

  const cover = "../images/user.png";

  return (
    <div className="post">
      <form method="post" encType="multipart/form-data">
        <figure className="post_continer">
          {imageUser ? (
            <img className="photoUser" alt="profile" src={imageUser} />
          ) : (
            <img className="photoUser" src={cover} alt="user" />
          )}

          <figcaption>
            <input
              type="text"
              className="post_inputText"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </figcaption>
        </figure>

        <div
          className="post_photo"
          style={{ display: imageUrl ? "block" : "none" }}
        >
          <button className="post_icon" onClick={deleteImg}>
            <AiOutlineClose />
          </button>
          <img src={imageUrl} alt="post" />
        </div>

        <div className="post_btn">
          <div className="post_icon-container">
            <FcGallery />
            <input
              className="post_input"
              type="file"
              accept="image/*"
              name="imageUrl"
              onChange={handleFile}
            />
          </div>

          <button onClick={sendPost}>Envoyer</button>
        </div>
      </form>
    </div>
  );
}

export default Post;
