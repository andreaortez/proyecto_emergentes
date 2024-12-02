import React from 'react';

interface ModalParams {
    title: string;
    body: string;
    onClose: () => void;
}

export default function Modal({ title, body, onClose }: ModalParams) {
    return (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{`${title}`}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>{`${body}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};