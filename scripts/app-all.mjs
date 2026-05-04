/* eslint-disable no-console */
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { sanitizedEnv } from './lib/e2e-process.mjs';
import { reexecScriptIfPoisonedExecArgv } from './lib/reexec-without-poisoned-node-argv.mjs';

const APP_ALL_REEXEC_FLAG = 'WEDDING_APP_ALL_REEXEC_CLEAN';

function parseDotEnvFile(filePath) {
   if (!existsSync(filePath)) {
      return {};
   }

   const content = readFileSync(filePath, 'utf8');
   const entries = content.split(/\r?\n/);
   const values = {};

   for (const line of entries) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const equalsIndex = trimmed.indexOf('=');
      if (equalsIndex <= 0) continue;

      const key = trimmed.slice(0, equalsIndex).trim();
      let value = trimmed.slice(equalsIndex + 1).trim();

      if (
         (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith('\'') && value.endsWith('\''))
      ) {
         value = value.slice(1, -1);
      }

      values[key] = value;
   }

   return values;
}

function isValidPostgresUrl(value) {
   return typeof value === 'string' && /^(postgresql|postgres):\/\//.test(value);
}

function buildStartupEnv() {
   const baseEnv = sanitizedEnv();
   const envPath = resolve(process.cwd(), '.env');
   const fileEnv = parseDotEnvFile(envPath);

   const candidateDatabaseUrl = isValidPostgresUrl(baseEnv.DATABASE_URL)
      ? baseEnv.DATABASE_URL
      : fileEnv.DATABASE_URL;
   const candidateDirectUrl = isValidPostgresUrl(baseEnv.DIRECT_URL) ? baseEnv.DIRECT_URL : fileEnv.DIRECT_URL;

   if (!isValidPostgresUrl(candidateDatabaseUrl)) {
      throw new Error(
         'DATABASE_URL must be a valid postgres URL. Set it in .env (example: postgresql://postgres:postgres@localhost:5433/wedding?schema=public).'
      );
   }

   return {
      ...baseEnv,
      DATABASE_URL: candidateDatabaseUrl,
      DIRECT_URL: isValidPostgresUrl(candidateDirectUrl) ? candidateDirectUrl : candidateDatabaseUrl
   };
}

function run(command, args, env) {
   return new Promise((resolvePromise, rejectPromise) => {
      const child = spawn(command, args, {
         stdio: 'inherit',
         env
      });

      child.on('exit', (code) => {
         if (code === 0) {
            resolvePromise();
         } else {
            rejectPromise(new Error(`${command} ${args.join(' ')} failed with exit code ${code ?? 1}`));
         }
      });
   });
}

async function main() {
   const env = buildStartupEnv();
   await run('pnpm', ['db:push'], env);
   await run('node', ['./scripts/dev.mjs'], env);
}

if (!reexecScriptIfPoisonedExecArgv(import.meta.url, APP_ALL_REEXEC_FLAG)) {
   main().catch((error) => {
      console.error(error.message);
      process.exit(1);
   });
}
