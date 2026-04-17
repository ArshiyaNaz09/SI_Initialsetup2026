import { randomBytes } from 'react-native-randombytes';
import CryptoJS from 'crypto-js';

/**
 * Generates a secure random 16-byte IV
 */
export const generateIV = (): Promise<CryptoJS.lib.WordArray> => {
  return new Promise((resolve, reject) => {
    randomBytes(16, (err: any, bytes: any) => {
      if (err) return reject(err);
      const wordArray = CryptoJS.lib.WordArray.create(bytes as any);
      resolve(wordArray);
    });
  });
};
/**
 * Encrypts plain text using AES-CBC-PKCS7
 * IV is prepended to ciphertext (compatible with .NET backend)
 */
export const encryptPassword = async (plainText: string, base64Key: string): Promise<string> => {
  if (!plainText) throw new Error('plainText is required');
  if (!base64Key) throw new Error('base64Key is required');

  const key = CryptoJS.enc.Base64.parse(base64Key);
  const iv = await generateIV();

  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const combined = iv.clone().concat(encrypted.ciphertext);
  return CryptoJS.enc.Base64.stringify(combined);
};

/**
 * Decrypts AES-CBC-PKCS7 data
 * Expects Base64( IV + CipherText )
 */
export const decrypt = (cipherTextBase64: string, base64Key: string): string => {
  if (!cipherTextBase64) throw new Error('cipherTextBase64 is required');
  if (!base64Key) throw new Error('base64Key is required');

  const key = CryptoJS.enc.Base64.parse(base64Key);
  const allBytes = CryptoJS.enc.Base64.parse(cipherTextBase64);

  // Extract IV (first 16 bytes = 4 words)
  const iv = CryptoJS.lib.WordArray.create(allBytes.words.slice(0, 4), 16);

  // Extract ciphertext
  const cipherText = CryptoJS.lib.WordArray.create(
    allBytes.words.slice(4),
    allBytes.sigBytes - 16
  );

  const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: cipherText });

  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};