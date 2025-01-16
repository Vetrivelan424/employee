import React,{useState,useEffect} from 'react'
import ReactTable from '../../../genriccomponents/ReactTable';
import { GetAuthLog } from '../../../services/services.js'
import { formatDateString,capitalizeFirstLetter } from '../../../utils/commonUtils.js'
import { ShimmerTable } from "react-shimmer-effects";
import ReactTooltip from 'react-tooltip';
import ModalBox from '../../../genriccomponents/ModalBox.js';

export default function AuthenticationLog() {

  const [AuthLogList, setAuthLogList] = useState([])
  const [loader, setLoader] = useState(false)
 const [showModalBox,setshowModalBox] = useState(false)

 const handleViewClick = (row)=>{
  setshowModalBox(row)
 }
  useEffect(() => {
    setLoader(true)
    const handleGetAuthLogList = async () => {

      const response = await GetAuthLog()
      if (response.data.valid) {
        setAuthLogList(response.data.data)
        setLoader(false)
      } else {
        setLoader(false)
      }

    }

    handleGetAuthLogList()

  }, []);



  const columns = [

    {
      name: "API Endpoint",
      selector: (row) => row.api_endpoint,
      sortable: true,
      width: '400px'
    },
    {
      name: "Status Code",
      cell:(row) =>row.status_code ? row.status_code:'-',
      selector:(row)=> row.status_code  ? row.status_code:'-',
      sortable: true,

    },
    {
      name: "Date & time",
      selector: (row) => row.timestamp ?  formatDateString(row.timestamp) :'-',
      sortable: true,
      width: '180px'
    },
    {
      name: "Action by",
      selector: (row) => row.user_id==0 ? 'Demo' : '-',
      sortable: true,
    },
    {
      name: 'Request & Response',
      button: true,
      width: '250px',
      cell: (row) => (
        <>
          <div className='d-flex'>
            <ReactTooltip id="menu-user" className="reacttooltip" type="dark" effect="solid" place="bottom" delayShow={parseInt("100")} resizeHide={Boolean(false)} />
            <i data-for="menu-user" data-tip={'View'} onClick={() => handleViewClick(row)} className='text-20 icon-view mx-1 cursor-pointer icon-hover'></i>
          </div>
        </>
      ),
    }
  ]
console.log('')
  return (
    <div className=' margin-le-10 px-4 mt-4 fade-in'>
      {
      loader ? <ShimmerTable row={6} col={5} />: (
       <ReactTable
          classsName={'auth-border'}
          tableData={AuthLogList}
          tableColumn={columns}
          needPaginate={true}
          csRowsPerPage={10}
        />)}

        {showModalBox && <ModalBox data={showModalBox} setshowModalBox={setshowModalBox} />}
    </div>
  )
}
