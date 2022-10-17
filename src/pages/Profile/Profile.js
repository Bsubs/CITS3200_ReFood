import React, { useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';


import TermsOfService from "../../components/forms/ConsentForm/ConsentForm";
import ProfileSettings from"./ProfileSettings/ProfileSettings";
import Notifications from "./Notifications/Notifications";


//Imports for pop-up modal
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

//Image imports
import profile from '../../../src/assets/icons/PNG/profile-circle.png';
import lock from '../../../src/assets/icons/PNG/lock.png';
import notification from '../../../src/assets/icons/PNG/notification.png';
import chevrons from '../../../src/assets/icons/PNG/chevrons-right.png';
import book from '../../../src/assets/icons/PNG/book.png';
import Logo from "../../../src/assets/images/logo.png";

//Configuring AWS Amplify 
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../../aws-exports';

// Authentication Module
import { signOut, Authenticator, useAuthenticator, TextField, SelectField, withAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

//Style sheets imports
import './Profile.css';


//DO NOT import anything below this line 
Amplify.configure(awsExports);


function Profile({ signOut, user }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    signOut = () => {
        Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
      }
    
    useEffect(()=>{
        
      
        //document.getElementById("exit_search").addEventListener("click", hideSearch);
        ToS=document.getElementById("consent_form");
        return_button=document.getElementById("return_to_profile_page");
        profile_page=document.getElementById("profile");
        signOutButton=document.getElementById("signOut");
        profile_settings=document.getElementById("profile_settings");
        notifications=document.getElementById("notifications_modal");

        document.getElementById("terms_of_service_button").addEventListener("click",showToS);
        return_button.addEventListener("click",returnToProfilePage);
        document.getElementById("profile_settings_button").addEventListener("click",showProfileSettings);
        document.getElementById("notifications_button").addEventListener("click",showNotifications);
      });
      
    var ToS, return_button, profile_page, profile_settings, notifications, signOutButton;
    
    function showToS(){
        profile_page.style.display="none";
        ToS.style.display="block";
        profile_settings.style.display="none";
        return_button.style.display="block";
        notifications.style.display="none";
        signOutButton.style.display="none";
    }

    function showProfileSettings(){
        profile_page.style.display="none";
        ToS.style.display="none";
        profile_settings.style.display="block";
        return_button.style.display="block";
        notifications.style.display="none";
        signOutButton.style.display="block";
    }

    function showNotifications(){
        profile_page.style.display="none";
        ToS.style.display="none";
        profile_settings.style.display="none";
        notifications.style.display="block";
        return_button.style.display="block";
        signOutButton.style.display="none";
        handleOpen();
    }

    function returnToProfilePage(){
        profile_page.style.display="block";
        ToS.style.display="none";
        profile_settings.style.display="none";
        return_button.style.display="none";
        notifications.style.display="none";
        signOutButton.style.display="none";
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

            <Button id="open_completed_modal" onClick={handleOpen}>Open modal</Button>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Sorry
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                These features are not yet enabled.
                            </Typography>
                            <Button onClick={handleClose}>
                                Ok
                            </Button>
                        </Box>
                    </Modal>
                </div>
            <div id="tos_modal">
                <TermsOfService/>
            </div>
            <div id="profile_settings">
                <ProfileSettings name={attributes.name} phoneNumber={attributes.phone_number} email={attributes.email} 
                businessName={attributes['custom:business_name']} address={attributes['custom:address']} ABN={attributes['custom:abn']}
                userType={attributes['custom:type']}/>
            </div>

            <div id="notifications_modal">
                <Notifications/>
            </div>
            <div id="return_to_profile_page">X </div>
            <div id="profile">
            <div className="profile_header">
                <div id="profile_page_photo_container">
                 
                <img className="user_image" src={Logo} alt="profile icon"/>
                   
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
                                <div className="profile_section_text disabled">Notifications and Privacy</div>
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
                        
                            <div className="list_member">
                                <img className="profile_section_icon" src={book} alt="book icon"/>
                                <div className="profile_section_text disabled" onClick={handleOpen}> Annual Statistical Report</div>
                                <img className="arrow" src={chevrons} alt="select icon"/>
                            </div>
                       
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
        <button id="signOut" onClick={signOut}>Sign out</button>
        </div>
    );
}

export default Profile;