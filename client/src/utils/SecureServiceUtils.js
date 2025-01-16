
import CryptoJS from 'crypto-js';
//#endregion
const CONFIG =require( '../config/config');

  //#region encryptParamHandler
  /**
   * Encrypts a parameter using AES encryption.
   * @name encryptParamHandler
   * @param {any} value - The value to be encrypted.
   * @returns {string} - The encrypted value as a string.
   * @version 1.0.0
  */

export let encryptParamHandler=  function (value) {
    const key = CryptoJS.enc.Utf8.parse(CONFIG.REACT_APP_AES_ENC_SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(CONFIG.REACT_APP_AES_ENC_IV);
    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(value.toString()),
      key,
      {
        keySize: 256 / 32,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return encrypted.toString();
  };
  //#endregion

  //#region decryptParamHandler
  /**
   * Decrypts a parameter using AES decryption.
   * @name decryptParamHandler
   * @param {string} value - The encrypted value to be decrypted.
   * @returns {string} - The decrypted value as a string.
   * @version 1.0.0
  */
  export let decryptParamHandler=function (value) {
    const key = CryptoJS.enc.Utf8.parse(CONFIG.REACT_APP_AES_ENC_SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(CONFIG.REACT_APP_AES_ENC_IV);

    const decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 256 / 32,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  //#endregion

  //#region encryptHandler
  /**
   * Encrypts a value using AES encryption.
   * @name encryptHandler
   * @param {any} value - The value to be encrypted.
   * @returns {string} - The encrypted value as a string.
   * @version 1.0.0
  */
  export let encryptHandler=(value) =>{
    const key = CryptoJS.enc.Utf8.parse(CONFIG.REACT_APP_AES_ENC_SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(CONFIG.REACT_APP_AES_ENC_IV);
    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(value.toString()),
      key,
      {
        keySize: 256 / 32,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return encrypted.toString();
  }
  //#endregion

  let encrypt_replace = function (text) {
    text = text.replace(/\+/g, 'xMl3xcJk');
    text = text.replace(/\//g, 'Por21xcLd');
    text = text.replace(/=/g, 'Mlxc32');
    return text;
  };
  
  let decrypt_replace = function (text) {
    text = text?.replace(/xMl3xcJk/g, '+');
    text = text?.replace(/Por21xcLd/g, '/');
    text = text?.replace(/Mlxc32/g, '=');
    return text;
  };

  //#region decryptHandler
  /**
   * Decrypts a value using AES decryption.
   * @name decryptHandler
   * @param {string} value - The encrypted value to be decrypted.
   * @returns {string} - The decrypted value as a string.
   * @version 1.0.0
  */
  export let decryptHandler=(value) =>{
    const key = CryptoJS.enc.Utf8.parse(CONFIG.REACT_APP_AES_ENC_SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(CONFIG.REACT_APP_AES_ENC_IV);

    const decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 256 / 32,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  //#endregion

  //#region decryptJSONHandler
  /**
   * Decrypts a JSON object using AES decryption.
   * @name decryptJSONHandler
   * @param {string} value - The encrypted JSON object to be decrypted.
   * @returns {object} - The decrypted JSON object.
   * @version 1.0.0
  */
  export let decryptJSONHandler=(value) =>{
    const key = CryptoJS.enc.Utf8.parse(CONFIG.REACT_APP_AES_ENC_SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(CONFIG.REACT_APP_AES_ENC_IV);
    const replace_value = decrypt_replace(value)
    const decrypted = CryptoJS.AES.decrypt(replace_value, key, {
      keySize: 256 / 32,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }
  //#endregion

  //#region encryptJSONHandler
  /**
   * Encrypts a JSON object using AES encryption.
   * @name encryptJSONHandler
   * @param {object} value - The JSON object to be encrypted.
   * @returns {string} - The encrypted JSON object as a string.
   * @version 1.0.0
  */
  export let encryptJSONHandler=(value)=> {
    const key = CryptoJS.enc.Utf8.parse(CONFIG.REACT_APP_AES_ENC_SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(CONFIG.REACT_APP_AES_ENC_IV);

    const encrypted = CryptoJS.AES.encrypt(value, key, {
      keySize: 256 / 32,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypt_replace(encrypted.toString());
  }
  //#endregion

  export let decrypt = (encryptedData) => {
    let key = SKEY; // length 32
    let iv = IV;
    var stringWithPlusSigns = decrypt_replace(encryptedData);
  
    const decipher = CryptoJS.AES.decrypt(stringWithPlusSigns, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
  
    return decipher.toString(CryptoJS.enc.Utf8);
  }
