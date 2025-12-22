import EntitiesStatisticComponent from '@/component/EntitiesStatistic';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/entities/')({
    component: EntitiesStatisticComponent,
});