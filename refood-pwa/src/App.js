import React from 'react';
//import logo from './assets/images/logo.png';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Explore from "./pages/Explore"
import Inbox from "./pages/Inbox"
import Orders from "./pages/Orders"
import Profile from "./pages/Profile"

function App() {
  let component
  switch(window.location.pathname){
   
    case "/":
      component = <App/>
      break
    case "/explore":
      component = <Explore />
      break
    case "/inbox":
      component = <Inbox />
      break
    case "/orders":
      component = <Orders />
      break
    case "/profile":
      component = <Profile />
      break
  }
  return (
    <>
    {component}
    <Navbar />
  
    
    </>
    
      
    
  );
}

export default App;
