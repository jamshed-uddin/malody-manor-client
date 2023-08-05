import { useState } from "react";

import "./App.css";
import Home from "./components/pages/Home/Home/Home";
import Navbar from "./components/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/shared/Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default App;
