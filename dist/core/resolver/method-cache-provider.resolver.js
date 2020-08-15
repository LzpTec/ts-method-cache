import { MemoryCacheProvider } from '../../cache/memory/provider/memory-cache.provider';
import { SessionCacheProvider } from '../../cache/persistent/session/provider/session-cache.provider';
import { StorageCacheProvider } from '../../cache/persistent/storage/provider/storage-cache.provider';
import { CacheType } from '../enum/cache-type.enum';
const cacheProviders = new Map([
    [CacheType.Memory, new MemoryCacheProvider()],
    [CacheType.Session, new SessionCacheProvider()],
    [CacheType.Storage, new StorageCacheProvider()]
]);
const containers = new Map();
export function getMethodCacheProvider(type) {
    return cacheProviders.get(type);
}
export function setCacheContainer(container, options) {
    containers.forEach((testContainer) => {
        if (testContainer.key === options.key) {
            throw new Error(`Cache container with name ${options.key} already exists`);
        }
    });
    containers.set(container, options);
}
export function getCacheContainer(container) {
    return containers.get(container);
}
