import { CacheReturnType } from '../..';
import { MemoryCacheObject } from '../../cache/memory/object/memory-cache.object';
import { SessionCacheObject } from '../../cache/persistent/session/object/session-cache.object';
describe('Cache Object', () => {
    const key = 'key';
    const args = 'args';
    const cache = 'cache';
    const ttl = 50;
    describe('default', () => {
        const cacheObject = new MemoryCacheObject({ key });
        it('should have cache after set', () => {
            cacheObject.setCache(args, cache);
            expect(cacheObject.hasCache(args)).toBeTruthy();
        });
        it('should have the same cache as set', () => {
            cacheObject.setCache(args, cache);
            expect(cacheObject.getCache(args)).toEqual(cache);
        });
        it('should have no cache after clear', () => {
            cacheObject.setCache(args, cache);
            cacheObject.clearArgs(args);
            expect(cacheObject.hasCache(args)).toBeFalsy();
            cacheObject.setCache(args, cache);
            cacheObject.clear();
            expect(cacheObject.hasCache(args)).toBeFalsy();
        });
        it('should not be expired', () => {
            cacheObject.setCache(args, cache);
            expect(cacheObject.isExpired(args)).toBeFalsy();
        });
    });
    describe('TTL', () => {
        describe('using seconds', () => {
            const cacheObject = new MemoryCacheObject({ key, ttl: ttl / 1000 });
            beforeEach(() => {
                cacheObject.setCache(args, cache);
            });
            it('should not be expired', () => {
                expect(cacheObject.isExpired(args)).toBeFalsy();
            });
            it('should be expired', done => {
                setTimeout(() => {
                    expect(cacheObject.isExpired(args)).toBeTruthy();
                    done();
                }, ttl + 1);
            });
        });
        describe('using date object', () => {
            let cacheObject;
            beforeEach(() => {
                cacheObject = new MemoryCacheObject({ key, ttl: new Date(Date.now() + ttl) });
                cacheObject.setCache(args, cache);
            });
            it('should not be expired', () => {
                expect(cacheObject.isExpired(args)).toBeFalsy();
            });
            it('should be expired', done => {
                setTimeout(() => {
                    expect(cacheObject.isExpired(args)).toBeTruthy();
                    done();
                }, ttl + 1);
            });
        });
        describe('using date string', () => {
            let timestamp = Date.now() + ttl;
            let cacheObject;
            beforeEach(() => {
                timestamp = Date.now() + ttl;
                const dateString = new Date(timestamp).toLocaleString();
                cacheObject = new MemoryCacheObject({ key, ttl: dateString });
                cacheObject.setCache(args, cache);
            });
            it('should have close to the same timestamp as the date string given', () => {
                expect(cacheObject['ttl'][args] - timestamp).toBeLessThan(2000);
            });
            it('should not be expired', () => {
                expect(cacheObject.isExpired(args)).toBeFalsy();
            });
            it('should be expired', done => {
                setTimeout(() => {
                    expect(cacheObject.isExpired(args)).toBeTruthy();
                    done();
                }, ttl + 1);
            });
        });
    });
    describe('inherit Cache Container Options', () => {
        const options = {
            key,
            returnType: CacheReturnType.Promise,
            ttl
        };
        it('should inherit the returnType', () => {
            const cacheObject = new MemoryCacheObject({ key });
            cacheObject.inheritContainerOptions(options);
            expect(cacheObject.options.returnType).toEqual(CacheReturnType.Promise);
        });
        it('should inherit the ttl', () => {
            const cacheObject = new MemoryCacheObject({ key });
            cacheObject.inheritContainerOptions(options);
            expect(cacheObject.options.ttl).toEqual(ttl);
        });
        it('should not override the returnType', () => {
            const cacheObject = new SessionCacheObject({ key, returnType: CacheReturnType.Promise });
            cacheObject.inheritContainerOptions(options);
            expect(cacheObject.options.returnType).toEqual(CacheReturnType.Promise);
        });
        it('should not override the ttl', () => {
            const cacheObject = new MemoryCacheObject({ key, ttl: ttl * 10 });
            cacheObject.inheritContainerOptions(options);
            expect(cacheObject.options.ttl).toEqual(ttl * 10);
        });
    });
});
