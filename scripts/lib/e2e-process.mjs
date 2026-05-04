import { spawn } from 'node:child_process';

export function sanitizedEnv() {
   const nextEnv = { ...process.env };

   for (const key of Object.keys(nextEnv)) {
      const lowerKey = key.toLowerCase();

      if (lowerKey.includes('localstorage') || lowerKey.includes('node_options')) {
         delete nextEnv[key];
      }
   }

   return nextEnv;
}

export function runNodeScript(args, envOverrides = {}) {
   return new Promise((resolve, reject) => {
      const proc = spawn(process.execPath, args, {
         stdio: 'inherit',
         env: {
            ...sanitizedEnv(),
            ...envOverrides
         }
      });

      proc.on('exit', (code) => {
         if (code === 0) {
            resolve(undefined);

            return;
         }

         reject(new Error(`Command failed (${args.join(' ')}), exit code: ${code}`));
      });
   });
}

export function wait(ms) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForServer(url, expectedMarker, maxRetries = 60) {
   for (let i = 0; i < maxRetries; i += 1) {
      try {
         const res = await fetch(url);
         const html = await res.text();

         if ((res.ok || res.status >= 300) && html.includes(expectedMarker)) {
            return;
         }
      } catch {
      // server not ready yet
      }

      await wait(1000);
   }

   throw new Error(`Server did not start in time: ${url}`);
}
