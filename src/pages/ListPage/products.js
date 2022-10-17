import React, { Component }  from 'react';
import "./products.css"; 
import Check from "../../assets/icons/PNG/check.png"
import Hourglass from "../../assets/icons/PNG/hourglass.png"
import { a } from 'aws-amplify';

export function Products(props) {

    function simplifyDate(date){
        if (date==null){
            return ("no date entered")
        }
        var month_names_short=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let split_date=date.split("-")
        let month=split_date[1];
        let day=split_date[2];

        let month_name=month_names_short[month-1];
        
        return (month_name + " "+day);
      }
    
      function simplifyLocation(location_string){
        let split_location=location_string.split(",");
        return split_location.pop();
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
                <img src={props.picture} alt='product-img' className='productImage'></img>
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
                    <div className='productLocation'>{simplifyLocation(props.pickup_location)}</div>
                    <div className='pickupDate'>{simplifyDate(props.pickup_date)}</div>
                </div>
            </div>
            
            <div className="hidden">
                <div className="category">{props.category}</div>
                <div className="completionDate">{props.completionDate}</div>
                <div className="createdAt">{props.createdAt}</div>
                <div className="description">{props.description}</div>
                <div className="donorID">{props.donorID}</div>
                <div className="donorName">{props.donorName}</div>
                <div className="donorPhone">{props.donorPhone}</div>
                <div className="end_time">{props.end_time}</div>
                <div className="donationID">{props.donationID}</div>
                <div className="isCompleted">{props.isCompleted}</div>
                <div className="nfpID">{props.nfpID}</div>
                <div className="pickup_date">{props.pickup_date}</div>
                <div className="pickup_location">{props.pickup_location}</div>
                <div className="picture">{props.picture}</div>
                <div className="quantity">{props.quantity}</div>
                <div className="start_time">{props.start_time}</div>
                <div className="title">{props.title}</div>
                <div className="transport_reqs">{props.transport_reqs}</div>
                <div className="updatedAt">{props.updatedAt}</div>
                <div className="_deleted">{props._deleted}</div>
                <div className="_lastChangedAt">{props._lastChangedAt}</div>
                <div className="_version">{props._version}</div>
            </div>
            </div>
        </div>
        
    )
}