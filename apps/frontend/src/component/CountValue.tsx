'use client';

import useHighlight from '@/hook/useHighlight';
import useWSS from '@/hook/useWSS';
import cn from '@/lib/cn';
import numberFormatter from '@/lib/numberFormater';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import {ReactElement} from 'react';

interface EntitySummaryValueOptionInterface {
    value: number;
    command: CommandType;
}

export default function CountValue({value: initial, command}: EntitySummaryValueOptionInterface): ReactElement {
    const value     = useWSS<number>(command, initial);
    const highlight = useHighlight(value);

    return (
        <>
            (<span className={cn({' bg-value-update': highlight})}>{numberFormatter.format(value)}</span>)
        </>
    );
}