import {Rcon} from 'rcon-client';

interface RConSenderOptionsInterface {
    host: string;
    password: string;
    port: number;
}

export default class RConSender {
    protected host: string;
    protected password: string;
    protected port: number;

    constructor({host, port, password}: RConSenderOptionsInterface) {
        this.host     = host;
        this.port     = port;
        this.password = password;
    }

    public async send(message: string): Promise<string> {
        const rcon = await Rcon.connect({host: this.host, port: this.port, password: this.password});
        const result = await rcon.send(message);
        await rcon.end();

        return result;
    }
}