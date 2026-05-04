/* eslint-disable no-console */
import { spawn } from 'node:child_process';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import {
   E2E_BASE_URL, E2E_EXPECTED_MARKER, E2E_HOME_PATH, E2E_PORT
} from './lib/e2e-constants.mjs';
import {
   runNodeScript, sanitizedEnv, waitForServer
} from './lib/e2e-process.mjs';

const require = createRequire(import.meta.url);
const nextCliPath = require.resolve('next/dist/bin/next');
const playwrightCliPath = require.resolve('@playwright/test/cli');

async function runE2E() {
   // Ensure interrupted runs don't leave the port blocked.
   try {
      const pid = execSync(`lsof -ti :${E2E_PORT}`, { stdio: ['ignore', 'pipe', 'ignore'] })
         .toString()
         .trim();
      if (pid) execSync(`kill ${pid}`, { stdio: 'ignore' });
   } catch {
      // no process using this port
   }

   await runNodeScript([nextCliPath, 'build']);

   const server = spawn(process.execPath, [nextCliPath, 'start', '--port', String(E2E_PORT)], {
      stdio: 'inherit',
      env: sanitizedEnv()
   });
   let serverExitedEarly = false;
   server.on('exit', () => {
      serverExitedEarly = true;
   });

   let exitCode = 1;

   try {
      await waitForServer(`${E2E_BASE_URL}${E2E_HOME_PATH}`, E2E_EXPECTED_MARKER);

      if (serverExitedEarly) {
         throw new Error('E2E server exited before tests started');
      }

      await runNodeScript([playwrightCliPath, 'test'], { PW_MANAGED_SERVER: '0' });
      exitCode = 0;
   } catch (error) {
      console.error(error);
      exitCode = 1;
   } finally {
      server.kill('SIGTERM');
   }

   process.exit(exitCode);
}

runE2E();
