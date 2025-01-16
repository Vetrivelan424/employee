
import moment from 'moment';
import swal from "sweetalert";
import CONFIG from "../config/config";



// var ajax_response;
export const forceLogout = (ajax_response) => {
  if (ajax_response.data.hasOwnProperty("force_logout")) {
    localStorage.removeItem("token");
    localStorage.clear();
    if(ajax_response.data.hasOwnProperty("session_expired"))
    {
      swal({
        title: 'Your session has expired. Please log in again.', 
        button: "Ok",
        closeOnEsc: true,
        focusButton:true,
        timer: 4000,
        
      });
    }
    return true;
  }
  //return false;
};

export const checkResponse = (response) => {
  if (response.data.hasOwnProperty("data_not_found")) {
    response.data.histroy_redirect.push('/data_not_found');
    return true;
  }
  //return false;
};

export const permissionCheck = (ajax_response) => {
  if (ajax_response.data.hasOwnProperty("permission_check")) {
    return true;
  }
};




export function capitalFcase(string) {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}

export function capitalFcaseArray(arr) {
  return arr.map(element => {
    return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
  });
}

export function scrollToId(id) {
  let element = document.getElementById(id);
  // console.log(element)
  element.scrollIntoView()
  // element.scrollTo(0,0);
}

export const splitKeyValue = obj => {
  const keys = Object.keys(obj);
  const res = [];
  for (let i = 0; i < keys.length; i++) {
    res.push({
      'target': keys[i],
      'value': obj[keys[i]]
    });
  };
  return res;
};


export const date_us_format = (date_used, date_format) => {
  let date;
  if (moment(date_used).isValid()) {
    date = moment(date_used).format(date_format);
  } else {
    date = moment(date_used, date_format).format(date_format);
  }

  return date;
};


// return true or false checks for both object and key pairs are same for given two object
export const objectsAreEqual = (obj1, obj2) => {
  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys are equal
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Compare the keys and values of the objects
  return keys1.reduce((result, key) => {
    if (!result) {
      return false; // If there is a mismatch, return false
    }

    const value1 = obj1[key];
    const value2 = obj2[key];

    return result && (value1 === value2); // Check if values are equal
  }, true);
}


// return true or false checks for both object and key pairs are same for given two array of object
export const compareArraysOfObjects = (array1, array2) => {
  return array1.every((item1) =>
    array2.some((item2) =>
      Object.entries(item1).every(([key, value]) => item2[key] === value)
    )
  );
}

export const handleMulipleAccess = (info, session_data, history) => {
  // return true
  let session_user_id = localStorage.getItem('uuid');
  if (session_user_id != info.user_id) {
    swal({
      title: "Project is edited?",
      text: "Someone altered the data of the project",
      icon: "warning",
      allowOutsideClick: false,
      allowEscapeKey: false,
      closeOnEsc: false,
      backdrop:true,
      closeOnClickOutside: false
    }).then(function (isConfirm) {
      // if(info?.is_annotate) {
      //   try {
      //     session_data?.session_reload()
      //   } catch(e) {
      //     window.location.reload();
      //   }
      //   return true
      // }
      if (history && info?.is_deleted == '1') {
        history.push('/Project');
        return true;
      }
      if (history && info?.training_status == 'UT') {
        history.push('/Project')
      }
      else if (info?.training_status == 'IP' && info?.form_step == 2) {
        if (session_data?.session_analysis_type == 1) {
          let url = session_data?.organization_id > 0 ? '/Project/project_add_more_data?project_id=' : '/admin/organization/project/project_add_more_data?project_id='
          history.push(url + info?.project_id)
        }
        else if (session_data?.session_analysis_type == 2) {
          let url = session_data?.organization_id > 0 ? '/Project/classifier/project_add_more_data?project_id=' : '/admin/organization/project/classifier/project_add_more_data?project_id='
          history.push(url + info?.project_id)
        }
        else if (session_data?.session_analysis_type == 3) {
          let url = session_data?.organization_id > 0 ? '/Project/extractor/project_add_more_data?project_id=' : '/admin/organization/project/extractor/project_add_more_data?project_id='
          history.push(url + info?.project_id)
        }
        else {
          window.location.reload();
        }
      }
      else if (info?.training_status == 'ATC') {
        window.location.reload();
      }
      else if (info?.training_status == 'IP' && (session_data?.session_form_step >= info?.form_step)) {
        window.location.reload();
      }
      else if (session_data?.session_form_step < info?.form_step) {
        return true;
      } else {
        window.location.reload();
      }
    })
  } else {
    return false;
  }
};

export const comparable = o => (typeof o != 'object' || !o)? o :
  Object.keys(o).sort().reduce((c, key) => (c[key] = comparable(o[key]), c), {});


