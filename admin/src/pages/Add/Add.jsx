import './Add.css'
import {useState } from 'react';
import axios from "axios"
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
export const Add = ({url}) => {
  const[image,setImage]=useState(false);

  const[data,setData]=useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })

  const onChangeHandler=(event)=>{
    
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  //api call
  const onSubmitHandler=async(event)=>{
      event.preventDefault();
      const formData=new FormData();
      formData.append('name',data.name);
      formData.append('description',data.description);
      formData.append('price',Number(data.price));
      formData.append('category',data.category);
      formData.append('image',image);
      const response=await axios.post(`${url}/api/food/add`,formData);
      if(response.data.success){
        setData({
          name:"",
          description:"",
          price:"",
          category:"Salad"
        })
        setImage(false)
        toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);
      }
    
  }

  return (
    <div>
      <p>Add Items</p>
      <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className="add-img-upload flex col">
              <p>Upload Image</p>
              <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPYAAACUCAMAAACX8CSrAAAATlBMVEX////6+vr19fXExMTs7Ozv7++2trbNzc25ubng4ODT09Pm5uZxcXF3d3d0dHS+vr6SkpKMjIyurq59fX2dnZ2oqKiDg4NqamplZWXa2tqLlBRYAAAC7ElEQVR4nOWdy27rMAxESdmOX/Ej8iP1///oVZAaaHd3YWganFkU3YUDk/SIGsm2FIZDWOxRq4PIj/CwMqiDEKCyolfHkB9e2J1Y23d7Emk/rSfWds9saT01yQci7cGaVh1EfnjDrO3S5k4dQ36EmVnbI/Jp+6yOQIWV+LRX6lKEWNthtcrVQQhQWTzUMeRHiAYdISLlykAdMxyVOgYBDuqYASpXjlIdhACHBaJcCTYSk3ykvreRC8+NWtvIp71SW9oMdDP4Qx2BChuxtjemJh+pTiXomGEibvRO1BEidLrSEmu7pe6KQJMcKVfuVKttILa0YDtTnEJHiEg3w2zE13YivQHdDL4xR4h35JjBH1RNfiOOGW5MTT4yVdpOtex0QBOHd0JNrlv7hUXX0kKcVYmW5IoqyT3u8yx63q5r41vsim6XaaUvTZLH1erJjlHy4+FLtRRJq/x6cmsljzsMFmXi9EVbA48Cp1LomoQ37e7WNFP+pqpwKpVxquv6O8nTf/kj8FUgV8rmPZo/k7zJTjvVtp72TUE7P/S0E/J3cj3t1Mnza3I9bckI8aTdFTLaCqfSSbv6HnAIarsXbPSetE8IarsQOJX0tCWHHf8A7UEwZtDT9k7Y0k7kF6eppQmSPNbtT+S3dqckzy9XwhRvP7Fl14kvp1L+MUOofiP7it+BG2BvIC072EsKoMffiGaGRJp474pHplNppJ4Vgdb2RPSTT0yn0p3qVEJadg6ribQ724m1vVNbGvVAFFGvBGqSQ5ciUBs9sbQTaeLxN4deyz7YQlyKLOoIVIB2cqhcgY4QkZ9T6a0GrsCspmpyaG0Tk9xra4lnPFvqnBwqV5Bff5vUEagATXLomGElelew17JD71SC1rbo2LoU4amOQAXoRi9UrkDHDMQ7lRx6p9LBTPKdOjmFfnvgsl0R/6A1TXnpCPFTmPvjJVf8IqjZ/DeSXInHZbTf1D+AvcfXn0vxEbzt9d6+lrf/fd5h+Qdw1xn8weW0kQAAAABJRU5ErkJggg=="} alt="" />
              </label>
              <input onChange={(e)=>setImage(e.target.files[0])} type="file"  id="image" hidden required/>
          </div>
          <div className="add-product-name flex col" >
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name} type="text"  name="name" required placeholder='Type here'/>
          </div>
          <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select onChange={onChangeHandler} name="category">
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product price</p>
              <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='₹100' />
            </div>
          </div>
          <button type='submit' className='add-btn'>Add</button>
        </form>
      </div>
    </div>
  )
}
