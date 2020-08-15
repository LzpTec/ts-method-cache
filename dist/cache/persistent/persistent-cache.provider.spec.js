import { CacheReturnType } from '../../';
import { LocalStorageCacheKey, LocalStorageContainerKey } from '../../core/constant/storage-keys.constant';
import { CacheType } from '../../core/enum/cache-type.enum';
import { wait } from '../../core/util/promise.util';
import { PersistentStorage } from './persistent-storage';
import { SessionCacheProvider } from './session/provider/session-cache.provider';
import { StorageCacheProvider } from './storage/provider/storage-cache.provider';
describe('Persistent cache provider', async () => {
    const checkCache = async (provider, key) => {
        const containerKey = `cacheContainer${key}`;
        provider.setCache({ key, returnType: CacheReturnType.Static }, '[]', 'test');
        provider.addToContainer({ key: containerKey }, provider.getCacheObject(key));
        await wait();
        provider['restoreCacheObjects']();
        const cacheModel = provider['storage']
            .getStorageItems(LocalStorageCacheKey)
            .find((item) => item.options.key === key);
        const containerModel = provider['storage']
            .getContainerItems(LocalStorageContainerKey)
            .find((item) => item.options.key === containerKey);
        expect(cacheModel.items['[]']).toEqual('test');
        expect(cacheModel.options.key).toEqual(key);
        expect(cacheModel.options.returnType).toEqual(CacheReturnType.Static);
        expect(containerModel.cacheObjects.find((item) => item === key)).toEqual(key);
    };
    await it('should store in the appropriate storage', async () => {
        const now = Date.now();
        const sessionCache = new SessionCacheProvider();
        const storageCache = new StorageCacheProvider();
        await Promise.all([checkCache(sessionCache, `T${now}`), checkCache(storageCache, `T${now + 10}`)]);
        sessionCache['storage'] = new PersistentStorage(CacheType.Memory);
        sessionCache['restoreCacheObjects']();
        await checkCache(sessionCache, `T${now + 20}`);
    });
});
