import React,{useState,useEffect} from 'react'
import ReactTable from '../../../genriccomponents/ReactTable.js';
import { GetTrackLog } from '../../../services/services.js'
import { formatDateString,capitalizeFirstLetter } from '../../../utils/commonUtils.js'
import { ShimmerTable } from "react-shimmer-effects";
import ReactTooltip from 'react-tooltip';

export default function AuthenticationLog() {

  const [AuthLogList, setAuthLogList] = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    const handleGetAuthLogList = async () => {

      const response = await GetTrackLog()
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
      name: "Activity",
      selector: (row) => row.action,
      sortable: true,
    },
   
    {
      name: "Date & time",
      selector: (row) => row.timestamp ?  formatDateString(row.timestamp) :'-',
      sortable: true,
    },
    {
      name: "Action by",
      selector: (row) => row.user_id==0 ? 'Jhon' : '-',
      sortable: true,
    },
   
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
    </div>
  )
}
