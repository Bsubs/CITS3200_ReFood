import React, { useEffect, useState } from 'react';
import './IndividualProduct.css';
import ProductContent from "../ListPage/content"
import Location from "../../assets/icons/PNG/location.png"
import MessageIcon from "../../assets/icons/PNG/message-text.png"
import Logo from "../../assets/images/logo.png"
import config from '../../aws-exports';

import { Amplify, API, Auth, AWSCloudWatchProvider, graphqlOperation, Storage } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import { v4 as uuid } from 'uuid'



export default function IndividualProduct(props) {

    
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
            <div id="individual_product_title" className="main_header">{props.title}</div>
            <div id="map_link">
                <img src={Location}></img>
                <div id="individual_product_location"></div>
            </div>
            <div id="individual_product_description"> </div>
            <div id="individual_product_quantity"></div>
            
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
        <div id="claim_donation_button" className="button"> Add to Saved</div>
        <div id="remove_donation_button" className="button" > Mark as Completed</div>

        <div id="individual_hidden" className="hidden">
                <div className="category"></div>
                <div className="completionDate"></div>
                <div className="createdAt"></div>
                <div className="description"></div>
                <div className="donorID"></div>
                <div className="donorName"></div>
                <div className="donorPhone"></div>
                <div className="end_time"></div>
                <div className="donationID"></div>
                <div className="isCompleted"></div>
                <div className="nfpID"></div>
                <div className="pickup_date"></div>
                <div className="pickup_location"></div>
                <div className="picture"></div>
                <div className="quantity"></div>
                <div className="start_time"></div>
                <div className="title"></div>
                <div className="transport_reqs"></div>
                <div className="updatedAt"></div>
                <div className="_deleted"></div>
                <div className="_lastChangedAt"></div>
              
        </div>
        
        
    </div>
  )
}
