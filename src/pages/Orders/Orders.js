import React from 'react';
import './Orders.css';
import contents from './content';
import {Products} from '../ListPage/products';

function Orders(props) {
    if (props.isNFP=="True"){
        var order_header="My Orders"
    }
    else{
        var order_header="My Donations"
    }
    return (
        <div id="orders_page">
            <div id="orders_header">{order_header}</div>
            <div id="orders_list">
            {contents.map(contents => (
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
    );
}

export default Orders;