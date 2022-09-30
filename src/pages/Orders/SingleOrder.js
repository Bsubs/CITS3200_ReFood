import React, { Component }  from 'react';
import "./SingleOrder.css"; 

export function SingleOrder(props) {
    return(
        
        <div key={props.id} className='productCard'>
            <div className="image_box">
                <img src={props.image} alt='product-img' className='productImage'></img>
            </div>
           

            <div className='product_content'>
                <div className='productName'>{props.name}</div>
                <div className='productDescription'>{props.description}</div>
            <div className="bottom_info">
                <div className='productQuantity'>{props.quantity}</div>
                <div className="row">
                    <div className='productLocation'>{props.location}</div>
                    <div className='pickupDate'>{props.pickupDate}</div>
                </div>
            </div>
            
            </div>
        </div>
        
    )
}