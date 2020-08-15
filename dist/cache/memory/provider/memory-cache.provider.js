"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryCacheProvider = void 0;
const cache_type_enum_1 = require("../../../core/enum/cache-type.enum");
const base_cache_provider_1 = require("../../../core/provider/base-cache.provider");
const memory_cache_object_1 = require("../object/memory-cache.object");
class MemoryCacheProvider extends base_cache_provider_1.BaseCacheProvider {
    constructor() {
        super(...arguments);
        this.cache = [];
        this.cacheType = cache_type_enum_1.CacheType.Memory;
        this.cacheObjectType = memory_cache_object_1.MemoryCacheObject;
    }
}
exports.MemoryCacheProvider = MemoryCacheProvider;
