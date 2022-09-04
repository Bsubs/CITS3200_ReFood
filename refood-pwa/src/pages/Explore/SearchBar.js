import React from "react";
import "./SearchBar.css";

function SearchBar({ placeholder, data }) {
  return (
    <>
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

      <div className="clearAll">
        <button id="clearAll" onclick="clearFields()">
          Clear all
        </button>
        
        <script type="text/javascript">
          function clearFields()
          {(document.querySelectorAll("input").value = "!!")}
        </script>

      </div>
      <script type="text/javascript">
        function clearFields()
        {(document.getElementsByTagName("input").value = "!!")}
      </script>
    </>
  );
}

export default SearchBar;
