"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const memory_cache_provider_1 = require("../../cache/memory/provider/memory-cache.provider");
const session_cache_provider_1 = require("../../cache/persistent/session/provider/session-cache.provider");
const storage_cache_provider_1 = require("../../cache/persistent/storage/provider/storage-cache.provider");
const cache_type_enum_1 = require("../enum/cache-type.enum");
const method_cache_provider_resolver_1 = require("./method-cache-provider.resolver");
describe('Method cache provider resolver', () => {
    const memoryProvider = method_cache_provider_resolver_1.getMethodCacheProvider(cache_type_enum_1.CacheType.Memory);
    const sessionProvider = method_cache_provider_resolver_1.getMethodCacheProvider(cache_type_enum_1.CacheType.Session);
    const storageProvider = method_cache_provider_resolver_1.getMethodCacheProvider(cache_type_enum_1.CacheType.Storage);
    it('should create a memory cache provider', () => {
        expect(memoryProvider instanceof memory_cache_provider_1.MemoryCacheProvider).toBeTruthy();
    });
    it('should create a session cache provider', () => {
        expect(sessionProvider instanceof session_cache_provider_1.SessionCacheProvider).toBeTruthy();
    });
    it('should create a storage cache provider', () => {
        expect(storageProvider instanceof storage_cache_provider_1.StorageCacheProvider).toBeTruthy();
    });
    it('should only create one provider singleton per type', () => {
        expect(memoryProvider).toEqual(method_cache_provider_resolver_1.getMethodCacheProvider(cache_type_enum_1.CacheType.Memory));
        expect(sessionProvider).toEqual(method_cache_provider_resolver_1.getMethodCacheProvider(cache_type_enum_1.CacheType.Session));
        expect(storageProvider).toEqual(method_cache_provider_resolver_1.getMethodCacheProvider(cache_type_enum_1.CacheType.Storage));
    });
    it('should throw when multiple containers have the same name', () => {
        expect(() => {
            let Container1 = class Container1 {
            };
            Container1 = __decorate([
                __1.CacheContainer('testSameName')
            ], Container1);
            let Container2 = 
            // tslint:disable-next-line:max-classes-per-file
            class Container2 {
            };
            Container2 = __decorate([
                __1.CacheContainer('testSameName')
                // tslint:disable-next-line:max-classes-per-file
            ], Container2);
        }).toThrowError();
    });
});
