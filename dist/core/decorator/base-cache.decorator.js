import { createCacheDecorator, normalizeCacheSettings } from '../util/decorator.util';
export function baseCacheDecorator(cacheType, options) {
    options = normalizeCacheSettings(options);
    return (target, method, descriptor) => {
        if (descriptor.hasOwnProperty('get') && descriptor.get) {
            descriptor.get = createCacheDecorator(cacheType, target, descriptor.get, options);
        }
        else if (!descriptor.hasOwnProperty('set') && descriptor.value) {
            descriptor.value = createCacheDecorator(cacheType, target, descriptor.value, options);
        }
        else {
            throw new Error(`Can't set cache decorator on a setter`);
        }
        return descriptor;
    };
}
