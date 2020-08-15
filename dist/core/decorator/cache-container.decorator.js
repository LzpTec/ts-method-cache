import { createCacheContainerDecorator, normalizeCacheContainerSettings } from '../util/decorator.util';
export function CacheContainer(options) {
    options = normalizeCacheContainerSettings(options);
    return createCacheContainerDecorator(options);
}
