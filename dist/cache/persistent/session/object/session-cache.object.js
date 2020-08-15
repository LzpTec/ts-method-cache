"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionCacheObject = void 0;
const cache_type_enum_1 = require("../../../../core/enum/cache-type.enum");
const persistent_cache_object_1 = require("../../persistent-cache.object");
class SessionCacheObject extends persistent_cache_object_1.PersistentCacheObject {
    constructor() {
        super(...arguments);
        this.cacheType = cache_type_enum_1.CacheType.Session;
    }
}
exports.SessionCacheObject = SessionCacheObject;
