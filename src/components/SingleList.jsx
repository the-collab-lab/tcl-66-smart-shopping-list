import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/useAuth.jsx';
import { deleteList, deleteSharedList } from '../api';

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
						`The ${name} list has been shared with you. Deleting it will remove it from your lists, and you won't be able to access it unless it's shared with you again. Are you sure you want to proceed with the deletion?`,
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
		<li className="SingleList">
			{name}
			<button onClick={() => handleClick()}>view</button>
			<button onClick={() => handleDelete()}>delete</button>
		</li>
	);
}
