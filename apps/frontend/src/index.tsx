import EntitiesStatisticComponent from '@/component/EntitiesStatistic';
import {createRoot} from 'react-dom/client';
import '@/index.css';

createRoot(document.body).render(
    <div className="p-2 antialiased font-sans">
        <EntitiesStatisticComponent/>
    </div>,
);