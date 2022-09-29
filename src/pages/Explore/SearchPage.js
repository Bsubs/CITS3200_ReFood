import React from "react";
import "./SearchPage.css";
import search from './search.png';
import Explore from "./Explore"



function SearchPage({ placeholder, data }) {

  function clearText() {
    let input1=document.getElementById("input1");
    let input2=document.getElementById("input2");

    input1.value = '';
    input2.value = '';
  }

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
      

    </div>

  
  );
}

export default SearchPage;
