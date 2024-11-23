import React from 'react';
import UserProfile from './userProfile'
import UserInformation from './userInformation'

export default function MiPerfil() {
    return (
        <div className="components gap-4">
            <UserProfile />
            <UserInformation />
        </div >
    );
};
