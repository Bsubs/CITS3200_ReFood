import React, { Component }  from 'react';
import "./products.css"; 

export function Products(props) {
    return(
        <div className='productList'>
            <div key={props.id} className='productCard'>
                <img src={props.image} alt='product-img' className='productImage'></img>

                <div className='productCard__content'>
                    <h3 className='productName'>{props.name}</h3>
                    <div className='displayStack__1'>
                        <div className='productLocation'>where: {props.location}</div>
                        <div className='productType'>{props.type}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}