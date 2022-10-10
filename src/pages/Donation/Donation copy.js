import React, { useEffect, useState } from 'react';
import { Amplify, API, Auth, AWSCloudWatchProvider, graphqlOperation, Storage } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import cancel from "../../assets/icons/PNG/close.png"
import './Donation.css';
import '../../App.css';
import Camera from '../../assets/icons/PNG/camera.png'
import * as mutations from '../../graphql/mutations';
import TimePicker from "react-datepicker";
import DatePicker from "react-datepicker";

function Donation(props) {

    //The attributes object stores the user attributes retrived from the AWS Cognito Database
    const [attributes, setAttributes] = useState({});

    // Date and time objects for date and time pickers 
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [startTime1, setStartTime1] = useState(new Date());

    // The donatedItem object that stores the information which will be posted to the database
    const [donatedItem, setDonatedItem] = useState({
        title: "",
        pickup_date:startDate,
        category:"",
        transport_reqs:"",
        donorID:"",
        nfpID:"",
        pickup_location:"",
        quantity:"",
        description:"",
        picture:"",
        isCompleted:false,
        start_time:startTime,
        end_time:startTime1
    });

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

    //The fetch attribute function is called everytime the component is rendered. Retrives user details from Cognito
    useEffect(() => {
        fetchAttributes();
      }, []);

    // Selects the category of food in the initial page
    function selectType(event) {
        var next_buttons=document.getElementsByClassName("next-button");
        for (let elem of document.getElementsByClassName("selected")) {
            elem.classList.remove("selected");
        }
        if (event.target.nodeName == "H2") {
            event.target.parentElement.classList.add("selected");
        }
        else {
            event.target.classList.add("selected");
            console.log(event.target.innerHTML);
            // Updates the donated Item object with the selected parameters 
            setDonatedItem (() => ({
                ...donatedItem,
                ['category']: event.target.innerHTML,
                ['donorID']: attributes['sub'],
                ['pickup_location']: attributes['custom:address']
            }));
            console.log(donatedItem);
        }
        for (let elem of document.getElementsByClassName("next-button")){
            if (!(getComputedStyle(elem).display ==="hidden")){
                elem.classList.add("selected"); 
            }
        }
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
    
    // Updates Address Field upon user input
    function handleAddressChange(e) {
        setDonatedItem (() => ({
            ...donatedItem,
            ['custom:address']: e.target.value
        }));
    }

    // Updates the pick-up by date upon user input
    function handleDateChange(e) {
        setDonatedItem (() => ({
            ...donatedItem,
            ['pickup_date']: e.toISOString().substring(0, 10)
        }));
    }

    // Updates the start time upon user input
    function handleTimeChange1(e) {
        setStartTime(e)
        console.log(startTime);
        setDonatedItem (() => ({
            ...donatedItem,
            ['start_time']: e.toISOString().substring(11, 23)
        }));
    }

    // Updates the end time upon user input
    function handleTimeChange2(e) {
        setStartTime1(e)
        console.log(startTime);
        setDonatedItem (() => ({
            ...donatedItem,
            ['end_time']: e.toISOString().substring(11, 23)
        }));
    }

    // Creates a new FOODITEM and adds it to the database
    const addDonation = async() => {
        try{
            const newFoodItem = await API.graphql({query:mutations.createFOODITEM, variables:{input:donatedItem}});
            console.log(newFoodItem);
        } catch (error) {
            console.log('error in fetching posting to database', error);
        }

    };

    useEffect(()=>{
        let delete_buttons=document.getElementsByClassName("delete_image");
        console.log(delete_buttons);
        Array.from(delete_buttons).forEach(function(elem){
            elem.addEventListener("click",delete_image);
        })
    })

    let num_images=0;
 
    const [image, setImage]= useState(undefined);
    const handleChange = (event) => {
        if (num_images==2){
            return
        }
        let image_placement=document.getElementById("uploaded_image_"+num_images);
        image_placement.src= URL.createObjectURL(event.target.files[0]);
        image_placement.classList.add("make_image_visible");
        num_images=num_images+1;
        
  }

    function delete_image(){
        console.log(this.parentElement);
        let uploaded_image=this.parentElement.querySelector('.uploaded_image')
        if (uploaded_image.classList.contains("make_image_visible")){
            uploaded_image.src="";
            uploaded_image.classList.remove("make_image_visible");
            num_images=num_images-1;
        }
        if (num_images<0){
            num_images=0;
        }
        cascade_images();
       
    }
    function log_image_src(){
        let images=document.getElementsByClassName("uploaded_image"); 
        console.log(images);
        for (let i=0;i<images.length;i++){
            
            console.log(images[i].getAttribute("src"));
        }
    }
    function cascade_images(){
        if (num_images>0){
            let images=document.getElementsByClassName("uploaded_image"); 
            while (images[0].getAttribute("src")==""){
                for (let i=1; i<images.length;i++){
                    images[i-1].setAttribute("src",images[i].getAttribute("src"));
                    images[i-1].classList.add('make_image_visible');
                }

                log_image_src();
            }
            images[images.length-1].src="";
            images[images.length-1].classList.remove("make_image_visible");
        }
    }
    function onChangePicture(e){
        let uploaded_image=URL.createObjectURL(e.target.files[0]);
        console.log(e);
        console.log(uploaded_image);     
    }
    
    // Function for navigation buttons
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

    // Function for navigation buttons
    function back1() {
        document.getElementById("first-donation").style.display = "initial"
        document.getElementById("third-donation").style.display = "none"
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
                
                <a href="/profile"><label className="back-button">Back</label></a>
                
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
                                <label htmlFor="description" className="description-label"> Food Item(s)</label><br></br>
                                <input type="text" className="description-input" name="text" onChange={handleTitleChange}></input>
                            </div> 
                            
                            
                            <div className="form-row">
                                <label htmlFor="quantity" className="quantity-label description-label">Quantity/Volume of Food</label><br></br>
                                <input type="text" className="description-input" name="text" onChange={handleQuantityChange}></input>
                            </div> 
                            
                            <div className="form-row">
                                <label htmlFor="description" className="description-label">Food Description</label><br></br>
                                <textarea id="food-description-input" type="text" className="description-input" name="text" onChange={handleDescriptionChange}></textarea>
                                
                            </div> 
                            <div className="form-row">
                                <label htmlFor="description" className="description-label">Transport Requirements</label><br></br>
                                <textarea id="food-requirements-input" type="text" className="description-input" name="text"></textarea>
                                
                            </div> 
                            

                            <div className="form-row upload-image">
                            <div className="description-label"> Images </div>
                                <label htmlFor="image" className="images description-label">
                                    
                                    <div id="image_box_0" className="image_box">
                                        <img id="uploaded_image_0" className="uploaded_image" src="data:," alt></img>
                                        <input type='file' className="image_upload_button"  name='image' accept="image/png, image/gif, image/jpeg" onChange={handleChange}></input>
                                        
                                        <img src={Camera} alt="camera"/>
                                        
                                        <div className="delete_image">x</div>
                                    
                                    </div>

                                    <div id="image_box_1" className="image_box">
                                        <img id="uploaded_image_1" className="uploaded_image" src="data:," alt></img>
                                        <input type='file' className="image_upload_button"  name='image' accept="image/png, image/gif, image/jpeg" onChange={handleChange}></input>
                                        <img src={Camera} alt="camera"/>
                                        <div className="delete_image">x</div>
                                    
                                    </div>
                                    
                                </label>
                                
                            </div>
                           
                            
                            <div className="form-row">
                                <label htmlFor="description" className="description-label">Pick-up Location</label><br></br>
                                <input type="text" className="description-input" name="text" placeholder={attributes['custom:address']} onChange={handleAddressChange}></input>
                            </div> 
                            

                            <div id="dates-input">
                                <label htmlFor="description" className="description-label">Pick-up By:</label><br></br>
                                <DatePicker
                                    selected={startDate}
                                    onSelect={(date) => setStartDate(date)} //when day is clicked
                                    onChange={handleDateChange} //only when value has changed
                                    dateFormat="dd/MM/yy"
                                />

                            </div>

                            <div id="pick-up-input">
                            <label htmlFor="description" className="description-label">Pick-up Times</label><br></br>
                            <div className="timePicker">
                                <div>
                                <text>Start </text>
                            <TimePicker
                                selected={startTime}
                                onChange={handleTimeChange1}
                                showTimeSelect
                                showTimeSelectOnly
                                popperPlacement="top-end"
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                            </div>
                            <div>
                            <text>End: </text>
                            <TimePicker
                                selected={startTime1}
                                onChange={handleTimeChange2}
                                showTimeSelect
                                showTimeSelectOnly
                                popperPlacement="top-end"
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                            </div>
                            </div>
                            </div>
                           
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