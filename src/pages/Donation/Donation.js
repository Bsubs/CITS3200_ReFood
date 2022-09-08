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
        <div>
            <div id="first-donation">
                <div class="top-row">
                <a href="/home"><img id="cancel-icon" src={cancel} alt="cancel icon"/></a>
                <label id="help-button">Help</label>
                <h1 id="donation-heading1">What kind of food do you want to donate?</h1>
                </div>
                <div class="middle-row">
                    <div class="food-type" onClick={selectType}><h2>Bread</h2>Different types of bread to savour, from Baguettes to Whole Wheat</div>

                    <div class="food-type" onClick={selectType}><h2>Canned Food</h2>Various types of meat can be canned, such as chicken, ham, sausage</div>

                    <div class="food-type" onClick={selectType}><h2>Meats</h2>The most popular kinds of meats are beef, lamb, pork and fish</div>

                    <div class="food-type" onClick={selectType}><h2>Confectionaries</h2>TBD</div>

                    <div class="food-type" onClick={selectType}><h2>Test</h2>Room for more food types</div>

                    <div class="food-type" onClick={selectType}><h2>Test</h2>Room for more food types</div>
                </div>
                <div class="bottom-row">
                <hr class="solid-bar"></hr>
                <a href="home"><label class="back-button">Back</label></a>
                <button class="next-button" onClick={next1}>Next</button>
                </div>
            </div>
            <div id="second-donation">
            <div class="top-row">
                <a href="/home"><img id="cancel-icon" src={cancel} alt="cancel icon"/></a>
                <label id="help-button">Help</label>
                <h1 id="donation-heading1">Where's your business located? </h1>
                </div>
                <div class="middle-row">
                </div>
                <div class="bottom-row">
                <hr class="solid-bar"></hr>
                <label class="back-button" onClick={back1}>Back</label>
                <button class="next-button" onClick={next2}>Next</button>
                </div>
            </div>
            <div id="third-donation">
            <div class="top-row">
                <a href="/home"><img id="cancel-icon" src={cancel} alt="cancel icon"/></a>
                <label id="help-button">Help</label>
                <h1 id="donation-heading1">Tell collectors about the food you are donating</h1>
                </div>
                <div class="middle-row">
                    <div class="form-container">
                        <form>
                            <div class="form-col">
                                <div class="form-row">
                                <label for="description" class="description-label">Description</label><br></br>
                                <input type="text" class="description-input" name="text"></input>
                                </div> <div class="form-row">
                                <label for="quantity" class="quantity-label">Quantity</label><br></br>
                                <select name="quantity" class="quantity-input">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5+">5+</option>
                                </select><br></br>
                                </div> <div class="form-row">
                                <label for="image" class="image-label">Upload Image</label><br></br>
                                <input type="file" class="image-input" name="image" accept="image/*"></input>
                                </div>
                                <div class ="donation-submit">
                                    <input class="next-button" type="submit"></input>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="bottom-row">
                <hr class="solid-bar"></hr>
                <label class="back-button" onClick={back2}>Back</label>
                </div>
            </div>
        </div>
    );
}

export default Donation;