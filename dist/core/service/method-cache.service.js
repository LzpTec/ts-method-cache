"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodCacheService = void 0;
const cache_type_enum_1 = require("../enum/cache-type.enum");
const method_cache_provider_resolver_1 = require("../resolver/method-cache-provider.resolver");
class MethodCacheService {
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
        this.clearCache(cache_type_enum_1.CacheType.Memory);
    }
    clearMemoryContainer(container) {
        this.clearContainerType(cache_type_enum_1.CacheType.Memory, container);
    }
    clearMemoryKeyCache(key) {
        this.clearKeyCache(cache_type_enum_1.CacheType.Memory, key);
    }
    clearSessionCache() {
        this.clearCache(cache_type_enum_1.CacheType.Session);
    }
    clearSessionContainer(container) {
        this.clearContainerType(cache_type_enum_1.CacheType.Session, container);
    }
    clearSessionKeyCache(key) {
        this.clearKeyCache(cache_type_enum_1.CacheType.Session, key);
    }
    clearStorageCache() {
        this.clearCache(cache_type_enum_1.CacheType.Storage);
    }
    clearStorageContainer(container) {
        this.clearContainerType(cache_type_enum_1.CacheType.Storage, container);
    }
    clearStorageKeyCache(key) {
        this.clearKeyCache(cache_type_enum_1.CacheType.Storage, key);
    }
    clearCache(type) {
        method_cache_provider_resolver_1.getMethodCacheProvider(type).clearCache();
    }
    clearContainerType(type, container) {
        method_cache_provider_resolver_1.getMethodCacheProvider(type).clearKeyContainer(container);
    }
    clearKeyCache(type, key) {
        method_cache_provider_resolver_1.getMethodCacheProvider(type).clearKeyCache(key);
    }
}
exports.MethodCacheService = MethodCacheService;
