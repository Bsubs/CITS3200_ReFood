import React from 'react'
import './IndividualProduct.css';
import ProductContent from "../ListPage/content"
export default function IndividualProduct() {
    let product=ProductContent[0];
    console.log(product);
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

        <div id="individual_product_text">
            <div id="individual_product_title" className="header">{product.name}</div>
            <div id="individual_product_description"> {product.description}</div>
            
        </div>
        <div id="individual_product_metadata">
            <div className="header"> Pickup Information</div>
            <div className="row">
                <div>Pick-up By</div>
                <div id="individual_product_pickupby">  {product.pickupDate}</div>
            </div>
            <div className="row">
                <div>Pick-up Between</div>
                <div id="individual_product_pickuptime"> {pickup_times}</div>
            </div>
            
            

            <div id="individual_product_pickuptime"> Pick-up Instructions: {pickup_instructions}</div>
            <div id="individual_product_pickuptime"> Transport Requirements {transport_requirements}</div>
        
        </div>
        <div id="individual_product_seller_information">
            <div className="header">Donor Information</div>
            <div id="individual_product_seller_name">{business_name}</div>
            <div id="individual_product_seller_name">{business_number}</div>
        </div>

    </div>
  )
}
