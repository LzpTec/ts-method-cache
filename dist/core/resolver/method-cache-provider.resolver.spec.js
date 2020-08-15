var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CacheContainer } from '../../';
import { MemoryCacheProvider } from '../../cache/memory/provider/memory-cache.provider';
import { SessionCacheProvider } from '../../cache/persistent/session/provider/session-cache.provider';
import { StorageCacheProvider } from '../../cache/persistent/storage/provider/storage-cache.provider';
import { CacheType } from '../enum/cache-type.enum';
import { getMethodCacheProvider } from './method-cache-provider.resolver';
describe('Method cache provider resolver', () => {
    const memoryProvider = getMethodCacheProvider(CacheType.Memory);
    const sessionProvider = getMethodCacheProvider(CacheType.Session);
    const storageProvider = getMethodCacheProvider(CacheType.Storage);
    it('should create a memory cache provider', () => {
        expect(memoryProvider instanceof MemoryCacheProvider).toBeTruthy();
    });
    it('should create a session cache provider', () => {
        expect(sessionProvider instanceof SessionCacheProvider).toBeTruthy();
    });
    it('should create a storage cache provider', () => {
        expect(storageProvider instanceof StorageCacheProvider).toBeTruthy();
    });
    it('should only create one provider singleton per type', () => {
        expect(memoryProvider).toEqual(getMethodCacheProvider(CacheType.Memory));
        expect(sessionProvider).toEqual(getMethodCacheProvider(CacheType.Session));
        expect(storageProvider).toEqual(getMethodCacheProvider(CacheType.Storage));
    });
    it('should throw when multiple containers have the same name', () => {
        expect(() => {
            let Container1 = class Container1 {
            };
            Container1 = __decorate([
                CacheContainer('testSameName')
            ], Container1);
            let Container2 = 
            // tslint:disable-next-line:max-classes-per-file
            class Container2 {
            };
            Container2 = __decorate([
                CacheContainer('testSameName')
                // tslint:disable-next-line:max-classes-per-file
            ], Container2);
        }).toThrowError();
    });
});
