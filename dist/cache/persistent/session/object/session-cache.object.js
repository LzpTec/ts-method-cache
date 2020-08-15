import { CacheType } from '../../../../core/enum/cache-type.enum';
import { PersistentCacheObject } from '../../persistent-cache.object';
export class SessionCacheObject extends PersistentCacheObject {
    constructor() {
        super(...arguments);
        this.cacheType = CacheType.Session;
    }
}
