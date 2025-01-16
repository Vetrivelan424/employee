const { encryptField, encryptInsertData, getCurrentUTCDateAndTime, custom_error_log, insertUserActivity, addIntervalToGivenUTCDateTime, constructSelectWithDecryption } = require('../utils/common.utils');
const { encrypt, decrypt } = require('../utils/encrypt_decrypt.utils');

const CONFIG = require('../config/config');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const logger = require('../helper/winston-loggers');
const { db } = require('../db/db-knex-connection');

/**
 * This class describes an user model.
 *
 * @class      UserModel (name)
 */
class UserModel {
  
      /**
   * api_log_list Gets the log details.
   *
   * @param      {<json>}  params  The parameters
   * @return     {<json>}  The user.
   */
      api_log_list = async (params) => {
        try {
         
          const SelectedColumns = ['*'];      
    
          let query = db('tracking_table').select(SelectedColumns).orderBy('track_id', 'desc').limit(50);
     
          const response = await query;
     
          return response;
        } catch (err) {
          logger.error(`Error occurred: ${err}`);
          console.log(err);
          throw err; // Rethrow the error for handling at a higher level
        }
    
      }

      track_log_list = async (params) => {
        try {
         
          const SelectedColumns = ['*'];      
    
          let query = db('log_table').select(SelectedColumns).orderBy('log_id', 'desc').limit(50);
     
          const response = await query;
     
          return response;
        } catch (err) {
          logger.error(`Error occurred: ${err}`);
          console.log(err);
          throw err; // Rethrow the error for handling at a higher level
        }
    
      }

}

module.exports = new UserModel();
