import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
	return (
		<>
			{isOpen ? (
				<div className="fixed inset-0 z-50  xsm:px-4 sm:px-12 overflow-auto flex justify-center items-center backdrop-blur-lg backdrop-filter">
					<div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
					<div className="modal-content relative p-[20px] bg-white rounded-lg shadow-lg">
						<button
							className="close-btn absolute top-4 right-6"
							onClick={onClose}
						>
							Close
						</button>
						{children}
					</div>
				</div>
			) : null}
		</>
	);
};

export default Modal;
