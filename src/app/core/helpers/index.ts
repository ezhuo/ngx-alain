export * from './helpers';
export * from './object';
import storage from './storage';
export const storageLocal = storage.local();
export const storageSession = storage.session();
