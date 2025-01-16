var passport      = require("passport"),
    //strategies
    Strategy   = require("passport-jwt").Strategy,
    ExtractJwt    = require("passport-jwt").ExtractJwt;


const User = require('../models/log.model');
const CONFIG = require('../config/config');
const { custom_error_log } = require('../utils/common.utils');

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = CONFIG.SECRET_JWT;
options.passReqToCallback = true;

passport.use(new Strategy(options, (req, payload, done) => {// consol.log(req)
  let check_token = req.headers['authorization'];
  check_token = check_token.toLowerCase();
  check_token = check_token.replace("bearer", "");
  check_token = check_token.trim();

  User.check_token({token:check_token}, req)
   .then(user => {
    if(user){
      if(user.length > 0) {
        req.body.user_id                  = user[0].user_id;
        req.query.user_id                 = user[0].user_id;
        req.body.user_fullname            = user[0].first_name+' '+user[0].last_name;
      }
      return done(null, user);
    }
    return done(null, false);
   })
   .catch(err => { console.log(err)
    throw new Error(err)
   });
 }));



const middlewareObj = {};

// JSON WEB TOKENS STRATEGY VERIFICATION
middlewareObj.passportJWT = function(req, res, next) {
 
   //paths to skip passport secure authentication
  var nonSecurePaths = ['/', '/list_employees', '/testing', '/forget_password', '/forget_password_token_check','/password_reset', '/restore_user', '/user_restore_mail_notiification'];
  if(req.path || req.path == '/csv_to_db' || req.path == '/sent_waiting_email' || req.path == '/anonymous_users_update_cron' ||req.path.startsWith('/logs/')) {
    next();
  }
  else if (nonSecurePaths.includes(req.path)) {
     const bearer = 'Bearer';
     const token_data = req.headers['authorization'];
    let response = {}, status_code;
    if (!token_data || (token_data && token_data != 'bXVydWdhOmFtbhbW1hYW1tYTEyM2FhMg')) { 
      status_code = 200;
      response = { "valid": false, "message": "Access Denied! Invalid Authorization" };   
    }
    if (Object.keys(response).length) {
      res.status(status_code).send(response);
    } else {
      next();
    }
  } else {

  var status_code = 200;
  
  return passport.authenticate('jwt', { session: false }, (err, user, info = {}) => {

    let response = {}, status_code; const bearer = 'bearer';
    if(typeof req.headers['authorization'] == 'string') {
      var token_data = req.headers['authorization'].split(" ");
    }
    user = user[0];
    if (user == undefined || user.user_token == undefined || (token_data[0] && bearer !== token_data[0].toLowerCase()) || (token_data[1] && user && user !== false && token_data[1] !== user.user_token && !err )) {
      status_code = 200;
       response = { "valid": false, 'force_logout' :1, "message": "Access Denied! Invalid Authorization", "project_data": [] }; 

     }
     else if(user?.session_expired == 1) {
      status_code = 200;
       response = { "valid": false, 'session_expired' : 1, 'force_logout' :1, "message": "Access Denied! Invalid Authorization", "project_data": [] }; 

     }
    
    if (Object.keys(response).length) {
      res.status(status_code).send(response);
    }else{
       next();
    }  
  })(req, res, next);
}
};


module.exports = middlewareObj;