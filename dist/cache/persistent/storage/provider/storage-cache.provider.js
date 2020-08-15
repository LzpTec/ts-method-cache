"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageCacheProvider = void 0;
const cache_type_enum_1 = require("../../../../core/enum/cache-type.enum");
const persistent_cache_provider_1 = require("../../persistent-cache.provider");
const persistent_storage_1 = require("../../persistent-storage");
const storage_cache_object_1 = require("../object/storage-cache.object");
class StorageCacheProvider extends persistent_cache_provider_1.PersistentCacheProvider {
    constructor() {
        super();
        this.cache = [];
        this.cacheObjectType = storage_cache_object_1.StorageCacheObject;
        this.cacheType = cache_type_enum_1.CacheType.Storage;
        this.storage = new persistent_storage_1.PersistentStorage(this.cacheType);
        this.restoreCacheObjects();
    }
}
exports.StorageCacheProvider = StorageCacheProvider;
