"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCacheProvider = void 0;
const cache_container_object_1 = require("../object/cache-container.object");
class BaseCacheProvider {
    constructor() {
        this.cache = [];
        this.containers = [];
    }
    addToContainer(options, cacheObject) {
        let container;
        if (options.key) {
            container = this.getCacheContainer(options.key);
        }
        container = container || this.initiateCacheContainer(options);
        container.addCache(cacheObject);
    }
    clearCache() {
        this.cache.forEach((cache) => cache.clear());
        this.clearContainers();
    }
    clearContainer(container) {
        container.clear(this.cacheType);
    }
    clearContainers() {
        this.containers.forEach((container) => this.clearContainer(container));
    }
    clearKeyCache(key) {
        const cacheObject = this.getCacheObject(key);
        if (cacheObject) {
            cacheObject.clear();
        }
    }
    clearKeyContainer(containerKey) {
        const container = this.getCacheContainer(containerKey);
        if (container) {
            this.clearContainer(container);
        }
    }
    createCacheObject(options) {
        let obj;
        if (options.key) {
            obj = this.getCacheObject(options.key);
        }
        return obj || this.initiateCacheObject(options);
    }
    getCacheObject(key) {
        return this.cache.find((cache) => cache.key === key);
    }
    setCache(options, args, cache) {
        this.createCacheObject(options).setCache(args, cache);
    }
    getCacheContainer(containerKey) {
        return this.containers.filter((container) => container.key === containerKey)[0];
    }
    initiateCacheObject(options) {
        const cacheObject = new this.cacheObjectType(options);
        this.cache.push(cacheObject);
        return cacheObject;
    }
    initiateCacheContainer(options) {
        const container = new cache_container_object_1.CacheContainerObject(options);
        this.containers.push(container);
        return container;
    }
}
exports.BaseCacheProvider = BaseCacheProvider;
