import Svg from './Svg';

const ConfirmToast = ({
	id,
	message,
	iconName,
	color,
	onConfirm,
	onCancel,
}) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				id={id}
				className={`w-full max-w-xs p-4 mb-3 text-gray-500 bg-white rounded-lg shadow-xl border border-gray-100`}
				role="alert"
			>
				<div className="flex items-center">
					<div
						className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${color}-500 bg-${color}-100 rounded-lg`}
					>
						<Svg className="w-4 h-4" aria-hidden="true" symbolId={iconName} />
						<span className="sr-only">{iconName} icon</span>
					</div>
					<div className="ms-3 text-sm font-normal">
						<span className="mb-1 text-sm font-semibold text-gray-900">
							{message}
						</span>
						<div className="mb-2 text-sm font-normal">
							Are you sure? This action is forever-eva-eva.
						</div>
						<div className="grid grid-cols-2 gap-2">
							<div>
								<button
									onClick={onConfirm}
									className={`inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300`}
								>
									Delete
								</button>
							</div>
							<div>
								<button
									onClick={onCancel}
									className={`inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200`}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmToast;
