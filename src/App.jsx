import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <NavBar />
        <Home />
        {/* <Login/> */}
        {/* <Signup /> */}
      </div>
    </>
  );
}

export default App;
