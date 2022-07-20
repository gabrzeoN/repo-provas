import dotenv from "dotenv";
dotenv.config();

export const bcrypt = (+process.env.CRYPT_SALT_SALT || 10);
export const cryptr = (process.env.CRYPTR_SALT || "our_little_secret");
export const jwt = (process.env.JWT_SALT || "our_little_secret");
export const timeToJwtExpires = (process.env.JWT_EXPIRES_IN || '1d');