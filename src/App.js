import React from "react";
import Navbar from "./components/layout/Navbar/Navbar";
import "./App.css";
//import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Explore from "./pages/Explore/Explore";
import Inbox from "./pages/Inbox";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home";

function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break;
    case "/explore":
      component = <Explore />;
      break;
    case "/inbox":
      component = <Inbox />;
      break;
    case "/orders":
      component = <Orders />;
      break;
    case "/profile":
      component = <Profile />;
      break;
    default:
      component = <Home />;
      break;
  }
  return (
    <div className="App">
      <header className="App-header">
        <>
          {component}
          <Navbar />
        </>
      </header>
    </div>
  );
}

export default App;
