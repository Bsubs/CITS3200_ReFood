import React from 'react';

export default function SingleProduct(props) {
  return (
    <div id="single_products_component" key={props.id} className='singleProductCard'>

      <div className="multiple_image_box">
        <img src={props.image} alt='single-product-img' className='singleProductImage'></img>
      </div>


      <div className='single_product_content'>
        <div className='singleProductName'>{props.name}</div>
        <div className='singleProductDescription'>{props.description}</div>
        <div className="single_bottom_info">
          <div className="single_row">
            <div className='singleProductQuantity'>{props.quantity}</div>
            <div className="singleDateDescriptor">{props.pickupDescription}</div>
          </div>

          <div className="single_row">
            <div className='singleProductLocation'>{props.location}</div>
            <div className='singlePickupDate'>{props.pickupDate}</div>
          </div>

          <div className='single_row'>
            <div>Test different Contact details by ID {props.id}</div>
            <button>Chat now</button>
          </div>
        </div>
      </div>
    </div>
  )
}