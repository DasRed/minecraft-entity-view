import EntitiesStatisticComponent from '@/component/EntitiesStatistic';
import WSProvider from '@/component/WSProvider';
import {createRoot} from 'react-dom/client';
import '@/index.css';

createRoot(document.body).render(
    <WSProvider>
        <div className="p-2 antialiased font-sans">
            <EntitiesStatisticComponent/>
        </div>
    </WSProvider>,
);