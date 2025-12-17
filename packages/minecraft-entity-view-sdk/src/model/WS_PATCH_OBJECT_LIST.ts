interface WS_PATCH_OBJECT_LIST<T = any> {
    add: Record<string, T>;
    ids: string[];
    remove: string[];
}

export default WS_PATCH_OBJECT_LIST;
