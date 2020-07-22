import { CacheContainerOptions } from '../..';
import { CacheType } from '../enum/cache-type.enum';
import { BaseCacheOptions } from '../interface/base-cache-options';
import { BaseCacheObject } from '../object/base-cache.object';
import { BaseCacheProvider } from '../provider/base-cache.provider';
export declare type BaseCacheProviderType = BaseCacheProvider<BaseCacheObject<BaseCacheOptions>, BaseCacheOptions>;
export declare function getMethodCacheProvider<T extends BaseCacheProviderType>(type: CacheType): T;
export declare function setCacheContainer<T extends {
    new (...args: any[]): any;
}>(container: T, options: CacheContainerOptions): void;
export declare function getCacheContainer<T extends {
    new (...args: any[]): any;
}>(container: T): CacheContainerOptions | undefined;
