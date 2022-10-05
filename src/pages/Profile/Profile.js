import React, {useEffect, useState} from 'react'; //, { useState } 
import './Profile.css';
import profile from './profile-circle.png'
import lock from './lock.png'
import notification from './notification.png'
import chevrons from './chevrons-right.png'
import book from './book.png'
import banner from "./bakers-delight.jpg"
import TermsOfService from "../../components/forms/ConsentForm/ConsentForm";
function Profile(props) {
    useEffect(()=>{
        
      
        //document.getElementById("exit_search").addEventListener("click", hideSearch);
        ToS=document.getElementById("consent_form");
        return_button=document.getElementById("return_to_profile_page");
        profile_page=document.getElementById("profile");

        document.getElementById("terms_of_service_button").addEventListener("click",showToS);
        return_button.addEventListener("click",returnToProfilePage);
      });
      
    var ToS, return_button, profile_page;
    
    function showToS(){
        profile_page.style.display="none";
        ToS.style.display="block";
        return_button.style.display="block";
    }

    function returnToProfilePage(){
        profile_page.style.display="block";
        ToS.style.display="none";
        return_button.style.display="none";
    }
    return (

        <div id="profile_page">
            <div id="tos_modal">
                
                <TermsOfService/>
            </div>
            <div id="return_to_profile_page">X </div>
            <div id="profile">
            <div className="profile_header">
                <div id="profile_page_photo_container">
                 
                <img className="user_image" src={banner} alt="profile icon"/>
                   
                </div>

            </div>

            <div className="profile_section">
                <h1>Account Settings</h1>
                <ul>
                    <li> 
                        <a href="/profilesettings">
                            <div className="list_member">
                                <img className="profile_section_icon" src={profile} alt="profile icon"/>
                                <div className="profile_section_text"> Company Information</div>
                                <img className="arrow" src={chevrons} alt="select icon"/>
                            </div>
                        </a> 
                    </li>
                    <li>
                        <a href="/">
                            <div className="list_member">
                                <img className="profile_section_icon" src={lock} alt="lock icon"/>
                                <div className="profile_section_text">  Privacy and Sharing</div>
                                <img className="arrow" src={chevrons} alt="select icon"/>
                            </div>
                        </a>
                    </li>

                    <li>
                        <a href="/">
                            <div className="list_member">
                                <img className="profile_section_icon" src={notification} alt="bell icon"/>
                                <div className="profile_section_text">Notifications </div>
                                <img className="arrow" src={chevrons} alt="select icon"/>
                            </div>
                        </a> 
                        </li>

                    <li>
             
            </li>
                </ul>
                <h1>Documents</h1>
                <ul>
                    <li> 
                        <a href="/">
                            <div className="list_member">
                                <img className="profile_section_icon" src={book} alt="book icon"/>
                                <div className="profile_section_text"> Annual Statistical Report</div>
                                <img className="arrow" src={chevrons} alt="select icon"/>
                            </div>
                        </a> 
                    </li>
                    <li> 
                        
                            <div id="terms_of_service_button" className="list_member">
                                <img className="profile_section_icon" src={book} alt="book icon"/>
                                <div className="profile_section_text"> Terms of Service</div>
                                <img className="arrow" src={chevrons} alt="select icon"/>
                            </div>
                        
                        
                    </li>
                    <li> 
                        <a className="hidden" href="/">
                            <div className="list_member">
                                <img className="profile_section_icon" src={book} alt="book icon"/>
                                <div className="profile_section_text"> Privacy Policy</div>
                                <img className="arrow" src={chevrons} alt="select icon"/>
                            </div>
                        </a> 
                    </li>
                    <li> 
                        <a className="hidden" href="/">
                            <div className="list_member">
                                <img className="profile_section_icon" src={book} alt="profile icon"/>
                                <div className="profile_section_text"> Audit Report</div>
                                <img className="arrow" src={chevrons} alt="select icon"/>
                            </div>
                        </a> 
                    </li>
                </ul>
            </div>
           
        </div>
        </div>
    );
}

export default Profile;