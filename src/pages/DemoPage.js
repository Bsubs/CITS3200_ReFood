import React, { useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { type } from '@testing-library/user-event/dist/type';
import { Storage, API, graphqlOperation } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import { withAuthenticator } from '@aws-amplify/ui-react'
import * as mutations from '../graphql/mutations';
import { listFOODITEMS } from '../graphql/queries';
import * as queries from '../graphql/queries';

function DemoPage(props) {
  const [products, updateProducts] = useState([])

  // async function listProducts() {
  //   const products = await API.graphql(graphqlOperation(listFOODITEMS))
  //   updateProducts(products.data.listFOODITEMS.data)
  // }

  // useEffect(() => {
  //   listProducts()
  //   console.log(products)
  // }, [])

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
      <div>
        {/* {
          products.map((p, i) => (
            <img
              key={i}
              src={p.picture}
            />
          ))
      } */}
      </div>
  );
}

export default DemoPage;