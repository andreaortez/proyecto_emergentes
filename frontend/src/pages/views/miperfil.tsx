import React from 'react';
import UserProfile from '../components/userProfile'
import UserInformation from '../components/userInformation'

export default function MiPerfil() {
    return (
        <div className="components gap-4 d-flex">
            <UserProfile />
            <UserInformation />
        </div >
    );
};
