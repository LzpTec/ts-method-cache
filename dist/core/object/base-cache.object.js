"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCacheObject = void 0;
const cache_return_type_enum_1 = require("../enum/cache-return-type.enum");
class BaseCacheObject {
    constructor(options) {
        this.options = options;
        this.items = {};
        this.ttl = {};
    }
    get key() {
        return this.options.key || '';
    }
    get returnType() {
        return this.options.returnType || cache_return_type_enum_1.CacheReturnType.Static;
    }
    clear() {
        Object.keys(this.items).forEach((args) => this.clearArgs(args));
    }
    clearArgs(args) {
        delete this.items[args];
        delete this.ttl[args];
    }
    getCache(args) {
        return this.items[args];
    }
    hasCache(args) {
        return this.items.hasOwnProperty(args);
    }
    inheritContainerOptions(options) {
        if (!this.options.returnType) {
            this.options.returnType = options.returnType;
        }
        if (!this.options.ttl) {
            this.options.ttl = options.ttl;
        }
        if (!this.options.cacheUntilRejected) {
            this.options.cacheUntilRejected = options.cacheUntilRejected;
        }
    }
    isExpired(args) {
        return this.ttl.hasOwnProperty(args) && this.ttl[args] < Date.now();
    }
    setCache(args, cache) {
        this.items[args] = cache;
        this.setArgsTtl(args);
    }
    getTtlFromOptions() {
        const ttl = this.options.ttl;
        if (typeof ttl === 'string' && ttl.length > 0) {
            return new Date(ttl).getTime() + new Date().getMilliseconds();
        }
        if (typeof ttl === 'number' && ttl > 0) {
            return Date.now() + 1000 * ttl;
        }
        if (ttl instanceof Date) {
            return ttl.getTime();
        }
    }
    setArgsTtl(args) {
        const ttl = this.getTtlFromOptions();
        if (ttl) {
            this.ttl[args] = ttl;
        }
    }
}
exports.BaseCacheObject = BaseCacheObject;
