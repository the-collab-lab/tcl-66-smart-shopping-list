import Svg from './Svg';

const ConfirmToast = ({
	id,
	message,
	iconName,
	color,
	onConfirm,
	onCancel,
}) => {
	// Render the toast only if the message is not empty
	if (!message) {
		return null;
	}
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-brightness-50">
			<div
				id={id}
				className={`w-full max-w-md  my-2 py-8 px-4 mb-3 text-gray-500 bg-white rounded-lg shadow-xl border border-gray-100`}
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
						<span className="text-sm font-semibold text-gray-900">
							{message}
						</span>
						<div className="my-2 text-sm font-normal">
							This action is forever-eva-eva.
						</div>
						<div className="mt-[20px] flex w-full">
							<button
								type="button"
								onClick={onCancel}
								className="mr-[10px] w-full border-1 border-gray-200 rounded-md px-4 py-[12px]"
							>
								Cancel
							</button>
							<button
								onClick={onConfirm}
								className="rounded-md w-full px-4 py-[12px] text-white bg-red-700"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmToast;
