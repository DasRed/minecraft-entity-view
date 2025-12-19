import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';

type Listener = () => void;

export default class WSSStore {
    private data      = new Map<CommandType, any>();
    private listeners = new Map<CommandType, Set<Listener>>();

    private cleanUp() {
        this.data.forEach((data, command: CommandType) => {
            if (this.listeners.size === 0) {
                this.listeners.delete(command);
                this.data.delete(command);
            }
        });

        this.listeners.forEach((listeners, command: CommandType) => {
            if (listeners.size === 0) {
                this.listeners.delete(command);
                this.data.delete(command);
            }
        });
    }

    public delete(command: CommandType) {
        this.listeners.delete(command);
        this.data.delete(command);
    }

    public get(command: CommandType) {
        return this.data.get(command);
    }

    public set(command: CommandType, value: any) {
        const listeners = this.listeners.get(command);
        // if (listeners === undefined || listeners.size === 0) {
        //     return;
        // }

        this.data.set(command, value);
        listeners?.forEach((listener) => listener());
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
                this.delete(command);
                this.cleanUp();
            }
        };
    }
}