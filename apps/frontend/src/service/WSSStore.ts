import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';

type Listener = () => void;

export default class WSSStore {
    private data      = new Map<CommandType, any>();
    private listeners = new Map<CommandType, Set<Listener>>();

    public delete(command: CommandType) {
        this.listeners.delete(command);
        this.data.delete(command);
    }

    public get(command: CommandType) {
        return this.data.get(command);
    }

    public set(command: CommandType, value: any) {
        this.data.set(command, value);
        this.listeners.get(command)?.forEach((listener) => listener());
    }

    public subscribe(command: CommandType, listener: Listener) {
        let set = this.listeners.get(command);
        if (set === undefined) {
            set = new Set();
            this.listeners.set(command, set);
        }
        set.add(listener);

        return () => {
            set!.delete(listener);
            if (set?.size === 0) {
                this.data.delete(command);
                this.listeners.delete(command);
            }
        };
    }
}