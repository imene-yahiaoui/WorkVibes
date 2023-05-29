import "./style.css";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProfileImage from "../../containers/profileImage";
import { useDispatch } from "react-redux";
import DeletUser from "../../containers/deletUser";
function Account() {
  const dispatch = useDispatch();

  const infos = useSelector(login);
  console.log(infos);

  const email = infos?.payload.user?.user?.user.email;
  const password = infos?.payload.user?.user?.user.password;
  const firstNameValue = infos?.payload.user?.user?.user.firstname;
  const [firstName, setFirstName] = useState(firstNameValue);
  const lastNameValue = infos?.payload.user?.user?.user.lastname;
  const [lastName, setLastName] = useState(lastNameValue);
  const JobValue = infos?.payload.user?.user?.user.job;

  const [job, setJob] = useState(JobValue);
  const bioValue = infos?.payload.user?.user?.user.bio;
  const [bio, setBio] = useState(bioValue);
  const id = infos?.payload.user?.user?.user._id;
  async function updateUser(e) {
    e.preventDefault();

    // Créer un objet FormData
    const formData = new FormData();

    // Ajouter les autres champs du formulaire à l'objet FormData

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
      alert("tout pas bien");
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
            console.log("ressssssssssponse", response);
          }
        } catch (e) {
          console.log(e, "error");
        }
      };
      fetchData();
    }
  }

  return (
    <div className="account">
      <div className="container">
      <form method="post" encType="multipart/form-data" className="account_form"> 
      
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

        <button type="submit" className="sign-in-button" onClick={updateUser}>
          modifier
        </button>
        </div>
      </form>

      <DeletUser/>
      </div>
    </div>
  );
}

export default Account;
