import SquaremapSettingsInterface from '@/squaremap/interfaces/SettingsInterface';
import SquaremapSettingsWorldInterface from '@/squaremap/interfaces/SettingsWorldInterface';
import SquaremapMap from '@/squaremap/Map';
import SquaremapWorld from '@/squaremap/World.js';

export default class SquaremapWorldList {
    curWorld?: SquaremapWorld;
    squaremap: SquaremapMap;
    worlds: Map<string, SquaremapWorld>;

    constructor(squaremap: SquaremapMap, json: SquaremapSettingsWorldInterface[]) {
        this.squaremap     = squaremap;
        // get worlds from json
        const unorderedMap = new Map<string, SquaremapWorld>();
        for (let i = 0; i < json.length; i++) {
            const world = new SquaremapWorld(squaremap, json[i]);
            unorderedMap.set(world.name, world);
        }

        // sort worlds by order
        this.worlds = new Map([...unorderedMap].sort((a, b) => a[1].order - b[1].order));

        // set up world list link elements
        for (const [name, world] of this.worlds) {
            const link   = squaremap.createElement('a', name, this);
            link.onclick = function () {
                // @ts-ignore
                const curWorld = this.parent.curWorld;
                if (curWorld.name === name) {
                    squaremap.centerOn(world.spawn!.x, world.spawn!.z, world.zoom!.def);
                    return;
                }
                squaremap.playerList.clearPlayerMarkers();
                // @ts-ignore
                this.parent.loadWorld(name, (world) => {
                    squaremap.centerOn(world.spawn.x, world.spawn.z, world.zoom.def);
                });
            };

            const img = document.createElement('img');
            img.src   = this.getIcon(world);

            link.appendChild(img);
            link.appendChild(squaremap.createTextElement('span', world.display_name));

            squaremap.sidebar.worlds.element.appendChild(link);
        }
    }

    getIcon(world: SquaremapWorld): string {
        if (world.icon != null && world.icon !== '') {
            return `images/icon/${world.icon}.png`;
        }
        switch (world.type) {
            case 'nether':
                return 'images/icon/red-cube-smol.png';
            case 'the_end':
                return 'images/icon/purple-cube-smol.png';
            case 'normal':
            default:
                return 'images/icon/green-cube-smol.png';
        }
    }

    loadInitialWorld(json: SquaremapSettingsInterface, callback: (world: SquaremapWorld) => void) {
        let name = this.squaremap.getUrlParam('world', null);
        if (name != null) {
            const world = this.worlds.get(name);
            if (world == null) {
                name = null;
            }
        }
        if (name == null) {
            name = json.worlds.sort((a, b) => a.order - b.order)[0].name;
        }
        this.loadWorld(name, callback);
    }

    loadWorld(name: string, callback: (world: SquaremapWorld) => void) {
        // unload current world
        if (this.curWorld != null) {
            this.curWorld.unload();
        }

        // load new world
        const world   = this.worlds.get(name)!;
        this.curWorld = world;
        world.load(callback);
    }

    showWorld(name: string, callback: () => void) {
        if (this.curWorld?.name === name) {
            if (callback != null) {
                callback();
            }
            return;
        }
        this.loadWorld(name, callback);
    }
}
