import React from 'react'; //, { useState } 
//import { Link } from 'react-router-dom';
import './Navbar.css';
import search from './search.png'
import orders from './post.png'
import logo from './logo.png'
import profile from './profile-circle.png'
import message from './message.png'

function Navbar() {
  return (
    <>
    <nav className="navbar">
        <div className="navbar-container">
          <ul>
            <li>
              <a href="/explore">
              <img src={search} alt="search icon"/>
              <div className="nav_text">Explore</div>
              </a>
            </li>
            <li>
              <a href="/orders">
              <img src={orders} alt="orders icon"/>
              <div className="nav_text">Orders</div>
              </a>
            </li>
            <li>
              
            <img id="logo" src={logo} alt="ReFood logo"/>
           
            </li>
            <li>
            <a href="/inbox">
            <img src={message} alt="message icon"/>
            <div className="nav_text">Inbox</div>
            </a>
            </li>
            <li>
            <a href="/profile">
            <img src={profile} alt="profile icon"/>
            <div className="nav_text">Profile</div>
            </a>
            </li>
          </ul>
           
            
        </div>
    </nav>
    </>
  )
}

export default Navbar