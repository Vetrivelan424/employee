 
const sanitizeObject = require('../helper/global.helper');

const sanitizeMiddleware = (req, res, next) => {
  console.log('req.body',req.body)
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  next();
};


module.exports = sanitizeMiddleware;
