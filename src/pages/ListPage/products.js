import React, { Component }  from 'react';
import "./products.css"; 
import Check from "../../assets/icons/PNG/check.png"
import Hourglass from "../../assets/icons/PNG/hourglass.png"

export function Products(props) {
    console.log(props);
    if (props.isCompleted=="True"){
        var isCompletedIcon=Check;
        var pickupDescription="Picked-up On";
    }
    else{
        var isCompletedIcon=Hourglass;
        var pickupDescription="Pick-up By";
    }
    return(
        
        <div key={props.id} className='products_component'>
            <div className="isCompletedIcon">
                <img src={isCompletedIcon} alt='product-img' ></img>
            </div>
            <div className="image_box">
                <img src={props.image} alt='product-img' className='productImage'></img>
            </div>
            
           

            <div className='product_content'>
                <div className='productName'>{props.title}</div>
                <div className='productDescription'>{props.description}</div>
            <div className="bottom_info">
                <div className="row">
                    <div className='productQuantity'>{props.quantity}</div>
                    <div className="dateDescriptor">{pickupDescription}</div>
                </div>
                
                <div className="row">
                    <div className='productLocation'>{props.location}</div>
                    <div className='pickupDate'>{props.pickup_date}</div>
                </div>
            </div>
            
            <div className="hidden">
                <div className="startTime">{props.startTime}</div>
                <div className="endTime">{props.endTime}</div>
                <div className="donorID">{props.donorID}</div>
                <div className="transportReqs">{props.transportReqs}</div>

              
            </div>
            </div>
        </div>
        
    )
}