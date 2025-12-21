import APIPlayerListInterface from './players/PlayerListInterface';

interface APIPlayersInterface {
    max: number;
    players: APIPlayerListInterface;
}

export default APIPlayersInterface;