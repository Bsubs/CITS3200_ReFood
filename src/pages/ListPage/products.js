import React, { Component }  from 'react';
import "./products.css"; 
import Check from "../../assets/icons/PNG/check.png"
import Hourglass from "../../assets/icons/PNG/hourglass.png"
export function Products(props) {
    if (props.isCompleted=="True"){
        var isCompletedIcon=Check;
    }
    else{
        var isCompletedIcon=Hourglass;
    }
    return(
        
        <div id="products_component" key={props.id} className='productCard'>
            <div className="isCompletedIcon">
                <img src={isCompletedIcon} alt='product-img' className='productImage'></img>
            </div>
            <div className="image_box">
                <img src={props.image} alt='product-img' className='productImage'></img>
            </div>
            
           

            <div className='product_content'>
                <div className='productName'>{props.name}</div>
                <div className='productDescription'>{props.description}</div>
            <div className="bottom_info">
                <div className="row">
                    <div className='productQuantity'>{props.quantity}</div>
                    <div className="dateDescriptor">Pick-up By</div>
                </div>
                
                <div className="row">
                    <div className='productLocation'>{props.location}</div>
                    <div className='pickupDate'>{props.pickupDate}</div>
                </div>
            </div>
            
            </div>
        </div>
        
    )
}