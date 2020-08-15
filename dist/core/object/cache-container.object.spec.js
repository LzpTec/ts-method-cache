"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memory_cache_object_1 = require("../../cache/memory/object/memory-cache.object");
const cache_container_object_1 = require("./cache-container.object");
describe('Cache Container Object', () => {
    const key = 'key';
    const args = 'args';
    const value = 'value';
    let container;
    let cache;
    beforeEach(() => {
        container = new cache_container_object_1.CacheContainerObject({ key });
        cache = new memory_cache_object_1.MemoryCacheObject({});
        container.addCache(cache);
    });
    it('should set the options key correctly', () => {
        expect(container.key).toEqual(key);
    });
    it('should contain the added cache object', () => {
        expect(container.cacheObjects.length).toEqual(1);
    });
    it('should not add doubles', () => {
        container.addCache(cache);
        expect(container.cacheObjects.length).toEqual(1);
    });
    it('should clear the contained cache objects', () => {
        cache.setCache(args, value);
        expect(cache.getCache(args)).toEqual(value);
        container.clear();
        expect(cache.hasCache(args)).toBeFalsy();
    });
});
