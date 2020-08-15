import { getCacheContainer, getMethodCacheProvider, setCacheContainer } from '../resolver/method-cache-provider.resolver';
import { createHexoid } from './string.util';
export function createCacheDecorator(type, target, method, options) {
    const provider = getMethodCacheProvider(type);
    const cacheObject = (options.key && provider.getCacheObject(options.key)) || provider.createCacheObject(options);
    let container = null;
    return function (...args) {
        const argsString = JSON.stringify(args);
        if (container === null) {
            container = getCacheContainer(target.constructor);
            if (container) {
                provider.addToContainer(container, cacheObject);
            }
        }
        if (!cacheObject.hasCache(argsString) || cacheObject.isExpired(argsString)) {
            const res = method.call(this, ...args);
            provider.setCache(options, argsString, res);
            const isPromise = res && typeof res.then === 'function' && typeof res.catch === 'function';
            if (isPromise && options.cacheUntilRejected) {
                res.catch(() => cacheObject.clearArgs(argsString));
            }
        }
        return cacheObject.getCache(argsString);
    };
}
export function createCacheContainerDecorator(options) {
    return (target) => {
        setCacheContainer(target, options);
        return target;
    };
}
export function normalizeCacheSettings(options) {
    if (typeof options === 'string') {
        options = { key: options };
    }
    else if (!options) {
        options = { key: '' };
    }
    if (!options.key) {
        options.key = createHexoid();
    }
    return options;
}
export function normalizeCacheContainerSettings(options) {
    return normalizeCacheSettings(options);
}
