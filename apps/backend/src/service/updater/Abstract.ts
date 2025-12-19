import MinecraftApiClient from '@/service/MinecraftApiClient';
import Store from '@/service/Store';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import EventEmitter from 'node:events';

export default abstract class UpdaterAbstract extends EventEmitter {
    protected client: MinecraftApiClient;
    protected store: Store;

    constructor(client: MinecraftApiClient, store: Store) {
        super();
        this.client = client;
        this.store  = store;
    }

    public abstract getCommandOnClientConnect(): CommandType;

    public abstract getCurrentData(): unknown;

    public getDataOnClientConnect(): unknown {
        return this.getCurrentData();
    }

    public start(): Promise<this> {
        return this.update();
    }

    protected abstract update(): Promise<this>;
}