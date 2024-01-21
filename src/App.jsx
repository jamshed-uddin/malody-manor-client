import "./App.css";
import Navbar from "./components/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/shared/Footer/Footer";
import { useContext } from "react";
import { ThemeContext } from "./components/Provider/ThemeProvider";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === "black" && "text-gray-300"
      }`}
    >
      <div>
        <Navbar></Navbar>
      </div>
      <div className="flex-grow">
        <Outlet></Outlet>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
