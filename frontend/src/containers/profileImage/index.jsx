import "./style.css";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";

function ProfileImage() {
  const dispatch = useDispatch();
  const infos = useSelector(login);
  console.log(infos);
  const id = infos?.payload.user?.user?.user._id;
  console.log("test", id);
  let pic = infos?.payload.user?.user?.user.imageUrl;
  console.log("test", pic);
  let coverValue = pic === undefined ? pic : "../images/user.png";

  const [cover, setCover] = useState(coverValue);

  const handleFileInputChange = async (e) => {
    setCover(e.target.files[0]);

    const formData = new FormData();
    formData.append("imageUrl", cover);
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
          if (requete.ok) {
            const response = await requete.json();

         

            dispatch(
              login({
                user: response,
              })
            );
            console.log(response);
          }
        } catch (e) {
          console.log(e, "error");
        }
      };
      fetchData();
    }
  };

  return (
    <div>
      <img className="photoProfile" src={cover} alt="profile" />
      <div className="input-wrapper">
        <label htmlFor="cover">Change your image</label>
        <input
          type="file"
          accept="image/*"
          name="cover"
          // value={coverValue}
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  );
}

export default ProfileImage;
