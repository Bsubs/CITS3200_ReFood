import React, { useEffect, useState } from 'react';
import { Amplify, API, Auth, AWSCloudWatchProvider, graphqlOperation } from 'aws-amplify';
import "./SearchPage.css";
import search from '../../assets/icons/PNG/search.png';
import * as queries from '../../graphql/queries';
import Explore from "./Explore"



function SearchPage({ placeholder, data }) {

  // Array to store FoodItems
  const[foodItems, setFoodItems] = useState([]);

  function clearText() {
    let input1=document.getElementById("input1");
    let input2=document.getElementById("input2");

    input1.value = '';
    input2.value = '';
  }

  // Fetches donations from database
  const fetchDonations = async() => {
    try{
        const allDonations = await API.graphql({query:queries.listFOODITEMS});
        const itemList = allDonations.data.listFOODITEMS.items;
        setFoodItems(itemList);
        
    } catch (error) {
        console.log('error in fetching FoodItems', error);
    }

  };

  useEffect(() => {
    fetchDonations();
  }, []);


  return (
    <div id="SearchPage">
 
      <div className="search">
        <div className="searchHeader">What Food</div>
        <div className="inputs">
          <input id='input1' type="text" placeholder={placeholder} name='input1'/>
        </div>
        <div className="dataResult"></div>
      </div>

  

      <div className="search">
        <div className="searchHeader">Where</div>
        <input id='input2' type="text" name='input2' placeholder="enter here..." />
      </div>


      
      <div id="buttonsContainer">
        
        <button id="clearAll" className="button" onClick={clearText}>
          Clear all
        </button>

        <a href='/listpage'><button id="search" className="button">
           <img  src={search} alt="search icon"/>
          Search
        </button></a>
      
      </div>
      
      <div className='foodItemList hidden'>
        {foodItems.map((foodItem, idx)=> {
          return (
            <div className='foodItemCard'>
              <div>{foodItem.title}</div>
              <div>{foodItem.quantity}</div>
              <div>{foodItem.description}</div>
              <div>{foodItem.category}</div>
            </div>
          );
        })}
      </div>
    </div>


  
  );
}

export default SearchPage;
