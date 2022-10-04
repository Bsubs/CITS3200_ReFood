import React, { useEffect, useState } from 'react'; //, { useState } 
import { Products } from './products';
import contents from './content';
import './ListPage.css';
import Search from "../../assets/icons/PNG/search.png";
import SearchPage from "../Explore/SearchPage";
import SingleProduct from './SingleProduct';
function ListPage() {
  useEffect(() => {
    document.getElementById("search_bar").addEventListener("click", showSearch);
    document.getElementById("exit_search").addEventListener("click", hideSearch);
  });


  function showSearch() {
    let search = document.getElementById("search_modal");

    search.style.display = "block";

    let list_page = document.getElementById("list_page");
    list_page.style.display = "none";

  }

  function hideSearch() {
    let search = document.getElementById("search_modal");

    search.style.display = "none";

    let list_page = document.getElementById("list_page");
    list_page.style.display = "block";
  }
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