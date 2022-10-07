import React from 'react';

export default function SingleProduct(props) {
  return (
    <div id="single_products_component" key={props.id} className='singleProductCard'>
      <div className='single_row'>
        <div>Test different Contact details by ID {props.id}</div>
        <button>Chat now</button>
      </div>
    </div>
  )
}