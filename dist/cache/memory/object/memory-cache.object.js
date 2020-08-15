"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryCacheObject = void 0;
const cache_type_enum_1 = require("../../../core/enum/cache-type.enum");
const base_cache_object_1 = require("../../../core/object/base-cache.object");
class MemoryCacheObject extends base_cache_object_1.BaseCacheObject {
    constructor(options) {
        super(options);
        this.cacheType = cache_type_enum_1.CacheType.Memory;
    }
}
exports.MemoryCacheObject = MemoryCacheObject;
