import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/useAuth.jsx';
import { deleteList, deleteSharedList } from '../api';
import { VscTrash } from 'react-icons/vsc';

export function SingleList({ name, path, setListPath, setLoading }) {
	const navigate = useNavigate();
	const { user } = useAuth();

	async function handleClick() {
		setLoading(true);
		await setListPath('');
		setListPath(path);
		navigate('/list');
	}

	const handleDelete = async () => {
		try {
			if (!path.includes(user.uid)) {
				if (
					window.confirm(
						`The ${name} list has been shared with you. Deleting it will remove it from your lists. You will loose access unless it's shared with you again. Are you sure you want to proceed with the deletion?`,
					)
				) {
					await deleteSharedList(user.email, path.split('/')[0], name);
				} else {
					return;
				}
			} else {
				if (
					window.confirm(
						`Deleting this list will remove it for everyone who has access to it. Are you sure you want to delete your ${name} list?`,
					)
				) {
					await deleteList(path, user.uid, user.email, name);
				} else {
					return;
				}
			}
		} catch (err) {
			console.error(err.message);
			alert(
				`An error occurred while deleting your ${name} list: ${err.message}`,
			);
		}
	};

	return (
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
	);
}