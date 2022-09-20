import React, {useEffect, useState} from 'react'; //, { useState } 
//import { Link } from 'react-router-dom';
import './Navbar.css';
import search from './search.png'
import orders from './post.png'
import logo from './logo.png'
import profile from './profile-circle.png'
import message from './message.png'

function Navbar() {
  let page = window.location.pathname;
  let colour="blue";
  
  useEffect(()=>{
    switch(page){
      case "/":
        break
      case "/explore":
        document.getElementById("explore_icon_text").style.color='red'
        document.getElementById("explore_icon").style.filter="invert(11%) sepia(70%) saturate(7486%) hue-rotate(359deg) brightness(116%) contrast(114%)";
        
        break
      case "/inbox":
        document.getElementById("inbox_icon_text").style.color='red'
        document.getElementById("inbox_icon").style.filter="invert(11%) sepia(70%) saturate(7486%) hue-rotate(359deg) brightness(116%) contrast(114%)";
        break
      case "/orders":
        document.getElementById("orders_icon_text").style.color='red'
        document.getElementById("orders_icon").style.filter="invert(11%) sepia(70%) saturate(7486%) hue-rotate(359deg) brightness(116%) contrast(114%)";
        break
      case "/profile":
        document.getElementById("profile_icon_text").style.color='red'
        document.getElementById("profile_icon").style.filter="invert(11%) sepia(70%) saturate(7486%) hue-rotate(359deg) brightness(116%) contrast(114%)";
        break
      default:
        
        break
    }
  });
  
  return (
    <>
    <nav className="navbar">
        <div className="navbar-container">
          <ul>
            <li>
              <a href="/explore">
              <img id="explore_icon" src={search} alt="search icon"/>
              <div id="explore_icon_text" className="nav_text">Find Food</div>
              </a>
            </li>
            <li>
              <a href="/orders">
              <img id="orders_icon" src={orders} alt="orders icon"/>
              <div id="orders_icon_text" className="nav_text">Orders</div>
              </a>
            </li>
            <li>
            <a href="/home">
            <img id="logo" src={logo} alt="ReFood logo"/>
            </a>  
            </li>
            <li>
            <a href="/inbox">
            <img id="inbox_icon" src={message} alt="message icon"/>
            <div id="inbox_icon_text" className="nav_text">Inbox</div>
            </a>
            </li>
            <li>
            <a href="/profile">
            <img id="profile_icon" src={profile} alt="profile icon"/>
            <div id="profile_icon_text" className="nav_text">Profile</div>
            </a>
            </li>
          </ul>
           
            
        </div>
    </nav>
    </>
  )
}

export default Navbar