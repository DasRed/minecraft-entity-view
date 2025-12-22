import EntityOrderTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityOrderTypeEnum';
import EntityTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityTypeEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import APIEntityInterface from '@dasred/minecraft-entity-view-sdk/model/api/EntityInterface';
import APIPlayersInterface from '@dasred/minecraft-entity-view-sdk/model/api/PlayersInterface';
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

    public getDimensions(): Promise<APIDimensionInterface[] | null> {
        return this.fetch('GET', '/dimensions');
    }

    public async getEntities(): Promise<StatisticEntityListInterface | null> {
        const entities: APIEntityInterface[] = await this.fetch('GET', '/entities');
        if (entities === null) {
            return null;
        }

        return (entities ?? []).reduce((acc, entity) => {
            let displayName         = entity.name;
            let displayType: string = entity.type;

            delete entity.onGround;

            if (entity.type === EntityTypeEnum.ITEM) {
                displayName = entity.item.name;
                displayType = entity.item.type;

                delete entity.item.age;
                delete entity.item.lifespan;
                delete entity.item.popTime;
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

            entity.x = Math.round(entity.x * 1000) / 1000;
            entity.y = Math.round(entity.y * 1000) / 1000;
            entity.z = Math.round(entity.z * 1000) / 1000;

            acc[entity.uuid] = {
                ...entity,
                category: MobCategoryOriginalToMobCategoryEnum[entity.category] ?? MobCategoryEnum.OTHER,
                displayName,
                displayType,
                stats:    {
                    firstSeen: 0,
                    order:     Object.fromEntries(Object.values(EntityOrderTypeEnum).map((orderType) => [orderType, 0])),
                    isMoved:   false,
                    isDeleted: false,
                    isNew:     false,
                },
            } as StatisticEntityInterface;
            return acc;
        }, {} as StatisticEntityListInterface);
    }

    public async getPlayers(): Promise<APIPlayersInterface | null> {
        const result: APIPlayersInterface | null = await this.fetch('GET', '/players');
        if (result === null) {
            return null;
        }

        Object.values(result.players).forEach((player) => {
            player.x        = Math.floor(player.x);
            player.y        = Math.floor(player.y);
            player.z        = Math.floor(player.z);
            player.yHeadRot = Math.floor(player.yHeadRot);
        });

        return result;
    }
}