// src/lib/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

// Define a more specific type for the payload
type TokenPayload = Record<string, unknown>; // Replacing `any` with `unknown`

// Updated function to sign a token
export const signToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

// Updated function to verify a token
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null; // No need to use the error variable if not needed
  }
};
