import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
//  import Login from "./pages/login";
import RoutesPath from "./containers/RoutesPath/index.jsx";

function App() {

//  const user= localStorage.getItem("userId");
//  !user? console.log("il ya pas"): console.log("il est la ")
  return(
    // !user? 
//     <div className="App">
  
//   <Login />
  
//   </div>
 
 
// :

 
  <div className="App">
  <Header />
  <RoutesPath />
  <Footer />
</div>
  )
  }
 


export default App;
