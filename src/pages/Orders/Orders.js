import React, { useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { withAuthenticator } from '@aws-amplify/ui-react';
import * as mutations from '../../graphql/mutations';
import { listFOODITEMS } from '../../graphql/queries';
import * as queries from '../../graphql/queries';
import './Orders.css';
import Logo from "../../assets/images/logo.png";

import {Products} from '../ListPage/products';

function Orders(props) {
    var order_header;


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

    useEffect(()=>{
        let product_images=document.getElementsByClassName("productImage");
        for (let i=0;i<product_images.length;i++){
          product_images[i].addEventListener("error",defaultImageReplace);
        }
      });

   

    
    if (props.isNFP=="True"){
        order_header="My Orders"
    }
    else{
        order_header="My Donations"
    }
    var uncompleted_orders=foodItems.filter(content => content.isCompleted!="True");
    var completed_orders=foodItems.filter(content => content.isCompleted=="True");


    

    function defaultImageReplace(){
        this.src=Logo;
      }

    return (
        <div id="orders_page">
           
            <div id="orders_list">
                <div id="uncompleted_orders_list">
                    <div id="in_progress_orders_header" className="order_type">In Progress</div>
                    {uncompleted_orders.map(contents => (
                        <Products
                        key={contents.id}
                        image={contents.picture}
                        description={contents.description}
                        quantity={contents.quantity}
                        pickup_date={contents.pickup_date}
                        title={contents.title}
                        type={contents.type}
                        startTime={contents.start_time}
                        endTime={contents.end_time}
                        location={contents.pickup_location}
                        donorName={contents.donorName}
                        donorPhone={contents.donorPhone}
                        donorID={contents.donorID}
                        transportReqs={contents.transport_reqs}
                        />
                    ))}
                </div>
                <div id="completed_orders_list">
                <div id="completed_orders_header" className="order_type">Completed</div>
                    {completed_orders.map(contents => (
                        <Products
                            key={contents.id}
                            image={contents.image}
                            description={contents.description}
                            quantity={contents.quantity}
                            pickupDate={contents.pickupDate}
                            name={contents.name}
                            type={contents.type}
                            location={contents.location}
                            isCompleted={contents.isCompleted}
                        />
                    ))}
              </div>

            </div>
           
        </div>
    );
}

export default Orders;