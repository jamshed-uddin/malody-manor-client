import { useState } from "react";

import "./App.css";
import Home from "./components/pages/Home/Home/Home";
import Navbar from "./components/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
