import CommandType from './CommandType';

interface WebSocketMessageInterface<T = unknown> {
    data: T;
    date: string;
    type: CommandType;
}

export default WebSocketMessageInterface;