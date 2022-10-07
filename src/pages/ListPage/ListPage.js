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
import contents from './content';
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

    for (var i=0;i<products.length;i++){
      products[i].addEventListener("click",openIndividualProductModal);
    }

  });
  

  function showSearch(){
    search.style.display="block";
    individual_product.style.display="none";
    list_page.style.display="none";
    exit_button.style.display="block";
    
  }

  function showIndividualProduct(){
    search.style.display="none";
    individual_product.style.display="block";
    list_page.style.display="none";
    exit_button.style.display="block";
  }

  function openIndividualProductModal(){
    
    
    let productImage=this.querySelector(".productImage").src;
    let productName=this.querySelector(".productName").innerHTML;
    let productDescription=this.querySelector(".productDescription").innerHTML;
    let productQuantity=this.querySelector(".productQuantity").innerHTML;
    let productLocation=this.querySelector(".productLocation").innerHTML;
    let productPickupDate=this.querySelector(".pickupDate").innerHTML;

    individual_product.querySelector("#display_image").src=productImage;
    individual_product.querySelector("#individual_product_title").innerHTML=productName;
    individual_product.querySelector("#individual_product_description").innerHTML=productDescription;
    individual_product.querySelector("#individual_product_location").innerHTML=productLocation;
    individual_product.querySelector("#individual_product_pickupby").innerHTML=productPickupDate;


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
                      pickupDate={contents.pickupDate}
                      name={contents.name}
                      type={contents.type}
                      location={contents.location}
                  />
                
              ))}
                
      </div>
  
    </div>
    </>
  
  )
}

export default ListPage