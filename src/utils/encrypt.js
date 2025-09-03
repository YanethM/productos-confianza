import CryptoJS from "crypto-js";

let salt = import.meta.env.VITE_APP_1;
let iv = import.meta.env.VITE_APP_2;
let passPhrase = import.meta.env.VITE_PRS_1;
let passPhraseT = import.meta.env.VITE_PRS_2;
let keySize = 256;
let iterations = 1;

/**
 * MAC Registro
 * @param data
 * @param pasivo
 * @returns {*}
 */
function encmr(data, pasivo = true) {
  let datae;
  if (pasivo) {
    datae = `{"productType":"${data.productType}","documentType":"${data.documentType}","documentNumber":"${data.documentNumber}","phone":"${data.phone}","email":"${data.email}","origin":"${data.origin}","mode":"${data.mode}","referenceCode":"${data.referenceCode}"}`;
  } else {
    datae = `{"documentType":"${data.documentType}","documentNumber":"${data.documentNumber}","phone":"${data.phone}","email":"${data.email}","origin":"${data.origin}","mode":"${data.mode}"}`;
  }
  return CryptoJS.SHA256(datae).toString();
}

/**
 * MAC Activos
 * @param data
 * @returns {*}
 */
function encmac(data) {
  let datae = `{"token":"${data.token}","tokenBT":"${data.tokenBT}","amountRequested":"${data.amountRequested}","mode":"${data.mode}"}`;

  return CryptoJS.SHA256(datae).toString();
}

/**
 * MAC Activos - Monto
 * @param data
 * @returns {*}
 */
function encma(data) {
  let datae = `{"token":"${data.token}","tokenBT":"${data.tokenBT}","names":"${data.names}","lastNames":"${data.lastNames}","birthDate":"${data.birthDate}","expirationDate":"${data.expirationDate}","ubigeoDepartment":"${data.ubigeoDepartment}","ubigeoProvince":"${data.ubigeoProvince}","ubigeoDistrict":"${data.ubigeoDistrict}","agency":"${data.agency}","amountRequested":"${data.amountRequested}","mode":"${data.mode}"}`;

  return CryptoJS.SHA256(datae).toString();
}

/**
 * MAC Pasivos
 * @param data
 * @returns {*}
 */
function encmp(data) {
  let datae = `{"token":"${data.token}","tokenBT":"${data.tokenBT}","names":"${data.names}","lastNames":"${data.lastNames}","ubigeoDepartment":"${data.ubigeoDepartment}","ubigeoProvince":"${data.ubigeoProvince}","ubigeoDistrict":"${data.ubigeoDistrict}","agency":"${data.agency}","mode":"${data.mode}"}`;

  return CryptoJS.SHA256(datae).toString();
}

/**
 * Data
 * @param data
 * @returns {string}
 */
function encd(data) {
  let key = CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), {
    keySize: keySize / 32,
    iterations: iterations,
  });

  let encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: CryptoJS.enc.Hex.parse(iv),
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

/**
 * Token
 * @param plainText
 * @returns {string}
 */
function enct(plainText) {
  let key = CryptoJS.PBKDF2(passPhraseT, CryptoJS.enc.Hex.parse(salt), {
    keySize: keySize / 32,
    iterations: iterations,
  });

  let encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: CryptoJS.enc.Hex.parse(iv),
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export { encmr, encma, encmac, encmp, enct, encd };
