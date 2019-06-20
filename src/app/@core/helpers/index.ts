export * from './helpers';
export * from './object';
export * from './extend';
export * from './array';
export * from './search';

import storage from './storage';
export const storageLocal = storage.local();
export const storageSession = storage.session();
