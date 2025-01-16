/***************************************************************************************
 * @module       Service 
 * @name         employee-Service
 * @description  Get the User Authentication Service 
 * @version      1.0.0
 * @copyright    © 2024 Tvs
 * @license      Licensed under the MIT License
 * @createdon    May 2024
 * @modifiedon   May 2024
 * @since        1.0
 ***************************************************************************************/
  
/**
 * Function to register a user via Axios HTTP POST request.
 * @name registerUser
 * @param {object} userData - The user data to be registered.
 * @returns {Promise<object>} - A Promise that resolves with the response data (e.g., success message, user object).
 * @throws {Error} - If an error occurs during the registration process.
 * @version 1.0.0
 */

import  Http  from '../axois/useAxois'; 
import ServiceUtils from '../utils/serviceUtils'; // Adjust the import based on your project structure
const utilsService = ServiceUtils();


export const registerUser = async (userData) => {
  try {
    const response = await Http.post('/register',utilsService.prepareAPIRequest(userData));
    return response.data; // Return the response data (e.g., success message, user object)
  } catch (error) {
    throw error; // Handle errors appropriately (e.g., display error messages to the user)
  }
};

export const LoginUser = async (userData = '') => {
  try {
    const response = await Http.post('/login',utilsService.prepareAPIRequest(userData));
    return response;
  } catch (error) {
    throw error;
  }
};

export const LogOutUser = async (userData = '') => {
  try {
    const response = await Http.get('/logout',userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const ForgotPassword = async (userData = '') => {
  try {
    const response = await Http.post('/forget_password', utilsService.prepareAPIRequest(userData));
    return response;
  } catch (error) {
    throw error;
  }
};

export const ForgotPasswordTokenCheck = async (userData = '') => {
  try {
    const response = await Http.post('/forget_password_token_check', utilsService.prepareAPIRequest(userData));
    return response;
  } catch (error) {
    throw error;
  }
};

export const PasswordReset = async (userData = '') => {
  try {
    const response = await Http.post('/password_reset', utilsService.prepareAPIRequest(userData));
    return response;
  } catch (error) {
    throw error;
  }
};

export const UserInfoByToken = async (userData = '') => {
  try {
    const response = await Http.get('/get_user_info_by_token',userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetUserList = async (userData = '') => {
  try {
    const response = await Http.get('/get_user_list',userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateUser = async (userData = '') => {
  try {
    const response = await Http.post('/update_user',utilsService.prepareAPIRequest(userData));
    return response;
  } catch (error) {
    throw error;
  }
};

export const RegisterUser = async (userData = '') => {
  try {
    const response = await Http.post('/register',utilsService.prepareAPIRequest(userData));
    return response;
  } catch (error) {
    throw error;
  }
};

export const CurrentPasswordChange = async (userData = '') => {
  try {
    const response = await Http.post('/old_password_reset',utilsService.prepareAPIRequest(userData));
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetAuthLog = async (userData = '') => {
  try {
    const response = await Http.get('/authentiocation_log_list',userData);
    return response;
} catch (error) {
    throw error;
  }
};

export const GetTrackLog = async (userData = '') => {
  try {
    const response = await Http.get('/track_log_list',userData);
    return response;
} catch (error) {
    throw error;
  }
};


export const DeleteUser = async (userData = '') => {
  try {
    const response = await Http.get('/delete_user',userData);
    return response;
} catch (error) {
    throw error;
  }
};

export const GetCity = async (userData = '') => {
  try {
    const response = await Http.post('/get_city',utilsService.prepareAPIRequest(userData));
    return response;
} catch (error) {
    throw error;
  }
};

export const GetState = async (userData = '') => {
  try {
    const response = await Http.post('/get_state',utilsService.prepareAPIRequest(userData));
    return response;
} catch (error) {
    throw error;
  }
};

export const GetContry = async (userData = '') => {
  try {
    const response = await Http.get('/get_country',userData);
    return response;
} catch (error) {
    throw error;
  }
};

export const CreateEmployees = async (userData = '') => {
  try {
    const response = await Http.post('/create_employees',userData);
    return response;
} catch (error) {
    throw error;
  }
};

export const UpdateEmployees = async (userData = '') => {
  try {
    const response = await Http.put('/update_employees',userData);
    return response;
} catch (error) {
    throw error;
  }
};

export const ListEmployees = async (userData = '') => {
  try {
    const response = await Http.get('/list_employees',userData);
    return response;
} catch (error) {
    throw error;
  }
};

export const DeleteEmployee = async (userData = '') => {
  try {
    const response = await Http.delete('/delete_employees',userData);
    return response;
} catch (error) {
    throw error;
  }
};

export const CreateProduct = async (userData = '') => {
  try {
    const response = await Http.post('/create_product',utilsService.prepareAPIRequest(userData));
    return response;
} catch (error) {
    throw error;
  }
};

export const GetCategoryStructure = async (userData = '') => {
  try {
    const response = await Http.get('/get_category_structure',userData);
    return response;
} catch (error) {
    throw error;
  }
};

export const ListProducts = async (userData = '') => {
  try {
    const response = await Http.get('/list_products',userData);
    return response;
} catch (error) {
    throw error;
  }
};

export const DeleteProduct = async (userData = '') => {
  try {
    const response = await Http.get('/delete_product',userData);
    return response;
} catch (error) {
    throw error;
  }
};

export const CreateProjects = async (userData = '') => {
  try {
    const response = await Http.post('/create_project',utilsService.prepareAPIRequest(userData));
    return response;
} catch (error) {
    throw error;
  }
};

export const CreateConfigDetails = async (userData = '') => {
  try {
    const response = await Http.post('/create_default_config',utilsService.prepareAPIRequest(userData));
    return response;
} catch (error) { 
    throw error;
  }
};

export const DefaultConfigDetailsAPI = async (userData = '') => {
  try {
    const response = await Http.get('/config_details',userData);
    return response;
} catch (error) {
    throw error;
  }
};

export const GetProjectSummary = async (userData = '') => {
  try {
    const response = await Http.get('/overview_details',userData);
    return response;
} catch (error) {
    throw error;
  }
};

export const GetProjectList = async (userData = '') => {
  try {
    const response = await Http.get('/projects_list',userData);
    return response;
} catch (error) {
    throw error;
  }
};
export const UploadPdfAPI = async (userData = '') => {
  try {
    const response = await Http.post('/upload_pdf',utilsService.prepareAPIRequest(userData));
  return response;
} catch (error) { 
    throw error;
  }
};

// ***********   calling the projectservises  ***************//

// const fetchProjects = async () => {
//     try {
//       const response = await ProjectService.getProjects();
//       setProjects(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
