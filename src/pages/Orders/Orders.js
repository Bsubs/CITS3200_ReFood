import React, { useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { ComponentPropsToStylePropsMap, withAuthenticator } from '@aws-amplify/ui-react';
import * as mutations from '../../graphql/mutations';
import { listFOODITEMS } from '../../graphql/queries';
import * as queries from '../../graphql/queries';
import './Orders.css';
import Logo from "../../assets/images/logo.png";
import IndividualProduct from '../IndividualProduct/IndividualProduct';
import EditDonation from '../EditDonation/EditDonation';

import {Products} from '../ListPage/products';

function Orders(props) {
  
    var order_header;
    var donation_button_text;

    var individual_product;
    var exit_button;
    var orders_list;
    var edit_donation_modal;





    //The attributes object stores the user attributes retrived from the AWS Cognito Database
    const [attributes, setAttributes] = useState({});

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

     // Array to store FoodItems
     const[foodItems, setFoodItems] = useState([]);

     // Fetches donations from database
     const fetchDonations = async() => {
      let userID= await props.userInfo.sub;
      let filter= {
        donorID: {
            eq: userID
        }   
    }

    if (userID!=undefined){

 
      try{
          const allDonations = await API.graphql({query:queries.listFOODITEMS, variables:{filter: filter}});
          const itemList = allDonations.data.listFOODITEMS.items;
          setFoodItems(itemList);
        
          
      } catch (error) {
          console.log('error in fetching FoodItems', error);
      }
    }
  
    };
  
    useEffect(() => {
        
      fetchDonations();
    }, [props.userInfo]);

    useEffect(()=>{
     
        exit_button=document.getElementById("exit_modal");
        edit_donation_modal=document.getElementById("edit_donation_modal");
        orders_list=document.getElementById("orders_list");
        
  
      
        exit_button.addEventListener("click",hideModals);
        let product_images=document.getElementsByClassName("productImage");
        for (let i=0;i<product_images.length;i++){
          product_images[i].addEventListener("error",defaultImageReplace);
        }
  
        let individual_product_modal_image=document.getElementById("display_image");
    individual_product_modal_image.addEventListener("error",defaultImageReplace);
      });

      useEffect(() => {
        
        document.getElementById("claim_donation_button").addEventListener("click",showEditDonation)
      },[]);

      useEffect(() => {
        
        document.getElementById("remove_donation_button").addEventListener("click",markDonationAsCompleted)
      },[]);

      useEffect(() => {
        let products=document.getElementsByClassName("products_component");
  
          for (let i=0;i<products.length;i++){
            products[i].addEventListener("click",openIndividualProductModal);
           
          }
      });
   
   
    
    if (props.isNFP=="True"){
        order_header="My Orders";
        donation_button_text="Claim Donation";
    }
    else{
        order_header="My Donations";
        donation_button_text="Edit Donation";
    }
    var uncompleted_orders=foodItems.filter(content => content.isCompleted!=true);
    var completed_orders=foodItems.filter(content => content.isCompleted==true);


    
    //Replace faulty images with ReFood Logo
    function defaultImageReplace(){
        this.src=Logo;
      }

   

      const [startDate, setStartDate] = useState(null);
      const [startTime, setStartTime] = useState(null);
    const [endTime, setStartTime1] = useState(null);

    // The completedDonatedItem object that stores the information which will be posted to the database
    const completedDonatedItem ={
      id:"",
      //_version: "",
      isCompleted:true,
      
  };

  // The completedDonatedItem object that stores the information which will be posted to the database
  const editedDonatedItem ={
    id:"",
    //_version: "",
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
};


 
    
    async function markDonationAsCompleted(){
      individual_product= document.getElementById("individual_product_modal");
      //let donation_version=parseInt(individual_product.querySelector("._version").innerHTML);
      let donation_id=individual_product.querySelector(".donationID").innerHTML;

      completedDonatedItem.id=donation_id;
      //completedDonatedItem._version=donation_version;

      console.log(completedDonatedItem);

      
      try {
        const updatedFoodItem = await API.graphql({query:mutations.updateFOODITEM, variables:{input:completedDonatedItem}});
        
    } catch (err) {
        console.log('error: ', err)
    }
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
      individual_product.querySelector("#claim_donation_button").innerHTML=donation_button_text;
  
      individual_product.querySelector("#individual_product_quantity").innerHTML=donationInfo.quantity;

      showIndividualProduct();

      //Remove edit donation/remove donation buttons on completed orders.
      if (this.parentElement.id=="completed_orders_list"){
        individual_product.querySelector("#claim_donation_button").style.display="none";
        individual_product.querySelector("#remove_donation_button").style.display="none";
      }
      else{
        individual_product.querySelector("#claim_donation_button").style.display="block";
        individual_product.querySelector("#remove_donation_button").style.display="block";
      }
      
     
      }

      function showIndividualProduct(){
        exit_button.style.display="flex";
        individual_product.style.display="block";
        orders_list.style.display="none";
        edit_donation_modal.style.display="none";
      }

      function hideModals(){
        individual_product= document.getElementById("individual_product_modal");
        exit_button=document.getElementById("exit_modal");
        orders_list=document.getElementById("orders_list");
        edit_donation_modal=document.getElementById("edit_donation_modal");

        edit_donation_modal.style.display="none";
        individual_product.style.display="none";
        orders_list.style.display="block";
        exit_button.style.display="none";
      }

      function showEditDonation(){
        
        individual_product= document.getElementById("individual_product_modal");
        exit_button=document.getElementById("exit_modal");
        orders_list=document.getElementById("orders_list");
        edit_donation_modal=document.getElementById("edit_donation_modal");

      
        updateHiddenVariables(getDonationInfo(individual_product),document.getElementById("edit_donation_hidden"));
        let food_categories=edit_donation_modal.querySelectorAll(".food_category");
        let currently_selected_category=individual_product.querySelector(".category").innerHTML;

        for (let i=0; i<food_categories.length;i++){
       
          if (food_categories[i].innerHTML.substring(0,4)==currently_selected_category.substring(0,4)){
            food_categories[i].classList.add("selected");
            document.querySelector(".next-button").classList.add("selected");
          }
          else{
            if (food_categories[i].classList.remove("selected"));
          }
        }

        let donationInfo=getDonationInfo(this.parentElement);
     
        

        edit_donation_modal.querySelector("#title_input_box").value=donationInfo.title;
        edit_donation_modal.querySelector("#quantity_input_box").value=donationInfo.quantity;
        edit_donation_modal.querySelector("#food-description-input").value=donationInfo.description;
        edit_donation_modal.querySelector("#display_image").src=donationInfo.picture;
  
        edit_donation_modal.querySelector("#food-requirements-input").value=donationInfo.transport_reqs;
        edit_donation_modal.querySelector("#pick-up_location_box").value=donationInfo.pickup_location;

        edit_donation_modal.querySelector("#uploaded_image_0").src=donationInfo.picture;


       

       
        exit_button.style.display="flex";
        individual_product.style.display="none";
        orders_list.style.display="none";
        edit_donation_modal.style.display="block";



        let image_placement=document.getElementById("uploaded_image_0");
        if (image_placement.src!="no_image" | image_placement.src!=undefined){
          image_placement.classList.add("make_image_visible");
      }
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

    function updateDonationPreview(){
      editedDonatedItem.id=individual_product.querySelector(".donationID").innerHTML;
      //=individual_product.querySelector("._version").innerHTML;
      editedDonatedItem.title=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
      editedDonatedItem.pickup_date=edit_donation_modal.querySelector("#pick-up_by_input").value.toISOString.substring(0,10);
      editedDonatedItem.category=individual_product.querySelector(".donationID").innerHTML;
      let food_categories=edit_donation_modal.querySelectorAll(".food_category");
      let currently_selected_category;
      for (let i=0; i<food_categories.length;i++){

        if (food_categories[i].classList.contains("selected")){
          currently_selected_category=food_categories[i].value;
        }
  
      }

      editedDonatedItem.transport_reqs=edit_donation_modal.querySelector("#food-requirements-input").innerHTML;
      editedDonatedItem.donorID=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
      editedDonatedItem.nfpID=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
      editedDonatedItem.pickup_location=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
      editedDonatedItem.quantity=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
      editedDonatedItem.description=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
      editedDonatedItem.picture=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
      editedDonatedItem.isCompleted=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
      editedDonatedItem.start_time=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
      editedDonatedItem.end_time=edit_donation_modal.querySelector("#individual_product_title").innerHTML;
      editedDonatedItem.donorName=edit_donation_modal.querySelector("#individual_product_title").innerHTML;

    }
    
    return (
        <div id="orders_page">
            <div id="individual_product_modal">
           
                <IndividualProduct/>
            </div>
            <div id="edit_donation_modal"><EditDonation userInfo={props.userInfo}/></div>
            <div id="exit_modal"><div>x</div></div>
            <div id="orders_list">
                <div id="uncompleted_orders_list">
                    <div id="in_progress_orders_header" className="order_type">In Progress</div>
                    {uncompleted_orders.map((contents,index) => (
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
                        //_version={contents._version}

                        
                        />
                    ))}
                </div>
                <div id="completed_orders_list">
                <div id="completed_orders_header" className="order_type">Completed</div>
                    {completed_orders.map(contents => (
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
                        //_version={contents._version}
                        />
                    ))}
              </div>

            </div>
           
        </div>
    );
}

export default Orders;