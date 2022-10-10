import React, { useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import { Storage, API, graphqlOperation } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import { withAuthenticator } from '@aws-amplify/ui-react'
import * as mutations from '../../graphql/mutations';
import { listFOODITEMS } from '../../graphql/queries';
import * as queries from '../../graphql/queries';
import { Products } from './products';
import Logo1 from '../../assets/images/logo.png';
import Logo from "../../assets/images/logo.png";

import './ListPage.css';
import Search from "../../assets/icons/PNG/search.png";
import SearchPage from "../Explore/SearchPage";

import IndividualProduct from "../IndividualProduct/IndividualProduct";

function ListPage() {
  var search;
  var individual_product;
  var list_page;
  var exit_button;
  useEffect(()=>{
    document.getElementById("search_bar").addEventListener("click",showSearch);
    document.getElementById("exit_modal").addEventListener("click", hideModals);
    search=document.getElementById("search_modal");
    individual_product=document.getElementById("individual_product_modal");
    list_page=document.getElementById("list_page");
    exit_button=document.getElementById("exit_modal");


    /**
     * 
     */

    var products=document.getElementsByClassName("products_component");

    for (let i=0;i<products.length;i++){
      products[i].addEventListener("click",openIndividualProductModal);
    }


    let product_images=document.getElementsByClassName("productImage");
    for (let i=0;i<product_images.length;i++){
   
      product_images[i].addEventListener("error",defaultImageReplace);
    }

  });
  

  function showSearch(){
    search.style.display="block";
    individual_product.style.display="none";
    list_page.style.display="none";
    exit_button.style.display="block";
    
  }

  //Makes individual_product modal visible
  function showIndividualProduct(){
    search.style.display="none";
    individual_product.style.display="block";
    list_page.style.display="none";
    exit_button.style.display="block";
  }

  //Replaces buggy images with ReFood logo
  function defaultImageReplace(){
    this.src=Logo;
  }


  function openIndividualProductModal(){
    
    
    let productImage=this.querySelector(".productImage").src;
    let productName=this.querySelector(".productName").innerHTML;
    let productDescription=this.querySelector(".productDescription").innerHTML;
    let productQuantity=this.querySelector(".productQuantity").innerHTML;
    let productLocation=this.querySelector(".productLocation").innerHTML;
    let productPickupDate=this.querySelector(".pickupDate").innerHTML;
    let productStartTime=this.querySelector(".startTime").innerHTML;
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


    
    showIndividualProduct();
  }

  function hideModals(){

    search.style.display="none";
    individual_product.style.display="none";
    list_page.style.display="block";
    exit_button.style.display="none";
  }

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

  return (
    <>
    <div id="exit_modal">X</div>
    <div id="search_modal" className="modal">
      
       <SearchPage />
    </div>
    <div id="individual_product_modal">
     
      <IndividualProduct/>
    </div>
    <div id="list_page">
      
      <div id="search_bar">
        <img src={Search}></img>
        <input></input>
        
      </div>
      <div className="product_list">

              {foodItems.map(contents => (

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
                  />
                
              ))}
                
      </div>
  
    </div>
    </>
  
  )
}

export default ListPage