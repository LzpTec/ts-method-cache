"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistentCacheObject = void 0;
const cache_return_type_enum_1 = require("../../core/enum/cache-return-type.enum");
const base_cache_object_1 = require("../../core/object/base-cache.object");
class PersistentCacheObject extends base_cache_object_1.BaseCacheObject {
    constructor(options) {
        super(options);
    }
    restoreCacheObject(items, ttl) {
        this.items = {};
        Object.keys(items).forEach((item) => {
            switch (this.returnType) {
                case cache_return_type_enum_1.CacheReturnType.Promise:
                    this.items[item] = Promise.resolve(items[item]);
                    break;
                case cache_return_type_enum_1.CacheReturnType.Static:
                default:
                    this.items[item] = items[item];
            }
        });
        this.ttl = ttl;
    }
    async storeCacheObject() {
        return {
            items: await this.getStorageItems(),
            ttl: this.ttl,
            options: this.options
        };
    }
    async getStorageItems() {
        const items = {};
        await Promise.all(Object.keys(this.items).map(async (item) => {
            switch (this.returnType) {
                case cache_return_type_enum_1.CacheReturnType.Promise:
                    items[item] = await this.items[item];
                    break;
                case cache_return_type_enum_1.CacheReturnType.Static:
                default:
                    items[item] = this.items[item];
            }
        }));
        return items;
    }
}
exports.PersistentCacheObject = PersistentCacheObject;
