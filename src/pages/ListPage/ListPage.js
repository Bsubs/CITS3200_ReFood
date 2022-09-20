import React from 'react'
import { Products } from './products';
import contents from './content';
import './ListPage.css'
function ListPage() {
  return (
    
    <div className="product_list">
              {contents.map(contents => (
                  <Products 
                      key={contents.id}
                      image={contents.image}
                      name={contents.name}
                      type={contents.type}
                      location={contents.location}
                  />
              ))}
    </div>
  
  )
}

export default ListPage