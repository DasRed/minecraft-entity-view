import EntitiesStatisticComponent from '@/component/EntitiesStatistic';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@/index.css';

createRoot(document.body).render(
    <StrictMode>
        <div className="p-2 antialiased font-sans">
            <EntitiesStatisticComponent/>
        </div>
    </StrictMode>
);