import useHighlight from '@/hook/useHighlight';
import cn from '@/lib/cn';
import numberFormatter from '@/lib/numberFormater';
import {ReactElement} from 'react';

interface EntitySummaryValueOptionInterface {
    value: number;
}

export default function CountValue({value}: EntitySummaryValueOptionInterface): ReactElement {
    const highlight = useHighlight(value);

    return (
        <>
            (<span className={cn({' bg-value-update-default': highlight})}>{numberFormatter.format(value)}</span>)
        </>
    );
}