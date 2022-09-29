import React from 'react';
import './Orders.css';
import contents from './content';
import {Products} from '../ListPage/products';

function Orders(props) {
    var order_header;
    if (props.isNFP=="True"){
        order_header="My Orders"
    }
    else{
        order_header="My Donations"
    }
    var uncompleted_orders=contents.filter(content => content.isCompleted!="True");
    var completed_orders=contents.filter(content => content.isCompleted=="True");

    return (
        <div id="orders_page">
           
            <div id="orders_list">
                <div id="uncompleted_orders_list">
                    <div className="order_type">In Progress</div>
                    {uncompleted_orders.map(contents => (
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
                <div id="completed_orders_list">
                <div className="order_type">Completed</div>
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