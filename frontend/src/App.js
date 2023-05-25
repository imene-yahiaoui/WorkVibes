import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
 import Login from "./pages/login";
import RoutesPath from "./containers/RoutesPath/index.jsx";
import { useSelector } from "react-redux";
import { selectUser } from "./helpers/features/userSlice";

function App() {
  const user = useSelector(selectUser);
  //  const user= localStorage.getItem("userId");
   !user? console.log("il ya pas"): console.log("il est la ")
  return (
    !user?
        <div className="App">

      <Login />

      </div>

    :

    <div className="App">
      <Header />
      <RoutesPath />
      <Footer />
    </div>
  );
}

export default App;
