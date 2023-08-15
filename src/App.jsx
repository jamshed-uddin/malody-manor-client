import "./App.css";
import Navbar from "./components/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/shared/Footer/Footer";
import { useContext } from "react";
import { ThemeContext } from "./components/Provider/ThemeProvider";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme === "black" && "text-slate-200"}`}>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default App;
