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


export const GetAuthLog = async (userData = '') => {
  try {
    const response = await Http.get('/api_log_list',userData);
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

