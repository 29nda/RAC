#!/usr/bin/env node
/**
 * Generates the PBKDF2 hash for ADMIN_PASSWORD_HASH.
 *
 *   npm run admin:hash -- "your-strong-password"
 *
 * The output format matches what `src/lib/security.ts` verifies at runtime:
 *   pbkdf2$<iterations>$<saltHex>$<hashHex>
 */
import { pbkdf2Sync, randomBytes } from 'node:crypto';

const ITERATIONS = 210_000;

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run admin:hash -- "your-strong-password"');
  process.exit(1);
}

if (password.length < 12) {
  console.error('Refusing to hash: use at least 12 characters.');
  console.error('This is the only credential protecting the dashboard.');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, ITERATIONS, 32, 'sha256');

console.log('');
console.log('Add this to your secrets as ADMIN_PASSWORD_HASH:');
console.log('');
console.log(`pbkdf2$${ITERATIONS}$${salt.toString('hex')}$${hash.toString('hex')}`);
console.log('');
console.log('  Local:      put it in .dev.vars');
console.log('  Production: npx wrangler secret put ADMIN_PASSWORD_HASH');
console.log('');
