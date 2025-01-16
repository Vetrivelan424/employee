import React from 'react'
import CustomerForm from '../CustomersModule/CustomerForm'
import { useNavigate,useLocation } from 'react-router-dom'
export default function CreateUser() {
    const navigate = useNavigate()
    const search = useLocation().search;
    const user_id = new URLSearchParams(search).get("user_id");
  
  return (
    <div className='m-4 '>
     
    <div className=''>
      <CustomerForm page={'add_customer'} />
    </div>
    </div>
  )
}
