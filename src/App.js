import React from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
//import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Explore from "./pages/Explore/Explore"
import Inbox from "./pages/Inbox"
import Orders from "./pages/Orders/Orders"
import Profile from "./pages/Profile/Profile"
import Home from "./pages/Home"
import ConsentForm from "./components/forms/ConsentForm/ConsentForm"
import LoginForm from "./pages/LoginForm/LoginForm"
import Donation from "./pages/Donation/Donation"
import ListPage from "./pages/ListPage/ListPage"
import { useState } from 'react';
// USE showNav VARIABLE TO DETERMINE IF PAGE SHOULD LOAD NAVBAR COMPONENT
function App() {
  const adminUser = {
    company_name: "admin",
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({company_name:"", email:"", password:"", }) //save into user
  const [error, setError] = useState(""); 
  var isNFP="False";

  let component
  switch(window.location.pathname){
    case "/":
      return <ConsentForm isNFP={isNFP}/>
    case "/explore":
      component = <Explore />
      var showNav = "True";
      break
    case "/inbox":
      component = <Inbox />
      var showNav = "True";
      break
    case "/orders":
      component = <Orders isNFP={isNFP}/>
      var showNav = "True";
      break
    case "/consentform":
      component = <ConsentForm/>
      var showNav = "True";
      break
    case "/profile":
      component = <Profile />
      var showNav = "True";
      break
    case "/donation":
      component = <Donation />
      var showNav = "False";
      break
    case "/listpage":
      component = <ListPage />
      var showNav= "True";
      break
    case "/register":
      var showNav = "True";
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
      component = <Donation/>
      var showNav = "False";
      break
  }
  return (
    <div className="App">
      <header className="App-header">
        <>
      {component}
      {showNav == "True" &&
      <Navbar isNFP={isNFP}/> }
      </>
      </header>
    </div>
  );
}
export default App;