import type {Metadata} from 'next';
import {Nunito as PageFont} from 'next/font/google';
import './globals.css';
import React, {PropsWithChildren} from 'react';

const pageFont = PageFont({
    variable: '--font-family',
    subsets:  ['latin'],
    weight:   ['300', '400', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Minecraft Entity Stats',
};

export default function RootLayout({children}: PropsWithChildren<any>): React.ReactElement {
    return (
        <html lang="en">
        <body className={`${pageFont.variable} antialiased`}>
        {children}
        </body>
        </html>
    );
}
