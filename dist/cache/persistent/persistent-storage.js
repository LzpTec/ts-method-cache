import { LocalStorageCacheKey, LocalStorageContainerKey } from '../../core/constant/storage-keys.constant';
import { CacheType } from '../../core/enum/cache-type.enum';
export class PersistentStorage {
    constructor(cacheType) {
        this.cacheType = cacheType;
        this.cache = {};
        if (cacheType === CacheType.Session && typeof sessionStorage !== 'undefined') {
            this.storage = sessionStorage;
        }
        else if (cacheType === CacheType.Storage && typeof localStorage !== 'undefined') {
            this.storage = localStorage;
        }
    }
    getStorageItems() {
        return this.getItem(LocalStorageCacheKey) || [];
    }
    setStorageItems(items) {
        this.setItem(LocalStorageCacheKey, items);
    }
    getContainerItems() {
        return this.getItem(LocalStorageContainerKey) || [];
    }
    setContainerItems(items) {
        this.setItem(LocalStorageContainerKey, items);
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
