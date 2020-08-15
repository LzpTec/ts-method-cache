import { CacheType } from '../../../../core/enum/cache-type.enum';
import { PersistentCacheProvider } from '../../persistent-cache.provider';
import { PersistentStorage } from '../../persistent-storage';
import { StorageCacheObject } from '../object/storage-cache.object';
export class StorageCacheProvider extends PersistentCacheProvider {
    constructor() {
        super();
        this.cache = [];
        this.cacheObjectType = StorageCacheObject;
        this.cacheType = CacheType.Storage;
        this.storage = new PersistentStorage(this.cacheType);
        this.restoreCacheObjects();
    }
}
