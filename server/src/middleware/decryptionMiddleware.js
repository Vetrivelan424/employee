const { encrypt, decrypt } = require('../utils/encrypt_decrypt.utils');

// const decryptValuesMiddleware = (keys) => {
//     // Decrypt values based on keys
//     Object.keys(keys).forEach((key) => {
//         if (keys[key]) {
//             keys[key] = decrypt(keys[key]);
//         }
//     });
//     console.log('\n')
//     console.log("decryptedData : ", keys);
//     console.log('\n')

// };
const decryptValuesMiddleware = (keys) => (req, res, next) => {
  // Decrypt values based on keys
  keys.forEach((key) => {
    if (res.decryptedData[key]) {
      var decrypted_value = decrypt(res[0][key]);
      res[0][key] =  !decrypted_value ? res[0][key] : decrypted_value ;
    }
  });

  return res;
};

module.exports = decryptValuesMiddleware;
