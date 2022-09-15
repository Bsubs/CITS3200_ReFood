import React from 'react';
import cancel from "../../assets/icons/PNG/close.png"
import './Donation.css';

function Donation(props) {
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
                
                <a href="home"><label className="back-button">Back</label></a>
                <button className="next-button" onClick={next1}>Next</button>
                </div>
            </div>
            <div id="second-donation">
       
            <div className="top-row">
                
           
                <h1 id="donation-heading1">Where's your business located? </h1>
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
             
                <h1 id="donation-heading1">Tell collectors about the food you are donating</h1>
                </div>
                <div className="middle-row">
                    <div className="form-container">
                        <form>
                            <div className="form-col">
                                <div className="form-row">
                                <label for="description" className="description-label">Description</label><br></br>
                                <input type="text" className="description-input" name="text"></input>
                                </div> <div className="form-row">
                                <label for="quantity" className="quantity-label">Quantity</label><br></br>
                                <select name="quantity" className="quantity-input">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5+">5+</option>
                                </select><br></br>
                                </div> <div className="form-row">
                                <label for="image" className="image-label">Upload Image</label><br></br>
                                <input type="file" className="image-input" name="image" accept="image/*"></input>
                                </div>
                                <div className ="donation-submit">
                                    <input className="next-button" type="submit"></input>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="bottom-row">
                <hr className="solid-bar"></hr>
                <label className="back-button" onClick={back2}>Back</label>
                </div>
            </div>
        </div>
    );
}

export default Donation;