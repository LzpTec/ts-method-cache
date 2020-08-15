"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCacheContainer = exports.setCacheContainer = exports.getMethodCacheProvider = void 0;
const memory_cache_provider_1 = require("../../cache/memory/provider/memory-cache.provider");
const session_cache_provider_1 = require("../../cache/persistent/session/provider/session-cache.provider");
const storage_cache_provider_1 = require("../../cache/persistent/storage/provider/storage-cache.provider");
const cache_type_enum_1 = require("../enum/cache-type.enum");
const cacheProviders = new Map([
    [cache_type_enum_1.CacheType.Memory, new memory_cache_provider_1.MemoryCacheProvider()],
    [cache_type_enum_1.CacheType.Session, new session_cache_provider_1.SessionCacheProvider()],
    [cache_type_enum_1.CacheType.Storage, new storage_cache_provider_1.StorageCacheProvider()]
]);
const containers = new Map();
function getMethodCacheProvider(type) {
    return cacheProviders.get(type);
}
exports.getMethodCacheProvider = getMethodCacheProvider;
function setCacheContainer(container, options) {
    containers.forEach((testContainer) => {
        if (testContainer.key === options.key) {
            throw new Error(`Cache container with name ${options.key} already exists`);
        }
    });
    containers.set(container, options);
}
exports.setCacheContainer = setCacheContainer;
function getCacheContainer(container) {
    return containers.get(container);
}
exports.getCacheContainer = getCacheContainer;
