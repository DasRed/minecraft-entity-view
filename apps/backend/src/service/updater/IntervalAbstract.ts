import MinecraftApiClient from '@/service/MinecraftApiClient';
import Store from '@/service/Store';
import UpdaterAbstract from '@/service/updater/Abstract';
import {clearTimeout} from 'node:timers';

export default abstract class UpdaterIntervalAbstract extends UpdaterAbstract {
    protected interval: number;
    protected timer: NodeJS.Timeout | undefined;

    constructor(client: MinecraftApiClient, store: Store, interval: number) {
        super(client, store);
        this.interval = interval;
    }

    protected clearTimer(): this {
        if (this.timer !== undefined) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }

        return this;
    }

    protected getDataOnUpdate(): unknown {
        return this.getCurrentData();
    }

    protected abstract getEventOnUpdate(): string;

    protected async run(): Promise<this> {
        this.clearTimer();

        const dataBefore = this.getDataOnUpdate();
        await this.update();
        this.emit(this.getEventOnUpdate(), this.getDataOnUpdate(), dataBefore);

        this.timer = setTimeout(() => this.run(), this.interval);

        return this;
    }

    public async start(): Promise<this> {
        this.clearTimer();

        await super.start();
        this.timer = setTimeout(() => this.run(), this.interval);

        return this;
    }

}