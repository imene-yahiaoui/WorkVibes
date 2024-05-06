import { login } from "../../helpers/features/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import "./style.css";
function ProfileImage() {
  const dispatch = useDispatch();
  const infos = useSelector(login);

  // Destructure user data from redux state
  const { user } = infos?.payload?.user?.user;

  // Destructure user properties
  const {
    _id: id,
    email,
    password,
    firstname,
    lastname,
    job,
    bio,
    imageUrl: picture,
  } = user;
  const cover = "../images/user.png";

  // Set initial imageUrl state based on picture availability
  const [imageUrl, setImageUrl] = useState(picture || cover);

  const handleFile = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("imageUrl", file);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("job", job);
    formData.append("bio", bio);
    formData.append("password", password);
    formData.append("email", email);

    let token = localStorage.getItem("token");

    let result = await fetch(`http://localhost:3000/api/auth/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (result.status === 200) {
      const fetchData = async () => {
        try {
          const requete = await fetch(`http://localhost:3000/api/auth/${id}`, {
            method: "GET",
          });
          if (requete.status === 200) {
            const response = await requete.json();

            dispatch(
              login({
                user: response,
              })
            );
          }
        } catch (e) {
          console.error(e, "error");
        }
      };
      fetchData();
    }
  };

  return (
    <div className="Profile">
      <img className="photoProfile" alt="profile" src={imageUrl} />

      <div className="Profile_input">
        <label htmlFor="imageUrl">Change your image</label>
        <div className="updatePicture">
          <div className="icon-container">
            <AiFillPicture style={{ color: "#f0cccf", borderRadius: "10px" }} />
          </div>
          <input
            className="input"
            type="file"
            accept="image/*"
            name="imageUrl"
            onChange={handleFile}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileImage;
