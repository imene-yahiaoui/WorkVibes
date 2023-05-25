import { Routes, Route } from "react-router-dom";
import Home from "../../pages/home";
import NotFound from "../../pages/notFound";
import Login from "../../pages/login";
// import Project from "../../pages/account";
import ProtectrRoute from "../../helpers/protectrRoute";
import { useSelector } from "react-redux";
import { selectUser } from "../../helpers/features/userSlice";
import Protect from "../../helpers/protect";
const RoutesPath = () => {
  const user = useSelector(selectUser);
 

  return (
    <div>
      <Routes>
        <Route path="/*" element={<NotFound />} />

        <Route
          path="/login"
          element={
            <Protect user={user}>
              {" "}
              <Login />
            </Protect>
          }
        />
        <Route
          path="/"
          element={
            <ProtectrRoute user={user}>
              {" "}
              <Home />{" "}
            </ProtectrRoute>
          }
        />
      </Routes>
    </div>
  );
};
export default RoutesPath;
