"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const memory_cache_decorator_1 = require("../../cache/memory/decorator/memory-cache.decorator");
const method_cache_service_1 = require("./method-cache.service");
const msg = 'error msg';
const err = () => new Error(msg);
const returnValue = 'return value';
class Target {
    constructor() {
        this.nonThrowingCalled = 0;
        this.throwingCalled = 0;
        this.asyncNonThrowingCalled = 0;
        this.asyncThrowingCalled = 0;
        this.asyncNonThrowingNoCacheCalled = 0;
        this.asyncThrowingNoCacheCalled = 0;
        this.nonImmediateAsyncThrowingNoCacheCalled = 0;
        this.rejects = [];
    }
    nonThrowingMethod() {
        this.nonThrowingCalled++;
        return returnValue;
    }
    throwingMethod() {
        this.throwingCalled++;
        throw err();
    }
    async asyncNonThrowingMethod() {
        this.asyncNonThrowingCalled++;
        return returnValue;
    }
    async asyncThrowingMethod() {
        this.asyncThrowingCalled++;
        throw err();
    }
    async asyncNonThrowingNoCacheMethod() {
        this.asyncNonThrowingNoCacheCalled++;
        return returnValue;
    }
    async asyncThrowingNoCacheMethod() {
        this.asyncThrowingNoCacheCalled++;
        throw err();
    }
    nonImmediateAsyncThrowingNoCacheMethod() {
        this.nonImmediateAsyncThrowingNoCacheCalled++;
        return new Promise((resolve, reject) => this.rejects.push(reject));
    }
}
__decorate([
    memory_cache_decorator_1.MemoryCache()
], Target.prototype, "nonThrowingMethod", null);
__decorate([
    memory_cache_decorator_1.MemoryCache()
], Target.prototype, "throwingMethod", null);
__decorate([
    memory_cache_decorator_1.MemoryCache()
], Target.prototype, "asyncNonThrowingMethod", null);
__decorate([
    memory_cache_decorator_1.MemoryCache()
], Target.prototype, "asyncThrowingMethod", null);
__decorate([
    memory_cache_decorator_1.MemoryCache({ cacheUntilRejected: true })
], Target.prototype, "asyncNonThrowingNoCacheMethod", null);
__decorate([
    memory_cache_decorator_1.MemoryCache({ cacheUntilRejected: true })
], Target.prototype, "asyncThrowingNoCacheMethod", null);
__decorate([
    memory_cache_decorator_1.MemoryCache({ cacheUntilRejected: true })
], Target.prototype, "nonImmediateAsyncThrowingNoCacheMethod", null);
describe('Method cache clears on promise reject', () => {
    let target;
    const cacheService = new method_cache_service_1.MethodCacheService();
    const runMethods = async () => {
        expect(target.nonThrowingMethod()).toEqual(returnValue);
        expect(() => target.throwingMethod()).toThrowError(msg);
        expect(await target.asyncNonThrowingMethod()).toEqual(returnValue);
        try {
            await target.asyncThrowingMethod();
            fail();
        }
        catch (e) {
            expect(e).toEqual(err());
        }
        expect(await target.asyncNonThrowingNoCacheMethod()).toEqual(returnValue);
        try {
            await target.asyncThrowingNoCacheMethod();
            fail();
        }
        catch (e) {
            expect(e).toEqual(err());
        }
    };
    it('should re-call throwing methods', async () => {
        cacheService.clearAllCache();
        target = new Target();
        for (let i = 0; i < 5; i++) {
            await runMethods();
        }
        expect([
            target.nonThrowingCalled,
            target.throwingCalled,
            target.asyncNonThrowingCalled,
            target.asyncThrowingCalled,
            target.asyncNonThrowingNoCacheCalled,
            target.asyncThrowingNoCacheCalled
        ]).toEqual([1, 5, 1, 1, 1, 5]);
        cacheService.clearAllCache();
        let promises = [];
        promises.push(target.nonImmediateAsyncThrowingNoCacheMethod());
        promises.push(target.nonImmediateAsyncThrowingNoCacheMethod());
        promises.push(target.nonImmediateAsyncThrowingNoCacheMethod());
        expect(target.nonImmediateAsyncThrowingNoCacheCalled).toEqual(1);
        target.rejects.forEach((reject) => reject(msg));
        try {
            await Promise.all(promises);
        }
        catch (e) {
            expect(e).toEqual(msg);
        }
        promises = [];
        promises.push(target.nonImmediateAsyncThrowingNoCacheMethod());
        promises.push(target.nonImmediateAsyncThrowingNoCacheMethod());
        promises.push(target.nonImmediateAsyncThrowingNoCacheMethod());
        expect(target.nonImmediateAsyncThrowingNoCacheCalled).toEqual(2);
        target.rejects.forEach((reject) => reject(msg));
        try {
            await Promise.all(promises);
        }
        catch (e) {
            expect(e).toEqual(msg);
        }
    });
});
