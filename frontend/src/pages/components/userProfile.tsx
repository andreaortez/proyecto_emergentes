import React from 'react';

export default function userProfile() {
    return (
        <div className="card text-center" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">User Name</h5>
                <h6 className="card-subtitle mb-2">Rol</h6>
                <img
                    src="https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png"
                    alt="User Avatar"
                    className="rounded-circle mb-3 mt-3"
                    width="120"
                    height="120"
                />
                <p className="card-text text-body-secondary">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button type="button" className="btn btn3">Eliminar Cuenta</button>
            </div>
        </div>
    );
};