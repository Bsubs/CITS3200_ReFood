import React, {useEffect, useState} from 'react';
import './Notifications.css';

export default function Notifications() {
  return (
    <div id="notifications_page">
        <div className="header">Notifications</div>
        <div id="nearby_donations_notification" className="notification_option">
            <label className="switch">
                <input type="checkbox"></input>
                <span className="slider round"></span>
            </label>
            <div className="donation_text"> 
             <div className="donation_text_header">Nearby Donations</div>
             <div className="donation_text_description">Notify me when donations are nearby</div>
            </div>
        </div>

        <div id="message_notification" className="notification_option">
            <label className="switch">
                <input type="checkbox"></input>
                <span className="slider round"></span>
            </label>
            <div className="donation_text"> 
             <div className="donation_text_header">Message</div>
             <div className="donation_text_description">Notify me when I receive a message</div>
            </div>
        </div>

        <div className="header">Privacy</div>
        <div id="share_phone_details" className="notification_option">
            <label className="switch">
                <input type="checkbox"></input>
                <span className="slider round"></span>
            </label>
            <div className="donation_text"> 
             <div className="donation_text_header">Share Phone Number</div>
             <div className="donation_text_description">Share phone number with matched donations</div>
            </div>
        </div>

        <div id="contacted_by_developers" className="notification_option">
            <label className="switch">
                <input type="checkbox"></input>
                <span className="slider round"></span>
            </label>
            <div className="donation_text"> 
             <div className="donation_text_header">Give Feedback</div>
             <div className="donation_text_description">App developers can message you and ask for feedback</div>
            </div>
        </div>


        <button  className="button">
           
          Save
        </button>
    </div>
  )
}
