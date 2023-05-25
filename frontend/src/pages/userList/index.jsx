import "./style.css";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";

function UserList() {
  const infos = useSelector(login);
  console.log(infos);
  let test = infos?.payload.user?.user?.user.email;
  console.log("test", test);
  let name = infos?.payload.user?.user?.user.firstname;
  console.log(name);

  return (
    <div className="home">
      <h1> userList</h1>
      <h2>{name} </h2>
    </div>
  );
}

export default UserList;
