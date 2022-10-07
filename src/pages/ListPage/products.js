import React, { Component, useEffect } from 'react';
import "./products.css";
import Check from "../../assets/icons/PNG/check.png"
import Hourglass from "../../assets/icons/PNG/hourglass.png"
import SingleProduct from "./SingleProduct";
export function Products(props) {
    if (props.isCompleted == "True") {
        var isCompletedIcon = Check;
        var pickupDescription = "Picked-up On";
    }
    else {
        var isCompletedIcon = Hourglass;
        var pickupDescription = "Pick-up By";
    }
    useEffect(() => {
        document.getElementById("more_info").addEventListener("click", showInfo);
        document.getElementById("back").addEventListener("click", hideInfo);
    });

    function showInfo() {
        let moreInfo = document.getElementById("more_info_modal");

        let list_page = document.getElementById("products_component");

        moreInfo.style.display = "block"
        list_page.style.display = "none";
    }




    function hideInfo() {
        let moreInfo = document.getElementById("more_info_modal");

        moreInfo.style.display = "none";

        let list_page = document.getElementById("products_component");
        list_page.style.display = "block";
    }
    return (
        <>

            <div id="products_component" key={props.id} className='productCard'>
                <div className="isCompletedIcon">
                    <img src={isCompletedIcon} alt='product-img' className='productImage'></img>
                </div>
                <div className="image_box">
                    <img src={props.image} alt='product-img' className='productImage'></img>
                </div>



                <div className='product_content'>
                    <div className='productName'>{props.name}</div>
                    <div className='productDescription'>{props.description}</div>
                    <div className="bottom_info">
                        <div className="row">
                            <div className='productQuantity'>{props.quantity}</div>
                            <div className="dateDescriptor">{pickupDescription}</div>
                        </div>

                        <div className="row">
                            <div className='productLocation'>{props.location}</div>
                            <div className='pickupDate'>{props.pickupDate}</div>
                        </div>
                    </div>

                </div>

                <div id="more_info">
                    <button>More Info</button>
                </div>

            </div>

            <div id='more_info_modal' className='info_modal'>

                <div>
                    <button id='back'>Back</button>
                    <SingleProduct />
                </div>
            </div>



        </>

    )
}