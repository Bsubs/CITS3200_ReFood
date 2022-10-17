import React, { useEffect, useState } from 'react';
import { Amplify, API, Auth, AWSCloudWatchProvider, graphqlOperation, Storage } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import { v4 as uuid } from 'uuid'
import * as mutations from '../../graphql/mutations';
import TimePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import config from '../../aws-exports';
import IndividualProduct from '../IndividualProduct/IndividualProduct';

//Pop-up modal imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

//Style sheet Imports
import './EditDonation.css';
import '../../App.css';

//Image Imports
import Camera from '../../assets/icons/PNG/camera.png'
import cancel from "../../assets/icons/PNG/close.png"

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

    const editedDonatedItem1={
        id: "",
        title: "",
        pickup_date:startDate,
        category:"",
        transport_reqs:"",
        nfpID:"",
        pickup_location:"",
        quantity:"",
        description:"",
        picture:"",
        donorPhone:"",
        isCompleted:false,
        start_time:startTime,
        end_time:endTime,
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
         
        }
        for (let elem of document.getElementsByClassName("next-button")){
            if (!(getComputedStyle(elem).display ==="hidden")){
                elem.classList.add("selected"); 
            }
        }
    }

    // Updates Title Field upon user input
    function handleTitleChange(e) {
        let hiddenDonationInfo=document.getElementById("edit_donation_hidden");

        hiddenDonationInfo.querySelector(".title").innerHTML=e.target.value;
        //updateDonationInfo.querySelector(".title")=e.target.value;
       
    }

     // Updates Quantity Field upon user input
    function handleQuantityChange(e) {
        let hiddenDonationInfo=document.getElementById("edit_donation_hidden");

        hiddenDonationInfo.querySelector(".quantity").innerHTML=e.target.value;
    }

    // Updates Description Field upon user input
    function handleDescriptionChange(e) {
        let hiddenDonationInfo=document.getElementById("edit_donation_hidden");

        hiddenDonationInfo.querySelector(".description").innerHTML=e.target.value;
    }
    
    // Updates Address Field upon user input
    function handleAddressChange(e) {
        let hiddenDonationInfo=document.getElementById("edit_donation_hidden");

        hiddenDonationInfo.querySelector(".pickup_location").innerHTML=e.target.value;
    }

    // Updates Transport Requirements Field upon user input
    function handleTransportChange(e) {
        let hiddenDonationInfo=document.getElementById("edit_donation_hidden");

        hiddenDonationInfo.querySelector(".transport_reqs").innerHTML=e.target.value;
    }

    // Updates the pick-up by date upon user input
    function handleDateChange(e) {
        let hiddenDonationInfo=document.getElementById("edit_donation_hidden");

        hiddenDonationInfo.querySelector(".pickup_date").innerHTML=e.toISOString().substring(0, 10);
    }

    // Updates the start time upon user input
    function handleTimeChange1(e) {
        setStartTime(e)
        let hiddenDonationInfo=document.getElementById("edit_donation_hidden");

        hiddenDonationInfo.querySelector(".start_time").innerHTML=e.toISOString();
    }

    // Updates the end time upon user input
    function handleTimeChange2(e) {
        setStartTime1(e)
        let hiddenDonationInfo=document.getElementById("edit_donation_hidden");

        hiddenDonationInfo.querySelector(".end_time").innerHTML=e.toISOString();
    }


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

     async function editDonation(){
        
        if (file) {
            const { type: mimeType } = file
            try {
            
                await Storage.put(key, file, {
                    contentType: mimeType
                    })
                const editedFoodItem = await API.graphql({query:mutations.updateFOODITEM, variables:{input:editedDonatedItem1}});
                console.log("edit donation worked");
                handleOpen();
            } catch (err) {
                console.log('error: ', err)
            }
        }
        else{
            try {
                const editedFoodItem = await API.graphql({query:mutations.updateFOODITEM, variables:{input:editedDonatedItem1}});
                console.log("edit donation worked");
                handleOpen();
            } catch (err) {
                console.log('error: ', err)
            }
        }
        
        //window.location="/orders";
     }

    const [file, updateFile] = useState(null)
    const [image, setImage]= useState(undefined);
    const [key, setKey] = useState(null);
    const [url, setURL] = useState(null);
    let num_images=0;

    function handleChange(event) {
        if (num_images==1){
            return
        }
       //Saves image details in preparation for upload to AWS S3
    
    
       const { target: { value, files } } = event
       const fileForUpload = files[0]
       updateFile(fileForUpload || value)

       const extension = fileForUpload.name.split(".")[1]
       const { type: mimeType } = fileForUpload
       const key1 = `images/${uuid()}.${extension}`      
       const url1 = `https://${bucket}.s3.${region}.amazonaws.com/public/${key1}`

       setKey(key1);
       setURL(url1);

      
     
        


        let hiddenDonationInfo=document.getElementById("edit_donation_hidden");

        hiddenDonationInfo.querySelector(".picture").innerHTML=url1;
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
      
        updateDonatedItemAttributes();

        let description_labels=document.querySelectorAll(".description-label");
        console.log(description_labels);

        for (let i=0;i<description_labels.length;i++){
            if (description_labels[i].classList.contains("uncompleted")){
                description_labels[i].classList.remove("uncompleted");
            }
        }
        let isCompleted=true;
        console.log(editedDonatedItem1);
        for (var key in editedDonatedItem1) {
            
            if (editedDonatedItem1.hasOwnProperty(key)) {
            
                if (editedDonatedItem1[key]==undefined| editedDonatedItem1[key]==""){
                    console.log(key);
                    
                    for (let i=0;i<description_labels.length;i++){
                        if (description_labels[i].classList.contains(key)){
                            description_labels[i].classList.add("uncompleted");
                            isCompleted=false;
                        }
                    }
                }
            }
        }
        if (isCompleted==false){
            return
        }

      
        document.getElementById("second-donation").style.display="none";
        document.getElementById("third-donation").style.display="block";
        

        let individual_product=document.getElementById("edit_donation_modal").querySelector("#individual_product_page");
       
       

        let productTransportRequirements=editedDonatedItem1.transport_reqs;
        if (productTransportRequirements==""){
            productTransportRequirements="No requirements listed by donor."
        }

     
        individual_product.querySelector("#display_image").src=document.getElementById("edit_donation_modal").querySelector("#uploaded_image_0").src;
        individual_product.querySelector("#individual_product_title").innerHTML=editedDonatedItem1.title;
        individual_product.querySelector("#individual_product_description").innerHTML=editedDonatedItem1.description;
        individual_product.querySelector("#individual_product_location").innerHTML=editedDonatedItem1.pickup_location;
        individual_product.querySelector("#individual_product_pickupby").innerHTML=editedDonatedItem1.pickup_date;
        individual_product.querySelector("#individual_product_pickuptime").innerHTML=editedDonatedItem1.start_time+"-"+editedDonatedItem1.end_time;
        individual_product.querySelector("#individual_product_transport_requirements").innerHTML=productTransportRequirements;
        individual_product.querySelector("#individual_product_seller_name").innerHTML=editedDonatedItem1.donorName;
        individual_product.querySelector("#individual_product_seller_number").innerHTML=editedDonatedItem1.donorPhone;
        individual_product.querySelector("#clickable_phone_number").href="tel:"+editedDonatedItem1.donorPhone;
        
    }

    function getDonationInfo(info_containing_module){
        let currentInfoSkimmer=info_containing_module.querySelector(".hidden");
  
        
        const donationInfo={
          category:currentInfoSkimmer.querySelector(".category").innerHTML,
          completionDate:currentInfoSkimmer.querySelector(".completionDate").innerHTML,
          createdAt:currentInfoSkimmer.querySelector(".createdAt").innerHTML,
          description:currentInfoSkimmer.querySelector(".description").innerHTML,
          donorID:currentInfoSkimmer.querySelector(".donorID").innerHTML,
          donorName:currentInfoSkimmer.querySelector(".donorName").innerHTML,
          donorPhone:currentInfoSkimmer.querySelector(".donorPhone").innerHTML,
          end_time:currentInfoSkimmer.querySelector(".end_time").innerHTML,
          donationID:currentInfoSkimmer.querySelector(".donationID").innerHTML,
          isCompleted:currentInfoSkimmer.querySelector(".isCompleted").innerHTML,
          nfpID:currentInfoSkimmer.querySelector(".nfpID").innerHTML,
          pickup_date:currentInfoSkimmer.querySelector(".pickup_date").innerHTML,
          pickup_location:currentInfoSkimmer.querySelector(".pickup_location").innerHTML,
          picture:currentInfoSkimmer.querySelector(".picture").innerHTML,
  
          
          
          quantity:currentInfoSkimmer.querySelector(".quantity").innerHTML,
          start_time:currentInfoSkimmer.querySelector(".start_time").innerHTML,
          
          title:currentInfoSkimmer.querySelector(".title").innerHTML,
          transport_reqs:currentInfoSkimmer.querySelector(".transport_reqs").innerHTML,
          updatedAt:currentInfoSkimmer.querySelector(".updatedAt").innerHTML,
          deleted:currentInfoSkimmer.querySelector("._deleted").innerHTML,
          _lastChangedAt:currentInfoSkimmer.querySelector("._lastChangedAt").innerHTML,
          //_version:currentInfoSkimmer.querySelector("._version").innerHTML
        }
        
        return donationInfo;
      }
  

    function updateDonatedItemAttributes(){
        let editedDonationInfo=getDonationInfo(document.getElementById("edit_donation_hidden"));

        let edit_donation_modal=document.getElementById("edit_donation_modal");
       



        let food_categories=edit_donation_modal.querySelectorAll(".food_category");
        let currently_selected_category;
        for (let i=0; i<food_categories.length;i++){
          if (food_categories[i].classList.contains("selected")){
            currently_selected_category=food_categories[i].innerHTML;
           
          }
        }


        
        editedDonatedItem1.category=currently_selected_category;
        //editedDonatedItem1.completionDate=editedDonationInfo.completionDate;
        editedDonatedItem1.id=editedDonationInfo.donationID;

        //editedDonatedItem._version=individual_product.querySelector("._version").innerHTML;
        editedDonatedItem1.title=editedDonationInfo.title;

        
        let dateParts=edit_donation_modal.querySelector("#pick-up_by_input").value.split("/");
        
        let myDate= new Date("20"+dateParts[2],dateParts[1],dateParts[0]);
        if (myDate!="Invalid Date"){
            editedDonatedItem1.pickup_date=myDate.toISOString().substring(0,10);
        }
        else{
            editedDonatedItem1.pickup_date="";
        }
        

        
        
  
        editedDonatedItem1.transport_reqs=editedDonationInfo.transport_reqs;
        //editedDonatedItem1.donorID=props.userInfo.donorID;


        //editedDonatedItem1.nfpID="";
        editedDonatedItem1.pickup_location=editedDonationInfo.pickup_location;

        editedDonatedItem1.quantity=editedDonationInfo.quantity;

        editedDonatedItem1.description=editedDonationInfo.description;
        editedDonatedItem1.picture=editedDonationInfo.picture;
        editedDonatedItem1.isCompleted=editedDonationInfo.isCompleted;
        if (document.getElementById("start_time_input").value==""){
            editedDonatedItem1.start_time="";
        }
        else{
            editedDonatedItem1.start_time=editedDonationInfo.start_time;
        }
       
        if (document.getElementById("end_time_input").value==undefined){
            editedDonatedItem1.end_time="";
        }
        else{
            editedDonatedItem1.end_time=editedDonationInfo.end_time;
        }
  
        editedDonatedItem1.donorName=editedDonationInfo.donorName;
        editedDonatedItem1.donorPhone=editedDonationInfo.donorPhone;
   
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

                <Button id="open_completed_modal" onClick={handleOpen}>Open modal</Button>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Edit Donation Successful
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Press ok to return to the donations page
                            </Typography>
                            <Button href="/orders">
                                Ok
                            </Button>
                        </Box>
                    </Modal>
                </div>
             
                <h1 className="donation-heading">Edit Food Donation Details</h1>
                </div>
                <div className="middle-row">
                    <div className="form-container">
                        <form>
                            <div className="form-row">
                                <label htmlFor="description" className="description-label title"> Food Item(s)</label><br></br>
                                <input id="title_input_box" type="text" className="description-input" name="text" onChange={handleTitleChange}></input>
                            </div> 
                            
                            
                            <div className="form-row">
                                <label htmlFor="quantity" className="quantity-label description-label quantity">Quantity/Volume of Food</label><br></br>
                                <input id="quantity_input_box" type="text" className="description-input" name="text" onChange={handleQuantityChange}></input>
                            </div> 
                            
                            <div className="form-row">
                                <label htmlFor="description" className="description-label description">Food Description</label><br></br>
                                <textarea id="food-description-input" type="text" className="description-input" name="text" onChange={handleDescriptionChange}></textarea>
                                
                            </div> 
                            <div className="form-row">
                                <label htmlFor="description" className="description-label transport_reqs">Transport Requirements</label><br></br>
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
                                <label htmlFor="description" className="description-label pickup_location">Pick-up Location</label><br></br>
                                <input id="pick-up_location_box" type="text" className="description-input" name="text" placeholder={attributes['custom:address']} onChange={handleAddressChange}></input>
                            </div> 
                            

                            <div id="dates-input">
                                <label htmlFor="description" className="description-label pickup_date">Pick-up By:</label><br></br>
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
                            <label htmlFor="description" className="description-label start_time end_time">Pick-up Times</label><br></br>
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
                    <button className="next-button selected" onClick={editDonation} >Submit</button>
                </div>

            </div>

        <div id="edit_donation_hidden">
            <div className="hidden">
                <div className="category"></div>
                <div className="completionDate"></div>
                <div className="createdAt"></div>
                <div className="description"></div>
                <div className="donorID"></div>
                <div className="donorName"></div>
                <div className="donorPhone"></div>
                <div className="end_time"></div>
                <div className="donationID"></div>
                <div className="isCompleted"></div>
                <div className="nfpID"></div>
                <div className="pickup_date"></div>
                <div className="pickup_location"></div>
                <div className="picture"></div>
                <div className="quantity"></div>
                <div className="start_time"></div>
                <div className="title"></div>
                <div className="transport_reqs"></div>
                <div className="updatedAt"></div>
                <div className="_deleted"></div>
                <div className="_lastChangedAt"></div>
               
        </div>
        </div>
        </div>

       
    );
}

export default EditDonation;