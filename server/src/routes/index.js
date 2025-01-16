const express = require('express');
const router = express.Router();
const logController = require('../controllers/log.controller'); 
const employeeController=require('../controllers/employee.controller')
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const ErrorHandling       = require('../utils/errorHandling.utils')
const sanitizeMiddleware = require('../middleware/sanitize.middleware');

const SaveRequestMiddleware   =  require('../middleware/saverequest.middleware');

router.use(sanitizeMiddleware);
router.use(SaveRequestMiddleware)

// ***************** EMPLOYEE MANAGEMENT API **************//
router.post('/create_employees',awaitHandlerFactory(employeeController.create_customer));
router.put('/update_employees', awaitHandlerFactory(employeeController.create_customer));
router.get('/list_employees', awaitHandlerFactory(employeeController.list_employees));
router.delete('/delete_employees', awaitHandlerFactory(employeeController.delete_employees));

//****************** SETTINGS API ********************/ 
router.get('/api_log_list', awaitHandlerFactory(logController.api_log_list));
router.get('/track_log_list', awaitHandlerFactory(logController.track_log_list));

//****************** ERROR MANAGEMENT API ********************/ 
router.get('/logs/:date/:type', ErrorHandling.error_handling_method);


module.exports = router;
