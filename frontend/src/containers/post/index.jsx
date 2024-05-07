import "./style.css";
import { useState } from "react";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillPicture } from "react-icons/ai";
import DisplayMessage from "../../components/displayMessage";
function Post() {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState(null);
  const infos = useSelector(login);
  const imageUser = infos?.payload?.user?.user?.user?.imageUrl || null;

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

    if (description.trim() === "") {
      DisplayMessage(
        "Please provide a description for your post",
        "linear-gradient(to right, #ee8f8f, #ad0606)"
      );
      return;
    }

    if (files) {
      formData.append("imageUrl", files);
    }

    formData.append("description", description);

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
    } else {
      // Handle post creation failure
      DisplayMessage(
        "Failed to create the post. Please try again later",
        "linear-gradient(to right, #ee8f8f, #ad0606)"
      );
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
              placeholder="Write something..."
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
            <AiFillPicture
              className="addPicture"
              style={{ color: "#f0cccf", borderRadius: "10px" }}
            />
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
