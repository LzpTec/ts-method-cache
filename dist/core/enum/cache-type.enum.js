export var CacheType;
(function (CacheType) {
    CacheType[CacheType["Memory"] = 1] = "Memory";
    CacheType[CacheType["Session"] = 2] = "Session";
    CacheType[CacheType["Storage"] = 3] = "Storage";
})(CacheType || (CacheType = {}));
