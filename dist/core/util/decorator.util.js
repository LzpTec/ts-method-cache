"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCacheContainerSettings = exports.normalizeCacheSettings = exports.createCacheContainerDecorator = exports.createCacheDecorator = void 0;
const method_cache_provider_resolver_1 = require("../resolver/method-cache-provider.resolver");
const string_util_1 = require("./string.util");
function createCacheDecorator(type, target, method, options) {
    const provider = method_cache_provider_resolver_1.getMethodCacheProvider(type);
    const cacheObject = (options.key && provider.getCacheObject(options.key)) || provider.createCacheObject(options);
    let container = null;
    return function (...args) {
        const argsString = JSON.stringify(args);
        if (container === null) {
            container = method_cache_provider_resolver_1.getCacheContainer(target.constructor);
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
exports.createCacheDecorator = createCacheDecorator;
function createCacheContainerDecorator(options) {
    return (target) => {
        method_cache_provider_resolver_1.setCacheContainer(target, options);
        return target;
    };
}
exports.createCacheContainerDecorator = createCacheContainerDecorator;
function normalizeCacheSettings(options) {
    if (typeof options === 'string') {
        options = { key: options };
    }
    else if (!options) {
        options = { key: '' };
    }
    if (!options.key) {
        options.key = string_util_1.createHexoid();
    }
    return options;
}
exports.normalizeCacheSettings = normalizeCacheSettings;
function normalizeCacheContainerSettings(options) {
    return normalizeCacheSettings(options);
}
exports.normalizeCacheContainerSettings = normalizeCacheContainerSettings;
