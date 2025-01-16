import React, { useState, useEffect } from 'react';
import ReactTable from '../../genriccomponents/ReactTable.js';
import { ListEmployees, DeleteEmployee } from '../../services/services.js'
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../utils/commonUtils.js'
import { ShimmerTable } from "react-shimmer-effects";
import { showToast } from '../../genriccomponents/ToastNotification.js';
import AlertModal from '../../genriccomponents/AlertModal.js';
import ReactTooltip from 'react-tooltip';

export default function ClientList() {

  const [userList, setUserList] = useState([])
  const [loader, setLoader] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    handleGetUserList()
  }, []);


  const handleGetUserList = async () => {
    setLoader(true)
    const response = await ListEmployees()
    console.log('response',response)
    if (response.data.valid) {
     
      setUserList(response.data.user)
      setLoader(false)
    } else {
      setLoader(false)
    }
  }

  const columns = [

    {
      name: "Employee Name",
      selector: (row) => capitalizeFirstLetter(row.name),
      sortable: true,
      grow: 2,
      width: '200px'
    },
    {
      name: "Position",
      selector: (row) => capitalizeFirstLetter(row.position),
      sortable: true,
      grow: 2,
      // width: '170px'

    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
      grow: 2,
      // width: '250px',
    },
    {
      name: "Status",
      selector: (row) => row.status == 1 ? "Active" : "Inactive",
      cell: (row) => {
        return (
          <>
            {
              row.status == 0 ? (<span className='red-color'>Inactive</span>) : (<span className='positive-green-color'>Active</span>)
            }
          </>
        )
      },
      width: '100px',
      sortable: true
    },
    {
      name: 'Actions',
      button: true,
      width: '150px',
      cell: (row) => (
        <>
          <div className='d-flex'>
            <ReactTooltip id="menu-user" className="reacttooltip" type="dark" effect="solid" place="bottom" delayShow={parseInt("100")} resizeHide={Boolean(false)} />

            <i data-for="menu-user" data-tip={'Edit'} onClick={() => navigate('/customers/add-customer?emp_id=' + row.uuid)} className='icon-edit mx-3 cursor-pointer icon-hover'></i>
            <i data-for="menu-user" data-tip={'Delete'} onClick={() => handleDeleteClick(row)} className='icon-delete mx-1 cursor-pointer icon-hover'></i>
          </div>
        </>
      ),
    }

  ]

  const DeleteUserAPi = async (user) => {
    setLoader(true)
    const data = { employee_uuid: user.uuid ,name:user.name}
    const response = await DeleteEmployee(data)
    if (response.data.valid) {
      setUserList(response.data.data)
      showToast('success', response.data.message, 'top-center')
    } else {
      showToast('error', response.data.message, 'top-center')
    }
    setLoader(false)
  }

  const [showModal, setShowModal] = useState('');
  const [show, setShow] = useState(false);
  const handleDeleteClick = (e) => {
    setShowModal(e)
    setShow(true)
  }

  const handleDeleteOkay = () => {
    DeleteUserAPi(showModal)
    setShow(false)
    setShowModal('')
  }

  return (
    <div className='p-4 fade-in'> <div className='admin-wrapper col-xl-12 col-lg-11 col-md-10 col-sm-9'>
      <div className='d-flex justify-content-between p-3'>
        <div className='pt-1'>
          <p className='text-20 text-bold-800'>
            Employees
          </p>
        </div>
        <div className=''>
          <button className='add-customer-btn add-user-btn p-3' onClick={() => navigate('/customers/add-customer')}>
            <i className='text-21 icon-add-Customer me-4'></i> <span>Add Employee</span>
          </button>
        </div>
      </div>
      <div className='pb-4 '>
        {
          loader ? <ShimmerTable row={6} col={7} /> : (
            <ReactTable
              tableData={userList}
              tableColumn={columns}
              needPaginate={true}
              csRowsPerPage={10}
            />)}
      </div>
      {show &&
        <AlertModal showModal={show} button={'Delete'} setShowModal={setShow} title={"Delete Customer"}
          content={
            <>
              Are you sure you want to delete the Employee <b>{showModal?.name}</b>?
            </>
          } handleOkay={handleDeleteOkay} />
      }
    </div>
    </div>
  )
}
