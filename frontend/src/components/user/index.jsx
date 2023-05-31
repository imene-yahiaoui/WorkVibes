import "./style.css";

function User({ imageUrl, firstName, lastName, job }) {
  return (
    <div className="user">
      <img className="photoUser" alt="profile" src={imageUrl} />

      <div className="containerUser">
        <div className="user_name">
          <b>{firstName}</b>
          <b>{lastName}</b>
        </div>
        <div className="account_info">
          <p>{job}</p>
        </div>
      </div>
    </div>
  );
}

export default User;
