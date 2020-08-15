import { baseCacheDecorator } from '../../../../core/decorator/base-cache.decorator';
import { CacheType } from '../../../../core/enum/cache-type.enum';
export function SessionCache(options) {
    return baseCacheDecorator(CacheType.Session, options);
}
