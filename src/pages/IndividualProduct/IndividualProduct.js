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

  return (
    <div id="individual_product_page">
        <div id="multiple_image_wheel"> 
        <img id="display_image" src={product.image}></img>
       
        </div>

        <div id="individual_product_text">
            <div id="individual_product_title" className="header">{product.name}</div>
            <div id="individual_product_description"> {product.description}</div>
        </div>
        <div id="individual_product_metadata"></div>
        <div id="individual_product_seller_information"></div>

    </div>
  )
}
