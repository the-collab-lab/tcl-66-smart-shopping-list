import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/useAuth.jsx';
import { deleteList, deleteSharedList } from '../api';
import { VscTrash } from 'react-icons/vsc';
import { useToast } from '../utils/hooks';
import Toast from './Toast';
import ConfirmToast from './ConfirmToast.jsx';
import capitalizeFirstLetterOfEachWord from '../utils/capitalize.js';

export function SingleList({ name, path, setListPath, setLoading }) {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { toasts, addToast, addConfirmToast, cancelConfirmToast } = useToast();
	async function handleClick() {
		setLoading(true);
		await setListPath('');
		setListPath(path);
		navigate('/list');
	}

	const handleDelete = async () => {
		try {
			if (!path.includes(user.uid)) {
				const confirmationId = 'deleteSharedListConfirm';
				addConfirmToast({
					id: confirmationId,
					message: `The ${capitalizeFirstLetterOfEachWord(name)} list has been shared with you. By pressing delete, you lose access until it's shared with you again.`,
					iconName: 'warning',
					color: 'orange',
					onConfirm: async () => {
						await deleteSharedList(user.email, path.split('/')[0], name);
					},
					onCancel: () => {
						cancelConfirmToast(confirmationId);
					},
				});
			} else {
				const confirmationId = 'deleteListConfirm';
				addConfirmToast({
					id: confirmationId,
					message: `By pressing delete, your ${capitalizeFirstLetterOfEachWord(name)} list will be removed from your lists, and everyone who has access to it.`,
					iconName: 'warning',
					color: 'orange',
					onConfirm: async () => {
						await deleteList(path, user.uid, user.email, name);
					},
					onCancel: () => {
						cancelConfirmToast(confirmationId);
					},
				});
			}
		} catch (err) {
			console.error(err.message);
			addToast({
				id: 'toastItemDeleteErr',
				message: `An error occurred while deleting your ${capitalizeFirstLetterOfEachWord(name)} list: ${err.message}`,
				iconName: 'error',
				color: 'red',
			});
		}
	};

	return (
		<>
			{/* Render ConfirmToast if there are confirmation toasts */}
			{toasts.map((toast) => (
				<ConfirmToast key={toast.id} {...toast} />
			))}

			{/* Render Toast only if there are no confirmation toasts and there are error messages */}
			{toasts.length === 0 ? (
				<Toast
					key={toasts.length > 0 ? toasts[0].id : 'default'}
					{...toasts[0]}
				/>
			) : null}

			<li className="cursor-pointer mb-2 bg-white shadow hover:shadow-md h-[72px] flex items-center justify-between rounded-lg p-6 transition-shadow duration-300 ease-in-out">
				{/* Using Link instead of button */}
				<Link
					to="/list"
					onClick={() => handleClick()}
					className="flex items-center w-full h-full"
				>
					{name}
				</Link>
				<button onClick={() => handleDelete()}>
					<VscTrash size={20} className="text-gray-600" />
				</button>
			</li>
		</>
	);
}
