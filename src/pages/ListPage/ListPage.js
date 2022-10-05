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


function ListPage() {
  useEffect(()=>{
    document.getElementById("search_bar").addEventListener("click",showSearch);
    document.getElementById("exit_search").addEventListener("click", hideSearch);
  });
  

  function showSearch(){
    let search=document.getElementById("search_modal");

    search.style.display="block";
 
    let list_page=document.getElementById("list_page");
    list_page.style.display="none";
    
  }

  function hideSearch(){
    let search=document.getElementById("search_modal");

    search.style.display="none";
 
    let list_page=document.getElementById("list_page");
    list_page.style.display="block";
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
    <div id="search_modal" className="modal">
      <div id="exit_search">X</div>
       <SearchPage />
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