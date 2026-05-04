/* eslint-disable no-console */
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import net from 'node:net';
import { sanitizedEnv } from './lib/e2e-process.mjs';
import { reexecScriptIfPoisonedExecArgv } from './lib/reexec-without-poisoned-node-argv.mjs';

const require = createRequire(import.meta.url);
const nextCliPath = require.resolve('next/dist/bin/next');
const localStorageGuardPath = require.resolve('./lib/localstorage-guard.cjs');
const DEFAULT_DEV_PORT = 3000;
const MAX_PORT_SCAN_ATTEMPTS = 20;
const DEV_REEXEC_FLAG = 'WEDDING_DEV_REEXEC_CLEAN';
const PASSTHROUGH_NODE_DEBUG_ARGS = ['--trace-warnings', '--trace-uncaught'];

function isPortAvailable(port) {
   return new Promise((resolve) => {
      const server = net.createServer();

      server.once('error', () => {
         resolve(false);
      });

      server.once('listening', () => {
         server.close(() => resolve(true));
      });

      server.listen(port, '0.0.0.0');
   });
}

async function resolveDevPort() {
   if (process.env.PORT) {
      return process.env.PORT;
   }

   for (let offset = 0; offset < MAX_PORT_SCAN_ATTEMPTS; offset += 1) {
      const port = DEFAULT_DEV_PORT + offset;

      const available = await isPortAvailable(port);

      if (available) {
         if (offset > 0) {
            console.log(`Port ${DEFAULT_DEV_PORT} is busy. Starting Next.js on port ${port}.`);
         }

         return String(port);
      }
   }

   throw new Error(`No available port found in range ${DEFAULT_DEV_PORT}-${DEFAULT_DEV_PORT + MAX_PORT_SCAN_ATTEMPTS - 1}.`);
}

async function startDevServer() {
   const devPort = await resolveDevPort();
   const forwardedDebugArgs = process.execArgv.filter((arg) => PASSTHROUGH_NODE_DEBUG_ARGS.includes(arg));

   const child = spawn(
      process.execPath,
      [...forwardedDebugArgs, '--require', localStorageGuardPath, nextCliPath, 'dev', '--port', String(devPort)],
      {
         stdio: 'inherit',
         env: sanitizedEnv()
      }
   );

   child.on('exit', (code) => process.exit(code ?? 1));
}

if (!reexecScriptIfPoisonedExecArgv(import.meta.url, DEV_REEXEC_FLAG)) {
   startDevServer().catch((error) => {
      console.error(error.message);
      process.exit(1);
   });
}
