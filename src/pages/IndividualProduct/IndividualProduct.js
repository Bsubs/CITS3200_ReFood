import React from 'react'
import './IndividualProduct.css';
import ProductContent from "../ListPage/content"
import Location from "../../assets/icons/PNG/location.png"
import MessageIcon from "../../assets/icons/PNG/message-text.png"
export default function IndividualProduct() {
    
    function invertDate(date){
        console.log(date);
        return date;
    }
  return (
    <div id="individual_product_page">
        <div id="multiple_image_wheel"> 
        <img id="display_image" ></img>
       
        </div>

        <div className="description_block">
            <div id="individual_product_title" className="main_header"></div>
            <div id="map_link">
                <img src={Location}></img>
                <div id="individual_product_location"></div>
            </div>
            <div id="individual_product_description"> </div>
            
        </div>
        <div className="description_block">
            <div className="header"> Pickup Details</div>
            <div className="row">
                <div>Pick-up By</div>
                <div id="individual_product_pickupby">  </div>
            </div>
            <div className="row">
                <div>Pick-up Between</div>
                <div id="individual_product_pickuptime"> </div>
            </div>

            
            
            </div>   
        <div className="description_block">
            <div className="header"> Additional Notes</div>
            
            <div id="individual_product_transport_requirements"></div>
        
        </div>
        <div className="description_block">
            <div className="header">Donor Information</div>
            <div>Donor name: <span id="individual_product_seller_name"></span></div>
            <a id="clickable_phone_number"><div id="individual_product_seller_number"></div></a>
            <div id="message_icon">
                <img src={MessageIcon}></img>
            </div>
        </div>
        <div id="claim_donation_button"> Claim Donation</div>
        
    </div>
  )
}
