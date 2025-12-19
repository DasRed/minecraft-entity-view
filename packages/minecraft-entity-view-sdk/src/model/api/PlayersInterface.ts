import APIPlayerInterface from './players/PlayerInterface';

interface APIPlayersInterface {
    max: number;
    players: Record<string, APIPlayerInterface>;
}

export default APIPlayersInterface;