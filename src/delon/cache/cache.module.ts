import { NgModule, ModuleWithProviders } from '@angular/core';

import { DC_STORE_STORAGE_TOKEN } from '@delon/cache/src/interface';
import { DelonCacheConfig } from '@delon/cache/cache.config';
import { CacheService } from '@delon/cache/src/cache.service';
import { LocalStorageCacheService } from '@delon/cache/src/local-storage-cache.service';

@NgModule({})
export class DelonCacheModule {
  static forRoot(options?: DelonCacheConfig): ModuleWithProviders {
    return {
      ngModule: DelonCacheModule,
      providers: [
        DelonCacheConfig,
        CacheService,
        { provide: DC_STORE_STORAGE_TOKEN, useClass: LocalStorageCacheService },
      ],
    };
  }
}
