'use client';
import React, { useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalClassName = isOpen
    ? 'fixed inset-0 flex items-center justify-center z-10 overflow-y-auto'
    : 'hidden';
  const overlayClassName = isOpen
    ? 'fixed inset-0 bg-black opacity-50'
    : 'hidden';

  return (
    <div>
      <div className={overlayClassName} onClick={onClose}></div>
      <div className={modalClassName}>
        <div className="modal-container bg-white rounded-lg shadow-lg p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
