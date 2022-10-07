import React, { useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import './Profile.css';
import profile from './profile-circle.png';
import lock from './lock.png';
import notification from './notification.png';
import chevrons from './chevrons-right.png';
import book from './book.png';
import banner from "./bakers-delight.jpg";
import TermsOfService from "../../components/forms/ConsentForm/ConsentForm";
import ProfileSettings from"./ProfileSettings/ProfileSettings";
import Notifications from "./Notifications/Notifications";
function Profile(props) {
    useEffect(()=>{
        
      
        //document.getElementById("exit_search").addEventListener("click", hideSearch);
        ToS=document.getElementById("consent_form");
        return_button=document.getElementById("return_to_profile_page");
        profile_page=document.getElementById("profile");
        profile_settings=document.getElementById("profile_settings");
        notifications=document.getElementById("notifications_modal");

        document.getElementById("terms_of_service_button").addEventListener("click",showToS);
        return_button.addEventListener("click",returnToProfilePage);
        document.getElementById("profile_settings_button").addEventListener("click",showProfileSettings);
        document.getElementById("notifications_button").addEventListener("click",showNotifications);
      });
      
    var ToS, return_button, profile_page, profile_settings, notifications;
    
    function showToS(){
        profile_page.style.display="none";
        ToS.style.display="block";
        profile_settings.style.display="none";
        return_button.style.display="block";
        notifications.style.display="none";
    }

    function showProfileSettings(){
        profile_page.style.display="none";
        ToS.style.display="none";
        profile_settings.style.display="block";
        return_button.style.display="block";
        notifications.style.display="none";
    }

    function showNotifications(){
        profile_page.style.display="none";
        ToS.style.display="none";
        profile_settings.style.display="none";
        notifications.style.display="block";
        return_button.style.display="block";
    }

    function returnToProfilePage(){
        profile_page.style.display="block";
        ToS.style.display="none";
        profile_settings.style.display="none";
        return_button.style.display="none";
        notifications.style.display="none";
    }

    //The attributes object stores the user attributes retrived from the AWS Cognito Database
    const [attributes, setAttributes] = useState({});

    //The fetch attribute function is called everytime the component is rendered
    useEffect(() => {
        fetchAttributes();
      }, []);
    
    //The fetch attributes function retrives the details of the current authenticated user and extracts the attributes field
    const fetchAttributes = async() => {
        try{
            const userData = await Auth.currentAuthenticatedUser();
            console.log(userData);
            const attributesList = userData.attributes;
            setAttributes(attributesList);
        } catch (error) {
            console.log('error in fetching user data', error);
        }

    };

    return (

        <div id="profile_page">
            <div id="tos_modal">
                <TermsOfService/>
            </div>
            <div id="profile_settings">
                <ProfileSettings/>
            </div>

            <div id="notifications_modal">
                <Notifications/>
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
                        <a href="#">
                            <div id="profile_settings_button" className="list_member">
                                <img className="profile_section_icon" src={profile} alt="profile icon"/>
                                <div className="profile_section_text"> Company Information</div>
                                <img className="arrow" src={chevrons} alt="select icon"/>
                            </div>
                        </a> 
                    </li>
                   

                    <li>
                        <a href="#">
                            <div id="notifications_button" className="list_member">
                                <img className="profile_section_icon" src={notification} alt="bell icon"/>
                                <div className="profile_section_text">Notifications and Privacy</div>
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
                <h1>User Details</h1>
                <ul>
                    <li>
                        <div className='list_member'>{attributes.name}</div>
                    </li>
                    <li>
                        <div className='list_member'>{attributes.email}</div>
                    </li>
                    <li>
                        <div className='list_member'>{attributes.phone_number}</div>
                    </li>
                    <li>
                        <div className='list_member'>{attributes['custom:business_name']}</div>
                    </li>
                    <li>
                        <div className='list_member'>{attributes['custom:address']}</div>
                    </li>
                    <li>
                        <div className='list_member'>{attributes['custom:abn']}</div>
                    </li>
                    <li>
                        <div className='list_member'>{attributes['custom:type']}</div>
                    </li>
                </ul>
            </div>
           
        </div>
        </div>
    );
}

export default Profile;