import { Routes, Route } from "react-router-dom";
import Home from "../../pages/home";
import NotFound from "../../pages/notFound";
import Login from "../../pages/login";
// import Project from "../../pages/account";
// import ProtectrdRoute from "../../helpers/protectrdRoute";
const RoutesPath = () => {
  //  const user= localStorage.getItem("token");

  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        {/* <Route path="/Project/:id" element={<Project />} /> */}
        <Route path="/*" element={<NotFound />} />
        <Route path="/Login" element={<Login />} />
        {/* <ProtectrdRoute  user={user} > <Home/></ProtectrdRoute> */}
      </Routes>
    </div>
  );
};
export default RoutesPath;
