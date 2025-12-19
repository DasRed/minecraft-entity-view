import DifferenceHandlerAbstract from '@/service/differenceHandler/Abstract';
import MinecraftApiClient from '@/service/MinecraftApiClient';
import Store from '@/service/Store';
import UpdaterAbstract from '@/service/updater/Abstract';
import {clearTimeout} from 'node:timers';

export default abstract class UpdaterIntervalAbstract extends UpdaterAbstract {
    protected differenceHandler: DifferenceHandlerAbstract[];
    protected interval: number;
    protected timer: NodeJS.Timeout | undefined;

    constructor(client: MinecraftApiClient, store: Store, interval: number, differenceHandler: DifferenceHandlerAbstract[] = []) {
        super(client, store);
        this.interval          = interval;
        this.differenceHandler = differenceHandler;
    }

    protected clearTimer(): this {
        if (this.timer !== undefined) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }

        return this;
    }

    protected async run(): Promise<this> {
        this.clearTimer();

        const dataBefore = this.getCurrentData();
        await this.update();
        const dataAfter = this.getCurrentData();

        this.differenceHandler.forEach((handler) => handler.handle(dataAfter, dataBefore));

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