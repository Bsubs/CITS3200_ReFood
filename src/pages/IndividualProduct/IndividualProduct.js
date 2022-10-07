import React from 'react'
import './IndividualProduct.css';
import ProductContent from "../ListPage/content"
import Location from "../../assets/icons/PNG/location.png"
import MessageIcon from "../../assets/icons/PNG/message-text.png"
export default function IndividualProduct(props) {
    let product=ProductContent[0];
  
    var image_src=product.image;
    var product_name=product.name;
    var product_type=product.type;
    var product_description=product.description;
    var product_pickup_date=product.pickupDate;
    var product_quanity=product.quantity;
    var business_name="Baker's Delight";
    var business_number="0412 123 123";
    var account_creation_date="06/06/2022"
    var product_location=product.location;
    var transport_requirements="Bring 5 tupperware containers"
    var pickup_instructions="Come by the back of the store";
    var pickup_times="5:00pm-9:00pm";

  return (
    <div id="individual_product_page">
        <div id="multiple_image_wheel"> 
        <img id="display_image" src={product.image}></img>
       
        </div>

        <div className="description_block">
            <div id="individual_product_title" className="main_header">{product.name}</div>
            <div id="map_link">
                <img src={Location}></img>
                <div id="individual_product_location"> {product.location}</div>
            </div>
            <div id="individual_product_description"> {product.description}</div>
            
        </div>
        <div className="description_block">
            <div className="header"> Pickup Details</div>
            <div className="row">
                <div>Pick-up By</div>
                <div id="individual_product_pickupby">  {product.pickupDate}</div>
            </div>
            <div className="row">
                <div>Pick-up Between</div>
                <div id="individual_product_pickuptime"> {pickup_times}</div>
            </div>

            
            
            </div>   
        <div className="description_block">
            <div className="header"> Additional Notes</div>
            <div > {pickup_instructions}</div>
            <div>{transport_requirements}</div>
        
        </div>
        <div className="description_block">
            <div className="header">Donor Information</div>
            <div id="individual_product_seller_name">{business_name}</div>
            <div id="individual_product_seller_name">{business_number}</div>
            <div id="message_icon">
                <img src={MessageIcon}></img>
            </div>
        </div>
        <div id="claim_donation_button"> Claim Donation</div>
        
    </div>
  )
}
