const storageShim = {
   getItem() {
      return null;
   },
   setItem() {},
   removeItem() {},
   clear() {},
   key() {
      return null;
   },
   get length() {
      return 0;
   }
};

if (Array.isArray(process.execArgv) && process.execArgv.length > 0) {
   process.execArgv = process.execArgv.filter((arg) => !arg.includes('localstorage-file'));
}

try {
   const candidate = globalThis.localStorage;
   const hasBrokenApi =
    candidate &&
    (typeof candidate.getItem !== 'function' ||
      typeof candidate.setItem !== 'function' ||
      typeof candidate.removeItem !== 'function' ||
      typeof candidate.clear !== 'function');

   if (hasBrokenApi) {
      Object.defineProperty(globalThis, 'localStorage', {
         configurable: true,
         enumerable: true,
         writable: true,
         value: storageShim
      });
   }
} catch {
   Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: storageShim
   });
}
