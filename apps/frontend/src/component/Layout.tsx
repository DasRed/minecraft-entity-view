import {Outlet} from '@tanstack/react-router';
import {ReactElement} from 'react';

export default function Layout(): ReactElement {
    return (
        <div className="p-2 antialiased font-sans">
            <Outlet/>
        </div>
    );
}