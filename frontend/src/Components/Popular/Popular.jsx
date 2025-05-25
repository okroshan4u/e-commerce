import React, { useEffect } from 'react'
import './Popular.css'
// import data_product from '../Assets/data'
import Item from '../Item/item'
import { useState } from 'react'


const Popular = () => {

  const [populaProducts,setPopularProducts] = useState([]);

  useEffect(()=>{
    // fetch('https://e-commer-3lbn.onrender.com/popularinwomen')
     fetch(`${process.env.REACT_APP_API_URL}/popularinwomen`)
    .then((response)=>response.json())
    .then((data)=>setPopularProducts(data))
  },[])


  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {populaProducts.map((item, i)=>{
            return  <Item key={i} id={item.id}  name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default Popular
