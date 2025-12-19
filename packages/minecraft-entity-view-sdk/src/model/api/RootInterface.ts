import APIDimensionInterface from './DimensionInterface';
import APIPlayersInterface from './PlayersInterface';

interface APIRootInterface {
    dimensions: APIDimensionInterface[];
    players: APIPlayersInterface;
}

export default APIRootInterface;