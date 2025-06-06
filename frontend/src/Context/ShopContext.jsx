import React, { createContext, useEffect, useState } from "react";

// import all_product from "../Components/Assets/all_product";
export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}




const ShopContextPorvider = (props) => {
    const [all_product,setAll_Product] = useState([])

    const [cartItems, setCartItems] = useState(getDefaultCart())
    console.log(cartItems)

    useEffect(()=>{
         fetch(`${process.env.REACT_APP_API_URL}/allproducts`).then((response)=>response.json()).then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            // fetch(`${process.env.REACT_APP_API_URL}/getcart`)
            fetch(`${process.env.REACT_APP_API_URL}/getcart`,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    },[])


    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        if(localStorage.getItem('auth-token')){
             fetch(`${process.env.REACT_APP_API_URL}/addtocart`,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}), 
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }

    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        if(localStorage.getItem('auth-token')){
             fetch(`${process.env.REACT_APP_API_URL}/removefromcart`,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}), 
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }

    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {

            if(cartItems[item]>0){
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount;
    }
    const getTotalcartItems = () => {
      let totalItem = 0;
      for(const item in cartItems){
        if(cartItems[item]>0){
            totalItem+=cartItems[item];
        }
      }
      return totalItem;
    }
    

    const contextValue = {getTotalcartItems, getTotalAmount, all_product, cartItems, addToCart, removeFromCart };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextPorvider;