import React from 'react';
import './Modal.css';

const Modal = ({ selectedImg, setSelectedImg }) => {

    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop')) {
            setSelectedImg(null);
        }
    }

    return (
        <div className="backdrop"
            onClick={handleClick}>
            <img src={selectedImg} alt="modal pop" />
        </div>
    );
}

export default Modal;