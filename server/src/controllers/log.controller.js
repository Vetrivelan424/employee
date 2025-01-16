const logModel = require('../models/log.model');

/**
 * Controls the data flow into an user object and updates the view whenever data changes.
 *
 * @class      UserController (name)
 */
class UserController {

/**
 * { function_description }
 *
 * @param      {<type>}    req     The request
 * @param      {<type>}    res     The resource
 * @param      {Function}  next    The next
 */
api_log_list = async (req, res, next) => {
    
    var auth_log = await logModel.api_log_list(req);

    res.status(200).send(
      {
        'valid'  : true,
        'message': 'API log data fetched successfully',
         'data'  :  auth_log
      });
  };
  

  track_log_list = async (req, res, next) => {
    
    var auth_log = await logModel.track_log_list(req);

    res.status(200).send(
      {
        'valid'  : true,
        'message': 'Track log data fetched successfully',
         'data'  :  auth_log
      });
  };
       /**
 * { function_description }
 *
 * @param      {<type>}    req     The request
 * @param      {<type>}    res     The resource
 * @param      {Function}  next    The next
 */
    delete_user = async (req, res, next) => {

     var user_delete = await logModel.delete_user(req);

     res.status(200).send(
       {
         'valid'  : true,
         'message': 'User deleted successfully'
       });
      };

}

module.exports = new UserController;
