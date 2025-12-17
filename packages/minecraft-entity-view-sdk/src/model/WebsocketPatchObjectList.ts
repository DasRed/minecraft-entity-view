interface WebsocketPatchObjectList<T = any> {
    add: Record<string, T>;
    ids: string[];
    remove: string[];
}

export default WebsocketPatchObjectList;
