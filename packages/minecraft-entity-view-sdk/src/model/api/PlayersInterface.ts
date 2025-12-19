import APIPlayerInterface from './players/PlayerInterface';

interface APIPlayersInterface {
    max: number;
    players: APIPlayerInterface[];
}

export default APIPlayersInterface;