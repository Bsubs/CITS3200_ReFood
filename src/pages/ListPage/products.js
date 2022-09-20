import React, { Component }  from 'react';
import "./products.css"; 

export function Products(props) {
    return(
        
        <div key={props.id} className='productCard'>
            <div className="image_box">
                <img src={props.image} alt='product-img' className='productImage'></img>
            </div>
           

            <div className='product_content'>
                <h3 className='productName'>{props.name}</h3>
                <div className='displayStack__1'>
                    <div className='productLocation'>Location: {props.location}</div>
                    <div className='productType'>{props.type}</div>
                </div>
            </div>
        </div>
        
    )
}