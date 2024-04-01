import { Button } from 'flowbite-react';
import React from 'react';
import NavigationBarAddList from '../components/NavigationBarAddList.jsx';

const NavigationBarModal = ({ isOpen, onClose, children, setListPath }) => {
	return (
		<>
			{isOpen ? (
				<div className="modal-overlay">
					<div className="modal-content">
						<NavigationBarAddList setListPath={setListPath} />
						<Button
							className="max-w-fit w-[90px] h-[34px] rounded-lg pt-2 pr-3 pb-2 pl-3 border"
							color="light"
							onClick={onClose}
						>
							<div className="max-w-fit flex gap-x-2 items-center">
								<p className="w-[46px] h-[18px] font-medium font-family: 'Inter' text-xs leading-[20px] text-[#111928]">
									<span className="whitespace-nowrap">Close</span>
								</p>
							</div>
						</Button>
						{children}
					</div>
				</div>
			) : null}
		</>
	);
};

export default NavigationBarModal;
