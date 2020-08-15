import { CacheType } from '../../../core/enum/cache-type.enum';
import { BaseCacheProvider } from '../../../core/provider/base-cache.provider';
import { MemoryCacheObject } from '../object/memory-cache.object';
export class MemoryCacheProvider extends BaseCacheProvider {
    constructor() {
        super(...arguments);
        this.cache = [];
        this.cacheType = CacheType.Memory;
        this.cacheObjectType = MemoryCacheObject;
    }
}
