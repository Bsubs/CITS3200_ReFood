import React from "react";
import "./SearchPage.css";
import search from './search.png';
import clearAll from './clearAll.js';



function SearchPage({ placeholder, data }) {
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
        
        <button id="clearAll" className="button" onclick={clearAll}>
          Clear all
        </button>

        <button id="search" className="button">
           <img  src={search} alt="search icon"/>
          Search
        </button>
      
      </div>

    </div>

  
  );
}

export default SearchPage;
