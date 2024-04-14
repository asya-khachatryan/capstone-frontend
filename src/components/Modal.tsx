import React from 'react';

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal bg-white w-96 rounded-lg overflow-hidden shadow-xl">
        <div
          className="modal-header bg-gray-200 px-4 py-2 flex justify-end"
        >
          <p className="close text-gray-600"
            onClick={() => closeModal()}
          >&times;</p>
        </div>
        <div className="modal-content px-4 py-6">{children}</div>
        <div className="modal-footer px-4 py-2 flex justify-end">
          <button
            type="button"
            className="btn btn-cancel bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition duration-300 ease-in-out"
            onClick={() => closeModal()}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;