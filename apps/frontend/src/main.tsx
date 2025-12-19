import WSProvider from '@/provider/WSProvider';
import router from '@/router';
import {RouterProvider} from '@tanstack/react-router';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@/styles.css';

createRoot(document.body).render(
    <StrictMode>
        <WSProvider>
            <RouterProvider router={router}/>
        </WSProvider>
    </StrictMode>,
);