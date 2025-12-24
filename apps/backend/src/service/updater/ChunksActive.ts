import UpdaterIntervalAbstract from '@/service/updater/IntervalAbstract';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';

export default class ChunksActiveUpdater extends UpdaterIntervalAbstract {
    public getCommandOnClientConnect(): CommandType {
        return CommandEnum.CHUNKS_ACTIVE_FULL;
    }

    public getCurrentData(): unknown {
        return this.store.getChunksActive();
    }

    public async update(): Promise<this> {
        const data = await this.client.getChunksActive();
        if (data !== null) {
            this.store.setChunksActive(data);
        }

        return this;
    }
}