import React, { useEffect, useState } from 'react';
import { Amplify, API, Auth, AWSCloudWatchProvider, graphqlOperation } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import cancel from "../../assets/icons/PNG/close.png"
import './Donation.css';
import "react-multi-date-picker/styles/layouts/mobile.css"
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import SingleImageUploadComponent from '../../components/layout/uploadImages/single-image-upload.component';
import MultipleImageUploadComponent from "../../components/layout/uploadImages/multiple-image-upload.component"
import DatePicker from "react-multi-date-picker";
import * as mutations from '../../graphql/mutations';

function Donation(props) {

    //The attributes object stores the user attributes retrived from the AWS Cognito Database
    const [attributes, setAttributes] = useState({});

    //The fetch attribute function is called everytime the component is rendered
    useEffect(() => {
        fetchAttributes();
      }, []);
    
    //The fetch attributes function retrives the details of the current authenticated user and extracts the attributes field
    const fetchAttributes = async() => {
        try{
            const userData = await Auth.currentAuthenticatedUser();
            const attributesList = userData.attributes;
            setAttributes(attributesList);
        } catch (error) {
            console.log('error in fetching user data', error);
        }

    };

    const [donatedItem, setDonatedItem] = useState({
        title: "",
        pickup_date:"",
        category:"",
        transport_reqs:"",
        donorID:"",
        nfpID:"",
        pickup_location:"",
        quantity:"",
        description:""
    });

    const minDate= new Date();
    const [value, setValue] = useState(new Date());
    const [state, setState] = useState({});
 
      
    function next1() {
        var i = document.getElementsByClassName("selected")
        if (i.length > 0) {
            document.getElementById("first-donation").style.display = "none"
            document.getElementById("third-donation").style.display = "initial"
        }
        else {
            window.alert("Please select a food type");
        }
    }

    function back1() {
        document.getElementById("first-donation").style.display = "initial"
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
            console.log(event.target.innerHTML);

            setDonatedItem (() => ({
                ...donatedItem,
                ['category']: event.target.innerHTML,
                ['donorID']: attributes['sub']
            }));

        }
        console.log(donatedItem);
    }

    // Updates Title Field upon user input
    function handleTitleChange(e) {
        setDonatedItem (() => ({
            ...donatedItem,
            ['title']: e.target.value
        }));
    }

     // Updates Quantity Field upon user input
    function handleQuantityChange(e) {
        setDonatedItem (() => ({
            ...donatedItem,
            ['quantity']: e.target.value
        }));
    }

    // Updates Description Field upon user input
    function handleDescriptionChange(e) {
        setDonatedItem (() => ({
            ...donatedItem,
            ['description']: e.target.value
        }));
    }

    // WIP -> need to get date form datepicker
    function handleDateChange(e) {
        setDonatedItem (() => ({
            ...donatedItem,
            ['pickup_date']: e.target.value
        }));
    }

    // Creates a new FOODITEM and adds it to the database
    const addDonation = async() => {
        try{
            const newFoodItem = await API.graphql({query:mutations.createFOODITEM, variables:{input:donatedItem}});
        } catch (error) {
            console.log('error in fetching posting to database', error);
        }

    };
    
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

            <div id="third-donation">
            <div className="top-row">
             
                <h1 id="donation-heading1">Food Donation Details</h1>
                </div>
                <div className="middle-row">
                    <div className="form-container">
                        <form>
                            <div className="form-row">
                                <label htmlFor="description" className="description-label">Food Item(s)</label><br></br>
                                <input type="text" className="description-input" name="text" onChange={handleTitleChange}></input>
                            </div> 
                            <div className="form-row">
                                <label htmlFor="quantity" className="quantity-label">Quantity/Volume of Food</label><br></br>
                                <input type="text" className="description-input" name="text" onChange={handleQuantityChange}></input>
                            </div> 
                            
                            <div className="form-row">
                                <label htmlFor="description" className="description-label">Food Description</label><br></br>
                                <input type="text" className="description-input" name="text" onChange={handleDescriptionChange}></input>
                                
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
                           
                            <div className="form-row upload-image">
                            <MultipleImageUploadComponent />
                                
                            </div>
                                s
                           
                        </form>
                    </div>
                </div>
                <div className="bottom-row">
                <label className="back-button" onClick={back1}>Back</label>
                 <button className="next-button" onClick={addDonation} >Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Donation;