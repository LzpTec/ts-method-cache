"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache_return_type_enum_1 = require("../../../../core/enum/cache-return-type.enum");
const session_cache_object_1 = require("./session-cache.object");
describe('Session cache object can store and restore', () => {
    let sessionCache;
    const cacheKey = '["foo"]';
    const cacheValue = 'bar';
    const cacheItems = {};
    const ttl = {};
    const ttlValue = 10;
    cacheItems[cacheKey] = cacheValue;
    ttl[cacheKey] = ttlValue;
    beforeEach(() => {
        sessionCache = new session_cache_object_1.SessionCacheObject({ returnType: cache_return_type_enum_1.CacheReturnType.Static });
    });
    it('should restore a cache object with static return', () => {
        sessionCache.restoreCacheObject(cacheItems, ttl);
        expect(sessionCache.getCache(cacheKey)).toEqual(cacheValue);
    });
    it('should restore a cache object with return type promise', async () => {
        sessionCache.options.returnType = cache_return_type_enum_1.CacheReturnType.Promise;
        sessionCache.restoreCacheObject(cacheItems, ttl);
        expect(await sessionCache.getCache(cacheKey)).toEqual(cacheValue);
    });
    it('should create a proper PersistentCacheModel when getting items from storage using storeCacheObject', async () => {
        sessionCache.options.returnType = cache_return_type_enum_1.CacheReturnType.Promise;
        sessionCache.restoreCacheObject(cacheItems, ttl);
        const storageCacheModel = await sessionCache.storeCacheObject();
        expect(storageCacheModel.items[cacheKey]).toEqual(cacheValue);
        expect(storageCacheModel.options.returnType).toEqual(cache_return_type_enum_1.CacheReturnType.Promise);
        const ttlObj = storageCacheModel.ttl;
        expect(ttlObj[cacheKey]).toEqual(ttlValue);
    });
});
