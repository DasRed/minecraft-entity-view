import {ReactElement} from 'react';

interface PlayerIconOptionsInterface {
    uuid: string;
    size?: number;
}

export default function PlayerIcon({uuid, size = 16}: PlayerIconOptionsInterface): ReactElement {
    return <img src={`https://mc-heads.net/avatar/${uuid}/${size}`} alt=""/>;
}