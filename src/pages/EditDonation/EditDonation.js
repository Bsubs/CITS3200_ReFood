import React, { useEffect, useState } from 'react';
import { Amplify, API, Auth, AWSCloudWatchProvider, graphqlOperation, Storage } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import { v4 as uuid } from 'uuid'
import cancel from "../../assets/icons/PNG/close.png"
import './EditDonation.css';
import '../../App.css';
import Camera from '../../assets/icons/PNG/camera.png'
import * as mutations from '../../graphql/mutations';
import TimePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import config from '../../aws-exports';
import IndividualProduct from '../IndividualProduct/IndividualProduct';


const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
  } = config

function EditDonation(props) {
   

    //The attributes object stores the user attributes retrived from the AWS Cognito Database
    const [attributes, setAttributes] = useState({});

    // Date and time objects for date and time pickers
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setStartTime1] = useState(null);

    // The editedDonatedItem object that stores the information which will be posted to the database
    const [editedDonatedItem, setDonatedItem] = useState({
        id: "",
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
        end_time:endTime,
        donorName:"",
        donorPhone:""
        
    });


    function updateDonationPreview(){
      
        let edit_donation_modal=document.getElementById("edit_donation_modal");
        let individual_product=document.getElementById("individual_product_modal");
        editedDonatedItem.id=individual_product.querySelector(".donationID").innerHTML;
        editedDonatedItem._version=individual_product.querySelector("._version").innerHTML;
        editedDonatedItem.title=edit_donation_modal.querySelector("#individual_product_title").value;

        console.log(edit_donation_modal.querySelector("#individual_product_title"));
        
        let dateParts=edit_donation_modal.querySelector("#pick-up_by_input").value.split("/");
        
        let myDate= new Date("20"+dateParts[2],dateParts[1],dateParts[0]);
        editedDonatedItem.pickup_date=myDate.toISOString().substring(0,10);

        
        let food_categories=edit_donation_modal.querySelectorAll(".food_category");
        let currently_selected_category;
        for (let i=0; i<food_categories.length;i++){
  
          if (food_categories[i].classList.contains("selected")){
            currently_selected_category=food_categories[i].value;
          }
    
        }

        editedDonatedItem.category=currently_selected_category;
  
        editedDonatedItem.transport_reqs=edit_donation_modal.querySelector("#food-requirements-input").innerHTML;
        editedDonatedItem.donorID=props.userInfo.sub;


        editedDonatedItem.nfpID="";
        editedDonatedItem.pickup_location=edit_donation_modal.querySelector("#pick-up_location_box").innerHTML;

        editedDonatedItem.quantity=edit_donation_modal.querySelector("#quantity_input_box").innerHTML;

        editedDonatedItem.description=edit_donation_modal.querySelector("#food-description-input").innerHTML;

        editedDonatedItem.picture=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
        editedDonatedItem.isCompleted=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
        editedDonatedItem.start_time=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
        editedDonatedItem.end_time=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
        editedDonatedItem.donorName=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
  
        console.log(editedDonatedItem);
      }

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
         
            // Updates the donated Item object with the selected parameters 
            setDonatedItem (() => ({
                ...editedDonatedItem,
                ['category']: event.target.innerHTML,
                ['donorID']: attributes['sub'],
                ['pickup_location']: attributes['custom:address'],
                ['donorName']: attributes["custom:business_name"],
                ['donorPhone']:attributes["phone_number"]
            }));
            

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
            ...editedDonatedItem,
            ['title']: e.target.value
        }));
        console.log(editedDonatedItem);
    }

     // Updates Quantity Field upon user input
    function handleQuantityChange(e) {
        setDonatedItem (() => ({
            ...editedDonatedItem,
            ['quantity']: e.target.value
        }));
    }

    // Updates Description Field upon user input
    function handleDescriptionChange(e) {
        setDonatedItem (() => ({
            ...editedDonatedItem,
            ['description']: e.target.value
        }));
        console.log(editedDonatedItem);
    }
    
    // Updates Address Field upon user input
    function handleAddressChange(e) {
        setDonatedItem (() => ({
            ...editedDonatedItem,
            ['pickup_location']: e.target.value
        }));
    }

    // Updates Transport Requirements Field upon user input
    function handleTransportChange(e) {
        setDonatedItem (() => ({
            ...editedDonatedItem,
            ['transport_reqs']: e.target.value
        }));
    }

    // Updates the pick-up by date upon user input
    function handleDateChange(e) {
        setDonatedItem (() => ({
            ...editedDonatedItem,
            ['pickup_date']: e.toISOString().substring(0, 10)
        }));
    }

    // Updates the start time upon user input
    function handleTimeChange1(e) {
        setStartTime(e)
        console.log(e.toISOString());
        
        setDonatedItem (() => ({
            ...editedDonatedItem,
            ['start_time']: e.toISOString().substring(11, 23)
            
        }));
    }

    // Updates the end time upon user input
    function handleTimeChange2(e) {
        setStartTime1(e)
   
        setDonatedItem (() => ({
            ...editedDonatedItem,
            ['end_time']: e.toISOString().substring(11, 23)
        }));
    }

    // function updateDonatedItem(url) {
    //     setDonatedItem (() => ({
    //         ...editedDonatedItem,
    //         ['picture']:url
    //     }));
    //     console.log(editedDonatedItem);
    // }

    // Creates a new FOODITEM and adds it to the database
    /**async function addDonation() {
        console.log("add donation worked");
        if (file) {
            const { type: mimeType } = file
            try {
                
                await Storage.put(key, file, {
                contentType: mimeType
                })
                const newFoodItem = await API.graphql({query:mutations.createFOODITEM, variables:{input:editedDonatedItem}});
                console.log(newFoodItem);
            } catch (err) {
                console.log('error: ', err)
            }
        }
      }
      **/
     async function addDonation(){
        
        try {
            const newFoodItem = await API.graphql({query:mutations.createFOODITEM, variables:{input:editedDonatedItem}});
            console.log(newFoodItem);
        } catch (err) {
            console.log('error: ', err)
        }
        window.location="/orders";
     }

    const [file, updateFile] = useState(null)
    const [image, setImage]= useState(undefined);
    const [key, setKey] = useState(null);
    const [url, setURL] = useState(null);
    let num_images=0;

    function handleChange(event) {
        // if (num_images==1){
        //     return
        // }
        //Saves image details in preparation for upload to AWS S3
        
        /*TEMP COMMENT: AVOID IMAGE UPLOAD
        *const { target: { value, files } } = event
        const fileForUpload = files[0]
        updateFile(fileForUpload || value)

        const extension = fileForUpload.name.split(".")[1]
        const { type: mimeType } = fileForUpload
        const key1 = `images/${uuid()}.${extension}`      
        const url1 = `https://${bucket}.s3.${region}.amazonaws.com/public/${key1}`

        setKey(key1);
        setURL(url1);
END OF TEMP COMMENT**/
        let url1="empty_image"
        setDonatedItem (() => ({
            ...editedDonatedItem,
            ['picture']:url1
        }));
        console.log(editedDonatedItem);


        //Makes image preview visible
        let image_placement=document.getElementById("uploaded_image_"+num_images);
        image_placement.src= URL.createObjectURL(event.target.files[0]);
        image_placement.classList.add("make_image_visible");
        num_images=num_images+1;
    }

  

    // Functions for navigation buttons

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
    function back1() {
        document.getElementById("first-donation").style.display = "initial"
        document.getElementById("second-donation").style.display = "none"
    }
    
    function next2(){
        updateDonationPreview();
        document.getElementById("second-donation").style.display="none";
        document.getElementById("third-donation").style.display="block";
        
        let individual_product=document.getElementById("individual_product_page");
        individual_product.querySelector("#display_image").src=editedDonatedItem.picture;
       

        let productTransportRequirements=editedDonatedItem.transport_reqs;
        if (productTransportRequirements==""){
            productTransportRequirements="No requirements listed by donor."
        }
    
    
        individual_product.querySelector("#display_image").src=editedDonatedItem.picture;
        individual_product.querySelector("#individual_product_title").innerHTML=editedDonatedItem.title;
        individual_product.querySelector("#individual_product_description").innerHTML=editedDonatedItem.description;
        individual_product.querySelector("#individual_product_location").innerHTML=editedDonatedItem.pickup_location;
        individual_product.querySelector("#individual_product_pickupby").innerHTML=editedDonatedItem.pickup_date;
        individual_product.querySelector("#individual_product_pickuptime").innerHTML=editedDonatedItem.start_time+"-"+editedDonatedItem.end_time;
        individual_product.querySelector("#individual_product_transport_requirements").innerHTML=productTransportRequirements;
        individual_product.querySelector("#individual_product_seller_name").innerHTML=editedDonatedItem.donorName;
        individual_product.querySelector("#individual_product_seller_number").innerHTML=editedDonatedItem.donorPhone;
        individual_product.querySelector("#clickable_phone_number").href="tel:"+editedDonatedItem.donorPhone;
      
    }

    function back2(){
        document.getElementById("second-donation").style.display="block";
        document.getElementById("third-donation").style.display="none";
    }
    return (
        <div id="donation_page">
             <link rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css" />
             
            <div id="first-donation">
                <div className="top-row">
        
               
                <h1 className="donation-heading">What kind of food do you want to donate?</h1>
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

            <div id="second-donation">
                <div className="top-row">
             
                <h1 className="donation-heading">Food Donation Details</h1>
                </div>
                <div className="middle-row">
                    <div className="form-container">
                        <form>
                            <div className="form-row">
                                <label htmlFor="description" className="description-label"> Food Item(s)</label><br></br>
                                <input id="title_input_box" type="text" className="description-input" name="text" onChange={handleTitleChange}></input>
                            </div> 
                            
                            
                            <div className="form-row">
                                <label htmlFor="quantity" className="quantity-label description-label">Quantity/Volume of Food</label><br></br>
                                <input id="quantity_input_box" type="text" className="description-input" name="text" onChange={handleQuantityChange}></input>
                            </div> 
                            
                            <div className="form-row">
                                <label htmlFor="description" className="description-label">Food Description</label><br></br>
                                <textarea id="food-description-input" type="text" className="description-input" name="text" onChange={handleDescriptionChange}></textarea>
                                
                            </div> 
                            <div className="form-row">
                                <label htmlFor="description" className="description-label">Transport Requirements</label><br></br>
                                <textarea id="food-requirements-input" type="text" className="description-input" name="text" onChange={handleTransportChange}></textarea>
                                
                            </div> 
                            

                            <div className="form-row upload-image">
                                <div className="description-label"> Images </div>
                                <label htmlFor="image" className="images description-label">
                                    
                                    <div id="image_box_0" className="image_box">
                                        <img id="uploaded_image_0" className="uploaded_image" src="data:,"></img>
                                        <input type='file' className="image_upload_button"  name='image' accept="image/png, image/gif, image/jpeg" onChange={handleChange}></input>
                                        
                                        <img id="image_display" src={Camera} alt="camera"/>
                                        
                                        <div className="delete_image">x</div>
                                    
                                    </div>
                                    
                                </label>
                            </div>
                           
                            
                            <div className="form-row">
                                <label htmlFor="description" className="description-label">Pick-up Location</label><br></br>
                                <input id="pick-up_location_box" type="text" className="description-input" name="text" placeholder={attributes['custom:address']} onChange={handleAddressChange}></input>
                            </div> 
                            

                            <div id="dates-input">
                                <label htmlFor="description" className="description-label">Pick-up By:</label><br></br>
                                <DatePicker
                                    id="pick-up_by_input"
                                    selected={startDate}
                                    onSelect={(date) => setStartDate(date)} //when day is clicked
                                    onChange={handleDateChange} //only when value has changed
                                    dateFormat="dd/MM/yy"
                                    allowSameDay={true}
                                    required={true}
                                />

                            </div>

                            <div id="pick-up-input">
                            <label htmlFor="description" className="description-label">Pick-up Times</label><br></br>
                            <div className="timePicker">
                                <div>
                                <text>Start </text>
                            <TimePicker
                                id="start_time_input"
                                selected={startTime}
                                onChange={handleTimeChange1}
                                showTimeSelect
                                showTimeSelectOnly
                                popperPlacement="top-end"
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                onFocus={e => e.target.blur()}
                            />
                            </div>
                            <div>
                            <text>End </text>
                            <TimePicker
                                id="end_time_input"
                                selected={endTime}
                                onChange={handleTimeChange2}
                                showTimeSelect
                                showTimeSelectOnly
                                popperPlacement="top-end"
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                               
                                onFocus={e => e.target.blur()}
                            />
                            </div>
                            </div>
                            </div>
                           
                        </form>
                    </div>
                </div>
                <div className="bottom-row">
                <label className="back-button" onClick={back1}>Back</label>
                 <button className="next-button" onClick={next2} >Preview</button>
                </div>
            </div>

            <div id="third-donation">
                <div className="top-row donation-heading"><h1>Donation Preview</h1></div>
                <div className="middle-row">
                    <IndividualProduct/>
                </div>
                <div className="bottom-row">
                    <label className="back-button" onClick={back2}>Back</label>
                    <button className="next-button" onClick={addDonation} >Submit</button>
                </div>

            </div>
        </div>

       
    );
}

export default EditDonation;