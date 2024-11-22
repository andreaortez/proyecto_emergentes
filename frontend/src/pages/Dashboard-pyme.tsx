import React from 'react';
import Sidebar from './components/sidebar-pyme'
import Navbar from './components/navbar-pyme'
import Portada from './components/dashboardPYME'

export default function BackgroundText() {
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Portada />
            </div>

        </>
    );
};