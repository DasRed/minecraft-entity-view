import UpdaterAbstract from '@/service/updater/Abstract';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';

export default class DimensionsUpdater extends UpdaterAbstract {
    public getCommandOnClientConnect(): CommandType {
        return CommandEnum.DIMENSIONS_FULL;
    }

    public getCurrentData(): unknown {
        return this.store.getDimensions();
    }

    public async update(): Promise<this> {
        const data = await this.client.getDimensions();
        if (data !== null) {
            this.store.setDimensions(data);
        }

        return this;
    }
}