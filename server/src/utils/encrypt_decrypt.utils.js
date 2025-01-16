const crypto = require('crypto');
const dotenv = require('dotenv');
const CryptoJS = require('crypto-js')
dotenv.config();

const SKEY = process.env.AES_ENC_SECRET_KEY_WEB;
const IV = process.env.AES_ENC_IV_WEB;
const DEFAULT_ALGORITHM = 'aes-256-cbc';
const TEXT_FORMAT = 'base64';
const UTF8 = 'utf8';

let encrypt_replace = function (text) {
  text = text.replace(/\+/g, 'xMl3xcJk');
  text = text.replace(/\//g, 'Por21xcLd');
  text = text.replace(/=/g, 'Mlxc32');
  return text;
};

let decrypt_replace = function (text) {
  text = text.replace(/xMl3xcJk/g, '+');
  text = text.replace(/Por21xcLd/g, '/');
  text = text.replace(/Mlxc32/g, '=');
  return text;
};



let encrypt = (data) => {
  try {
    if (data !== undefined || data !== '' || data !== null) {
      let key = SKEY;    //length 32
      let iv = IV;
      var data_str = String(data);
      const cipher = CryptoJS.AES.encrypt(data_str, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv), // parse the IV 
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
      })

      // e.g. B6AeMHPHkEe7/KHsZ6TW/Q==
      return encrypt_replace(cipher.toString())
    } else {
      return null
    }
  } catch (err) {
    console.log("encrpt : ", err.message)
    return null;
  }
}

let decrypt = (encryptedData) => {
  try {
    let key = SKEY; // length 32
    let iv = IV;
    if (encryptedData !== undefined || encryptedData !== '' || encryptedData !== null) {
      var stringWithPlusSigns = decrypt_replace(encryptedData);

      const decipher = CryptoJS.AES.decrypt(stringWithPlusSigns, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
      });
      let decrpt_data = decipher.toString(CryptoJS.enc.Utf8)
      if (decrpt_data.trim().length === 0) {
        return null;
      } else {
        return decrpt_data;
      }
    } else {
      return null;
    }
  }
  catch (err) {
    console.log("decrypt : ", err.message);
    // console.log(err);
    return null;
  }
}

let aesEncrypt = function (given_text, alg = DEFAULT_ALGORITHM) {
  try {
    given_text = String(given_text);
    const cipher = crypto.createCipheriv(alg, SKEY, IV);
    var chunks = []
    chunks.push(cipher.update(given_text, UTF8, TEXT_FORMAT))
    chunks.push(cipher.final(TEXT_FORMAT))
    return encrypt_replace(chunks.join(''));
  }
  catch (err) {
    // console.log(err.message);
    // console.log(err);
    return null;
  }

};

let aesDecrypt = function (given_text, alg = DEFAULT_ALGORITHM) {

  try {
    if (given_text != undefined && given_text.length > 10) {
      given_text = decrypt_replace(given_text);
      const decipher = crypto.createDecipheriv(alg, SKEY, IV);
      var chunks = []
      chunks.push(decipher.update(given_text, TEXT_FORMAT, UTF8))
      chunks.push(decipher.final(UTF8))
      return chunks.join('');
    } else {
      return false
    }
  }
  catch (err) {
    // console.log(err.message);
    // console.log(err);
    return null;
  }
};

let encryptJSON = function (given_text, alg = DEFAULT_ALGORITHM, skey = SKEY) {
  var json_to_str = new Buffer.from(JSON.stringify(given_text), "utf8");
  const cipher = crypto.createCipheriv(alg, SKEY, IV);
  var chunks = []
  chunks.push(cipher.update(json_to_str, UTF8, TEXT_FORMAT))
  chunks.push(cipher.final(TEXT_FORMAT))
  return chunks.join('');
};

let decryptJSON = function (given_text, alg = DEFAULT_ALGORITHM) {
  const decipher = crypto.createDecipheriv(alg, SKEY, IV);
  var chunks = []
  chunks.push(decipher.update(given_text, TEXT_FORMAT, UTF8))
  chunks.push(decipher.final(UTF8))
  return parse.JSON(chunks.join(''));
};


function getCrypto(secret, encode) {
  // Create hashed key from password/key
  let m = crypto.createHash('md5').update(secret);
  const key = m.digest('hex');
  m = crypto.createHash('md5').update(secret + key);
  const iv = m.digest('hex').slice(0, 16); // only in aes-256

  return encode
    ? crypto.createCipheriv('aes-256-cbc', key, iv)
    : crypto.createDecipheriv('aes-256-cbc', key, iv);
}

function encryptMlData(value) {
  let secret = SKEY;
  const data = Buffer.from(value, 'utf8').toString('binary');
  const cipher = getCrypto(secret, true);
  const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]).toString('binary');
  return Buffer.from(encrypted, 'binary').toString('base64');
}

function decryptMldata(encoded) {
  let secret = SKEY;
  const edata = Buffer.from(encoded, 'base64').toString('binary');
  const decipher = getCrypto(secret, false);
  return Buffer.concat([decipher.update(edata, 'binary'), decipher.final()]).toString('utf-8');
}

module.exports.encryptMlData =encryptMlData;
module.exports.decryptMldata =decryptMldata;
module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
module.exports.aesDecrypt = aesDecrypt;
module.exports.encryptJSON = encryptJSON;
module.exports.decryptJSON = decryptJSON;



