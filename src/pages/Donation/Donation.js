import React, { useEffect, useState } from 'react';
import { Amplify, API, Auth, AWSCloudWatchProvider, graphqlOperation, Storage } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import { v4 as uuid } from 'uuid'
import * as mutations from '../../graphql/mutations';
import TimePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import config from '../../aws-exports';

//Image/icon Imports
import IndividualProduct from '../IndividualProduct/IndividualProduct';
import Logo from '../../../src/assets/images/logo.png'
import Camera from '../../assets/icons/PNG/camera.png'
import cancel from "../../assets/icons/PNG/close.png"

//Style sheet Imports
import './Donation.css';
import '../../App.css';

//Pop-up modal imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
  } = config

function Donation(props) {

    //The attributes object stores the user attributes retrived from the AWS Cognito Database
    const [attributes, setAttributes] = useState({});

    // Date and time objects for date and time pickers
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setStartTime1] = useState(null);

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
        end_time:endTime,
        donorName:"",
        donorPhone:""
        
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


      useEffect(()=>{
     
  
        let individual_product_modal_image=document.getElementById("display_image");
        individual_product_modal_image.addEventListener("error",defaultImageReplace);
      });

         //Replace faulty images with ReFood Logo
    function defaultImageReplace(){
        this.src=Logo;
      }

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
                ...donatedItem,
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
            ['pickup_location']: e.target.value
        }));
    }

    // Updates Transport Requirements Field upon user input
    function handleTransportChange(e) {
        setDonatedItem (() => ({
            ...donatedItem,
            ['transport_reqs']: e.target.value
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
        
        setDonatedItem (() => ({
            ...donatedItem,
            ['start_time']: e.toISOString()
            
        }));
    }

    // Updates the end time upon user input
    function handleTimeChange2(e) {
        setStartTime1(e)
   
        setDonatedItem (() => ({
            ...donatedItem,
            ['end_time']: e.toISOString()
        }));
    }

    
    //Used for pop-up modal
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

    // Creates a new FOODITEM and adds it to the database

    async function addDonation() {
        //If image uploaded, upload image with donation
        if (file) {
            const { type: mimeType } = file
            try {
                
                await Storage.put(key, file, {
                contentType: mimeType
                })
                const newFoodItem = await API.graphql({query:mutations.createFOODITEM, variables:{input:donatedItem}});
                handleOpen();
            } catch (err) {
                console.log('error: ', err)
            }
        }

        //In the case where no image is uploaded
        else {
            try {
                const newFoodItem = await API.graphql({query:mutations.createFOODITEM, variables:{input:donatedItem}});
                handleOpen();
            } catch (err) {
                console.log('error: ', err)
            }
        }
        
       
      }
      

    //Used for managing image upload
    const [file, updateFile] = useState(null)
    const [image, setImage]= useState(undefined);
    const [key, setKey] = useState(null);
    const [url, setURL] = useState(null);

    //can only upload one image in a given donation
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

        //url1 is the future link to the image once the donation is uploaded to the DB
        setKey(key1);
        setURL(url1);
        setDonatedItem (() => ({
            ...donatedItem,
            ['picture']:url1
        }));
        //Makes image preview visible
        let image_placement=document.getElementById("uploaded_image_"+num_images);
        image_placement.src= URL.createObjectURL(event.target.files[0]);
        image_placement.classList.add("make_image_visible");
        num_images=num_images+1;
    }

  

    // Functions for navigation buttons

    //Takes from food category page to food donation details page
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

    //Reverse of next1()
    function back1() {
        document.getElementById("first-donation").style.display = "initial"
        document.getElementById("second-donation").style.display = "none"
    }
    

    //Takes from food donation details to preview donation page
    function next2(){
    
        

        //Checks if all form fields are completed. If not, colours field titles red.
        if (checkFilledForms()==false){
            return
        }
        document.getElementById("second-donation").style.display="none";
        document.getElementById("third-donation").style.display="block";
        document.getElementById("remove_donation_button").style.display="none";

        
        //Updates preview modal with correct donation details
        updateIndividualProductModal();
    }


    //Reverse of next2()
    function back2(){
        document.getElementById("second-donation").style.display="block";
        document.getElementById("third-donation").style.display="none";
    }



    //Checks if all form fields of donation form are completed. If not, colours field titles red.
    function checkFilledForms(){
        let description_labels=document.querySelectorAll(".description-label");
        
        for (let i=0;i<description_labels.length;i++){
            if (description_labels[i].classList.contains("uncompleted")){
                description_labels[i].classList.remove("uncompleted");
            }
        }
        let isCompleted=true;
        for (var key in donatedItem) {
            
            if (donatedItem.hasOwnProperty(key)) {
            
                if (donatedItem[key]==undefined|donatedItem[key]==""){
                    
                    for (let i=0;i<description_labels.length;i++){
                        if (description_labels[i].classList.contains(key)){
                            description_labels[i].classList.add("uncompleted");
                            isCompleted=false;
                        }
                    }
                }
            }
        }
        return isCompleted;
    }


       //Updates preview modal with correct donation details
    function updateIndividualProductModal(){
        let individual_product=document.getElementById("individual_product_page");
        let edit_donation_modal=document.getElementById("uploaded_image_0");

        let productTransportRequirements=donatedItem.transport_reqs;
        if (productTransportRequirements==""){
            productTransportRequirements="No requirements listed by donor."
        }
        individual_product.querySelector("#display_image").src=edit_donation_modal.src;
        individual_product.querySelector("#individual_product_title").innerHTML=donatedItem.title;
        individual_product.querySelector("#individual_product_quantity").innerHTML=donatedItem.quantity;
        individual_product.querySelector("#individual_product_description").innerHTML=donatedItem.description;
        individual_product.querySelector("#individual_product_location").innerHTML=donatedItem.pickup_location;
        individual_product.querySelector("#individual_product_pickupby").innerHTML=donatedItem.pickup_date;
        individual_product.querySelector("#individual_product_pickuptime").innerHTML=donatedItem.start_time+"-"+donatedItem.end_time;
        individual_product.querySelector("#individual_product_transport_requirements").innerHTML=productTransportRequirements;
        individual_product.querySelector("#individual_product_seller_name").innerHTML=donatedItem.donorName;
        individual_product.querySelector("#individual_product_seller_number").innerHTML=donatedItem.donorPhone;
        individual_product.querySelector("#clickable_phone_number").href="tel:"+donatedItem.donorPhone;
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
                                Donation Successful
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Press ok to return to the orders page
                            </Typography>
                            <Button href="/orders">
                                Ok
                            </Button>
                        </Box>
                    </Modal>
                </div>
                <h1 className="donation-heading">Food Donation Details</h1>
                </div>
                <div className="middle-row">
                    <div className="form-container">
                        <form>
                            <div className="form-row">
                                <label htmlFor="description" className="description-label title"> Food Item(s)</label><br></br>
                                <input id="title_input_box" type="text"  name="text" onChange={handleTitleChange}></input>
                            </div> 
                            
                            
                            <div className="form-row">
                                <label htmlFor="quantity" className="quantity-label description-label quantity">Quantity/Volume of Food</label><br></br>
                                <input id="quantity_input_box" type="text"  name="text" onChange={handleQuantityChange}></input>
                            </div> 
                            
                            <div className="form-row">
                                <label htmlFor="description" className="description-label description">Food Description</label><br></br>
                                <textarea id="food-description-input" type="text"  name="text" onChange={handleDescriptionChange}></textarea>
                                
                            </div> 
                            <div className="form-row">
                                <label htmlFor="description" className="description-label transport_reqs">Transport Requirements</label><br></br>
                                <textarea id="food-requirements-input" type="text" name="text" onChange={handleTransportChange}></textarea>
                                
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
                                <input id="pick-up_location_box" type="text" name="text" value={attributes['custom:address']} onChange={handleAddressChange}></input>
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
                    <button className="next-button" onClick={addDonation} >Submit</button>
                </div>

            </div>
        </div>

       
    );
}

export default Donation;