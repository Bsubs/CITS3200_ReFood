import React, { useEffect, useState } from 'react';
import './IndividualProduct.css';
import ProductContent from "../ListPage/content"
import Location from "../../assets/icons/PNG/location.png"
import MessageIcon from "../../assets/icons/PNG/message-text.png"
import config from '../../aws-exports';

import { Amplify, API, Auth, AWSCloudWatchProvider, graphqlOperation, Storage } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import { v4 as uuid } from 'uuid'



export default function IndividualProduct(props) {

    //The attributes object stores the user attributes retrived from the AWS Cognito Database
    const [attributes, setAttributes] = useState({});

    // The donatedItem object that stores the information which will be posted to the database
    const [donatedItem, setDonatedItem] = useState({
        id:"",
        title: "",
        pickup_date:"",
        category:"",
        transport_reqs:"",
        donorID:"",
        nfpID:"",
        pickup_location:"",
        quantity:"",
        description:"",
        picture:"",
        isCompleted:false,
        start_time:"",
        end_time:"",
        donorName:"",
        donorPhone:""
        
    });

    //The fetch attributes function retrives the details of the current authenticated user and extracts the attributes field
    const fetchAttributes = async() => {
        try{
            const userData = await Auth.currentAuthenticatedUser();
            const attributesList = userData.attributes;
            setAttributes(attributesList);
        } catch (error) {
            console.log('error in fetching user data', error);
        }


    };
    
    //The fetch attribute function is called everytime the component is rendered. Retrives user details from Cognito
    useEffect(() => {
        fetchAttributes();
      }, []);

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
        <div id="claim_donation_button" className="button"> Message Donor</div>
        <div id="remove_donation_button" className="button" > Remove Donation</div>
        
        
    </div>
  )
}
