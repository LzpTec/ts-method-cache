import { baseCacheDecorator } from '../../../../core/decorator/base-cache.decorator';
import { CacheType } from '../../../../core/enum/cache-type.enum';
export function StorageCache(options) {
    return baseCacheDecorator(CacheType.Storage, options);
}
