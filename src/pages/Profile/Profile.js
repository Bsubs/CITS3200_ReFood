import React, { useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import './Profile.css';
import profile from './profile-circle.png'
import lock from './lock.png'
import notification from './notification.png'
import chevrons from './chevrons-right.png'
import book from './book.png'
import banner from "./bakers-delight.jpg"
function Profile(props) {

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
            const attributesList = userData.attributes;
            setAttributes(attributesList);
        } catch (error) {
            console.log('error in fetching user data', error);
        }

    };

    return (
        <div id="profile_page">
      
            <div className="profile_header">
            <img className="user_image" src={banner} alt="profile icon"/>

            </div>

            <div className="profile_section">
                <h1>Account Settings</h1>
                <ul>
                    <li> 
                        <a href="/">
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
                                <img className="profile_section_icon" src={book} alt="profile icon"/>
                                <div className="profile_section_text"> Annual Statistical Report</div>
                                <img className="arrow" src={chevrons} alt="select icon"/>
                            </div>
                        </a> 
                    </li>
                    <li> <a href="/">
                            <div className="list_member">
                                <img className="profile_section_icon" src={book} alt="profile icon"/>
                                <div className="profile_section_text"> Terms of Service</div>
                                <img className="arrow" src={chevrons} alt="select icon"/>
                            </div>
                        </a>  
                        </li>
                    <li> 
                        <a href="/">
                            <div className="list_member">
                                <img className="profile_section_icon" src={book} alt="profile icon"/>
                                <div className="profile_section_text"> Privacy Policy</div>
                                <img className="arrow" src={chevrons} alt="select icon"/>
                            </div>
                        </a> 
                    </li>
                    <li> 
                        <a href="/">
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
                        <div className='list_member'>{attributes.given_name} {attributes.family_name}</div>
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
                        <div className='list_member'>{attributes['address']}</div>
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
    );
}

export default Profile;