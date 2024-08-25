import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

export function signJwt(payload: Object, options?: SignOptions): string {
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256', // RSA SHA-256 signing algorithm
    expiresIn: '12h', // Set a default expiration of 12 hours
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
