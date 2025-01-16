const { encrypt, decrypt } = require('../utils/encrypt_decrypt.utils');
const decryptValuesMiddleware  = require('./decryptionMiddleware');

// const encryptValuesMiddleware = (keys) => {
//     // Encrypt values based on keys
//     Object.keys(keys).forEach((key) => {
//         if (keys[key]) {
//             keys[key] = encrypt(keys[key]);
//         }
//     });
//     console.log('\n')
//     console.log("encryptionMiddleware : ", keys);
//     console.log('\n')
//     decryptValuesMiddleware(keys)
//     throw new Error('stop processing');
//     return keys;
// };
const encryptValuesMiddleware = (keys) => (req, res, next) => {
  // Encrypt values based on keys

  Object.keys(req.body).forEach((key) => {
    if (req.body[key]) {
      req.body[key] = encrypt(req.body[key].trim());
    }
  });

  next();
};

module.exports = encryptValuesMiddleware;


// require('../middleware/encryptionMiddleware');
// require('../middleware/decryptionMiddleware');