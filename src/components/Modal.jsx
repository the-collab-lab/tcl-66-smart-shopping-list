import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
	return (
		<>
			{isOpen ? (
				<div className="modal-overlay">
					<div className="modal-content">
						<button className="close-btn" onClick={onClose}>
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
