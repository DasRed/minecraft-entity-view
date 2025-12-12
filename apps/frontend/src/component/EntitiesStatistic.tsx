'use client';

import EntitiesStatisticViewComponent from '@/component/EntitiesStatisticView';
import WebSocketEventTypeEnum from '@/constant/WebSocketEventTypeEnum';
import useInterval from '@/hook/useInterval';
import wsc from '@/lib/wsc';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {ReactElement, useEffect, useState} from 'react';

export default function EntitiesStatisticComponent(): ReactElement | null {
    const [result, setResult] = useState<StatisticsInterface | null>(null);

    useInterval(1000, () => wsc.send(WebSocketEventTypeEnum.GET_ENTITIES_STATISTIC));
    useEffect(() => {
        wsc.on(WebSocketEventTypeEnum.GET_ENTITIES_STATISTIC, setResult);
        return () => void wsc.off(WebSocketEventTypeEnum.GET_ENTITIES_STATISTIC);
    }, []);

    return result !== null ? <EntitiesStatisticViewComponent result={result}/> : null;
}
