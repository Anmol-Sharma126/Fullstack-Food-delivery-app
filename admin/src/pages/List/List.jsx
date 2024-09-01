import { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"
export const List = ({url}) => {
  //creating state variable to store all data
  const [list,setList]=useState([]);

  const fetchList=async()=>{
    const response=await axios.get(`${url}/api/food/list`);
    
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }
  //api call to remove food item
  const removeFood=async(foodId)=>{
    const response=await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success("Food item removed")
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])
  return (

    <div className='list and flex-col'>
      <p>All Foods list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b> 
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
        <div key={index} className='list-table-format'>
          <img src={`${url}/images/`+item.image} alt="" />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>${item.price}</p>
          <p onClick={()=>removeFood(item._id)}className='cursor'>X</p>
        </div>
        )})}
      </div>
    </div>
  )
}
