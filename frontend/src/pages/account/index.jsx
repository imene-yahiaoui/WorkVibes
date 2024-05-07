import "./style.css";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import ProfileImage from "../../containers/profileImage";
import DeletUser from "../../containers/deletUser";
import DisplayMessage from "../../components/displayMessage";
function Account() {
  const dispatch = useDispatch();
  const infos = useSelector(login);
  const user = infos?.payload?.user?.user?.user;
  const [firstName, setFirstName] = useState(user?.firstname || "");
  const [lastName, setLastName] = useState(user?.lastname || "");
  const [job, setJob] = useState(user?.job || "");
  const [bio, setBio] = useState(user?.bio || "");
  const id = user?._id || null;

  async function updateUser(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    formData.append("job", job);
    formData.append("bio", bio);
    formData.append("password", user.password);
    formData.append("email", user.email);

    let token = localStorage.getItem("token");
    let result = await fetch(`http://localhost:3000/api/auth/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (result.status === 200) {
      DisplayMessage(
        "The changes have been saved successfully",
        "linear-gradient(to right, #dfacec, #b65dcc)"
      );
      fetchData();
    }
  }

  const fetchData = async () => {
    try {
      let token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/auth/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(login({ user: data }));
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="account">
      <div className="container_account">
        <form
          method="post"
          encType="multipart/form-data"
          className="account_form"
        >
          <ProfileImage />
          <div>
            <div className="account_info">
              <label htmlFor="FirstName"> First Name </label>
              <input
                id="FirstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="account_info">
              <label htmlFor="LasttName">Last Name </label>
              <input
                id="LasttName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="account_info">
              <label htmlFor="job">Job </label>
              <input
                id="job"
                type="text"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
            <div className="account_info">
              <label htmlFor="bio">Bio </label>
              <input
                id="bio"
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="sign-in-button editBtn"
              onClick={updateUser}
            >
              Edit
            </button>
          </div>
        </form>

        <DeletUser />
      </div>
    </div>
  );
}

export default Account;
