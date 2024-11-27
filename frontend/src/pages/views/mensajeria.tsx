import React from 'react';
import Chats from '../components/chats'
import Mensaje from '../components/mensajes'

export default function Mensajes() {
    return (
        <div className="components gap-4 d-flex">
            <Chats />
            <Mensaje />
        </div>
    );
};
