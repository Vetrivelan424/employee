const { encrypt, decrypt } = require('../utils/encrypt_decrypt.utils');
const logger = require('../helper/winston-loggers')
const encryptJSONHandler = function (given_text) {
  //convert the given json to string
  let json_to_str = new Buffer.from(JSON.stringify(given_text), "utf8");
  return json_to_str;
}
// Middleware function to encrypt the response

const encryptResponseMiddleware = (req, res, next) => {
  
  logger.info(`HTTP ${req.method} ${req.path} - Query: ${JSON.stringify(req.query)} - Body: ${JSON.stringify(req.body)}`);

  if (req.headers['encrypt'] !== '1') {
    if (req.method == 'POST') {
      const data = decrypt(req?.body?.edata)
      req.body = JSON.parse(data)
    } else if (req.method == 'GET') {
      // console.log(req.params)
    }
    // Route Acccees logger
    
    // reseponse encrypt method
    const originalSend = res.send.bind(res);
    res.send = function (data) {
      // Encrypt response data before sending
      const encryptedData = encrypt(encryptJSONHandler(data));
      const wrappedData = { edata: encryptedData };

      originalSend(JSON.stringify(wrappedData));
    };
  }
  next();
};

module.exports = encryptResponseMiddleware;
