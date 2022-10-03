import React, {useEffect, useState} from 'react';
import './ProfileSettings.css';
import Profile from "./bakers-delight.jpg";

function ProfileSettings() {
    let contactName="Baker's Delight";
    let phoneNumber="0411232124";
    let location="2 Park Rd, Wembley";
    function onChangePicture(e){
        let uploaded_image=URL.createObjectURL(e.target.files[0]);
        console.log(e);
        console.log(uploaded_image);     
    }
    const handleChange = (event) =>{
        let image_placement=document.getElementById("profile_photo");
        console.log(image_placement.src);
        image_placement.src=URL.createObjectURL(event.target.files[0]);
        console.log(image_placement.src);
    }
    function changeProfilePhoto(event){
        let image_placement=document.getElementById("profile_photo");
        console.log(image_placement.src);
        image_placement.src=URL.createObjectURL(event.target.files[0]);
        console.log(image_placement.src);
    }
  return (
    <div id="profile_settings_page">
        
        <div className="form-container">
            <form>
                <div id="profile_photo_display" className="form-row">
                    <div id="profile_photo_container"> 
                    
                        <img id="profile_photo" className="" src={Profile} alt="profile icon"/>
                        <input id="profile_photo_upload_button" type='file'  name='image' accept="image/png, image/gif, image/jpeg" onChange={changeProfilePhoto} ></input>
                        <label id="profile_upload_label" for="profile_photo_upload_button">Change Photo</label>
                    </div>
                   

                </div>
             
                
                <div className="form-row">
                    <label htmlFor="description" className="description-label"> Contact Name</label><br></br>
                    <input type="text" className="description-input" name="text" defaultValue={contactName}></input>
                </div> 
                
                
                <div className="form-row">
                    <label htmlFor="quantity" className="description-label">Phone Number</label><br></br>
                    <input type="text" className="description-input" name="text"  defaultValue={phoneNumber}></input>
                </div> 
                
                <div className="form-row">
                    <label htmlFor="description" className="description-label">Location</label><br></br>
                    <input type="text" className="description-input" name="text" defaultValue={location}></input>
                    
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
