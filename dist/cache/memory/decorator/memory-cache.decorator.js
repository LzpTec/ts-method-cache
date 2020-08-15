"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryCache = void 0;
const base_cache_decorator_1 = require("../../../core/decorator/base-cache.decorator");
const cache_type_enum_1 = require("../../../core/enum/cache-type.enum");
function MemoryCache(options) {
    return base_cache_decorator_1.baseCacheDecorator(cache_type_enum_1.CacheType.Memory, options);
}
exports.MemoryCache = MemoryCache;
