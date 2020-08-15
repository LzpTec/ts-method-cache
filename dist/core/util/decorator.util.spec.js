import { normalizeCacheSettings } from './decorator.util';
describe('Decorators Util', () => {
    describe('Proper CacheSetting normalization, normalizeCacheSettings', () => {
        const key = 'key';
        it('should make the options object always to have a key set', () => {
            const options = normalizeCacheSettings({});
            expect(options && options.key && options.key.length).toBeGreaterThan(0);
        });
        it('should make the options have the same key as passed as a string', () => {
            const options = normalizeCacheSettings(key);
            expect(options && options.key).toEqual(key);
        });
        it('should make the options have the same key as passed as a object', () => {
            const options = normalizeCacheSettings({ key });
            expect(options && options.key).toEqual(key);
        });
    });
});
