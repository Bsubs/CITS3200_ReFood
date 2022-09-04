import React from "react";
import "./SearchPage.css";
import search from './search.png'

function SearchPage({ placeholder, data }) {
  return (
    <div id="SearchPage">
    <script type="text/javascript">
        function clearFields()
        {(document.getElementsByTagName("input").value = "!!")}
    </script>

    <script type="text/javascript">
        function clearFields()
        {(document.querySelectorAll("input").value = "!!")}
    </script>
      <div className="search">
        <div className="searchHeader">What Food</div>
        <div className="inputs">
          <input type="text" placeholder={placeholder} />
        </div>
        <div className="dataResult"></div>
      </div>

      <div className="search">
        <div className="searchHeader">Where</div>
        <input type="text" placeholder="enter here..." />
      </div>

      
      <div id="buttonsContainer">
        <button id="clearAll" className="button" onclick="clearFields()">
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
