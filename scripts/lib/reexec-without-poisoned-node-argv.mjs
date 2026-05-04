import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { sanitizedEnv } from './e2e-process.mjs';

/** Avoid accidental collisions if multiple wrappers nest (each script uses its own flag). */
export function reexecScriptIfPoisonedExecArgv(importMetaUrl, cleanEnvFlag) {
   const poisoned = process.execArgv.some((arg) => arg.includes('localstorage-file'));

   if (!poisoned || process.env[cleanEnvFlag] === '1') {
      return false;
   }

   const scriptPath = fileURLToPath(importMetaUrl);
   const child = spawn(process.execPath, [scriptPath], {
      stdio: 'inherit',
      env: {
         ...sanitizedEnv(),
         [cleanEnvFlag]: '1'
      }
   });

   child.on('exit', (code) => process.exit(code ?? 1));

   return true;
}
