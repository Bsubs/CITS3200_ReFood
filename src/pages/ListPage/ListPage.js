import React, {useEffect, useState} from 'react'; //, { useState } 
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
  useEffect(()=>{
    document.getElementById("search_bar").addEventListener("click",showSearch);
    document.getElementById("exit_modal").addEventListener("click", hideModals);
    search=document.getElementById("search_modal");
    individual_product=document.getElementById("individual_product_modal");
    list_page=document.getElementById("list_page");

  });
  

  function showSearch(){
    search.style.display="block";
    individual_product.style.display="none";
    list_page.style.display="none";
    
  }

  function hideModals(){

    search.style.display="none";
    individual_product.style.display="none";
    list_page.style.display="block";
  }
  return (
    <>
    <div id="search_modal" className="modal">
      <div id="exit_modal">X</div>
       <SearchPage />
    </div>
    <div id="individual_product_modal">
      <div id="exit_modal"></div>
      <IndividualProduct/>
    </div>
    <div id="list_page">
      
      <div id="search_bar">
        <img src={Search}></img>
        <input></input>
        
      </div>
      <div className="product_list">
              {contents.map(contents => (
                  <Products 
                      key={contents.id}
                      image={contents.image}
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