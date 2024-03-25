import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function SingleList({ name, path, setListPath, setLoading }) {
	const navigate = useNavigate();

	async function handleClick() {
		setLoading(true);
		await setListPath('');
		setListPath(path);
		navigate('/list');
	}

	return (
		<li className="flex-grow justify-between px-6 h-12 bg-list rounded-lg shadow-sm mt-4 hover:bg-gray-100 hover:bg-opacity-85">
			{/* Using Link instead of button */}
			<Link
				to="/list"
				onClick={() => handleClick()}
				className="flex items-center w-full h-full"
			>
				{name}
			</Link>
		</li>
	);
}
