"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionCache = void 0;
const base_cache_decorator_1 = require("../../../../core/decorator/base-cache.decorator");
const cache_type_enum_1 = require("../../../../core/enum/cache-type.enum");
function SessionCache(options) {
    return base_cache_decorator_1.baseCacheDecorator(cache_type_enum_1.CacheType.Session, options);
}
exports.SessionCache = SessionCache;
