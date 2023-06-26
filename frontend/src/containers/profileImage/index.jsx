import "./style.css";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { AiFillPicture } from "react-icons/ai";

function ProfileImage() {
  const dispatch = useDispatch();
  const infos = useSelector(login);

  const id = infos?.payload.user?.user?.user._id;
  const email = infos?.payload.user?.user?.user.email;

  const password = infos?.payload.user?.user?.user.password;
  const firstName = infos?.payload.user?.user?.user.firstname;
  const lastName = infos?.payload.user?.user?.user.lastname;
  const job = infos?.payload.user?.user?.user.job;
  const bio = infos?.payload.user?.user?.user.bio;

  const picture = infos?.payload.user?.user?.user.imageUrl;

  const cover = "../images/user.png";

  const [imageUrl, setImageUrl] = useState(
    picture === undefined ? cover : picture
  );

  const handleFile = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("imageUrl", file);
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
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
          console.log(e, "error");
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
