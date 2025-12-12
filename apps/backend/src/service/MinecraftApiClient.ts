import EntityInterface from '@dasred/minecraft-entity-view-sdk/model/EntityInterface';

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

    public getEntities(): Promise<EntityInterface[] | null> {
        return this.fetch('GET', '/entities');
    }
}