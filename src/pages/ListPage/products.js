import React, { Component }  from 'react';
import "./products.css"; 
import Check from "../../assets/icons/PNG/check.png"
import Hourglass from "../../assets/icons/PNG/hourglass.png"
import { a } from 'aws-amplify';

export function Products(props) {
    function simplifyDate(date){
        var month_names_short=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let split_date=date.split("-")
        let month=split_date[1];
        let day=split_date[2];

        let month_name=month_names_short[month-1];
        
        return (month_name + " "+day);
      }
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
                    <div className='pickupDate'>{simplifyDate(props.pickup_date)}</div>
                </div>
            </div>
            
            <div className="hidden">
                <div className="startTime">{props.startTime}</div>
                <div className="endTime">{props.endTime}</div>
                <div className="donorID">{props.donorID}</div>
                <div className="transportReqs">{props.transportReqs}</div>
                <div className="donorName">{props.donorName}</div>
                <div className="donorPhone">{props.donorPhone}</div>

              
            </div>
            </div>
        </div>
        
    )
}