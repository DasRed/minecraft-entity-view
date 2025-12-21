import WSProvider from '@/provider/WSProvider';
import router from '@/router';
import {RouterProvider} from '@tanstack/react-router';
import {createRoot} from 'react-dom/client';
import '@/styles.css';

createRoot(document.body).render(
    <WSProvider>
        <RouterProvider router={router}/>
    </WSProvider>,
);