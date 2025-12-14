import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import EntityInterface from '@dasred/minecraft-entity-view-sdk/model/EntityInterface';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import StatisticEntityListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityListInterface';

const MobCategoryOriginalToMobCategoryEnum: Record<string, MobCategoryEnum> = {
    monster:                    MobCategoryEnum.MONSTER,
    creature:                   MobCategoryEnum.CREATURE,
    item:                       MobCategoryEnum.ITEM,
    misc:                       MobCategoryEnum.MISC,
    ambient:                    MobCategoryEnum.OTHER,
    axolotls:                   MobCategoryEnum.OTHER,
    water_ambient:              MobCategoryEnum.OTHER,
    water_creature:             MobCategoryEnum.OTHER,
    underground_water_creature: MobCategoryEnum.OTHER,
};

export default class MinecraftApiClient {
    private host: string;

    constructor(host: string) {
        this.host = host;
    }

    protected async fetch(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body: object | undefined = undefined): Promise<any> {
        const headers: HeadersInit = {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
        };

        try {
            const response = await fetch(`${this.host}${url.startsWith('/') ? url : `/${url}`}`, {
                cache: 'no-cache',
                method,
                headers,
                body:  body !== undefined ? JSON.stringify(body) : undefined,
            });

            if (response.ok === false) {
                throw new Error('request error');
            }

            return await response.json();
        }
        catch (exception) {
            console.log(exception);
            return null;
        }
    }

    public async getEntities(): Promise<StatisticEntityListInterface | null> {
        const entities: EntityInterface[] = await this.fetch('GET', '/entities');
        if (entities === null) {
            return null;
        }

        const timestamp = (new Date()).getTime();

        return (entities ?? []).reduce((acc, entity) => {
            acc[entity.uuid] = {
                ...entity,
                category: MobCategoryOriginalToMobCategoryEnum[entity.category],
                stats:    {
                    firstSeenTimestamp: timestamp,
                    removeTimestamp:    null,
                    firstPosition:      {
                        x: entity.x,
                        y: entity.y,
                        z: entity.z,
                    },
                    previousPosition:   {
                        x: entity.x,
                        y: entity.y,
                        z: entity.z,
                    },
                    moved:              false,
                },
            } as StatisticEntityInterface;
            return acc;
        }, {} as StatisticEntityListInterface);
    }
}