import MinecraftApiClient from '@/service/MinecraftApiClient';
import Store from '@/service/Store';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';

export default abstract class UpdaterAbstract {
    protected client: MinecraftApiClient;
    protected store: Store;

    constructor(client: MinecraftApiClient, store: Store) {
        this.client = client;
        this.store  = store;
    }

    public abstract getCommandOnClientConnect(): CommandType;

    public abstract getCurrentData(): unknown;

    public start(): Promise<this> {
        return this.update();
    }

    protected abstract update(): Promise<this>;
}