import { CacheType } from '../enum/cache-type.enum';
import { getMethodCacheProvider } from '../resolver/method-cache-provider.resolver';
export class MethodCacheService {
    clearAllCache() {
        this.clearMemoryCache();
        this.clearStorageCache();
        this.clearSessionCache();
    }
    clearContainer(container) {
        this.clearMemoryContainer(container);
        this.clearSessionContainer(container);
        this.clearStorageContainer(container);
    }
    clearMemoryCache() {
        this.clearCache(CacheType.Memory);
    }
    clearMemoryContainer(container) {
        this.clearContainerType(CacheType.Memory, container);
    }
    clearMemoryKeyCache(key) {
        this.clearKeyCache(CacheType.Memory, key);
    }
    clearSessionCache() {
        this.clearCache(CacheType.Session);
    }
    clearSessionContainer(container) {
        this.clearContainerType(CacheType.Session, container);
    }
    clearSessionKeyCache(key) {
        this.clearKeyCache(CacheType.Session, key);
    }
    clearStorageCache() {
        this.clearCache(CacheType.Storage);
    }
    clearStorageContainer(container) {
        this.clearContainerType(CacheType.Storage, container);
    }
    clearStorageKeyCache(key) {
        this.clearKeyCache(CacheType.Storage, key);
    }
    clearCache(type) {
        getMethodCacheProvider(type).clearCache();
    }
    clearContainerType(type, container) {
        getMethodCacheProvider(type).clearKeyContainer(container);
    }
    clearKeyCache(type, key) {
        getMethodCacheProvider(type).clearKeyCache(key);
    }
}
