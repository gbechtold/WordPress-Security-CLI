// src/core/encryption.ts
import CryptoJS from 'crypto-js';

export function encryptValue(value: string): string {
  const key = process.env.ENCRYPTION_KEY as string;
  const salt = process.env.SALT as string;
  return CryptoJS.AES.encrypt(value, key + salt).toString();
}

export function decryptValue(encrypted: string): string {
  const key = process.env.ENCRYPTION_KEY as string;
  const salt = process.env.SALT as string;
  const bytes = CryptoJS.AES.decrypt(encrypted, key + salt);
  return bytes.toString(CryptoJS.enc.Utf8);
}
