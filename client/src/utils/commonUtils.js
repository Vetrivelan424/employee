/***************************************************************************************
 * @module       Common Utils 
 * @name         empoyee-Common Utils
 * @description  Get the User Authentication Common Utils 
 * @version      1.0.0
 * @copyright    © 2024 Tvs
 * @license      Licensed under the MIT License
 * @createdon    May 2024
 * @modifiedon   May 2024
 * @since        1.0
 ***************************************************************************************/
  
export function formatDateFromISOString(dateString) { 
  // Create a new Date object from the ISO string
  let date = new Date(dateString);

  // Extract the month, day, and year from the Date object
  let month = date.getMonth() + 1; // Months are zero indexed, so we add 1
  let day = date.getDate();
  let year = date.getFullYear();

  // Format the date in MM/DD/YYYY format
  let formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

  return formattedDate;  // Outputs: "07/11/2024"
}

export function formatDateString(dateString) {
  const date = new Date(dateString);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
}

// capitailse first letter

export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const allowOnlyNumbersWithTwoDecimals = (event) => {
  const charCode = event.which ? event.which : event.keyCode;
  const charStr = String.fromCharCode(charCode);
  const inputValue = event.target.value;

  // Allow numbers and a single decimal point
  if (!/[0-9]/.test(charStr) && charStr !== '.') {
    event.preventDefault();
  }

  // Prevent multiple decimal points
  if (charStr === '.' && inputValue.includes('.')) {
    event.preventDefault();
  }

  // Ensure only two decimal places
  const decimalIndex = inputValue.indexOf('.');
  if (decimalIndex !== -1 && inputValue.length - decimalIndex > 2) {
    event.preventDefault();
  }
};

import {parsePhoneNumber} from 'libphonenumber-js';

export const formatPhoneNumber = (num) => {
  const phoneNumber = parsePhoneNumber(num, 'US');
  return phoneNumber ? phoneNumber.formatNational() : num;

};
