import React from 'react';

export default function SingleProduct(props) {
  return (
    <div id="single_products_component" className='singleProductCard'>
      <div className='single_row'>
        <div>Test different Contact details by ID {props.id}</div>
        <button>Chat now</button>
      </div>
    </div>
  )
}