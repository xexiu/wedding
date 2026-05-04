import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb);

const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH).toString("hex");
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt, keyHex] = hash.split(":");
  if (!salt || !keyHex) return false;

  const candidate = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  const key = Buffer.from(keyHex, "hex");
  if (candidate.length !== key.length) return false;

  return timingSafeEqual(candidate, key);
}
