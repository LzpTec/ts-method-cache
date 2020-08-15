var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CacheType } from '../enum/cache-type.enum';
import { baseCacheDecorator } from './base-cache.decorator';
const increment = 5;
class TestCache {
    constructor() {
        this.called = 0;
        this.getterCalled = 0;
    }
    get testGetter() {
        this.getterCalled++;
        return 'testGetter';
    }
    testMethod(test = 0, decrement = 0) {
        this.called++;
        return test + increment - decrement;
    }
}
__decorate([
    baseCacheDecorator(CacheType.Memory)
], TestCache.prototype, "testGetter", null);
__decorate([
    baseCacheDecorator(CacheType.Memory)
], TestCache.prototype, "testMethod", null);
describe('Cache decorator is properly set', () => {
    let testCache;
    beforeEach(() => {
        testCache = new TestCache();
    });
    it('should only call the test method once per argument(s)', () => {
        testCache.testMethod();
        testCache.testMethod();
        testCache.testMethod(1);
        testCache.testMethod(1);
        testCache.testMethod(1, 1);
        testCache.testMethod(1, 1);
        expect(testCache.called).toEqual(3);
    });
    it('should work for a getter', () => {
        const i = testCache.testGetter;
        const ii = testCache.testGetter;
        expect(testCache.getterCalled).toEqual(1);
    });
    it('should not work for a setter', async () => {
        await expect(() => {
            // tslint:disable-next-line:max-classes-per-file
            class TestSetter {
                constructor() {
                    this._setter = '';
                }
                set setter(set) {
                    this._setter = set;
                }
            }
            __decorate([
                baseCacheDecorator(CacheType.Memory)
            ], TestSetter.prototype, "setter", null);
            const t = new TestSetter();
        }).toThrowError(`Can't set cache decorator on a setter`);
    });
    it('should return the right value for the right argument(s)', () => {
        const value1 = 5;
        const value2 = 10;
        const noCache1 = testCache.testMethod(value1);
        const cache1 = testCache.testMethod(value1);
        const noCache2 = testCache.testMethod(value2);
        const cache2 = testCache.testMethod(value2);
        const noCache3 = testCache.testMethod(value1, value2);
        const cache3 = testCache.testMethod(value1, value2);
        expect(noCache1).toEqual(cache1);
        expect(noCache1).toEqual(value1 + increment);
        expect(noCache2).toEqual(cache2);
        expect(noCache2).toEqual(value2 + increment);
        expect(noCache3).toEqual(cache3);
        expect(noCache3).toEqual(value1 + increment - value2);
    });
});
