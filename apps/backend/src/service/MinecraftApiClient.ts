import EntityTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityTypeEnum';
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
            let displayName         = entity.name;
            let displayType: string = entity.type;

            if (entity.type === EntityTypeEnum.ITEM) {
                displayName = entity.item.name;
                displayType = entity.item.type;
            }
            else if (entity.type === EntityTypeEnum.BLOCK_DISPLAY && entity.tags.includes('portals.block_display.portal.nether_portal')) {
                displayName = 'Nether Portal';
                displayType = EntityTypeEnum.NETHER_PORTAL_BLOCK;
            }
            else if (entity.type === EntityTypeEnum.ARMOR_STAND && entity.tags.includes('portals.portal')) {
                displayName = 'Portals';
                displayType = EntityTypeEnum.PORTALS_BLOCK;
                delete entity.customName;
            }

            acc[entity.uuid] = {
                ...entity,
                category: MobCategoryOriginalToMobCategoryEnum[entity.category] ?? MobCategoryEnum.OTHER,
                displayName,
                displayType,
                stats:    {
                    firstSeenTimestamp: timestamp,
                    removeTimestamp:    null,
                    order:              {default: 0, name: 0, dimension: 0, position: 0},
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