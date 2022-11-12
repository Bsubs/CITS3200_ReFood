import React, { useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import { Storage, API, graphqlOperation } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import { withAuthenticator } from '@aws-amplify/ui-react'
import * as mutations from '../../graphql/mutations';
import { listFOODITEMS } from '../../graphql/queries';
import * as queries from '../../graphql/queries';
import { Products } from './products';
import Logo1 from '../../assets/images/logo.png';
import Logo from "../../assets/images/logo.png";

import './ListPage.css';
import Search from "../../assets/icons/PNG/search.png";
import SearchPage from "../Explore/SearchPage";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import IndividualProduct from "../IndividualProduct/IndividualProduct";


function ListPage(props) {
  
  var search;
  var individual_product;
  var list_page;
  var exit_button;
  useEffect(()=>{
    

    document.getElementById("search_bar").addEventListener("click",showSearch);
    document.getElementById("exit_modal").addEventListener("click", hideModals);
    search=document.getElementById("search_modal");
    individual_product=document.getElementById("individual_product_modal");
    list_page=document.getElementById("list_page");
    exit_button=document.getElementById("exit_modal");


    /**
     * 
     */

    let products=document.getElementsByClassName("products_component");

    for (let i=0;i<products.length;i++){
      products[i].addEventListener("click",openIndividualProductModal);
    }


    let product_images=document.getElementsByClassName("productImage");
    for (let i=0;i<product_images.length;i++){
   
      product_images[i].addEventListener("error",defaultImageReplace);
    }
    let individual_product_modal_image=document.getElementById("display_image");
    individual_product_modal_image.addEventListener("error",defaultImageReplace);

  });


  useEffect(() => {
        
    document.getElementById("claim_donation_button").addEventListener("click",addToSaved)
  },[]);
  

  function showSearch(){
    search.style.display="block";
    individual_product.style.display="none";
    list_page.style.display="none";
    exit_button.style.display="flex";
    
  }

  //The fetch attributes function retrives the details of the current authenticated user and extracts the attributes field
  const fetchAttributes = async() => {
    try{
        const userData = await Auth.currentAuthenticatedUser();
        const attributesList = userData.attributes;
        document.getElementById("user_id").innerHTML=attributesList.sub;
    } catch (error) {
        console.log('error in fetching user data', error);
    }


};

//The fetch attribute function is called everytime the component is rendered. Retrives user details from Cognito
useEffect(() => {
    fetchAttributes();
  }, []);

  function addToSaved(){

    let donationInformation=getDonationInfo(this.parentElement.parentElement);

    
    let donationID=donationInformation.donationID;
    let nfpID=document.getElementById("user_id").innerHTML;
    
    console.log(donationID, nfpID);
    let favouriteRow={
      donationID:"",
      userID:""
    };
    favouriteRow.donationID=donationID;
    favouriteRow.userID=nfpID;
    console.log(favouriteRow);
    addDonation(favouriteRow);
  }
  


  // Adds favourite item to database

  async function addDonation(favouriteItem) {
      try {
          const newFavouriteItem = await API.graphql({query:mutations.createFavouritesTable, variables:{input:favouriteItem}});
          console.log(newFavouriteItem);
          console.log("add  favourites worked");
          handleOpen();
      } catch (err) {
          console.log('error: ', err)
      }
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

  //Makes individual_product modal visible
  function showIndividualProduct(){
    search.style.display="none";
    individual_product.style.display="block";
    list_page.style.display="none";
    exit_button.style.display="flex";
    document.getElementById("remove_donation_button").style.display="none";
   
  }

  //Replaces buggy images with ReFood logo
  function defaultImageReplace(){
    this.src=Logo;
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

  function updateHiddenVariables(donationInfo, itemToUpdate){
    let hiddenVariables=itemToUpdate.querySelector(".hidden");

    hiddenVariables.querySelector(".category").innerHTML=donationInfo.category;
    hiddenVariables.querySelector(".completionDate").innerHTML=donationInfo.completionDate;
    hiddenVariables.querySelector(".createdAt").innerHTML=donationInfo.createdAt;
    hiddenVariables.querySelector(".description").innerHTML=donationInfo.description;
    hiddenVariables.querySelector(".donorID").innerHTML=donationInfo.donorID;
    hiddenVariables.querySelector(".donorName").innerHTML=donationInfo.donorName;
    hiddenVariables.querySelector(".donorPhone").innerHTML=donationInfo.donorPhone;
    hiddenVariables.querySelector(".end_time").innerHTML=donationInfo.end_time;
    hiddenVariables.querySelector(".donationID").innerHTML=donationInfo.donationID;
    hiddenVariables.querySelector(".isCompleted").innerHTML=donationInfo.isCompleted;
    hiddenVariables.querySelector(".nfpID").innerHTML=donationInfo.nfpID;
    hiddenVariables.querySelector(".pickup_date").innerHTML=donationInfo.pickup_date;
    hiddenVariables.querySelector(".pickup_location").innerHTML=donationInfo.pickup_location;
    hiddenVariables.querySelector(".picture").innerHTML=donationInfo.picture;
    hiddenVariables.querySelector(".quantity").innerHTML=donationInfo.quantity;
    hiddenVariables.querySelector(".start_time").innerHTML=donationInfo.start_time;
    hiddenVariables.querySelector(".title").innerHTML=donationInfo.title;
    hiddenVariables.querySelector(".transport_reqs").innerHTML=donationInfo.transport_reqs;
    hiddenVariables.querySelector(".updatedAt").innerHTML=donationInfo.updatedAt;
    hiddenVariables.querySelector("._deleted").innerHTML=donationInfo._deleted;
    hiddenVariables.querySelector("._lastChangedAt").innerHTML=donationInfo._lastChangedAt;
    //hiddenVariables.querySelector("._version").innerHTML=donationInfo._version;



  }
  //triggered when clicking a product card
    //inserts product information into the individual product modal
    function openIndividualProductModal(){

      let donationInfo=getDonationInfo(this);
      let transport_reqs=donationInfo.transport_reqs;
      let donation_picture=donationInfo.picture;

      
      individual_product= document.getElementById("individual_product_modal");
      updateHiddenVariables(donationInfo,individual_product);
    
      let donation_id=this.querySelector(".donationID").innerHTML;


      exit_button=document.getElementById("exit_modal");
     

      if (transport_reqs==undefined){
        transport_reqs="No requirements listed by donor."
    }

    if (donation_picture==""){
      donation_picture=Logo;
    }
   

       //stylising individual modal
       individual_product.querySelector("#display_image").src=donation_picture;
       individual_product.querySelector("#individual_product_title").innerHTML=donationInfo.title;
       individual_product.querySelector("#individual_product_description").innerHTML=donationInfo.description;
       individual_product.querySelector("#individual_product_location").innerHTML=donationInfo.pickup_location;
       individual_product.querySelector("#individual_product_pickupby").innerHTML=donationInfo.pickup_date;
       individual_product.querySelector("#individual_product_pickuptime").innerHTML=donationInfo.start_time+"-"+donationInfo.end_time;
       individual_product.querySelector("#individual_product_transport_requirements").innerHTML=transport_reqs;
       individual_product.querySelector("#individual_product_seller_name").innerHTML=donationInfo.donorName;
       individual_product.querySelector("#individual_product_seller_number").innerHTML=donationInfo.donorPhone;
       individual_product.querySelector("#clickable_phone_number").href="tel:"+donationInfo.donorPhone;
       //individual_product.querySelector("#claim_donation_button").innerHTML=donation_button_text;
   
       individual_product.querySelector("#individual_product_quantity").innerHTML=donationInfo.quantity;
 

       individual_product.querySelector("#claim_donation_button").style.display="block";
        individual_product.querySelector("#remove_donation_button").style.display="none";
       showIndividualProduct();
    


    }

  function hideModals(){

    search.style.display="none";
    individual_product.style.display="none";
    list_page.style.display="block";
    exit_button.style.display="none";
  }

    // Array to store FoodItems
    const[foodItems, setFoodItems] = useState([]);

    // Fetches donations from database
    const fetchDonations = async() => {
     try{
         const allDonations = await API.graphql({query:queries.listFOODITEMS});
         const itemList = allDonations.data.listFOODITEMS.items;
         setFoodItems(itemList);
         console.log(itemList);

     } catch (error) {
         console.log('error in fetching FoodItems', error);
     }
     
 
   };
 
   useEffect(() => {
     fetchDonations();
   }, []);

  return (
    <>
  
    <div id="search_modal" className="modal">
      
       <SearchPage />
    </div>

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
                                Donation Saved Successfully
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                
                            </Typography>
                            <Button onClick={handleClose}>
                                Ok
                            </Button>
                        </Box>
                    </Modal>
                </div>

    
    <div id="individual_product_modal">
      <IndividualProduct/>
      
    </div>
    <div id="exit_modal"><div>x</div></div>
    <div id="list_page">
      
      <div id="search_bar">
        <img src={Search}></img>
        <input></input>
        
      </div>
      <div className="product_list">

              {foodItems.filter(content => content.isCompleted!=true).map(contents => (

                  <Products 
                  key={contents.id}
                  category={contents.category}
                  completionDate={contents.completionDate}
                  createdAt={contents.createdAt}
                  description={contents.description}
                  donorID={contents.donorID}
                  donorName={contents.donorName}
                  donorPhone={contents.donorPhone}
                  
                  donationID={contents.id}
                  isCompleted={contents.isCompleted}
                  nfpID={contents.nfpID}
                  pickup_date={contents.pickup_date}
                  pickup_location={contents.pickup_location}
                  picture={contents.picture}

                  
                  
                  quantity={contents.quantity}
                  end_time={(new Date(contents.end_time)).toLocaleTimeString('en-US',{hour: 'numeric', minute:'2-digit'})}
                  start_time={(new Date(contents.start_time)).toLocaleTimeString('en-US',{hour: 'numeric', minute:'2-digit'})}
                  
                  title={contents.title}
                  transport_reqs={contents.transport_reqs}
                  updatedAt={contents.updatedAt}
                  deleted={contents._deleted}
                  _lastChangedAt={contents._lastChangedAt}
                  />
                
              ))}
                
      </div>
  
    </div>
    <div id="user_id" className="hidden"></div>
    </>
  
  )
}

export default ListPage