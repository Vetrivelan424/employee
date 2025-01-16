import React, { useEffect, useState } from 'react';
import Loaders from './loaders/RedLoader';

function ModalBox(props) {
  const { setShowAddCustomer,setCustomerId,data,setshowModalBox } = props;

  const [loader,setLoader] =useState(false);
 
  return (
   
    <>
     {loader ? <Loaders />:
      <div style={{ display: 'block', overflow: 'hidden' }} className="modal fade show" id="role-modal" tabindex="1000"
        aria-labelledby="exampleModalLabel">
        <div  className="modal-max-width height-set-689 modal-dialog modal-dialog-centered modal-dialog-scrollable modal-width animate__animated animate__slideInDown">
          <div className="modal-content relative-container">
            <div className='pass-modal-head'>
              <span>Endpoint Information</span>
            </div>
            <button style={{ zIndex: '20' }} className="st-close-ic-btn mf-crop-close-btn" onClick={() => { setshowModalBox(false) }} type="button" data-bs-dismiss="modal"
              aria-label="Close"><i className="icon-Close"></i></button>
            <div className="row relative-container m-0 ">
              <div className='role-content '>
          
                <div className="mf-body d-flex align-items-center justify-content-center m-2 mt-3">
                  <div className="mf-body-wrapper ">
                       <div className='d-flex'>
                           <div className='w-50 p-2 border-box'>
                            <p className='text-20 text-bold-700'>Request</p>
                         {data?.request_data}
                           </div>
                           <div className='w-50 p-2 border-box'>
                            <p className='text-20 text-bold-700'>Response</p>
                           {data?.response_data}
                           </div>
                       </div>
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          }
    </>

  )
}

export default ModalBox;
