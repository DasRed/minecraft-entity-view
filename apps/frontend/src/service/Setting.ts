export default class Setting {
    protected prefix: string;
    protected storage: Storage;

    constructor(storage: Storage, prefix: string = 'mev.setting.') {
        this.storage = storage;
        this.prefix  = prefix;
    }

    get<T = unknown>(key: string): T | null;
    get<T = unknown>(key: string, defaultValue: T): T ;
    get<T = unknown>(key: string, defaultValue?: T): T | null {
        const value = this.storage.getItem(`${this.prefix}${key}`);
        if (value === null) {
            return defaultValue ?? null;
        }

        return JSON.parse(value);
    }

    set<T = unknown>(key: string, value: T): this {
        this.storage.setItem(`${this.prefix}${key}`, JSON.stringify(value));
        return this;
    }
}