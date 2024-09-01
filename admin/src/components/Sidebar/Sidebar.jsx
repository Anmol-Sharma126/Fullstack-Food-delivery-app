import React from 'react' // eslint-disable-line no-unused-vars
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        <NavLink to='/add' className='sidebar-option'>
          <img src="" alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className='sidebar-option'>
          <img src="" alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/order' className='sidebar-option'>
          <img src="" alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}
