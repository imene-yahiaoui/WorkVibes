import "./style.css";
import { useState } from "react";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillPicture } from "react-icons/ai";

function Post() {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");
  const infos = useSelector(login);
  console.log(infos);
  const imageUser = infos?.payload.user?.user?.user.imageUrl;

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setFiles(file);
  };

  const deleteImg = () => {
    setImageUrl("");
    setFiles(null);
  };

  const sendPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // If there is an image in the post
    if (imageUrl && files) {
      formData.append("imageUrl", files);
      formData.append("description", description);
    }
    // If there is no image in the post
    else {
      formData.append("description", description);
    }

    const token = localStorage.getItem("token");
    const result = await fetch(`http://localhost:3000/api/post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (result.status === 201) {
      setDescription("");
      deleteImg();
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
          <button type="button" className="post_icon" onClick={deleteImg}>
            <AiOutlineClose />
          </button>
          <img src={imageUrl} alt="post" />
        </div>

        <div className="post_btn">
          <div className="post_icon-container ">
            <AiFillPicture className="addPicture" style={{ color: "#f0cccf", borderRadius: "10px" }} />
            <input
              className="post_input"
              type="file"
              accept="image/*"
              name="imageUrl"
              onChange={handleFile}
            />
          </div>

          <button className="postit" onClick={sendPost}>
            Post it
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;
