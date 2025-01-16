/* eslint-disable eqeqeq */
const CONFIG = {
   
}
if (process.env.ENV === 'LOCAL') {
  CONFIG.ENV= 'LOCAL';
  CONFIG.API_URL= "http://localhost:3000/api/v1";
  CONFIG.SOCKET_URL= 'http://localhost:3000';
  CONFIG.SITE_URL= 'http://localhost:4000/';
  CONFIG.TIMEOUT= 10000;
  CONFIG.MINCHAR= 3;
  CONFIG.MAXCHAR= 25;
  CONFIG.CONTENT_LEGNTH= 2000;
}
if (process.env.ENV === 'DEV') {
 
}
else if (process.env.ENV === 'QA') {
 
}
else if (process.env.ENV === 'STAGING') {

}
module.exports = CONFIG;

