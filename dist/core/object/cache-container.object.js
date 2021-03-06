export class CacheContainerObject {
    constructor(options) {
        this.options = options;
        this.cacheObjects = [];
    }
    get key() {
        return this.options.key;
    }
    addCache(cacheObject) {
        if (this.cacheObjects.indexOf(cacheObject) === -1) {
            this.cacheObjects.push(cacheObject);
            cacheObject.inheritContainerOptions(this.options);
        }
    }
    clear(cacheType) {
        this.cacheObjects.filter((cache) => !cacheType || cache.cacheType === cacheType).forEach((cache) => cache.clear());
    }
}
