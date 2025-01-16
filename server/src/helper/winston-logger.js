/***************************************************************************************
 * @author       TVS-employee central
 * @module       helpers
 * @name         winston-logger
 * @description  Logger utility helper to handle log scenarios and exceptions globally 
 * @copyright    TVS-employee central
 * @createdon    Mar 2022
 * @since        1.0
 ***************************************************************************************/
'use strict';

const winston = require('winston'),
    fs        = require('fs'),
    path      = require('path');
 
    const isValidStr = function(data) {
      return(typeof(data) !== 'undefined' && data !== null && data !== '')
  };//isValidStr
const {sendExceptionEmail } =require('./global-functions')
require('winston-daily-rotate-file');
const { encrypt, decrypt } = require('../utils/encrypt_decrypt.utils');

const logDirectory = path.join(__dirname + '/../', 'logs');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

//initLogger
const initLogger = (file_default_key) => {
    let rotateTransport = new (winston.transports.DailyRotateFile)({
        filename: logDirectory + '/app-ct-%DATE%' + '.log', // this path needs to be absolute
        datePattern: 'YYYYMMDD',
        //datePattern: 'X', //Unix Timestamp	X
        //x Unix Millisecond Timestamp 
        maxSize: '100m',
        zippedArchive: true,
        json: false,
        keep: 1,
        compress: false,
        //maxFiles:'14d'
    });

    // console logger
    let consoleLogger = new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp: true
    });

    let transportsList = [rotateTransport];

    // if (CONFIG.env === 'local') {
    //     transportsList.push(consoleLogger);
    // }// console logger

    //logger init
    let logger = new winston.createLogger({
        exitOnError: false, format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(log => {
                return `${log.timestamp} - ${log.level}: ${log.message} ${(log.data) ? JSON.stringify(log.data) : ''}`;
            })
        ), transports: transportsList
    });//logger

    return logger;
};//initLogger

//initCJOBLogger
const initCJOBLogger = (file_default_key) => {
    let rotateTransport = new (winston.transports.DailyRotateFile)({
        filename: logDirectory + '/cjob-ct-%DATE%.' + file_default_key + '.log', // this path needs to be absolute
        datePattern: 'YYYYMMDD',
        maxSize: '100m',
        zippedArchive: true,
        json: false,
        keep: 1,
        compress: false,
        //maxFiles:'14d'
    });

    // console logger
    let consoleLogger = new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp: true
    });

    let transportsList = [rotateTransport];

    if (CONFIG.env === 'local') {
        // transportsList.push(consoleLogger);
    }// console logger

    //logger init
    let cjob_logger = new winston.createLogger({
        exitOnError: false, format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(log => {
                return `${log.timestamp} - ${log.level}: ${log.message} ${(log.data) ? JSON.stringify(log.data) : ''}`;
            })
        ), transports: transportsList
    });//logger

    return cjob_logger;
};//initCJOBLogger
/***************************************************/
/********************* EXPORT **********************/
/***************************************************/
//module.exports = initLogger('default');//comment to avoid default log file initialization on load
module.exports.logger = initLogger('default');

//stream
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
        // logger.info(message.slice(0, -1));
    }
};//stream

//loggerMiddleware
module.exports.loggerMiddleware = function (req, res, next) {
    //logger instance 
    let loggerNew;

    if (isWordContains(req.path, '/cjobs')) {
        //logger instance 
        loggerNew = initCJOBLogger(req.current_version);
    } else {
        //logger instance 
        loggerNew = initLogger(req.current_version);
    }

    req.logger    = loggerNew;
    let startTime;
    if (req.method) {
        let method    = req.method.toLowerCase();
        //let start   = new Date(); 
        startTime = getStartTime();
        logger.info('API request ' + req.path + ' Starts Here ');
        // let base_url_data = req.baseUrl.split('/'); 
        req.current_version = req.baseUrl;
    }

    //end logger event handling
    res.on('finish', function () {
        //let end = new Date() - start; //time to milli seconds  
        //let base_url_data = req.baseUrl;  
        let elapsedTime     = parseHrsToSecs(getElapsedTime(startTime)); //parse hrs to seconds
        const endLogDetails = {
            data: {
                module: 'core',
                req: {
                    method: req.method,
                    url: req.url,
                    ip: req.ip,
                    exe_time: elapsedTime + 's',
                    req_res_id: (req.req_res_id) ? req.req_res_id : '',
                    base_url: req.baseUrl
                },
                res: {
                    status_code: res.statusCode
                }
            }
        };
        logger.info('API request ' + req.path + ' Ends Here ', endLogDetails);
    });
    next();
};//loggerMiddleware

//loggerByVersionMiddleware
module.exports.loggerByVersionMiddleware = function (req, res, next) {
    //logger instance 
    let loggerNew = initLogger(req.current_version);
    req.logger    = loggerNew;
    let startTime ;

    if (req.method) {
        let method  = req.method.toLowerCase();
        //let start = new Date(); 
        startTime = getStartTime();
        loggerNew.info('API request ' + req.path + ' Starts Here ');
        //req.current_version = isValidStr(req.current_version)?req.current_version:"default";
    }
    //end logger event handling
    res.on('finish', function () {
        //let end = new Date() - start; //time to milli seconds          
        let elapsedTime = parseHrsToSecs(getElapsedTime(startTime)); //parse hrs to seconds
        const endLogDetails = {
            data: {
                module: 'core',
                req: {
                    method: req.method,
                    url: req.url,
                    ip: req.ip,
                    exe_time: elapsedTime + 's',
                    req_res_id: (req.req_res_id) ? req.req_res_id : '',
                    base_url: req.baseUrl,
                    ver: isValidStr(req.current_version) ? req.current_version : "default"
                },
                res: {
                    status_code: res.statusCode
                }
            }
        };
        loggerNew.info('API request ' + req.path + ' Ends Here ', endLogDetails);
    });
    next();
};//loggerByVersionMiddleware

//exceptionMiddleware
module.exports.exceptionMiddleware = function (err, req, res, next) {
    let statusCode   = err.status || 500;
    let statusText   = '';
    let errorDetail  = (process.env.NODE_ENV === 'live') ? 'Sorry about this error' : err.stack;
    let is_exception = 1;
    let sendMail     = false;
    //let logger     = req.logger;
    switch (statusCode) {
        case 400:
            statusText = 'Bad Request: ' + err.message;
            break;
        case 401:
            statusText = 'Unauthorized';
            break;
        case 403:
            statusText = 'Forbidden';
            break;
        case 500:
            statusText = 'Internal Server Error';
            sendMail   = true;
            break;
    }

    //handling different sql exceptions and status code scenarios 
    res.status(statusCode);
    if (isValidStr(err.message) && isValidStr(req.logger))
        req.logger.error(err.message, { stack: (err.stack ? err.stack : err) });

    if (isValidStr(err.sqlState)) {
        //handling sql exceptions for duplicate records

        //if(isValidStr(err.errno)) {
        switch (err.errno) {
            case 1062:
                statusText = 'Data already Exists.';
                statusCode = 200;
                //is_exception = 1;
                break;
            case 1406:
                statusText = 'Data too long for column.';
                //statusCode = 400;
                statusCode = 200;
                //is_exception = 1;
                break;
            //case to handle if the sub query transactions exists for the parent table
            case 1451:
                statusText = "You can't delete this record as you have transactions";
                //statusCode = 400;
                statusCode = 200;
                //is_exception = 1;
                break;
            default:
                sendExceptionEmail(err, req, res, next);
                break;
        }
        // } else {
        //     sendExceptionEmail(err, req, res, next);
        // }        


        if (req.accepts('json')) {
            console.log('error: ' + err)
            let response = { valid: false, message: statusText, is_exception: is_exception };

            if (CONFIG.env !== 'local')
                response = { edata: response };

            res.status(statusCode).send(response);

        }
    }
    else {
        //diff end res handling scenarios

        //other than local env sending mail based on the sendMail boolean value
        if (sendMail && CONFIG.env !== 'local') {
            sendExceptionEmail(err, req, res, next);
        }

        if (res.headersSent) {
            console.log(err)
            return next(err)
        }

        if (req.accepts('json')) {
            let cresponse = { title: statusCode + ': ' + statusText, error: errorDetail, url: req.url, is_exception: is_exception };
            if (CONFIG.env !== 'local')
                cresponse = { edata: cresponse };
            res.status(statusCode).status(statusCode).send(cresponse);
        } else {
            console.log(err)
            next();
        }

    }

};//exceptionMiddleware

//logAndCrash Middleware
module.exports.logAndCrash = function (err, req) {
    let loggerN = initLogger('unhexcep');
    loggerN.error(err.message, { stack: err.stack });
    throw err;
};//logAndCrash Middleware

