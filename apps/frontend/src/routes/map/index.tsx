import Map from '@/component/Map';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/map/')({
    component: Map,
});
