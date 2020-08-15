"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistentStorage = void 0;
const storage_keys_constant_1 = require("../../core/constant/storage-keys.constant");
const cache_type_enum_1 = require("../../core/enum/cache-type.enum");
class PersistentStorage {
    constructor(cacheType) {
        this.cacheType = cacheType;
        this.cache = {};
        if (cacheType === cache_type_enum_1.CacheType.Session && typeof sessionStorage !== 'undefined') {
            this.storage = sessionStorage;
        }
        else if (cacheType === cache_type_enum_1.CacheType.Storage && typeof localStorage !== 'undefined') {
            this.storage = localStorage;
        }
    }
    getStorageItems() {
        return this.getItem(storage_keys_constant_1.LocalStorageCacheKey) || [];
    }
    setStorageItems(items) {
        this.setItem(storage_keys_constant_1.LocalStorageCacheKey, items);
    }
    getContainerItems() {
        return this.getItem(storage_keys_constant_1.LocalStorageContainerKey) || [];
    }
    setContainerItems(items) {
        this.setItem(storage_keys_constant_1.LocalStorageContainerKey, items);
    }
    setItem(key, data) {
        if (this.storage) {
            this.storage.setItem(key, JSON.stringify(data));
        }
        else {
            this.cache[key] = data;
        }
    }
    getItem(key) {
        if (this.storage) {
            return JSON.parse(this.storage.getItem(key) || '[]');
        }
        else {
            return this.cache[key];
        }
    }
}
exports.PersistentStorage = PersistentStorage;
