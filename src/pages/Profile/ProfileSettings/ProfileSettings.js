import React, {useEffect, useState} from 'react';
import './ProfileSettings.css';
import Profile from "./bakers-delight.jpg";

function ProfileSettings(props) {
    let contactName=props.name;
    let phoneNumber=props.phoneNumber;
    let location=props.address;
    let businessName=props.businessName;
    let emailAddress=props.email;
    let ABN=props.ABN;
    let userType=props.userType;
    function onChangePicture(e){
        let uploaded_image=URL.createObjectURL(e.target.files[0]);
  
    }
    const handleChange = (event) =>{
        let image_placement=document.getElementById("profile_photo");
       
        image_placement.src=URL.createObjectURL(event.target.files[0]);
   
    }
    function changeProfilePhoto(event){
        let image_placement=document.getElementById("profile_photo");
        try{
            image_placement.src=URL.createObjectURL(event.target.files[0]);
        }
        catch{
            
        }
        
    
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
                    <label htmlFor="description" className="description-label">Business Name</label><br></br>
                    <input type="text" className="description-input" name="text" defaultValue={businessName}></input>
                    
                </div> 
                
                <div className="form-row">
                    <label htmlFor="quantity" className="description-label">Phone Number</label><br></br>
                    <input type="text" className="description-input" name="text"  defaultValue={phoneNumber}></input>
                </div> 
                
                <div className="form-row">
                    <label htmlFor="description" className="description-label">Location</label><br></br>
                    <input type="text" className="description-input" name="text" defaultValue={location}></input>
                    
                </div> 

                <div className="form-row">
                    <label htmlFor="description" className="description-label">E-mail Address</label><br></br>
                    <input type="text" className="description-input" name="text" defaultValue={emailAddress}></input>
                    
                </div> 

                <div className="form-row">
                    <label htmlFor="description" className="description-label">ABN</label><br></br>
                    <input type="text" className="description-input" name="text" defaultValue={ABN}></input>
                    
                </div> 

                <div className="form-row">
                    <label htmlFor="description" className="description-label">Donor/Collector</label><br></br>
                    <input type="text" className="description-input" name="text" defaultValue={userType}></input>
                    
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
