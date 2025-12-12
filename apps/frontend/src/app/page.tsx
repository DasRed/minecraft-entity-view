import EntitiesStatisticComponent from '@/component/EntitiesStatistic';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Entities Statistics',
};

export default function Home() {
    return (
        <div className="p-2">
            <EntitiesStatisticComponent/>
        </div>
    );
}
