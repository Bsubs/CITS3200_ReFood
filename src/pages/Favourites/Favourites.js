import React, { useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { ComponentPropsToStylePropsMap, withAuthenticator } from '@aws-amplify/ui-react';
import * as mutations from '../../graphql/mutations';
import { listFOODITEMS,listFavouritesTables} from '../../graphql/queries';
import * as queries from '../../graphql/queries';
import './Favourites.css';
import Logo from "../../assets/images/logo.png";
import IndividualProduct from '../IndividualProduct/IndividualProduct';
import EditDonation from '../EditDonation/EditDonation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import {Products} from '../ListPage/products';

function Favourites(props) {
  
    var order_header;
    var donation_button_text="Remove from favourites";

    var individual_product;
    var exit_button;
    var orders_list;

    //The attributes object stores the user attributes retrived from the AWS Cognito Database
    const [attributes, setAttributes] = useState({});

    //The fetch attributes function retrives the details of the current authenticated user and extracts the attributes field
    const fetchAttributes = async() => {
      try{
          const userData = await Auth.currentAuthenticatedUser();
          const attributesList = userData.attributes;
          setAttributes(attributesList);
          document.getElementById("user_id").innerHTML=attributesList.sub;
          
      
      } catch (error) {
          console.log('error in fetching user data', error);
      }


  };

    //The fetch attribute function is called everytime the component is rendered. Retrives user details from Cognito
    useEffect(() => {
      fetchAttributes();
    }, []);

     // Array to store FoodItems
     const[foodItems, setFoodItems] = useState([]);

     // Fetches donations from database
     const fetchFavouriteDonations = async() => {
      let userID= await props.userInfo.sub;
      let filter= {
        userID: {
            eq: userID
        }   
        }

        if (userID!=undefined){

    
          try{
              const allDonations = await API.graphql({query:queries.listFavouritesTables, variables:{filter: filter}});
              const itemList = allDonations.data.listFavouritesTables.items;
            
              console.log("Food items List:");
              console.log(itemList);

              fetchDonationListings(itemList);
              
              
          } catch (error) {
              console.log('error in fetching FoodItems', error);
          }
        }
  
    };

    const fetchDonationListings = async(favouriteList) =>{
        let favouriteIDs=[];
        for (let i=0; i<favouriteList.length;i++){
            favouriteIDs.push(favouriteList[i].donationID);

        }

        let uniqueFavouriteIDs=Array.from([...new Set(favouriteIDs)]);
        
        console.log(uniqueFavouriteIDs);
        let filter= {
            id: {
                in: uniqueFavouriteIDs
            }   
        }
        try{
            const allDonations = await API.graphql({query:queries.listFOODITEMS, variables:{filter:filter}});
            const itemList = allDonations.data.listFOODITEMS.items;
            setFoodItems(itemList);
            console.log(itemList);
   
        } catch (error) {
            console.log('error in fetching FoodItems', error);
        }
        
    }
    
  
    useEffect(() => {
        
      fetchFavouriteDonations();
    }, [props.userInfo]);

    useEffect(()=>{
     
        exit_button=document.getElementById("exit_modal");

        orders_list=document.getElementById("orders_list");
        
  
      
        exit_button.addEventListener("click",hideModals);
        let product_images=document.getElementsByClassName("productImage");
        for (let i=0;i<product_images.length;i++){
          product_images[i].addEventListener("error",defaultImageReplace);
        }

        let individual_product_modal_image=document.getElementById("display_image");
        individual_product_modal_image.addEventListener("error",defaultImageReplace);
  
        document.getElementById("claim_donation_button").style.display="none";
      });


      useEffect(() => {
        
        document.getElementById("remove_donation_button").addEventListener("click",removeFromFavourites);
      },[]);

      useEffect(() => {
        let products=document.getElementsByClassName("products_component");
  
          for (let i=0;i<products.length;i++){
            products[i].addEventListener("click",openIndividualProductModal);
           
          }
      });
   

      const removeFromFavourites = async() =>{
      
        let favouriteElementID=getDonationInfo(document.getElementById("individual_product_modal")).donationID;
    
        let userID=document.getElementById("user_id").innerHTML;
        console.log(document.getElementById("individual_product_modal"))
        console.log(favouriteElementID, userID);
        //console.log(donationInfo);


       
        let filter= {
            userID: {
                eq: userID
            },
            donationID: {
                eq: favouriteElementID
            } 
        }
        
        
        let IDsToDelete=[];

        try{
            const allDonations = await API.graphql({query:queries.listFavouritesTables, variables:{filter:filter}});
            const itemList = allDonations.data.listFavouritesTables.items;
            //console.log(itemList);
            console.log(itemList);
            for (let i=0;i<itemList.length;i++){
                IDsToDelete.push(itemList[i].id);
            }
            handleOpen();
        } catch (error) {
            console.log('error in fetching FoodItems', error);
        }
        console.log(IDsToDelete);


        for (let i=0;i<IDsToDelete.length;i++){
            filter= {
                id: IDsToDelete[i]
            }
           
            
            try{
                const allDonations = await API.graphql({query:mutations.deleteFavouritesTable, variables:{input:filter}});
                console.log("deletion successful")
       
                handleOpen();
            } catch (error) {
                console.log('error in fetching FoodItems', error);
            }
        }
        
        handleOpen();
    }
   
    
    
    var favourite_orders=foodItems.filter(content => content.isCompleted!=true);


    
    //Replace faulty images with ReFood Logo
    function defaultImageReplace(){
        this.src=Logo;
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
      orders_list=document.getElementById("orders_list");

    

      //let productStartTime=this.querySelector(".")
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
      individual_product.querySelector("#remove_donation_button").innerHTML=donation_button_text;
  
      individual_product.querySelector("#individual_product_quantity").innerHTML=donationInfo.quantity;

      showIndividualProduct();

     
     
      }

      function showIndividualProduct(){
        exit_button.style.display="flex";
        individual_product.style.display="block";
        orders_list.style.display="none";
    
      }

      function hideModals(){
        individual_product= document.getElementById("individual_product_modal");
        exit_button=document.getElementById("exit_modal");
        orders_list=document.getElementById("orders_list");
        individual_product.style.display="none";
        orders_list.style.display="block";
        exit_button.style.display="none";
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


    return (
        <div id="favourites_page">
            <div id="individual_product_modal">
                <IndividualProduct/>
                <div>
                  <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                  >
                      <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                              Removed item from favourites
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                              Press ok to return to favourites page
                          </Typography>
                          <Button href="/orders">
                              Ok
                          </Button>
                      </Box>
                  </Modal>
                </div>
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
                               Donation removed successfully
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Press ok to return to your saved donations                            
                                </Typography>
                            <Button href="/orders">
                                Ok
                            </Button>
                        </Box>
                    </Modal>
                </div>
           
            <div id="exit_modal"><div>x</div></div>
            <div id="orders_list">
                <div id="uncompleted_orders_list">
                    <div id="in_progress_orders_header" className="order_type">Favourites</div>
                    
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
                        end_time={contents.end_time}
                        donationID={contents.id}
                        isCompleted={contents.isCompleted}
                        nfpID={contents.nfpID}
                        pickup_date={contents.pickup_date}
                        pickup_location={contents.pickup_location}
                        picture={contents.picture}



                        quantity={contents.quantity}
                        start_time={contents.start_time}

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
        </div>
    );
}

export default Favourites;