const employeeModal = require('../models/employee.model');
const { validationResult } = require('express-validator');
/**
 * This class describes a file get.
 *
 * @class      FileGet (name)
 */
class customerController {
  /**
   * { function_description }
   *
   * @param      {<type>}    req     The request
   * @param      {<type>}    res     The resource
   * @param      {Function}  next    The next
   */

  create_customer = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).send(
        {
          'valid': false,
          'errors': true,
          'message': errors.errors[0].msg
        });
    }


    if (!req.body.employee_uuid) { var message = 'Employee created successfully' } else { var message = 'Employee updated successfully' }

    const result = await employeeModal.create_customer(req.body, req.query);


    res.status(200).send(
      {
        'valid': true,
        'message': message,
        'user_id': result
      });


  }

  /**
 * { function_description }
 *
 * @param      {<type>}    req     The request
 * @param      {<type>}    res     The resource
 * @param      {Function}  next    The next
 */
  list_employees = async (req, res, next) => {

    var user = await employeeModal.list_employees(req);

    res.status(200).send(
      {
        'valid': true,
        'message': 'Employee data fetched successfully',
        'user': user
      });

  };

  /**
* { function_description }
*
* @param      {<type>}    req     The request
* @param      {<type>}    res     The resource
* @param      {Function}  next    The next
*/
  delete_employees = async (req, res, next) => {
    await employeeModal.delete_employees(req);
    var user = await employeeModal.list_employees(req);

    res.status(200).send(
      {
        'valid': true,
        'message': 'Employee deleted successfully',
        'data': user

      });
  };

}

module.exports = new customerController;