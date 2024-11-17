export const keyRegEx = /^[a-zA-Z0-9](?:[a-zA-Z0-9._+-]{0,38}[a-zA-Z0-9])?$/

export function isValidOutcome(url: string): Boolean {
   try {
      return Boolean(new URL(url));
   } catch (_) {
      return false;
   }
}

export function isValidKey(key: string): Boolean {
   return keyRegEx.test(key);
}

export function isValidDescription(description: string): Boolean {
   return description.length <= 100;
}