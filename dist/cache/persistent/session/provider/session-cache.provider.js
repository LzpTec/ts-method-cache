"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionCacheProvider = void 0;
const cache_type_enum_1 = require("../../../../core/enum/cache-type.enum");
const persistent_cache_provider_1 = require("../../persistent-cache.provider");
const persistent_storage_1 = require("../../persistent-storage");
const session_cache_object_1 = require("../object/session-cache.object");
class SessionCacheProvider extends persistent_cache_provider_1.PersistentCacheProvider {
    constructor() {
        super();
        this.cache = [];
        this.cacheObjectType = session_cache_object_1.SessionCacheObject;
        this.cacheType = cache_type_enum_1.CacheType.Session;
        this.storage = new persistent_storage_1.PersistentStorage(this.cacheType);
        this.restoreCacheObjects();
    }
}
exports.SessionCacheProvider = SessionCacheProvider;
