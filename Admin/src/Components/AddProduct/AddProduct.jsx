import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'



const AddProduct = () => {
// writing logic so that whenever we select an image to upload it should be visible in the deop box
const[image, setImage] = useState(false);

const imageHandler = (e) =>{
    setImage(e.target.files[0])
}
// writing logic for fetching the data
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })
    const changeHandler = (e) => {
      setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    
 // writing logic for adding data via button
 
    const Add_Product = async ()=>{
        console.log(productDetails)
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product',image);
        await fetch('https://e-commer-3lbn.onrender.com/upload',{
            method:'POST',
            headers:{
                Accept:'appliction/json',
            },
            body:formData,
        }).then((resp)=>resp.json()).then((Data)=>{responseData = Data})
         

        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch('https://e-commer-3lbn.onrender.com/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            })
        }
    }




    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here ' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="kid">Kid</option>
                    <option value="men">Men</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' />
                </label>
                <input onClick={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct
