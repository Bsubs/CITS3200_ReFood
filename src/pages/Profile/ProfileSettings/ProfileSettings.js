import React, {useEffect, useState} from 'react';
import './ProfileSettings.css';
import Profile from "./bakers-delight.jpg";

function ProfileSettings() {
    let contactName="Baker's Delight"
    let phoneNumber="0411232124"
    let location="2 Park Rd, Wembley"
  return (
    <div id="profile_settings_page">
        
        <div className="form-container">
            <form>
                <div id="profile_photo_display" className="form-row">
                    <div id="profile_photo_container"> 
                    <img className="" src={Profile} alt="profile icon"/>
                    
                    </div>
                    <div id="edit_profile_photo">Edit Photo</div> 
                </div>
                
                <div className="form-row">
                    <label htmlFor="description" className="description-label"> Contact Name</label><br></br>
                    <input type="text" className="description-input" name="text" value={contactName}></input>
                </div> 
                
                
                <div className="form-row">
                    <label htmlFor="quantity" className="description-label">Phone Number</label><br></br>
                    <input type="text" className="description-input" name="text"  value={phoneNumber}></input>
                </div> 
                
                <div className="form-row">
                    <label htmlFor="description" className="description-label">Location</label><br></br>
                    <input type="text" className="description-input" name="text" value={location}></input>
                    
                </div> 
            </form>

      
        </div>
        <button  id="save_profile_settings" className="button">
           
          Save
        </button>
    </div>
  )
}

export default ProfileSettings;
