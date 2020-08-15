import { CacheReturnType } from '../../core/enum/cache-return-type.enum';
import { BaseCacheObject } from '../../core/object/base-cache.object';
export class PersistentCacheObject extends BaseCacheObject {
    constructor(options) {
        super(options);
    }
    restoreCacheObject(items, ttl) {
        this.items = {};
        Object.keys(items).forEach((item) => {
            switch (this.returnType) {
                case CacheReturnType.Promise:
                    this.items[item] = Promise.resolve(items[item]);
                    break;
                case CacheReturnType.Static:
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
                case CacheReturnType.Promise:
                    items[item] = await this.items[item];
                    break;
                case CacheReturnType.Static:
                default:
                    items[item] = this.items[item];
            }
        }));
        return items;
    }
}
