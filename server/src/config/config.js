 CONFIG = {}
const BASE_PATH = process.cwd() + '/';
CONFIG.BASE_PATH = BASE_PATH
require('dotenv').config({ path: CONFIG.BASE_PATH + '.env' });

if (process.env.NODE_ENV == 'LOCAL') {
  CONFIG.NODE_ENV = process.env.NODE_ENV;
  CONFIG.PORT = process.env.PORT;
  CONFIG.SITE_URL = process.env.SITE_URL;
  CONFIG.SOCKET_URL = process.env.SOCKET_URL;
  CONFIG.DB_HOST = process.env.DB_HOST;
  CONFIG.DB_USER = process.env.DB_USER;
  CONFIG.DB_PASS = process.env.DB_PASS;
  CONFIG.DB_DATABASE = process.env.DB_DATABASE;
  CONFIG.SECRET_JWT = process.env.SECRET_JWT;
  CONFIG.SMTP_GLOBAL_USER = process.env.SMTP_GLOBAL_USER;
  CONFIG.SMTP_GLOBAL_PWD = process.env.SMTP_GLOBAL_PWD;
  CONFIG.SMTP_HOST = process.env.SMTP_HOST;
  CONFIG.SMTP_FROM = process.env.SMTP_FROM;
  CONFIG.AWS_END_POINT = process.env.AWS_END_POINT;
  CONFIG.AWS_REGION = process.env.AWS_REGION;
  CONFIG.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
  CONFIG.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
  CONFIG.AWS_ACL = process.env.AWS_ACL;
  CONFIG.AWS_BUCKET = process.env.AWS_BUCKET;
  CONFIG.SSL_KEY = process.env.SSL_KEY;
  CONFIG.SSL_CERT = process.env.SSL_CERT;
  CONFIG.SSL_CA = process.env.SSL_CA;
  CONFIG.S3_PATH = process.env.AWS_END_POINT + '';
  CONFIG.ML_TARGET_URL = '';
  CONFIG.LOG_ERR = false;
  CONFIG.LOG_DATA = true;
 
}
else if (process.env.NODE_ENV == 'DEV' || process.env.NODE_ENV =='development') {
  
}
else if (process.env.NODE_ENV == 'QA') {

}
else if (process.env.NODE_ENV == 'STAGING') {
  

}
else if (process.env.NODE_ENV == 'TEST') {
 
}
CONFIG.AES_ENC_SECRET_KEY_WEB = process.env.AES_ENC_SECRET_KEY_WEB;
CONFIG.AES_ENC_IV_WEB = process.env.AES_ENC_IV_WEB;

CONFIG.FILE_PROCESS_TIME = 300;
CONFIG.DATA_LENGTH = 2000;
CONFIG.LOGOUT_TIME_HOUR = 24;


module.exports = CONFIG;