var moment = require('moment');
var fs = require('fs');
const CONFIG = require('../config/config');
const { encrypt, decrypt } = require('../utils/encrypt_decrypt.utils');

// const { db_connection } = require('../db/db-builder-connection');
const csv = require('fast-csv');

// knex-connection.js
const { db } = require('../db/db-knex-connection');


exports.getPlaceholderStringForArray = (arr) => {
    if (!Array.isArray(arr)) {
        throw new Error('Invalid input');
    }

    // if is array, we'll clone the arr 
    // and fill the new array with placeholders
    const placeholders = [...arr];
    return placeholders.fill('?').join(', ').trim();
}


exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    columnSet = keys.map(key => `${key} = ?`).join(', ');

    return {
        columnSet,
        values
    }
}

exports.randomPassWordString = function (len = 10) {
    var chars = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghijklmnopqrstuvwxyz";
    var randomstring = '';
    for (var i = 0; i < len; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
};

exports.getCurrentUTCDateAndTime = function (format = 'YYYY-MM-DD HH:mm:ss') {
    return moment.utc().format(format);
};//getCurrentUTCDateTime

exports.getGivenDateTimeToSeconds = function (given_date) {
    return parseInt(Math.floor(moment(given_date).valueOf() / 1000));
}

exports.addIntervalToGivenUTCDateTime = function (current_date, add_interval, add_inverval_format = 'seconds', format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(current_date).add(add_interval, add_inverval_format).format(format);
}

exports.convertgivenDateToDBFormat = function (given_date, format = 'YYYY-MM-DD', given_format = 'MM/DD/YYYY') {
    return moment(given_date, given_format).format(format);
}

exports.convertgivenDateToDiplayFormat = function (given_date, format = 'MM/DD/YYYY', given_format = 'YYYY-MM-DD') {
    return moment(given_date, given_format).format(format);
}


exports.convertToUsFormatTime = function (given_date, format = 'MMM DD, YYYY') {
    return moment(given_date).format(format);
}

exports.developer_log = function (data, filename = '') {
    if (filename != '') {
        fs.appendFileSync(CONFIG.BASE_PATH + 'logs/' + filename + '.txt', moment.utc().format('YYYY-MM-DD HH:mm:ss') + ' ' + data + "\n");
    }
    else {
        fs.appendFileSync(CONFIG.BASE_PATH + 'logs/' + moment.utc().format('YYYY_MM_DD_HH') + '.txt', moment.utc().format('YYYY-MM-DD HH:mm:ss') + ' ' + data + "\n");
    }

}

exports.custom_error_log = function (data, filename = '') {
  
    if (CONFIG.LOG_ERR == false) {
        return true;
    }
    var data1 = data;
    var description_data = data.stack?.split("\n");
    if (typeof data == 'object') {
        var data = JSON.stringify(data)
    }
    if (filename != '') {
        fs.appendFileSync(CONFIG.BASE_PATH + 'logs/' + filename + '.txt', moment.utc().format('YYYY-MM-DD HH:mm:ss') + ' ' + data + "\n");
    }
    else {
        fs.appendFileSync(CONFIG.BASE_PATH + 'logs/error_' + moment.utc().format('YYYY_MM_DD') + '.txt', "\n" + moment.utc().format('YYYY-MM-DD HH:mm:ss') + ' ' + data + "\n\n" + description_data + "\n");
    }

    if (true) {
        const email_data = {};
        email_data.to = 'vmurugavel@compindia.com';
        email_data.subject = 'Error email';
        email_data.file_name = 'error';
        email_data.site_url = CONFIG.SITE_URL;
        email_data.message_content = data1?.sql;
        
    }

}

exports.usformatedate = function (datetime) {
    return moment(datetime).format('MM-DD-YYYY HH:mm:ss');
}

exports.capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


exports.get_position = function (target_value, content) {
    let m;
    var pos_dict = {};
    var e_pos_dict = [];
    var i = 0;

    var invalid = /[?*()\[\]{}=\\|+]+/g;
    var target_value = target_value.replace(invalid, "");

    if (target_value.length > 100) {
        return e_pos_dict;
    }

    var regex = new RegExp("\\b" + target_value + "\\b", 'giu')
    while ((m = regex.exec(content)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            e_pos_dict = {
                'start_position': regex.lastIndex - target_value.length,
                'end_position': regex.lastIndex, 'value': `${match}`
            };
            pos_dict[i] = e_pos_dict;
            i++;
        });
    }

    if (Object.keys(pos_dict).length == 0) {
        var regex = new RegExp(target_value, 'giu')
        while ((m = regex.exec(content)) !== null) {

            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            m.forEach((match, groupIndex) => {
                e_pos_dict = {
                    'start_position': regex.lastIndex - target_value.length,
                    'end_position': regex.lastIndex, 'value': `${match}`
                };
                pos_dict[i] = e_pos_dict;
                i++;
            });
        }
    }
    return pos_dict;
}




exports.permissionCheck = async function (req, res, rolekey) {
    return true;
};


exports.secondsToHm = function (d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    //var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " Hour " : " Hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " Minute " : " Minutes ") : "";
    //var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    var result_data = hDisplay + mDisplay
    return result_data.trim();
}

exports.track_app = async function (data, filename = '') {

    if (CONFIG.LOG_DATA == false) {
        return true;
    }
    if (filename != '') {
        fs.appendFileSync(CONFIG.BASE_PATH + 'logs/' + filename + '.txt', moment.utc().format('YYYY-MM-DD HH:mm:ss') + ' ' + data + "\n");
    }
    else {
        fs.appendFileSync(CONFIG.BASE_PATH + 'logs/data_' + moment.utc().format('YYYY_MM_DD') + '.txt', "\n" + moment.utc().format('YYYY-MM-DD HH:mm:ss') + ' ' + data + "\n\n" + description_data + "\n");
    }

}


exports.durationIncYear = async function durationIncYear(date, duration, calculation) {

    const originalDateObject = new Date(date);

    // Check if the parsed date is valid
    if (!isNaN(originalDateObject.getTime())) {
        // Increase the year by 1

        if (calculation == 'last') {
            originalDateObject.setFullYear(originalDateObject.getFullYear() - parseInt(duration));
        } else if (calculation == 'first') {
            originalDateObject.setFullYear(originalDateObject.getFullYear() + parseInt(duration));
        }
        // Format the updated date as a string
        const formattedUpdatedDate = originalDateObject.toISOString();

        return [date, formattedUpdatedDate];
    } else {
        return [originalDate];
    }
}

exports.durationIncMonth = async function durationIncMonth(year, monthConfig) {

    const year_1 = year.substring(0, 4);

    const last_month = year.substring(5, 7);

    const startDate = new Date(`${year_1}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year_1}-01-30T00:00:00.000Z`);
    const lastMonth = new Date(`${year_1}-${last_month}-30T00:00:00.000Z`);
    const minLastMonth = new Date(`${year_1}-${last_month}-01T00:00:00.000Z`);
    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();

    let displayDates = [];

    if (monthConfig.type === 'first') {
        displayDates.push(minLastMonth.toISOString());
        lastMonth.setMonth(minLastMonth.getMonth() + parseInt(monthConfig.duration) - 1);
        displayDates.push(lastMonth.toISOString());
    } else if (monthConfig.type === 'middle') {
        startDate.setMonth(startDate.getMonth() + parseInt(monthConfig.start) - 1);
        endDate.setMonth(endDate.getMonth() + parseInt(monthConfig.end) - 1);
        displayDates.push(startDate.toISOString());
        displayDates.push(endDate.toISOString());
    } else if (monthConfig.type === 'last') {
        displayDates.push(lastMonth.toISOString());
        minLastMonth.setMonth(minLastMonth.getMonth() - parseInt(monthConfig.duration) + 1);
        displayDates.push(minLastMonth.toISOString());
    }

    return displayDates;
}

exports.durationIncDays = async function durationIncDays(year, dayConfig) {
    const yearPart = year.substring(0, 4);
    const month = year.substring(5, 7);

    const day = year.substring(8, 10);

    const startDate = new Date(`${yearPart}-${month}-01T00:00:00.000Z`);
    const endDate = new Date(`${yearPart}-${month}-01T00:00:00.000Z`);

    if (month == '02') {

        var lastDay = new Date(`${yearPart}-${month}-28T00:00:00.000Z`);

    } else {
        var lastDay = new Date(`${yearPart}-${month}-30T00:00:00.000Z`);
    }

    const last_Day = new Date(`${yearPart}-${month}-${day}T00:00:00.000Z`)
    let displayDates = [];
    if (dayConfig.type === 'first') {
        displayDates.push(endDate.toISOString());
        lastDay.setDate(startDate.getDate() + parseInt(dayConfig.duration) - 1);
        displayDates.push(lastDay.toISOString());
    } else if (dayConfig.type === 'middle') {
        startDate.setDate(startDate.getDate() + parseInt(dayConfig.start) - 1);
        endDate.setDate(endDate.getDate() + parseInt(dayConfig.end) - 1);
        displayDates.push(startDate.toISOString());
        displayDates.push(endDate.toISOString());
    } else if (dayConfig.type === 'last') {
        displayDates.push(last_Day.toISOString());
        last_Day.setDate(last_Day.getDate() - parseInt(dayConfig.duration) + 1);
        displayDates.push(last_Day.toISOString());
    }

    return displayDates;
}




// Convert CSV to JSON
exports.csvTOJson = async function () {
    const jsonArray = [];
    csv.parseFile('item_dataset.csv', { headers: true })
        .on('data', (data) => jsonArray.push(data))
        .on('end', () => {
            // console.log(jsonArray);
            const jsonData = JSON.stringify(jsonArray, null, 2); // Convert array to JSON string
            fs.writeFile('json_data.json', jsonData, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log('Data written to file successfully');
                }
            });
        });
}
async function readFromJSONFile() {
    return new Promise((resolve, reject) => {
        fs.readFile('json_data.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const jsonArray = JSON.parse(data); // Parse JSON string to array
                resolve(jsonArray);
            }
        });
    });
}

// Convert JSON to CSV
exports.jsonToCsv = async function () {
    try {
        const jsonArray = await readFromJSONFile();
        csv.writeToPath('csv_data.csv', jsonArray, { headers: true })
            .on('finish', () => {
                console.log('CSV file created successfully');
            });
    } catch (error) {
        console.error('Error converting JSON to CSV:', error);
    }
}

const encryptField = (field) => db.raw("AES_ENCRYPT(?, ?)", [field, CONFIG.DB_ENCTYPTION_KEY]);

const encryptInsertData = async (data, columnsToExclude,db={}) => {
  try {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
          if (columnsToExclude.includes(key)) {
              if (key ==='project_uuid' || key ==='upload_uuid') {
               console.log(key)
                  // Assuming `uuidToBin` is a function available from your db utility
                  return [key, db.fn.uuidToBin(value)];
              }
              return [key, value];
          }
          
          return [key, encryptField(value)];
      })
  );
  } catch (error) {
    console.log(error)
  }
 
};

// Encrypt data for batch insert
const encryptBatchData = async (dataArray, columnsToExclude) => {
  return await Promise.all(
      dataArray.map(data => encryptInsertData(data, columnsToExclude))
  );
};


/**
 * Construct the select clause of a query with specified columns decrypted.
 *
 * @param {Array<string>} encryptedColumns - The columns to decrypt in the select clause.
 * @param {Array<string>} nonEncryptedColumns - The columns to include as is in the select clause.
 * @param {string} encryptionKey - The encryption key used for decryption.
 * @param {Object} knex - The Knex instance to use for the query.
 * @return {Array<string>} An array of select clause strings.
 */

function constructSelectWithDecryption(decryptColumns, nonEncryptColumns, encryptionKey, db) {
  const decryptFields = decryptColumns.map(column => {
    if(column=='project_uuid'||column=='upload_uuid'){
      const alias = column.split('.').pop(); // Extract the column name for alias
      return db.raw(`BIN_TO_UUID(??) AS ??`, [column, alias]);
    }else{
      const alias = column.split('.').pop(); // Extract the column name for alias
      return db.raw(`CAST(AES_DECRYPT(??, ?) AS CHAR) AS ??`, [column, encryptionKey, alias]);
    }
  });
  return [...decryptFields, ...nonEncryptColumns];
}


// Encrypt and transform batch data
const encryptTransformBatchData = async (dataArray, columnsToExclude, columnsToRemove, renameMap, additionalData,db={}) => {
  return await Promise.all(
    dataArray.map(data => {
      const transformedData = transformData(data, columnsToRemove, renameMap, additionalData);
      return encryptInsertData(transformedData, columnsToExclude,db);
    })
  );
};

// Function to remove, rename, and add keys in the object
const transformData = (data = {}, columnsToRemove = [], renameMap = {}, additionalData = {}) => {
  // Ensure data is an object
  if (typeof data !== 'object' || data === null) {
    throw new TypeError('data must be a non-null object');
  }

  // Ensure columnsToRemove is an array
  if (!Array.isArray(columnsToRemove)) {
    throw new TypeError('columnsToRemove must be an array');
  }

  // Ensure renameMap is an object
  if (typeof renameMap !== 'object' || renameMap === null) {
    throw new TypeError('renameMap must be a non-null object');
  }

  // Ensure additionalData is an object
  if (typeof additionalData !== 'object' || additionalData === null) {
    throw new TypeError('additionalData must be a non-null object');
  }

  // If all inputs are empty, return the original data
  if (
    columnsToRemove.length === 0 &&
    Object.keys(renameMap).length === 0 &&
    Object.keys(additionalData).length === 0
  ) {
    return data;
  }

  const transformedData = {};

  for (const [key, value] of Object.entries(data)) {
    if (!columnsToRemove.includes(key)) {
      const newKey = renameMap[key] || key;
      transformedData[newKey] = value;
    }
  }

  // Add new key-value pairs
  for (const [key, value] of Object.entries(additionalData)) {
    transformedData[key] = value;
  }

  return transformedData;
};

 async function scaleAnnotationsObjArr(annotations, originalWidth, newWidth) {
 
  const scaleX = newWidth.width / originalWidth.width;
  const scaleY = newWidth.height / originalWidth.height;

  return annotations.map(annotation => ({
      x: annotation.x * scaleX,
      y: annotation.y * scaleY,
      width: annotation.width * scaleX,
      height: annotation.height * scaleY,
      id: annotation.id,
      fill: annotation.fill,
      stroke: annotation.stroke,
      strokeWidth: annotation.strokeWidth,
      type: annotation.type
  }));
}



// const constructSelectWithDecryption = (encryptedColumns, nonEncryptedColumns, encryptionKey, knex) => {
//   const selectColumns = [];
//   encryptedColumns.forEach(col => {
//     selectColumns.push(knex.raw(`CAST(AES_DECRYPT(??, ?) AS CHAR) AS ??`, [col, encryptionKey, col]));
//   });
//   selectColumns.push(...nonEncryptedColumns);
//   return selectColumns;
// };

// Export the functions
exports.scaleAnnotationsObjArr=scaleAnnotationsObjArr;
exports.constructSelectWithDecryption=constructSelectWithDecryption;
exports.encryptField = encryptField;
exports.encryptInsertData = encryptInsertData;
exports.encryptBatchData=encryptBatchData;
exports.encryptTransformBatchData=encryptTransformBatchData;

  