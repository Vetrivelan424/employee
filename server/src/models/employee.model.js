const { getCurrentUTCDateAndTime } = require('../utils/common.utils');
const { encrypt, decrypt } = require('../utils/encrypt_decrypt.utils');
const { v4: uuidv4 } = require('uuid');
const logger = require('../helper/winston-loggers');
const { db } = require('../db/db-knex-connection');
const _ = require('lodash');

/**
 * This class describes an user model.
 *
 * @class      customerModel (name)
 */
class customerModel {
  
  /**
 * Creates an user.
 *
 * @param      {<type>}   params  The parameters
 * @return     {boolean}  Last insert id
 */

  logAction = async (action, userId = null) => {
    await db('log_table').insert({
      action,
      user_id: userId,
      timestamp: new Date() // Optional, as MySQL can default to `CURRENT_TIMESTAMP`
    });
  }

  create_customer = async (params, users) => {
    try {
      // Trim unnecessary parameters
      let insertData = {
        ...params
      };
      let results;
      if (params.employee_uuid !== '' && params.employee_uuid !== undefined && params.employee_uuid !== null) {
        delete insertData.employee_uuid
        insertData.status = params.status
        insertData.updated_at = getCurrentUTCDateAndTime();
        insertData.updated_by = users.user_id;
        const activity = params.name + ' Employee Updated by Jhon'
        await this.logAction(activity, 0)
        // Add updated_by
        results = await db('employees').where({ uuid: params.employee_uuid }).update(insertData);
        // Handle update result 
        if (results > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        var employee_uuid = uuidv4();
        insertData.uuid = employee_uuid;
        insertData.created_at = getCurrentUTCDateAndTime();
        insertData.created_by = users.user_id;

        const activity = params.name + ' Employee Created by Jhon'
        await this.logAction(activity, 0)
       
        try {
          results = await db('employees').insert(insertData);

        } catch (error) {
          console.log(error)
        }

        // Handle insertion result
        if (results.length > 0) {
          const newUserId = results[0];

          return encrypt(newUserId);
        } else {
          return false;
        }
      }
    } catch (err) {
      logger.error(`Error occurred: ${err}`);
      return false;
    } finally {
      // await db.destroy();
    }
  };


  /**
   * get_customer Gets the customer.
   *
   * @param      {<json>}  params  The parameters
   * @return     {<json>}  The user.
   */
  list_employees = async (params) => {
    try {

      let selectFields = ['name', 'age', 'department', 'position', 'status', 'uuid', 'contact_email', 'phone_number']
      let query = db('employees')
        .select(selectFields)
        .where('is_deleted', '!=', 1)

      if (params.query.employee_uuid) {
        query = query.where('uuid', params.query.employee_uuid);
      } else {
        const activity = 'Employee list viwed by Jhon'
        await this.logAction(activity, 0)
      }

      query = query.orderBy('id', 'desc');

      console.log('query', query.toString())
      const response = await query;
      // Assuming encrypt function is defined to encrypt user id

      return response;
    } catch (err) {
      logger.error(`Error occurred: ${err}`);
      console.log(err);
      throw err; // Rethrow the error for handling at a higher level
    }

  }

  /**
* { Delete user token by user id  }
*
* @param      {<type>}   request   The request
* @param      {<type>}   response  The response
* @return     {boolean}  { description_of_the_return_value }
*/
  delete_employees = async (params) => {
    try {
      const activity = params.body.route.name + ' Employee deleted by Jhon'
      await this.logAction(activity, 0)
      await db('employees')
        .where({ uuid: params.body.route.employee_uuid })
        .update({ is_deleted: 1, deleted_by: params.query.user_id || 0, deleted_at: getCurrentUTCDateAndTime() });
    } catch (err) {
      logger.error(`Error occurred: ${err}`);
      console.log(err);
      throw err; // Rethrow the error for handling at a higher level
    }
  }

}
module.exports = new customerModel();
