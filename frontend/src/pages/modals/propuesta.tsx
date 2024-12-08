import React from 'react';

interface ModalParams {
    onClose: () => void;
}

export default function Propuesta({ onClose }: ModalParams) {
    return (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Realizar Propuesta</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <label htmlFor="ROI" className="col-form-label">
                                ROI
                            </label>
                            <input type="text" className="form-control mb-3" id="ROI" required />

                            <label htmlFor="monto" className="col-sm-3 col-form-label">
                                Monto a invertir
                            </label>
                            <input type="text" className="form-control mb-3" id="monto" required />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-dark">Enviar Propuesta</button>
                    </div>
                </div>
            </div>
        </div>
    );
};