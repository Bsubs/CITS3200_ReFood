import React, { useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { withAuthenticator } from '@aws-amplify/ui-react';
import * as mutations from '../../graphql/mutations';
import { listFOODITEMS } from '../../graphql/queries';
import * as queries from '../../graphql/queries';
import './Orders.css';
import Logo from "../../assets/images/logo.png";
import IndividualProduct from '../IndividualProduct/IndividualProduct';

import {Products} from '../ListPage/products';

function Orders(props) {
    var order_header;
    var donation_button_text;

    var individual_product;
    var exit_button;
    var orders_list;

    var event_listeners_added=false;


    var currently_selected_donation;


     // Array to store FoodItems
     const[foodItems, setFoodItems] = useState([]);

     // Fetches donations from database
     const fetchDonations = async() => {
      try{
          const allDonations = await API.graphql({query:queries.listFOODITEMS});
          const itemList = allDonations.data.listFOODITEMS.items;
          setFoodItems(itemList);
          console.log(itemList);
      } catch (error) {
          console.log('error in fetching FoodItems', error);
      }
  
    };
  
    useEffect(() => {
        
      fetchDonations();
    }, []);

    
    useEffect(()=>{
     
        exit_button=document.getElementById("exit_modal");
        orders_list=document.getElementById("orders_list");
        
  
      
        exit_button.addEventListener("click",hideModals);
        let product_images=document.getElementsByClassName("productImage");
        for (let i=0;i<product_images.length;i++){
          product_images[i].addEventListener("error",defaultImageReplace);
        }
  
      });

      useEffect(() => {
        
        document.getElementById("remove_donation_button").addEventListener("click",markDonationAsCompleted)
      },[]);

      useEffect(() => {
        let products=document.getElementsByClassName("products_component");
          console.log(products);
          for (let i=0;i<products.length;i++){
            products[i].addEventListener("click",openIndividualProductModal);
            console.log("ASDASD");
          }
      });
   

    
    if (props.isNFP=="True"){
        order_header="My Orders";
        donation_button_text="Claim Donation";
    }
    else{
        order_header="My Donations";
        donation_button_text="Edit Donation";
    }
    var uncompleted_orders=foodItems.filter(content => content.isCompleted!="True");
    var completed_orders=foodItems.filter(content => content.isCompleted=="True");


    
    //Replace faulty images with ReFood Logo
    function defaultImageReplace(){
        this.src=Logo;
      }


    
    function markDonationAsCompleted(){
      console.log(1);
    }
    function openIndividualProductModal(){

        individual_product= document.getElementById("individual_product_modal");
        exit_button=document.getElementById("exit_modal");
        orders_list=document.getElementById("orders_list");

        let productImage=this.querySelector(".productImage").src;
        let productName=this.querySelector(".productName").innerHTML;
        let productDescription=this.querySelector(".productDescription").innerHTML;
        let productQuantity=this.querySelector(".productQuantity").innerHTML;
        let productLocation=this.querySelector(".productLocation").innerHTML;
        let productPickupDate=this.querySelector(".pickupDate").innerHTML;
        let productStartTime=this.querySelector(".startTime").innerHTML;
        console.log(this.querySelector(".startTime").innerHTML);
        
        let productEndTime=this.querySelector(".endTime").innerHTML;
        let productTransportRequirements=this.querySelector(".transportReqs").innerHTML;
        let donorName=this.querySelector(".donorName").innerHTML;
        let donorPhone=this.querySelector(".donorPhone").innerHTML;
        //let productStartTime=this.querySelector(".")
        if (productTransportRequirements==""){
            productTransportRequirements="No requirements listed by donor."
        }
        individual_product.querySelector("#display_image").src=productImage;
        individual_product.querySelector("#individual_product_title").innerHTML=productName;
        individual_product.querySelector("#individual_product_description").innerHTML=productDescription;
        individual_product.querySelector("#individual_product_location").innerHTML=productLocation;
        individual_product.querySelector("#individual_product_pickupby").innerHTML=productPickupDate;
        individual_product.querySelector("#individual_product_pickuptime").innerHTML=productStartTime+"-"+productEndTime;
        individual_product.querySelector("#individual_product_transport_requirements").innerHTML=productTransportRequirements;
        individual_product.querySelector("#individual_product_seller_name").innerHTML=donorName;
        individual_product.querySelector("#individual_product_seller_number").innerHTML=donorPhone;
        individual_product.querySelector("#clickable_phone_number").href="tel:"+donorPhone;
        individual_product.querySelector("#claim_donation_button").innerHTML=donation_button_text;
        showIndividualProduct();
      }

      function showIndividualProduct(){
        exit_button.style.display="flex";
        individual_product.style.display="block";
        orders_list.style.display="none";
      }

      function hideModals(){
        individual_product= document.getElementById("individual_product_modal");
        exit_button=document.getElementById("exit_modal");
        orders_list=document.getElementById("orders_list");

        individual_product.style.display="none";
        orders_list.style.display="block";
        exit_button.style.display="none";
      }
    
    return (
        <div id="orders_page">
            <div id="individual_product_modal">
                <IndividualProduct/>
            </div>
            <div id="exit_modal"><div>x</div></div>
            <div id="orders_list">
                <div id="uncompleted_orders_list">
                    <div id="in_progress_orders_header" className="order_type">In Progress</div>
                    {uncompleted_orders.map(contents => (
                        <Products
                        key={contents.id}
                        image={contents.picture}
                        description={contents.description}
                        quantity={contents.quantity}
                        pickup_date={contents.pickup_date}
                        title={contents.title}
                        type={contents.type}
                        startTime={contents.start_time}
                        endTime={contents.end_time}
                        location={contents.pickup_location}
                        donorName={contents.donorName}
                        donorPhone={contents.donorPhone}
                        donorID={contents.donorID}
                        transportReqs={contents.transport_reqs}

                        donation={contents}
                        />
                    ))}
                </div>
                <div id="completed_orders_list">
                <div id="completed_orders_header" className="order_type">Completed</div>
                    {completed_orders.map(contents => (
                        <Products
                        key={contents.id}
                        image={contents.picture}
                        description={contents.description}
                        quantity={contents.quantity}
                        pickup_date={contents.pickup_date}
                        title={contents.title}
                        type={contents.type}
                        startTime={contents.start_time}
                        endTime={contents.end_time}
                        location={contents.pickup_location}
                        donorName={contents.donorName}
                        donorPhone={contents.donorPhone}
                        donorID={contents.donorID}
                        transportReqs={contents.transport_reqs}

                        donation={contents}
                        />
                    ))}
              </div>

            </div>
           
        </div>
    );
}

export default Orders;