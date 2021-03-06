var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { StorageCache } from './storage-cache.decorator';
describe('Storage cache decorator is properly set', () => {
    class TestCache {
        constructor() {
            this.called = 0;
        }
        testMethod() {
            this.called++;
        }
    }
    __decorate([
        StorageCache('testMethod')
    ], TestCache.prototype, "testMethod", null);
    StorageCache('testMethod')(TestCache.prototype, 'testMethod', Object.getOwnPropertyDescriptor(TestCache.prototype, 'testMethod'));
    const testCache = new TestCache();
    it('should only call the test method once', () => {
        testCache.testMethod();
        testCache.testMethod();
        expect(testCache.called).toEqual(1);
    });
});
