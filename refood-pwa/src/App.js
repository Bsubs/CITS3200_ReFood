import React from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
//import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Explore from "./pages/Explore"
import Inbox from "./pages/Inbox"
import Orders from "./pages/Orders"
import Profile from "./pages/Profile/Profile"
import Home from "./pages/Home"
import LoginForm from "./pages/LoginForm/LoginForm"
import { useState } from 'react';

function App() {
  const adminUser = {
    company_name: "admin",
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({company_name:"", email:"", password:"", }) //save into user
  const [error, setError] = useState(""); 

  let component
  switch(window.location.pathname){
    case "/":
      component = <Home/>
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
      const Login = details => { //passing details to method called "Login"
        console.log(details)

        if (details.company_name == adminUser.company_name && details.email == adminUser.email && details.password == adminUser.password) {
          console.log("Logged in");
          setUser({
            company_name: details.company_name, //This should direct to create Create Log in Details
            email: details.email,
            password: details.password
          });
        } else {
          console.log("Details do not match!");
        }
        
      }
      const Logout = () => {
        setUser({company_name:"", email:"", password:""});
      }
      component = <LoginForm Login={Login} error={error} />
      
    
      break
    default:
      
      break
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
