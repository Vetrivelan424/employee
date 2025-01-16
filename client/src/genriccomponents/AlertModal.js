import React from 'react';
import CustomerForm from '../components/EmployeeModule/CustomerForm';

function AlertModal(props) {
  // const {  } = props;

  return (
    <>
      <div style={{ display: 'block' }} className="modal-alert-sm modal fade show" id="role-modal" tabindex="1000"
        aria-labelledby="exampleModalLabel">
        <div  className="max-width-alert modal-dialog modal-dialog-centered modal-dialog-scrollable modal-width zoom-in">
          <div className="modal-content relative-container">
            <div className='pass-modal-head text-center'>
              <span className='pe-4'>{props.title}</span>
            </div>
            {props.showModal && (
  <button
    style={{ zIndex: '20' }}
    className="st-close-ic-btn mf-crop-close-btn"
    onClick={() => {
      console.log("click");
      props.setShowModal(false);
    }}
    type="button"
    data-bs-dismiss="modal"
    aria-label="Close"
  >
    <i className="icon-Close"></i>
  </button>
)}

            <div className="row relative-container m-0 ">
              <div className='role-content '>

                <div className="mf-body   m-2 mt-4">
                  <div className="mf-body-wrapper text-center align-center text-16 mx-3">
                        <span>{props.content}</span>
                        
              </div>
             <div className='align-center my-3'>
              <button className='add-customer-btn add-user-btn p-2 align-center mb-3' onClick={props.handleOkay}>
                          <span>{props.button}</span>
                    </button>
                              </div>  
                              </div>          
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default AlertModal;
