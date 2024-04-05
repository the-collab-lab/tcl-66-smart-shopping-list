import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const Modal = ({ isOpen, onClose, children }) => {
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		// Add event listener when modal is open
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
		}

		// Remove event listener when modal is closed or component unmounts
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose]);
	return (
		<>
			{isOpen ? (
				<div className="fixed inset-0 z-50  xsm:px-4 sm:px-12 overflow-y-scroll flex justify-center items-center backdrop-blur-lg backdrop-filter">
					<div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
					<div className="modal-content  relative xsm:p-[20px] xsm:pr-[30px] sm:p-[28px] bg-white rounded-lg shadow-lg">
						<button
							className="close-btn absolute top-4 right-6"
							onClick={onClose}
						>
							<IoClose size={18} />
						</button>
						{children}
					</div>
				</div>
			) : null}
		</>
	);
};

export default Modal;
