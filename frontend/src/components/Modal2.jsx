
  import React, { useState } from 'react';

const Modal = ({ element, btn_Name, btn_Style, modal_ID, isOpen, onClose }) => {
    return (
        <>
            {isOpen && (
                <dialog open={isOpen} id={modal_ID} className='modal'>
                    <div className='modal-box'>
                        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2' onClick={onClose}>
                            ✕
                        </button>
                        {element}
                    </div>
                </dialog>
            )}
        </>
    );
};

export default Modal;
