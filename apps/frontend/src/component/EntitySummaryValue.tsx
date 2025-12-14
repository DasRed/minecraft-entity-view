import WSSubscribe from '@/component/WSSubscribe';
import numberFormatter from '@/lib/numberFormater';
import {ReactElement} from 'react';

interface EntitySummaryValueOptionInterface {
    command?: string;
    initial: number;
}

export default function EntitySummaryValue({command, initial}: EntitySummaryValueOptionInterface): ReactElement {
    if (command === undefined) {
        return <>{numberFormatter.format(initial)}</>;
    }

    return (
        <WSSubscribe command={command} initial={initial}>
            {(value) => numberFormatter.format(value)}
        </WSSubscribe>
    );
}