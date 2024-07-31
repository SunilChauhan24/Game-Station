import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';

const ToastMessages = ({ show, onClose, type, message, duration = 3000 }) => {
    const [showToast, setShowToast] = useState(show);

    useEffect(() => {
        setShowToast(show);
    }, [show]);

    useEffect(() => {
        let timer;
        if (showToast) {
            timer = setTimeout(() => {
                setShowToast(false);
                onClose(); 
            }, duration);
        }
        return () => clearTimeout(timer);
    }, [showToast, duration, onClose]);

    const headerColor = type === 'success' ? 'bg-success text-white' : 'bg-danger text-white';

    const handleClose = () => {
        setShowToast(false);
        onClose(); 
    };

    return (
        <Toast 
            show={showToast} 
            onClose={handleClose} 
            className="text-white"
            tabIndex="-1" 
            autohide 
            delay={duration} 
            style={{ position: 'fixed', top: '50px', right: '20px', zIndex: "99999" }}
        >
            <Toast.Header closeButton={true} className={headerColor}>
                <img 
                    src={require("./imgs/Logo.png")} 
                    width={'25px'} 
                    className="rounded me-2" 
                    alt="" 
                />
                <strong className="me-auto">{type === 'success' ? 'Success' : 'Error'}</strong>
                <small>Just now</small>
            </Toast.Header>
            <Toast.Body className='text-dark'>{message}</Toast.Body>
        </Toast>
    );
}

export default ToastMessages;
