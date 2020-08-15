import { CacheType } from '../../../../core/enum/cache-type.enum';
import { PersistentCacheProvider } from '../../persistent-cache.provider';
import { PersistentStorage } from '../../persistent-storage';
import { SessionCacheObject } from '../object/session-cache.object';
export class SessionCacheProvider extends PersistentCacheProvider {
    constructor() {
        super();
        this.cache = [];
        this.cacheObjectType = SessionCacheObject;
        this.cacheType = CacheType.Session;
        this.storage = new PersistentStorage(this.cacheType);
        this.restoreCacheObjects();
    }
}
