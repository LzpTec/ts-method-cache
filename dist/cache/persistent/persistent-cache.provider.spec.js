"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const storage_keys_constant_1 = require("../../core/constant/storage-keys.constant");
const cache_type_enum_1 = require("../../core/enum/cache-type.enum");
const promise_util_1 = require("../../core/util/promise.util");
const persistent_storage_1 = require("./persistent-storage");
const session_cache_provider_1 = require("./session/provider/session-cache.provider");
const storage_cache_provider_1 = require("./storage/provider/storage-cache.provider");
describe('Persistent cache provider', async () => {
    const checkCache = async (provider, key) => {
        const containerKey = `cacheContainer${key}`;
        provider.setCache({ key, returnType: __1.CacheReturnType.Static }, '[]', 'test');
        provider.addToContainer({ key: containerKey }, provider.getCacheObject(key));
        await promise_util_1.wait();
        provider['restoreCacheObjects']();
        const cacheModel = provider['storage']
            .getStorageItems(storage_keys_constant_1.LocalStorageCacheKey)
            .find((item) => item.options.key === key);
        const containerModel = provider['storage']
            .getContainerItems(storage_keys_constant_1.LocalStorageContainerKey)
            .find((item) => item.options.key === containerKey);
        expect(cacheModel.items['[]']).toEqual('test');
        expect(cacheModel.options.key).toEqual(key);
        expect(cacheModel.options.returnType).toEqual(__1.CacheReturnType.Static);
        expect(containerModel.cacheObjects.find((item) => item === key)).toEqual(key);
    };
    await it('should store in the appropriate storage', async () => {
        const now = Date.now();
        const sessionCache = new session_cache_provider_1.SessionCacheProvider();
        const storageCache = new storage_cache_provider_1.StorageCacheProvider();
        await Promise.all([checkCache(sessionCache, `T${now}`), checkCache(storageCache, `T${now + 10}`)]);
        sessionCache['storage'] = new persistent_storage_1.PersistentStorage(cache_type_enum_1.CacheType.Memory);
        sessionCache['restoreCacheObjects']();
        await checkCache(sessionCache, `T${now + 20}`);
    });
});
