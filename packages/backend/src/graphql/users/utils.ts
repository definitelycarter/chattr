import jwt from 'jsonwebtoken';

export function sign<T extends string | object | Buffer>(payload: T): string {
  return jwt.sign(payload, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
}

export function verify<T>(token: string): T {
  const decoded = jwt.decode(token);
  return decoded as T;
}
