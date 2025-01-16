/********************************************************************************
 * @author       TVS-employee central
 * @module       helper
 * @name         global-functions
 * @description  Global Functions Handler
 * @copyright    TVS-employee central
 * @Createdon    Mar 2022
 * @since        1.0
 *********************************************************************************/
const path 	                                  = require('path');

const EMAIL_TEMPLATES_PATH                    = path.join(__dirname, './'); 

const { custom_error_log } = require('../utils/common.utils');
 


// ====================================================================
// Email Handling Functionalities Starts Here
// ====================================================================
//sendExceptionEmail - send Exception Email
const sendExceptionEmail = function(err_data, req, res, next) {
    const mailer        = require('./mail'), //load mail helper
        ejs             = require('ejs'); 

    //mail functionality template params settings
    let env             = CONFIG.env;
    let params          = {};
    params.environment  = env;
    params.page_title   = 'exception';
    params.current_time = Date.now() + '(UTC)';
    params.result       = err_data.stack;
    //params.created_line = err_data.stack;
    params.unique_key   = req.req_res_id;
    const isValidStr = function(data) {
      return(typeof(data) !== 'undefined' && data !== null && data !== '')
  };

    if (true) {//email exeption enabled condition verification starts here
      custom_error_log(err_data)

        //html email template rendering and send email functionality
        // ejs.renderFile(EMAIL_TEMPLATES_PATH + 'exception'+ '.ejs', params , {async:false}, function (err, data) {      
        //     if (err) {
        //         next(err);
        //     } else {           
        //         params.html    = data;
        //         params.subject = 'Exception Occured On '+ env +' - '+ req.path;
        //         if (!mailer.DISABLE_SEND_EMAIL) { //disable email checking process
        //             let mailOptions = mailer.mailOptions(params);
        //             mailer.sender(mailOptions)
        //             .then(info => req.logger.info('exception email sent: '+ info.messageId))
        //             .catch(err => next(err));
        //         } else {
        //             req.logger.info('email sending disabled');
        //         }
        //     }
        // });
    } else {
        next(err_data);
        req.logger.info('exception triggered');
    } // email exception else conditions ends here
};//end of sendExceptionEmail

//sendEmail - send Email
sendEmail = function(req, res, next, params = {}) {

    const mailer   = require('./mail.'+CONFIG.app_files_key), //load mail helper
          ejs      = require('ejs'); 
     
    //mail functionality template params settings    
    return new Promise(async function(resolve, reject) {
        
        let email_params_data = await globalMailParamsHandler(req, params);
        // console.log(email_params_data)
        //html email template rendering and send email functionality
        ejs.renderFile(EMAIL_TEMPLATES_PATH + email_params_data.template + '_'+ CONFIG.app_files_key +'.ejs', email_params_data ,{async:false},  function (err, data) {      
            if (err) {
                
                next(err);
            } else {
                params.html = data;
                //params.subject = params.subject;
                //let mailOptions = mailer.mailOptions(params);
                if (!mailer.DISABLE_SEND_EMAIL && isValidStr(params.to)) { //disable email checking process
                    mailer.sender(params)
                    .then(async info => { 
                        if (isValidStr(info.messageId))
                        req.logger.info('Email sent successfully: ' + info.messageId);
                        if (isValidStr(info.messageId) || isValidStr(info) && info === true) {
                            params.msg_res_info = info;
                            params.msg_id = info.messageId;
                            const mtrack_res = await addEmailTransDataProcess(params, req, next)
                            //console.log('mtrack_res',mtrack_res);
                            resolve(true); //resolve(info.messageId);
                        } else
                        resolve(false);
                        params.html = data;                    
                    })
                    .catch(err => { req.logger.error('Error:', err); reject(false); });
                } else {
                    req.logger.info('Email sending disabled');
                    resolve(true);
                }
            }
        });
    }); 

};//end of sendEmail

exports.sendExceptionEmail =sendExceptionEmail
