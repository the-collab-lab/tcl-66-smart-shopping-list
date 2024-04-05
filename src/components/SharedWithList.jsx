import { FaRegCircleUser } from 'react-icons/fa6';
import { VscTrash } from 'react-icons/vsc';
import { unshareList } from '../api';
import { useToast } from '../utils';
import ConfirmToast from './ConfirmToast';
import capitalizeFirstLetterOfEachWord from '../utils/capitalize';

const SharedWithList = ({
	listPath,
	sharedWith,
	closeModal,
	setUsersSharedWith,
}) => {
	const { toasts, addConfirmToast, cancelConfirmToast } = useToast();

	const handleUnshare = async (email, name) => {
		try {
			const confirmationId = 'unshareListConfirm';
			addConfirmToast({
				id: confirmationId,
				message: `Are you sure you want to unshare your list with ${capitalizeFirstLetterOfEachWord(name)}?`,
				iconName: 'warning',
				color: 'orange',
				onConfirm: async () => {
					await unshareList(listPath, email, name);
					// Remove the unshared user from the sharedWith array
					const updatedSharedWith = sharedWith.filter(
						(shared) => shared.email !== email,
					);
					setUsersSharedWith(updatedSharedWith);

					if (updatedSharedWith.length < 1) {
						closeModal();
					}
				},
				onCancel: () => {
					cancelConfirmToast(confirmationId);
				},
			});
		} catch (err) {
			console.error('Error unsharing list', err);
		}
	};
	return (
		<>
			{toasts.map((toast) => (
				<ConfirmToast key={toast.id} {...toast} />
			))}

			<div className="flex flex-col items-center max-h-[350px] overflow-scroll">
				<h2 className="text-lg font-bold mt-6 mb-4 border-b-1 border-gray-200 pb-[20px] w-full">
					Shared with:
				</h2>
				<div className="flex items-center">
					<div>
						<ul>
							{sharedWith?.map((shared, index) => (
								<li
									key={index}
									className="flex items-center sm:gap-28 justify-between px-2 mb-4 h-16 bg-gray-50 rounded-lg shadow-md"
								>
									<span className="flex items-center xsm:text-xs sm:text-md">
										<FaRegCircleUser className="text-lg mr-2 text-gray-600" />
										{`${shared.name} (${shared.email})`}
									</span>
									<VscTrash
										onClick={() => handleUnshare(shared.email, shared.name)}
										className="text-xl ml-2 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-100 ease-in-out"
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default SharedWithList;
