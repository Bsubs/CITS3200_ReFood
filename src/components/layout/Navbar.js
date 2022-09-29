import React, {useEffect, useState} from 'react'; //, { useState } 
//import { Link } from 'react-router-dom';
import './Navbar.css';
import search from '../../../src/assets/icons/PNG/search.png';
import orders from '../../../src/assets/icons/PNG/post.png';
import logo from '../../../src/assets/images/logo.png';
import profile from '../../../src/assets/icons/PNG/profile-circle.png';
import message from '../../../src/assets/icons/PNG/message.png';
import food from '../../../src/assets/icons/PNG/food.png';


function Navbar(props) {
  let page = window.location.pathname;
  let colour="blue";
 
  if (props.isNFP=="True"){
    var icon = search;
    var text_color="red";
    var color_filter="invert(11%) sepia(70%) saturate(7486%) hue-rotate(359deg) brightness(116%) contrast(114%)"
    var icon_0_text="Find food"
    var icon_0_link="/listpage"
    var icon_1_text="Orders"
  }
  else{
    var icon = food;
    var text_color="green";
    var color_filter="invert(44%) sepia(45%) saturate(636%) hue-rotate(89deg) brightness(102%) contrast(87%)"
    var icon_0_text="Give food"
    var icon_0_link="/donate"
    var icon_1_text="Donations"

  }

  useEffect(()=>{
    
    switch(page){
      case "/":
        break
      case "/explore":
        document.getElementById("explore_icon_text").style.color=text_color;
        document.getElementById("explore_icon").style.filter=color_filter;
        
        break
      case "/inbox":
        document.getElementById("inbox_icon_text").style.color=text_color;
        document.getElementById("inbox_icon").style.filter=color_filter;
        break
      case "/orders":
        document.getElementById("orders_icon_text").style.color=text_color;
        document.getElementById("orders_icon").style.filter=color_filter;
        break
      case "/profile":
        document.getElementById("profile_icon_text").style.color=text_color;
        document.getElementById("profile_icon").style.filter=color_filter;
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
              <a href={icon_0_link}>
              <img id="explore_icon" src={icon} alt="search icon"/>
              <div id="explore_icon_text" className="nav_text">{icon_0_text}</div>
              </a>
            </li>
            <li>
              <a href="/orders">
              <img id="orders_icon" src={orders} alt="orders icon"/>
              <div id="orders_icon_text" className="nav_text">{icon_1_text}</div>
              </a>
            </li>
            <li>
            <a href="#" onclick="changeUser()">
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