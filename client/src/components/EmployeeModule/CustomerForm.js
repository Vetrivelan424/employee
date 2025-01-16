import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css'
import Select from 'react-select';
import validator from 'validator';
import Loader from '../../genriccomponents/loaders/RedLoader';
import CONFIG from '../../config/config';
import { GetUserList, UpdateUser, GetContry, CreateEmployees, ListEmployees,UpdateEmployees } from '../../services/services.js'

// import '../AuthModule/login.css'
import { showToast } from '../../genriccomponents/ToastNotification.js';

function CustomerForm(props) {
  const { page, setShowAddCustomer, setCustomerId } = props

  const history = useNavigate();
  const search = useLocation().search;
  const user_id = new URLSearchParams(search).get("emp_id");
  const [isLoding, setIsLoading] = useState(false)
  const [mobileNumber, setMobileNumber] = useState('1');
  const [status, setStatus] = useState(0);
  const [stsValue, setStsValue] = useState(() => { return 0 })
  const [formError, setFormError] = useState({});
  const [loader, setLoader] = useState(false)
  const [focused, setFocused] = useState(false)
  const [DepartmentValue, setDepartmentValue] = useState(null)

  const [DepartmentOption, setDepartmentOption] = useState([
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
    { value: "Devlopment", label: "Devlopment" },
    { value: "Management", label: "Management" },
    { value: "Testing", label: "Testing" }
  ])
  // country state city

  let errors = {};

  const ref_name = useRef();
  const ref_position = useRef();
  const ref_age = useRef();
  const ref_phone_number = useRef();
  const ref_department = useRef();
  const ref_contact_email = useRef();
 
  const [formSubmitted, setFormSubmitted] = useState(false);

  const Datas = {
    name: "",
    age: "",
    department: DepartmentValue,
    position: '',
    contact_email: "",
    phone_number: ''
  }

  const [formData, setFormData] = useState(Datas);
  const [initData, setInitData] = useState({ ...formData })

  const Getcountrys = async () => {
    const response = await GetContry();
    if (response.valid) {
      setDepartmentOption(response.data)
    }
  }

  // useEffect(() => {
  //   Getcountrys();
  //   GetStates({ country_id: '231' });
  // }, [])


  const handleFormChange = (e) => {
    let value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    })
    handleUiError(e.target.name)
  }

  // Start form realtime red border validation
  useEffect(() => {
    if (formSubmitted) {
      handleUiError()
      setFormSubmitted(false)
    }
  }, [formSubmitted]);

  const validatePhoneNumber = (phoneNumber) => {
    const checkNumber = phoneNumber.value.split(' ');

    if (checkNumber.length == 1) {
      phoneNumber.classList.add('form-control-error');
      return "Phone Number is required";
    } else {
      phoneNumber.classList.remove('form-control-error');
      return null;
    }
  };

  const handlePhoneNumberChange = (value) => {
    setMobileNumber(value);
    setFormData({
      ...formData,
      phone_number: value
    })
  };

  // apply red border to invalid inputs 
  const handleUiError = (e, select_value = null) => {
    const name = e;
    const error_form = {};

    if (formSubmitted) {
      if (formError.name) ref_name.current.classList.add('form-control-error');
      if (formError.age) ref_age.current.classList.add('form-control-error');
      if (formError.department) ref_position.current.classList.add('form-control-error');
      if (formError.contact_email) ref_contact_email.current.classList.add('form-control-error');
      if (formError.phone_number) {
        ref_phone_number.current.numberInputRef.classList.add('form-control-error');
      }

    }

    const setError = (key, value) => {
      setFormError(error => {
        const { [key]: _, ...rest } = error;
        return value ? { ...error, [key]: value } : rest;
      });
    };

      // for select state
      if (name == 'department') {
        let select_department;
        if (select_value == null) {
          select_department = DepartmentValue;
        } else {
          select_department = select_value
        }
  
        if (select_department === '' || select_department === undefined || select_department === null) {
          ref_department.current.controlRef.offsetParent.classList.add('react-select-form-control-error');
  
          setError('department', "Department is required");
        }
        else {
          ref_department.current.controlRef.offsetParent.classList.remove('react-select-form-control-error');
          setError('department', false);
        }
      
        return;
      }
  

    if (name === "name") {
      const input = ref_name.current;
      if (input.value.trim().length === 0) {
        input.classList.add('form-control-error');
        setError('name', "Employee Name is required");
      } else if (input.value.trim().length < CONFIG.MINCHAR) {
        input.classList.add('form-control-error');
        setError('name', `Employee Name must contain a minimum of ${CONFIG.MINCHAR} characters.`);
      } else if (input.value.trim().length > CONFIG.MAXCHAR) {
        input.classList.add('form-control-error');
        setError('name', `Employee Name must contain a maximum of ${CONFIG.MAXCHAR} characters.`);
      }
      else {
        input.classList.remove('form-control-error');
        setError('name', null);
      }
      return;
    }

    if (name === "age") {
      const input = ref_age.current;
      if (input.value.trim().length === 0) {
        input.classList.add('form-control-error');
        setError('age', "Age is required");
      } else if (input.value.trim().length > 26) {
        input.classList.add('form-control-error');
        setError('age', `Age must contain less than 25 characters`);
      } else {
        input.classList.remove('form-control-error');
        setError('age', null);
      }
      return;
    }

    if (name === "position") {
      const input = ref_position.current;
      if (input.value.trim().length === 0) {
        input.classList.add('form-control-error');
        setError('position', "position is required");
      } else if (input.value.trim().length > 26) {
        input.classList.add('form-control-error');
        setError('position', `position must contain less than 25 characters`);
      } else {
        input.classList.remove('form-control-error');
        setError('position', null);
      }
      return;
    }

    if (name === "contact_email") {
      const input = ref_contact_email.current;
      if (!input.value.trim()) {
        input.classList.add('form-control-error');
        setError('contact_email', "Contact Email is required");
      } else if (!validator.isEmail(input.value.trim())) {
        input.classList.add('form-control-error');
        setError('contact_email', "Invalid email address.");
      } else {
        input.classList.remove('form-control-error');
        setError('contact_email', null);
      }
      return;
    }

    if (name === "phone_number") {
      const phoneNumber = ref_phone_number.current.numberInputRef;
      const errorMessage = validatePhoneNumber(phoneNumber);
      setError('phone_number', errorMessage);
    }

  };

  const validateForm = (formData, isSubmitting = false) => {
    const errors = {};

    const validateField = (fieldName, value, validators) => {
      validators.forEach(validator => {
        const error = validator(value);
        if (error) {
          if (!errors[fieldName]) {
            errors[fieldName] = error;
          }
        }
      });
    };

    // Define validators for each field
    const fieldValidators = {
      name: [
        (value) => !value.trim() && "Employee Name is required",
        (value) => value.trim().length < CONFIG.MINCHAR && `Employee Name must contain a minimum of ${CONFIG.MINCHAR} characters`,
        (value) => value.trim().length > CONFIG.MAXCHAR && `Employee Name must contain less than ${CONFIG.MAXCHAR} characters`
      ],
      age: [
        (value) => !value.trim() && "Age is required"
      ],
      position: [
        (value) => !value.trim() && "Position is required",
        (value) => value.trim().length < CONFIG.MINCHAR && `Position must contain a minimum of ${CONFIG.MINCHAR} characters`,
        (value) => value.trim().length > CONFIG.MAXCHAR && `Position must contain less than ${CONFIG.MAXCHAR} characters`
      ],
      contact_email: [
        (value) => !value.trim() && "Contact Email is required",
        (value) => !validator.isEmail(value.trim()) && "Invalid email address"
      ],
      phone_number: [
        (value) => !value.trim() && "Phone Number is required",
        (value) => value.trim().length < 5 && "Phone Number must be at least 5 characters"
      ],
   
      // Add more fields as needed
    };

    // Validate each field based on its validators
    Object.keys(formData).forEach(fieldName => {
      if (fieldValidators[fieldName]) {
        validateField(fieldName, formData[fieldName], fieldValidators[fieldName]);
      }
    });

    // Additional form-wide validations for form submission
    if (isSubmitting) {
      const additionalErrors = form_validation(formData);
      Object.assign(errors, additionalErrors);
    }
    console.log("errors", errors)
    return errors;
  };


  // edit organization data fetch here
  useEffect(() => {

    const handleGetUserList = async () => {
      setLoader(true)
      const formData = { employee_uuid: user_id }
      const response = await ListEmployees(formData)
      if (response.data.valid) {
        const profile = response.data.user[0];
        setMobileNumber(profile.phone_number)
        const profileObj = {
          name: profile.name,
          age: profile.age,
          department: profile.department,
          position: profile.position,
          contact_email: profile.contact_email,
          phone_number: profile.phone_number,
          
        }

        setDepartmentValue(profile.department)
        setStatus(profile.status);
        setStsValue(profile.status === 1 ? 1 : 0)
        setFormData({ ...profileObj })
        setInitData({ ...profileObj })
        setLoader(false)
      } else {
        setLoader(false)
        showToast('error', response.message)
      }

    }

    if (user_id !== undefined && user_id !== null && user_id !== '') {
      handleGetUserList()
    }
  }, []);

  const handleUpdate = async () => {
    if (Object.keys(formError).length === 0) {
      setIsLoading(true)
      let data = {
        ...formData,
        employee_uuid: user_id,
        status: stsValue
      }
      const response = await UpdateEmployees(data)
      if (response.data.valid == true) {
        showToast('success', response.data.message, 'top-center')
          setTimeout(() => {
            history('/employee')
          }, 2000);
        
      } else {
        showToast('error', response.data.message, 'top-center')
      }
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    let data = { ...formData }

    console.log('data',data)
    let error_data = validateForm(data);
    if (Object.keys(error_data).length > 0) { setFormError(error_data); setFormSubmitted(true); setLoader(false); return false; }
   setLoader(true)

    const response = await CreateEmployees(data)
    if (response.data.valid) {
      setLoader(true)
      showToast('success', response.data.message, 'top-center');
      setFormData(Datas)

        setTimeout(() => {
          history('/employee')
        }, 2000);
      
    } else {
       setLoader(false)
      showToast('error', response.data.message, 'top-center');
    }
  }

  const handleDepartment = (event) => {
    var value = event.value;
    setDepartmentValue(value)
    setFormData({
      ...formData,
      department:value
    })
  };

  //handle status Change
  const handleChangeStatus = () => {
    setStatus(status === 1 ? 0 : 1)
    setFormData({
      ...formData,
      status: status === 1 ? 0 : 1
    })
    setStsValue(status === 1 ? 0 : 1)
  };


  return (
    <>
      {loader ? <Loader /> :
        <>
          {page == 'add_customer' && <div className='d-flex mt-4'>
            <div className='back-button cursor-pointer' onClick={() => history('/employee')}>
              <i className='icon-left'></i>
            </div>
            <div className='back-btn-content'>
              <p> {user_id ? 'Employees - ' +initData.name + ' - Edit' : 'Employee - Add Employee'}</p>
              <p className='text-20 text-bold-700'> {user_id ? 'Edit Customer' : 'Add New Employee'}</p>
            </div>
          </div>}
          {/* <FormDirtyCheck formData={formData} initialFormData={initData} formDirtyCheck={formDirtyCheck} setFormDirtyCheck={setFormDirtyCheck} /> */}
          <div className={` ${page === 'add_customer' ? 'admin-wrapper fade-in pt-4' : ''}`}>
            <div className='row m-0 p-0 mx-4'>


              <div className='col-12 col-md-12 col-lg-12  p-0' >
                <div className='row'>

                  <div className='col-12 col-md-6 col-lg-4  pe-5'>
                    <label className=" mf-label" >Employee Name <span className='red-color'>*</span></label>

                    <div className="form-group relative  mb-4 ">

                      <input ref={ref_name}
                        onBlur={() => handleUiError(ref_name.current.name)}
                        className="form-control" name="name" autoComplete="off" type="text" value={formData.name} onChange={handleFormChange} />

                      {formError.name && (
                        <span className="login-error"> {formError.name} </span>
                      )}
                    </div>
                  </div>
                  <div className='col-12 col-md-4 col-lg-4  pe-5'>
                    <label className="mf-label" >Age <span className='red-color'>*</span></label>

                    <div className="form-group label relative mb-4">

                      <input ref={ref_age} onBlur={() => handleUiError(ref_age.current.name)} className="form-control" name="age" autoComplete="off" type="text" value={formData.age} onChange={handleFormChange} />

                      {formError.age && (
                        <span className="login-error"> {formError.age} </span>
                      )}


                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 col-md-4 col-lg-4  pe-5'>
                    <div className="form-group label relative mb-4 ">
                      <label className=" mf-label" >Department <span className='red-color'>*</span></label>
                      <Select className='country-select react-select-container '
                        name={"department"}
                        ref={ref_department}
                        value={DepartmentOption.find(op => { return op.value == DepartmentValue })}
                        
                        onChange={(e) => {
                          handleDepartment(e)
                          handleUiError(ref_department.current.props.name, e.value)
                        }
                        }
                        onBlur={
                          (e) => {
                            setFocused(false)
                            handleUiError(ref_department.current.props.name)
                          }
                        }
                        onFocus={() =>
                          setFocused(true)}
                        placeholder={focused ? "Search" : 'Select Department'}
                        classNamePrefix="react-select"
                        options={DepartmentOption}
                        // defaultValue={{ value: 1, label: "Sales" }}
                      />
{formError.department && (
                        <span className="login-error"> {formError.department} </span>
                      )}
                    </div>

                  </div>
                  <div className='col-12 col-md-4 col-lg-4  pe-5'>
                    <label className=" mf-label" >Position <span className='red-color'>*</span></label>

                    <div className="form-group relative mb-4 ">

                      <input ref={ref_position}
                        onBlur={() => handleUiError(ref_position.current.name)}
                        className="form-control" name="position" autoComplete="off" type="text" value={formData.position} onChange={handleFormChange} />

                      {formError.position && (
                        <span className="login-error"> {formError.position} </span>
                      )}
                    </div>
                  </div>
                </div>

              </div>


              <div className='col-12 col-md-12 col-lg-12  p-0'>
                <div className='row '>

                  <div className='col-12 col-md-4 col-lg-4  pe-5'>
                    <label className=" mf-label" >Contact Email <span className='red-color'>*</span></label>

                    <div className="form-group label relative mb-4">
                      <input onBlur={() => handleUiError(ref_contact_email.current.name)} ref={ref_contact_email} className="cutom-password form-control" name="contact_email" autoComplete="new-email" type="text" value={formData.contact_email} onChange={handleFormChange} />

                      {formError.contact_email && (
                        <span className="login-error"> {formError.contact_email} </span>
                      )}
                    </div>
                  </div>
                  <div className='col-12 col-md-4 col-lg-4  pe-5'>

                    <div className="form-group label relative mb-4">
                      <label className=" mf-label" >Phone Number <span className='red-color'>*</span></label>
                      {/* <input onBlur={() => handleUiError(phone_number.current.name)} ref={phone_number} className="form-control" name="phone_number" autoComplete="off" type="text" value={formData.phone_number} onChange={handleFormChange} /> */}
                      <PhoneInput
                        onBlur={() => handleUiError(ref_phone_number.current.props.name)}
                        ref={ref_phone_number}
                        name={"phone_number"}
                        country={'us'}
                        countryCodeEditable={false}
                        value={mobileNumber}
                        onChange={(value) => {
                          handlePhoneNumberChange(value)
                          handleUiError(ref_phone_number.current.props.name)
                        }}
                      />
                      {formError.phone_number && (
                        <span className="login-error"> {formError.phone_number} </span>
                      )}
                    </div>
                  </div>
                </div>


                {user_id ?

                  (<div className='col-12 col-md-12 col-lg-12  '>
                    <div className=" mt-3 profile-status">
                      <div className=" spd-active-container  form-control">
                        <div className="status-row d-flex align-items-center justify-content-between m-1 ">
                          <p className="m-0 text-bold-700">Status</p>
                          <span className="m-0">
                            {status == 1 ? <span className="positive-green-color text-18 "><i className="icon-circle-fill text-18 me-2 "></i>Active</span> : <span className="red-color text-18 "> Inactive</span>}
                          </span>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={status === 1}
                              onChange={(e) => handleChangeStatus(e)}
                            />
                            <i className="sliders"></i>
                          </label>

                        </div>


                      </div>
                      <p className="mt-1">
                        Toggle status to make {status == 1 ? "Inactive" : "Active"}
                      </p>
                    </div></div>) : null
                }
              </div>
              <div className='d-flex container-fluid mt-3 p-0 justify-content-between '>

                <div className='d-flex container-fluid align-items-end  px-4'>

            
                </div>

              </div>

            </div>
          </div>

          <div className='d-flex justify-content-between mt-3'>

            {page == 'add_customer' &&
              <>
                <div onClick={() => history('/employee')} className='back-project-btn align-center cursor-pointer' >
                  <span className='px-4'>Cancel </span>
                </div>
                {!isLoding ?
                  <button className="mf4-start-btn d-flex-center ado-dangers-btn  btn-hover-blue " onClick={user_id ? handleUpdate : handleSubmit}>{user_id ? 'Update' : 'Create'} </button> :
                  <>{isLoding && page !== 'profile' && page !== 'add_project' && <button className="mf4-start-btn d-flex-center ado-dangers-btn  btn-hover-blue "></button>}</>
                }
              </>}
          </div>
        </>
      }
    </>
  )
}

export default CustomerForm 