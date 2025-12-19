import UpdaterIntervalAbstract from '@/service/updater/IntervalAbstract';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';

export default class PlayersUpdater extends UpdaterIntervalAbstract {
    public getCommandOnClientConnect(): CommandType {
        return CommandEnum.PLAYERS_FULL;
    }

    public getCurrentData(): unknown {
        return this.store.getPlayers();
    }

    public async update(): Promise<this> {
        this.store.setPlayers(await this.client.getPlayers());

        return this;
    }
}