export * from '@core/helpers/helpers';
export * from '@core/helpers/common';
import storage from '@core/helpers/storage';
export const storageLocal = storage.local();
export const storageSession = storage.session();
