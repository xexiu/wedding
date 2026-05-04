import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { E2E_PORT } from './lib/e2e-constants.mjs';
import { sanitizedEnv } from './lib/e2e-process.mjs';

const require = createRequire(import.meta.url);
const nextCliPath = require.resolve('next/dist/bin/next');
const child = spawn(process.execPath, [nextCliPath, 'dev', '--port', String(E2E_PORT)], {
   stdio: 'inherit',
   env: sanitizedEnv()
});

child.on('exit', (code) => process.exit(code ?? 1));
