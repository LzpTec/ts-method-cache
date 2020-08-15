import { BaseCacheProvider } from '../../core/provider/base-cache.provider';
export class PersistentCacheProvider extends BaseCacheProvider {
    constructor() {
        super();
    }
    addToContainer(containerOptions, cacheObject) {
        super.addToContainer(containerOptions, cacheObject);
        this.saveContainers();
    }
    clearCache() {
        super.clearCache();
        this.saveCache();
        this.saveContainers();
    }
    clearContainer(container) {
        super.clearContainer(container);
        this.saveContainers();
    }
    clearContainers() {
        super.clearContainers();
        this.saveContainers();
    }
    clearKeyCache(key) {
        super.clearKeyCache(key);
        this.saveCache();
    }
    clearKeyContainer(containerKey) {
        super.clearKeyContainer(containerKey);
        this.saveContainers();
    }
    setCache(options, args, cache) {
        super.setCache(options, args, cache);
        this.saveCache();
    }
    restoreCacheObjects() {
        this.cache.length = 0;
        this.containers.length = 0;
        const cacheObjects = this.storage.getStorageItems();
        const containerObjects = this.storage.getContainerItems();
        cacheObjects.forEach((cacheObject) => this.initiateCacheObject(cacheObject.options));
        containerObjects.forEach((containerObject) => {
            const container = this.initiateCacheContainer(containerObject.options);
            containerObject.cacheObjects.forEach((cacheKey) => {
                const cache = this.getCacheObject(cacheKey);
                if (cache) {
                    container.addCache(cache);
                }
            });
        });
        cacheObjects.forEach((cacheObject) => {
            if (cacheObject.options.key) {
                const cache = this.getCacheObject(cacheObject.options.key);
                if (cache) {
                    cache.restoreCacheObject(cacheObject.items, cacheObject.ttl);
                }
            }
        });
    }
    async saveCache() {
        this.storage.setStorageItems(await Promise.all(this.cache.map(async (cache) => cache.storeCacheObject())));
    }
    saveContainers() {
        const storageContainerCache = this.containers.map((container) => {
            return {
                options: container.options,
                cacheObjects: container.cacheObjects.map((cache) => cache.key)
            };
        });
        this.storage.setContainerItems(storageContainerCache);
    }
}
