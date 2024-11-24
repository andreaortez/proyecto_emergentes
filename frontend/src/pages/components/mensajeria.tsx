import React from 'react';
import Chats from './chats'
import Mensaje from './mensajes'

export default function Mensajes() {
    return (
        <div className="components gap-4 d-flex">
            <Chats />
            <Mensaje />
        </div>
    );
};
