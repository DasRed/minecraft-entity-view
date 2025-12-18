import EntitiesStatisticComponent from '@/component/EntitiesStatistic';
import WSProvider from '@/component/WSProvider';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@/index.css';

createRoot(document.body).render(
    <StrictMode>
        <WSProvider>
            <div className="p-2 antialiased font-sans">
                <EntitiesStatisticComponent/>
            </div>
        </WSProvider>
    </StrictMode>,
);