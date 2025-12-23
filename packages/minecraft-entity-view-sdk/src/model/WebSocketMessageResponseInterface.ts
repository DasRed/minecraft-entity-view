import CommandType from './CommandType';

interface WebSocketMessageResponseInterface<T = unknown> {
    data: T;
    type: CommandType;
}

export default WebSocketMessageResponseInterface;