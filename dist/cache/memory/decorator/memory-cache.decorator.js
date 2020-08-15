import { baseCacheDecorator } from '../../../core/decorator/base-cache.decorator';
import { CacheType } from '../../../core/enum/cache-type.enum';
export function MemoryCache(options) {
    return baseCacheDecorator(CacheType.Memory, options);
}
