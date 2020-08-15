var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { MemoryCache } from '../../cache/memory/decorator/memory-cache.decorator';
import { SessionCache } from '../../cache/persistent/session/decorator/session-cache.decorator';
import { StorageCache } from '../../cache/persistent/storage/decorator/storage-cache.decorator';
import { CacheContainer } from '../decorator/cache-container.decorator';
import { wait } from '../util/promise.util';
import { MethodCacheService } from './method-cache.service';
const testCacheContainer = 'testCacheContainer';
const testMemoryMethod = 'testMemoryMethod';
const testSessionMethod = 'testSessionMethod';
const testStorageMethod = 'testStorageMethod';
let TestCache = class TestCache {
    constructor() {
        this.testMemoryMethodCalled = 0;
        this.testSessionMethodCalled = 0;
        this.testStorageMethodCalled = 0;
    }
    testMemoryMethod() {
        this.testMemoryMethodCalled++;
    }
    testSessionMethod() {
        this.testSessionMethodCalled++;
    }
    testStorageMethod() {
        this.testStorageMethodCalled++;
    }
};
__decorate([
    MemoryCache(testMemoryMethod)
], TestCache.prototype, "testMemoryMethod", null);
__decorate([
    SessionCache(testSessionMethod)
], TestCache.prototype, "testSessionMethod", null);
__decorate([
    StorageCache(testStorageMethod)
], TestCache.prototype, "testStorageMethod", null);
TestCache = __decorate([
    CacheContainer(testCacheContainer)
], TestCache);
describe('Method cache service can clear cache', () => {
    let testCache;
    const cacheService = new MethodCacheService();
    const runTestMethodsExpect = async (memoryCount, sessionCount, storageCount) => {
        testCache.testMemoryMethod();
        testCache.testSessionMethod();
        testCache.testStorageMethod();
        expect(testCache.testMemoryMethodCalled).toEqual(memoryCount);
        expect(testCache.testSessionMethodCalled).toEqual(sessionCount);
        await wait();
        expect(testCache.testStorageMethodCalled).toEqual(storageCount);
        await wait();
    };
    cacheService.clearAllCache();
    beforeEach(async () => {
        cacheService.clearAllCache();
        testCache = new TestCache();
        await runTestMethodsExpect(1, 1, 1);
    });
    it('it should just clear the memory cache', async () => {
        cacheService.clearMemoryCache();
        await runTestMethodsExpect(2, 1, 1);
    });
    it('it should just clear the session cache', async () => {
        cacheService.clearSessionCache();
        await runTestMethodsExpect(1, 2, 1);
    });
    it('it should just clear the storage cache', async () => {
        cacheService.clearStorageCache();
        await runTestMethodsExpect(1, 1, 2);
    });
    it('it should clear cache of an entire container', async () => {
        cacheService.clearContainer(testCacheContainer);
        await runTestMethodsExpect(2, 2, 2);
    });
    it('it should just clear cache of a certain method from memory', async () => {
        cacheService.clearMemoryKeyCache(testMemoryMethod);
        await runTestMethodsExpect(2, 1, 1);
    });
    it('it should just clear cache of a certain method from session', async () => {
        cacheService.clearSessionKeyCache(testSessionMethod);
        await runTestMethodsExpect(1, 2, 1);
    });
    it('it should just clear cache of a certain method from storage', async () => {
        cacheService.clearStorageKeyCache(testStorageMethod);
        await runTestMethodsExpect(1, 1, 2);
    });
});
