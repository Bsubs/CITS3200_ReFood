import React from 'react';
import cancel from "../../assets/icons/PNG/close.png"
import './Donation.css';
import "react-multi-date-picker/styles/layouts/mobile.css"
import DatePanel from "react-multi-date-picker/plugins/date_panel";

import {useState} from 'react';
import DatePicker from "react-multi-date-picker";

function Donation(props) {

  
    const minDate= new Date();
    const [value, setValue] = useState(new Date());
    const [state, setState] = useState({});
 
      
    function next1() {
        var i = document.getElementsByClassName("selected")
        if (i.length > 0) {
            document.getElementById("first-donation").style.display = "none"
            document.getElementById("second-donation").style.display = "initial"
        }
        else {
            window.alert("Please select a food type");
        }
    }
    function next2() {
        document.getElementById("second-donation").style.display = "none"
        document.getElementById("third-donation").style.display = "initial"
    }
    function back1() {
        document.getElementById("first-donation").style.display = "initial"
        document.getElementById("second-donation").style.display = "none"
    }
    function back2() {
        document.getElementById("second-donation").style.display = "initial"
        document.getElementById("third-donation").style.display = "none"
    }
    function selectType(event) {
        
        var elem;
        for (elem of document.getElementsByClassName("selected")) {
            elem.classList.remove("selected");
        }
        if (event.target.nodeName == "H2") {
            event.target.parentElement.classList.add("selected");
        }
        else {
            event.target.classList.add("selected");
        }
    
    }
    
    return (
        <div id="donation_page">
             <link rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css" />
            <div id="first-donation">
                <div className="top-row">
        
               
                <h1 id="donation-heading1">What kind of food do you want to donate?</h1>
                </div>
                <div className="middle-row">
                    <ul id="food_category_selection">
                        <li className="food_category" onClick={selectType}>Meat & Seafood</li>
                        <li className="food_category" onClick={selectType}>Fruit & Vegetables</li>
                        <li className="food_category" onClick={selectType}>Dairy, Eggs and Fridge</li>
                        <li className="food_category" onClick={selectType}>Bakery</li>
                        <li className="food_category" onClick={selectType}>Deli</li>
                        <li className="food_category" onClick={selectType}>Pantry</li>
                        <li className="food_category" onClick={selectType}>Drinks</li>
                        <li className="food_category" onClick={selectType}>Frozen</li>
                    </ul>
                   
                </div>
                <div className="bottom-row">
                
                <a href="/"><label className="back-button">Back</label></a>
                <button className="next-button" onClick={next1}>Next</button>
                </div>
            </div>
            <div id="second-donation">
       
            <div className="top-row">
                
           
                <h1 id="donation-heading1">Where is your business located? </h1>
                </div>
                <div className="middle-row">
                </div>
                <div className="bottom-row">
                
                 <label className="back-button" onClick={back1}>Back</label>
                 <button className="next-button" onClick={next2}>Next</button>
                </div>
            </div>
            <div id="third-donation">
            <div className="top-row">
             
                <h1 id="donation-heading1">Food Donation Details</h1>
                </div>
                <div className="middle-row">
                    <div className="form-container">
                        <form>
                            <div className="form-row">
                                <label htmlFor="description" className="description-label">Pick-up Location</label><br></br>
                                <input type="text" className="description-input" name="text" placeholder="123 Apple Street"></input>
                            </div> 
                            <div className="form-row">
                                <label htmlFor="description" className="description-label">Food Item(s)</label><br></br>
                                <input type="text" className="description-input" name="text"></input>
                            </div> 
                            <div className="form-row">
                                <label htmlFor="quantity" className="quantity-label">Quantity/Volume of Food</label><br></br>
                                <input type="text" className="description-input" name="text"></input>
                            </div> 
                            
                            <div className="form-row">
                                <label htmlFor="description" className="description-label">Food Description</label><br></br>
                                <input type="text" className="description-input" name="text"></input>
                                
                            </div> 
                            <div>
                                <label htmlFor="description" className="description-label">Pick-up Dates</label><br></br>
                                
                               
                                <DatePicker className="rmdp-mobile" multiple value={value} onChange={setValue} format="DD/MM/YYYY" 
                                mobileButtons={[
                                    {
                                      label: "RESET",
                                      type: "button",
                                      className: "rmdp-button rmdp-action-button",
                                      onClick: () => setValue({}),
                                    },
                                  ]}

                                  onFocusedDateChange={(dateFocused, dateClicked) => {
                                    setState({ dateFocused, dateClicked });
                                  }}
                                  onClose={() => setState({})}
                                  plugins={[<DatePanel markFocused />]}
                                />
                            </div>

                            <div className="form-row upload-image">
                                <label htmlFor="image" className="image-label">Upload Image</label><br></br>
                                <input type="file" className="image-input" name="image" accept="image/*"></input>
                            </div>
                            
                                
                           
                        </form>
                    </div>
                </div>
                <div className="bottom-row">
                <label className="back-button" onClick={back2}>Back</label>
                 <button className="next-button" >Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Donation;