import { CacheType } from '../../../core/enum/cache-type.enum';
import { BaseCacheObject } from '../../../core/object/base-cache.object';
export class MemoryCacheObject extends BaseCacheObject {
    constructor(options) {
        super(options);
        this.cacheType = CacheType.Memory;
    }
}
