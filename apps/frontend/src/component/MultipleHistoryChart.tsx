import 'uplot/dist/uPlot.min.css';
import useWSS from '@/hook/useWSS';
import cn from '@/lib/cn';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import HistoryCountMobCategoryInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/HistoryCountMobCategoryInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {ReactElement, useEffect, useRef} from 'react';
import colors from 'tailwindcss/colors';
import uPlot from 'uplot';

interface MultipleHistoryChartOptionsInterface {
    className?: string;
    statistic: StatisticsInterface;
}

export default function MultipleHistoryChart({className, statistic}: MultipleHistoryChartOptionsInterface): ReactElement {
    const refChart  = useRef<HTMLDivElement>(null);
    const refLegend = useRef<HTMLDivElement>(null);
    const plotRef   = useRef<uPlot | null>(null);
    const data      = useWSS<HistoryCountMobCategoryInterface>(CommandEnum.UPDATE_COUNT_HISTORY_MOB, statistic.count.history.mobCategory);

    useEffect(() => {
        if (refChart.current === null || refLegend.current === null) {
            return;
        }

        plotRef.current = new uPlot(
            {
                width:  refChart.current.clientWidth,
                height: refChart.current.clientHeight,
                series: [
                    {},
                    {label: 'Monster', show: true, width: 1, stroke: colors.blue['400'], spanGaps: true},
                    {label: 'Creature', show: true, width: 1, stroke: colors.green['600'], spanGaps: true},
                    {label: 'Item', show: true, width: 1, stroke: colors.orange['400'], spanGaps: true},
                    {label: 'Misc', show: true, width: 1, stroke: colors.red['500'], spanGaps: true},
                    {label: 'Other', show: true, width: 1, stroke: colors.teal['400'], spanGaps: true},
                ],
                axes:   [
                    {
                        values: [
                            // @formatter:off
                            // tick incr          default           year                             month    day                        hour     min                sec       mode
                            [3600 * 24 * 365,   "{YYYY}",         null,                            null,    null,                      null,    null,              null,        1],
                            [3600 * 24 * 28,    "{MMM}",          "\n{YYYY}",                      null,    null,                      null,    null,              null,        1],
                            [3600 * 24,         "{D}.{M}",        "\n{YYYY}",                      null,    null,                      null,    null,              null,        1],
                            [3600,              "{H}",            "\n{D}.{M}.{YYYY}",              null,    "\n{D}.{M}",               null,    null,              null,        1],
                            [60,                "{H}:{mm}",       "\n{D}.{M}.{YYYY}",              null,    "\n{D}.{M}",               null,    null,              null,        1],
                            [1,                 ":{ss}",          "\n{D}.{M}.{YYYY} {H}:{mm}",     null,    "\n{D}.{M} {H}:{mm}",      null,    "\n{H}:{mm}",      null,        1],
                            [0.001,             ":{ss}.{fff}",    "\n{D}.{M}.{YYYY} {H}:{mm}",     null,    "\n{D}.{M} {H}:{mm}",      null,    "\n{H}:{mm}",      null,        1],
                            // @formatter:on
                        ],
                    },
                ],
                legend: {
                    mount: (self, element) => refLegend!.current!.appendChild(element),
                },
            },
            [data.timestamp, data.monster, data.creature, data.item, data.misc, data.other],
            refChart.current,
        );

        return () => plotRef.current?.destroy();
    }, []);

    useEffect(() => {
        plotRef.current?.setData([data.timestamp, data.monster, data.creature, data.item, data.misc, data.other]);
    }, [data]);

    return (
        <div>
            <div ref={refLegend}></div>
            <div ref={refChart} className={cn('w-full h-150', className)}/>
        </div>
    );
}