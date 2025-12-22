import {Outlet} from '@tanstack/react-router';
import {LucideMap, LucidePiggyBank} from 'lucide-react';
import {ReactElement} from 'react';

export default function Layout(): ReactElement {
    return (
        <div className="antialiased font-sans flex flex-col min-h-screen">
            <header className="h-12 border-b border-b-gray-600 flex flex-row items-center p-3 gap-1">
                <img src="/favicon.ico" className="w-5 h-5" alt=""/>
                <h1 className="font-bold text-2xl">Minecraft Entity View</h1>
                <div className="flex-1"></div>
                <a href="/map" className="flex flex-row items-center gap-1 border-b-2 border-b-transparent hover:border-b-teal-600 hover:text-teal-600 mr-5"><LucideMap className="w-5 h-5 pr-1"/> Map</a>
                <a href="/entities" className="flex flex-row items-center gap-1 border-b-2 border-b-transparent hover:border-b-teal-600 hover:text-teal-600"><LucidePiggyBank className="w-5 h-5"/> Entities</a>
            </header>
            <main className="p-2 flex-1 relative">
                <Outlet/>
            </main>
        </div>
    );
}