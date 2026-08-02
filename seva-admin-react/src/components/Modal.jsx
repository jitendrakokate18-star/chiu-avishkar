import React, { useEffect } from 'react';

export default function Modal({ title, children, onClose }) {
  useEffect(() => {
    // Add small delay for animation
    const timer = setTimeout(() => {
      document.getElementById('global-modal').classList.add('active');
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    document.getElementById('global-modal').classList.remove('active');
    setTimeout(() => onClose(), 300);
  };

  return (
    <div id="global-modal" className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <span className="material-icons modal-close" onClick={handleClose} style={{ cursor: 'pointer' }}>close</span>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
