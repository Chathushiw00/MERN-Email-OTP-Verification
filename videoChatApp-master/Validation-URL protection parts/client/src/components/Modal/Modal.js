import React from 'react';
import './Modal.css';
const Modal = ({ open, onClose, children }) => {
    if (!open) {
        return null;
    }
    return (<div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content box" style={{ width: 400 }}>
        {children}
      </div>
    </div>);
};
export default Modal;
