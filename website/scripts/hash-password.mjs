import { randomBytes, webcrypto } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error('Usage: npm run admin:hash-password -- "a-password-of-at-least-12-characters"');
  process.exitCode = 1;
} else {
  const iterations = 100_000;
  const salt = randomBytes(18);
  const key = await webcrypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const derived = new Uint8Array(await webcrypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations }, key, 256));
  const encode = (bytes) => Buffer.from(bytes).toString("base64url");
  console.log(`pbkdf2_sha256$${iterations}$${encode(salt)}$${encode(derived)}`);
}
