import { useState, useEffect } from 'react';
import Svg from './Svg';
import { IoClose } from 'react-icons/io5';

const Toast = ({ id, message, iconName, color, dismissible = true }) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 3000); // 3 seconds

		return () => {
			clearTimeout(timer);
		};
	}, []);

	const handleClose = () => {
		setIsVisible(false);
	};

	return (
		<div
			id={id}
			className={`fixed top-5 right-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg 
            shadow-${color} transition-opacity duration-500 
            ${isVisible ? 'opacity-100' : 'opacity-0'}`}
		>
			<div
				className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${color}-500 bg-${color}-100 rounded-lg`}
			>
				<Svg className="w-5 h-5" aria-hidden="true" symbolId={iconName} />
				<span className="sr-only">{iconName} icon</span>
			</div>
			<div className="ms-3 text-sm font-normal">{message}</div>
			{dismissible ? (
				<button
					type="button"
					className="-mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
					data-dismiss-target={`#${id}`}
					aria-label="Close"
					onClick={handleClose}
				>
					<span className="sr-only">Close</span>
					<IoClose size={20} />
				</button>
			) : null}
		</div>
	);
};

export default Toast;
