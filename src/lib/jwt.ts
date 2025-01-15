// src/lib/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

// Define a type for the payload
type TokenPayload = {
  [key: string]: any; // Replace `any` with a more specific type if known
};

// Updated function to sign a token
export const signToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

// Updated function to verify a token
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (_error) {
    return null; // Gracefully handle verification failures
  }
};
