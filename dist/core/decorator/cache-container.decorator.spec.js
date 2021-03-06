var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { getCacheContainer } from '../resolver/method-cache-provider.resolver';
import { CacheContainer } from './cache-container.decorator';
describe('Cache container decorator is properly set', () => {
    const key = 'test';
    let TestCache = class TestCache {
    };
    TestCache = __decorate([
        CacheContainer(key)
    ], TestCache);
    it('should have a cache container options where the key equals the passed key', () => {
        const options = getCacheContainer(TestCache);
        expect(options.key).toEqual(key);
    });
});
